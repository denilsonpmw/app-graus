import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { createPaginationResult } from '@/lib/utils/server-helpers'

// Tipos de status válidos conforme enum PaymentStatus do schema (PENDING, PAID, FAILED, REFUNDED)
interface CommissionFilters {
  search?: string
  status?: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'
  affiliateId?: string
  startDate?: Date
  endDate?: Date
  page?: number
  limit?: number
}

// GET /api/comissoes - Listar comissões com filtros e paginação
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const filters: CommissionFilters = {
      search: searchParams.get('search') || undefined,
      status: searchParams.get('status') as any || undefined,
      affiliateId: searchParams.get('affiliateId') || undefined,
      startDate: searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined,
      endDate: searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
    }
    
    const page = filters.page || 1
    const limit = filters.limit || 10
    const skip = (page - 1) * limit

    // Construir where clause
    const where: any = {}

    if (filters.status) {
      where.status = filters.status
    }

    if (filters.affiliateId) {
      where.affiliateId = filters.affiliateId
    }

    if (filters.startDate && filters.endDate) {
      where.createdAt = {
        gte: filters.startDate,
        lte: filters.endDate,
      }
    }

    // Busca por texto
    if (filters.search) {
      where.OR = [
        { affiliate: { user: { name: { contains: filters.search, mode: 'insensitive' } } } },
        { affiliate: { user: { email: { contains: filters.search, mode: 'insensitive' } } } },
        { affiliate: { affiliateCode: { contains: filters.search, mode: 'insensitive' } } },
      ]
    }

    // Buscar comissões
    const [commissions, total] = await Promise.all([
      prisma.commission.findMany({
        where,
        include: {
          affiliate: {
            select: {
              id: true,
              affiliateCode: true,
              subscriptionPlan: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  phone: true,
                }
              }
            }
          },
          sale: {
            select: {
              id: true,
              amount: true,
              status: true,
              createdAt: true,
              customer: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                }
              },
              product: {
                select: {
                  id: true,
                  name: true,
                  category: true,
                }
              }
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit,
      }),
      prisma.commission.count({ where })
    ])

    // Calcular estatísticas globais
    const stats = await prisma.commission.aggregate({
      where,
      _sum: { amount: true },
      _count: { id: true }
    })

    const commissionsByStatus = await prisma.commission.groupBy({
      by: ['status'],
      where,
      _count: { id: true },
      _sum: { amount: true }
    })

    // Processar dados para o frontend
    const processedCommissions = commissions.map((commission: any) => ({
      ...commission,
      amount: commission.amount.toNumber(),
      sale: commission.sale ? {
        ...commission.sale,
        amount: commission.sale.amount.toNumber(),
      } : null,
    }))

  // createPaginationResult espera ordem (data, page, limit, total)
  const pagination = createPaginationResult(processedCommissions, page, limit, total)

    return NextResponse.json({
      data: processedCommissions,
      pagination: pagination.pagination,
      stats: {
        totalAmount: stats._sum.amount?.toNumber() || 0,
        totalCount: stats._count.id || 0,
        byStatus: commissionsByStatus.reduce((acc: any, item: any) => {
          acc[item.status] = {
            count: item._count.id,
            amount: item._sum.amount?.toNumber() || 0
          }
          return acc
        }, {} as Record<string, { count: number; amount: number }>)
      }
    })

  } catch (error) {
    console.error('Erro ao buscar comissões:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST /api/comissoes/[id]/pay - Marcar comissão como paga
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { commissionIds } = body

    if (!Array.isArray(commissionIds) || commissionIds.length === 0) {
      return NextResponse.json(
        { error: 'IDs de comissões são obrigatórios' },
        { status: 400 }
      )
    }

    // Atualizar comissões para status PAID
  const updatedCommissions = await prisma.commission.updateMany({
      where: {
        id: { in: commissionIds },
        status: 'PENDING'
      },
      data: {
        status: 'PAID',
    // Campo correto no modelo: paymentDate (não existe paidAt)
    paymentDate: new Date()
      }
    })

    if (updatedCommissions.count === 0) {
      return NextResponse.json(
        { error: 'Nenhuma comissão pendente encontrada' },
        { status: 404 }
      )
    }

    // Atualizar totais dos afiliados
    for (const commissionId of commissionIds) {
      const commission = await prisma.commission.findUnique({
        where: { id: commissionId },
        select: { affiliateId: true, amount: true }
      })

      if (commission) {
        await prisma.affiliate.update({
          where: { id: commission.affiliateId },
          data: {
            paidCommissions: {
              increment: commission.amount
            },
            pendingCommissions: {
              decrement: commission.amount
            }
          }
        })
      }
    }

    return NextResponse.json({
      message: `${updatedCommissions.count} comissões marcadas como pagas`,
      count: updatedCommissions.count
    })

  } catch (error) {
    console.error('Erro ao marcar comissões como pagas:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
