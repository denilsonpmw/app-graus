import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { 
  createAffiliateSchema, 
  affiliateFiltersSchema,
  type CreateAffiliateData,
  type AffiliateFilters 
} from '@/lib/validations/schemas'
import { 
  hashPassword, 
  generateAffiliateCode, 
  createPaginationResult,
  buildWhereClause
} from '@/lib/utils/server-helpers'
import {
  getPlanPrice,
  addYears
} from '@/lib/utils/helpers'

// GET /api/afiliados - Listar afiliados com filtros e paginação
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const filters: AffiliateFilters = {
      search: searchParams.get('search') || undefined,
      status: searchParams.get('status') as any || undefined,
      plan: searchParams.get('plan') as any || undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
    }

    // Validar filtros
    const validatedFilters = affiliateFiltersSchema.parse(filters)
    
    const page = validatedFilters.page || 1
    const limit = validatedFilters.limit || 10
    const skip = (page - 1) * limit

    // Construir where clause
    const where = buildWhereClause({
      subscriptionStatus: validatedFilters.status,
      subscriptionPlan: validatedFilters.plan,
    })

    // Busca por texto
    if (validatedFilters.search) {
      where.OR = [
        { user: { name: { contains: validatedFilters.search, mode: 'insensitive' } } },
        { user: { email: { contains: validatedFilters.search, mode: 'insensitive' } } },
        { affiliateCode: { contains: validatedFilters.search, mode: 'insensitive' } },
      ]
    }

    // Buscar afiliados
    const [affiliates, total] = await Promise.all([
      prisma.affiliate.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              cpfCnpj: true,
              avatar: true,
              createdAt: true,
              isActive: true,
            }
          },
          sales: {
            select: {
              id: true,
              amount: true,
              status: true,
              createdAt: true,
            }
          },
          commissions: {
            select: {
              amount: true,
              status: true,
            }
          },
          _count: {
            select: {
              sales: true,
              commissions: true,
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit,
      }),
      prisma.affiliate.count({ where })
    ])

    // Processar dados para o frontend
    const processedAffiliates = affiliates.map((affiliate: any) => {
      const totalSales = affiliate.sales.length
      const totalRevenue = affiliate.sales
        .filter((sale: any) => sale.status === 'PAID')
        .reduce((sum: number, sale: any) => sum + sale.amount.toNumber(), 0)
      
      const paidCommissions = affiliate.commissions
        .filter((commission: any) => commission.status === 'PAID')
        .reduce((sum: number, commission: any) => sum + commission.amount.toNumber(), 0)
      
      const pendingCommissions = affiliate.commissions
        .filter((commission: any) => commission.status === 'PENDING')
        .reduce((sum: number, commission: any) => sum + commission.amount.toNumber(), 0)

      return {
        id: affiliate.id,
        userId: affiliate.userId,
        affiliateCode: affiliate.affiliateCode,
        user: affiliate.user,
        subscriptionPlan: affiliate.subscriptionPlan,
        subscriptionStatus: affiliate.subscriptionStatus,
        subscriptionDate: affiliate.subscriptionDate,
        subscriptionExpiry: affiliate.subscriptionExpiry,
        bankAccount: affiliate.bankAccount,
        bankCode: affiliate.bankCode,
        bankAgency: affiliate.bankAgency,
        pixKey: affiliate.pixKey,
        totalCommissions: affiliate.totalCommissions.toNumber(),
        paidCommissions: affiliate.paidCommissions.toNumber(),
        pendingCommissions: affiliate.pendingCommissions.toNumber(),
        joinedGroupSupport: affiliate.joinedGroupSupport,
        createdAt: affiliate.createdAt,
        updatedAt: affiliate.updatedAt,
        stats: {
          totalSales,
          totalRevenue,
          paidCommissions,
          pendingCommissions,
          conversionRate: totalSales > 0 ? (totalRevenue / totalSales * 100).toFixed(2) : '0.00',
        }
      }
    })

    return NextResponse.json(
      createPaginationResult(processedAffiliates, total, page, limit)
    )

  } catch (error) {
    console.error('Erro ao buscar afiliados:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST /api/afiliados - Criar novo afiliado
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validar dados de entrada
    const validatedData: CreateAffiliateData = createAffiliateSchema.parse(body)
    
    // Verificar se email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email já está em uso' },
        { status: 400 }
      )
    }

    // Verificar se CPF/CNPJ já existe
    if (validatedData.cpfCnpj) {
      const existingCpfCnpj = await prisma.user.findUnique({
        where: { cpfCnpj: validatedData.cpfCnpj }
      })
      
      if (existingCpfCnpj) {
        return NextResponse.json(
          { error: 'CPF/CNPJ já está em uso' },
          { status: 400 }
        )
      }
    }

    // Hash da senha
    const hashedPassword = await hashPassword(validatedData.password)
    
    // Gerar código único do afiliado
    let affiliateCode: string
    do {
      affiliateCode = generateAffiliateCode()
      const existingCode = await prisma.affiliate.findUnique({
        where: { affiliateCode }
      })
      if (!existingCode) break
    } while (true)

    // Calcular datas da assinatura
    const subscriptionDate = new Date()
    const subscriptionExpiry = addYears(subscriptionDate, 1)

    // Criar usuário e afiliado em uma transação
    const result = await prisma.$transaction(async (tx: any) => {
      // Criar usuário
      const user = await tx.user.create({
        data: {
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone,
          cpfCnpj: validatedData.cpfCnpj,
          password: hashedPassword,
          role: 'AFFILIATE',
        }
      })

      // Criar afiliado
      const affiliate = await tx.affiliate.create({
        data: {
          userId: user.id,
          affiliateCode,
          subscriptionPlan: validatedData.subscriptionPlan,
          subscriptionStatus: 'PENDING', // Pendente até confirmação do pagamento
          subscriptionDate,
          subscriptionExpiry,
          bankAccount: validatedData.bankAccount,
          bankCode: validatedData.bankCode,
          bankAgency: validatedData.bankAgency,
          pixKey: validatedData.pixKey,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              cpfCnpj: true,
              createdAt: true,
            }
          }
        }
      })

      // Criar assinatura pendente
      await tx.subscription.create({
        data: {
          affiliateId: affiliate.id,
          plan: validatedData.subscriptionPlan,
          status: 'PENDING',
          amount: getPlanPrice(validatedData.subscriptionPlan),
          paymentMethod: 'PIX', // Default, pode ser alterado no checkout
          startDate: subscriptionDate,
          endDate: subscriptionExpiry,
        }
      })

      return affiliate
    })

    return NextResponse.json(
      {
        message: 'Afiliado criado com sucesso',
        affiliate: {
          id: result.id,
          userId: result.userId,
          affiliateCode: result.affiliateCode,
          user: result.user,
          subscriptionPlan: result.subscriptionPlan,
          subscriptionStatus: result.subscriptionStatus,
          subscriptionDate: result.subscriptionDate,
          subscriptionExpiry: result.subscriptionExpiry,
          createdAt: result.createdAt,
        }
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Erro ao criar afiliado:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
