import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { 
  createSaleSchema, 
  salesFiltersSchema,
  type CreateSaleData,
  type SalesFilters 
} from '@/lib/validations/schemas'
import { 
  createPaginationResult,
  buildWhereClause,
  calculateCommission,
  getCommissionRate
} from '@/lib/utils/helpers'
import { nanoid } from 'nanoid'

// GET /api/vendas - Listar vendas com filtros e paginação
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const filters: SalesFilters = {
      search: searchParams.get('search') || undefined,
      status: searchParams.get('status') as any || undefined,
      affiliateId: searchParams.get('affiliateId') || undefined,
      productId: searchParams.get('productId') || undefined,
      startDate: searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined,
      endDate: searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
    }

    // Validar filtros
    const validatedFilters = salesFiltersSchema.parse(filters)
    
    const page = validatedFilters.page || 1
    const limit = validatedFilters.limit || 10
    const skip = (page - 1) * limit

    // Construir where clause
    const where: any = {}

    if (validatedFilters.status) {
      where.status = validatedFilters.status
    }

    if (validatedFilters.affiliateId) {
      where.affiliateId = validatedFilters.affiliateId
    }

    if (validatedFilters.productId) {
      where.productId = validatedFilters.productId
    }

    if (validatedFilters.startDate && validatedFilters.endDate) {
      where.createdAt = {
        gte: validatedFilters.startDate,
        lte: validatedFilters.endDate,
      }
    }

    // Busca por texto
    if (validatedFilters.search) {
      where.OR = [
        { notes: { contains: validatedFilters.search, mode: 'insensitive' } },
        { customer: { name: { contains: validatedFilters.search, mode: 'insensitive' } } },
        { customer: { email: { contains: validatedFilters.search, mode: 'insensitive' } } },
      ]
    }

    // Buscar vendas
    const [sales, total] = await Promise.all([
      prisma.sale.findMany({
        where,
        include: {
          customer: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
            }
          },
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              category: true,
            }
          },
          affiliate: {
            select: {
              id: true,
              affiliateCode: true,
              subscriptionPlan: true,
              user: {
                select: {
                  name: true,
                  email: true,
                }
              }
            }
          },
          commission: {
            select: {
              id: true,
              amount: true,
              status: true,
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit,
      }),
      prisma.sale.count({ where })
    ])

    // Calcular estatísticas globais
    const stats = await prisma.sale.aggregate({
      where,
      _sum: { amount: true },
      _count: { id: true }
    })

    const salesByStatus = await prisma.sale.groupBy({
      by: ['status'],
      where,
      _count: { id: true },
      _sum: { amount: true }
    })

    // Processar dados para o frontend
    const processedSales = sales.map((sale: any) => ({
      ...sale,
      amount: sale.amount.toNumber(),
      commissionRate: sale.commissionRate.toNumber(),
      commissionAmount: sale.commissionAmount.toNumber(),
    }))

    const pagination = createPaginationResult(processedSales, total, page, limit)

    return NextResponse.json({
      data: processedSales,
      pagination: pagination.pagination,
      stats: {
        totalAmount: stats._sum.amount?.toNumber() || 0,
        totalCount: stats._count.id || 0,
        byStatus: salesByStatus.reduce((acc: Record<string, { count: number; amount: number }>, item: any) => {
          acc[item.status] = {
            count: item._count.id,
            amount: item._sum.amount?.toNumber() || 0
          }
          return acc
        }, {} as Record<string, { count: number; amount: number }>)
      }
    })

  } catch (error) {
    console.error('Erro ao buscar vendas:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST /api/vendas - Criar nova venda
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar dados de entrada
    const validatedData = createSaleSchema.parse(body)

    // Verificar se afiliado existe
    const affiliate = await prisma.affiliate.findUnique({
      where: { id: validatedData.affiliateId },
      include: { user: true }
    })

    if (!affiliate) {
      return NextResponse.json(
        { error: 'Afiliado não encontrado' },
        { status: 404 }
      )
    }

    // Verificar se produto existe
    const product = await prisma.product.findUnique({
      where: { id: validatedData.productId }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      )
    }

    // Verificar se cliente existe
    const customer = await prisma.customer.findUnique({
      where: { id: validatedData.customerId }
    })

    if (!customer) {
      return NextResponse.json(
        { error: 'Cliente não encontrado' },
        { status: 404 }
      )
    }

    // Calcular comissão
    const commissionRate = getCommissionRate(affiliate.subscriptionPlan)
    const commissionAmount = calculateCommission(validatedData.amount, commissionRate)

    // Criar venda
    const sale = await prisma.sale.create({
      data: {
        id: nanoid(),
        customerId: validatedData.customerId,
        productId: validatedData.productId,
        affiliateId: validatedData.affiliateId,
        affiliateLinkId: validatedData.affiliateLinkId,
        amount: validatedData.amount,
        status: validatedData.status || 'LEAD',
        commissionRate: commissionRate,
        commissionAmount: commissionAmount,
        contractSigned: false,
        notes: validatedData.notes,
      },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          }
        },
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            category: true,
          }
        },
        affiliate: {
          select: {
            id: true,
            affiliateCode: true,
            subscriptionPlan: true,
            user: {
              select: {
                name: true,
                email: true,
              }
            }
          }
        }
      }
    })

    return NextResponse.json({
      message: 'Venda criada com sucesso',
      sale: {
        ...sale,
        amount: sale.amount.toNumber(),
        commissionRate: sale.commissionRate.toNumber(),
        commissionAmount: sale.commissionAmount.toNumber(),
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Erro ao criar venda:', error)
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
