import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { createCustomerSchema } from '@/lib/validations/schemas'
import { createPaginationResult } from '@/lib/utils/helpers'
import { nanoid } from 'nanoid'

interface CustomerFilters {
  search?: string
  page?: number
  limit?: number
}

// GET /api/clientes - Listar clientes com filtros e paginação
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const filters: CustomerFilters = {
      search: searchParams.get('search') || undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
    }
    
    const page = filters.page || 1
    const limit = filters.limit || 10
    const skip = (page - 1) * limit

    // Construir where clause
    const where: any = {}

    // Busca por texto
    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { email: { contains: filters.search, mode: 'insensitive' } },
        { phone: { contains: filters.search, mode: 'insensitive' } },
        { cpfCnpj: { contains: filters.search, mode: 'insensitive' } },
      ]
    }

    // Buscar clientes
    const [customers, total] = await Promise.all([
      prisma.customer.findMany({
        where,
        include: {
          sales: {
            select: {
              id: true,
              amount: true,
              status: true,
              createdAt: true,
              product: {
                select: {
                  id: true,
                  name: true,
                  category: true,
                }
              },
              affiliate: {
                select: {
                  id: true,
                  affiliateCode: true,
                  user: {
                    select: {
                      name: true,
                    }
                  }
                }
              }
            },
            orderBy: {
              createdAt: 'desc'
            },
            take: 10, // Últimas 10 vendas
          },
          _count: {
            select: {
              sales: true,
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit,
      }),
      prisma.customer.count({ where })
    ])

    // Processar dados para o frontend
    const processedCustomers = customers.map((customer: any) => {
      const completedSales = customer.sales.filter((sale: any) => sale.status === 'PAID')
      const totalSpent = completedSales.reduce((sum: number, sale: any) => sum + sale.amount.toNumber(), 0)
      const lastPurchase = completedSales.length > 0 ? completedSales[0].createdAt : null

      return {
        ...customer,
        stats: {
          totalSales: customer._count.sales,
          completedSales: completedSales.length,
          totalSpent,
          lastPurchase,
        },
        sales: customer.sales.map((sale: any) => ({
          ...sale,
          amount: sale.amount.toNumber(),
        }))
      }
    })

    const pagination = createPaginationResult(processedCustomers, total, page, limit)

    // Calcular estatísticas globais
    const stats = await prisma.customer.aggregate({
      where,
      _count: { id: true }
    })

    return NextResponse.json({
      data: processedCustomers,
      pagination: pagination.pagination,
      stats: {
        totalCustomers: stats._count.id || 0,
      }
    })

  } catch (error) {
    console.error('Erro ao buscar clientes:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST /api/clientes - Criar novo cliente
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar dados de entrada
    const validatedData = createCustomerSchema.parse(body)

    // Verificar se já existe cliente com mesmo email
    if (validatedData.email) {
      const existingCustomer = await prisma.customer.findFirst({
        where: { email: validatedData.email }
      })

      if (existingCustomer) {
        return NextResponse.json(
          { error: 'Cliente com este email já existe' },
          { status: 409 }
        )
      }
    }

    // Criar cliente
    const customer = await prisma.customer.create({
      data: {
        id: nanoid(),
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        cpfCnpj: validatedData.cpfCnpj,
        address: validatedData.address,
      }
    })

    return NextResponse.json({
      message: 'Cliente criado com sucesso',
      customer
    }, { status: 201 })

  } catch (error) {
    console.error('Erro ao criar cliente:', error)
    
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
