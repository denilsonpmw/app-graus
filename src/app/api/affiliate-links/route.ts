import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth.config'
import { prisma } from '@/lib/db/prisma'
import { createAffiliateLinkSchema } from '@/lib/validations/schemas'
import { createPaginationResult, generateLinkCode } from '@/lib/utils/server-helpers'
import { nanoid } from 'nanoid'

interface LinkFilters {
  search?: string
  affiliateId?: string
  productId?: string
  page?: number
  limit?: number
}

// GET /api/affiliate-links - Listar links de afiliados com filtros e paginação
export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    // Buscar dados do afiliado
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { affiliate: true }
    })

    if (!user?.affiliate) {
      return NextResponse.json(
        { error: 'Usuário não é um afiliado' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    
    const filters: LinkFilters = {
      search: searchParams.get('search') || undefined,
      affiliateId: user.affiliate.id, // Sempre filtrar pelo afiliado logado
      productId: searchParams.get('productId') || undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
    }
    
    const page = filters.page || 1
    const limit = filters.limit || 10
    const skip = (page - 1) * limit

    // Construir where clause
    const where: any = {
      affiliateId: user.affiliate.id // Sempre filtrar pelo afiliado logado
    }

    if (filters.productId) {
      where.productId = filters.productId
    }

    // Busca por texto
    if (filters.search) {
      where.OR = [
        { customSlug: { contains: filters.search, mode: 'insensitive' } },
        { campaignName: { contains: filters.search, mode: 'insensitive' } },
        { product: { name: { contains: filters.search, mode: 'insensitive' } } },
      ]
    }

    // Buscar links
    const [links, total] = await Promise.all([
      prisma.affiliateLink.findMany({
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
                }
              }
            }
          },
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              category: true,
              imageUrl: true,
            }
          },
          sales: {
            select: {
              id: true,
              amount: true,
              status: true,
              createdAt: true,
            },
            orderBy: {
              createdAt: 'desc'
            },
            take: 5, // Últimas 5 vendas
          },
          clicks: {
            select: {
              id: true,
              createdAt: true,
            },
            orderBy: {
              createdAt: 'desc'
            },
            take: 10, // Últimos 10 cliques
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
      prisma.affiliateLink.count({ where })
    ])

    // Processar dados para o frontend
    const processedLinks = links.map((link: any) => {
      const completedSales = link.sales.filter((sale: any) => sale.status === 'PAID')
      const totalRevenue = completedSales.reduce((sum: number, sale: any) => sum + sale.amount.toNumber(), 0)
      const totalClicks = link.clicks.length
      const conversionRate = totalClicks > 0 ? ((completedSales.length / totalClicks) * 100).toFixed(2) : "0.00"
      
      // URL do link baseado no affiliateCode
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
      const affiliateCode = link.affiliate.affiliateCode
      const url = link.customSlug 
        ? `${baseUrl}/ref/${affiliateCode}/${link.customSlug}`
        : `${baseUrl}/ref/${affiliateCode}`

      return {
        id: link.id,
        customSlug: link.customSlug,
        campaignName: link.campaignName,
        utmSource: link.utmSource,
        utmMedium: link.utmMedium,
        utmCampaign: link.utmCampaign,
        isPrimary: !link.customSlug, // É primário se não tem slug personalizado
        clicksCount: totalClicks,
        conversionsCount: completedSales.length,
        createdAt: link.createdAt,
        url,
        product: link.product ? {
          ...link.product,
          price: link.product.price.toNumber(),
        } : null,
        stats: {
          totalClicks,
          totalConversions: completedSales.length,
          totalRevenue,
          conversionRate,
          lastClick: link.clicks[0]?.createdAt || null,
        },
      }
    })

    const pagination = createPaginationResult(processedLinks, total, page, limit)

    // Calcular estatísticas globais
    const totalClicks = links.reduce((sum: number, link: any) => sum + link.clicks.length, 0)
    const totalConversions = links.reduce((sum: number, link: any) => {
      const completedSales = link.sales.filter((sale: any) => sale.status === 'PAID')
      return sum + completedSales.length
    }, 0)
    const globalConversionRate = totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(2) : "0.00"

    return NextResponse.json({
      links: processedLinks,
      pagination: pagination.pagination,
      stats: {
        totalLinks: total,
        totalClicks,
        totalConversions,
        globalConversionRate,
      }
    })

  } catch (error) {
    console.error('Erro ao buscar links:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST /api/affiliate-links - Criar novo link de afiliado
export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    // Buscar dados do afiliado
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { affiliate: true }
    })

    if (!user?.affiliate) {
      return NextResponse.json(
        { error: 'Usuário não é um afiliado' },
        { status: 403 }
      )
    }

    const body = await request.json()

    // Validar dados de entrada
    const validatedData = createAffiliateLinkSchema.parse(body)

    // Verificar se produto existe (apenas se productId foi fornecido)
    let product = null
    if (validatedData.productId) {
      product = await prisma.product.findUnique({
        where: { id: validatedData.productId }
      })

      if (!product) {
        return NextResponse.json(
          { error: 'Produto não encontrado' },
          { status: 404 }
        )
      }
    }

    // Verificar se já existe link para esta combinação (apenas se tiver produto específico)
    const affiliateId = user.affiliate.id

    if (validatedData.productId) {
      const existingLink = await prisma.affiliateLink.findFirst({
        where: {
          affiliateId: affiliateId,
          productId: validatedData.productId,
        }
      })

      if (existingLink) {
        return NextResponse.json(
          { error: 'Link já existe para esta combinação afiliado/produto' },
          { status: 409 }
        )
      }
    }

    // Gerar código único
    const linkCode = generateLinkCode()

    // Criar link
    const link = await prisma.affiliateLink.create({
      data: {
        id: nanoid(),
        affiliateId: affiliateId,
        productId: validatedData.productId || null,
        customSlug: validatedData.customSlug || null,
        campaignName: validatedData.campaignName || null,
        utmSource: validatedData.utmSource || null,
        utmMedium: validatedData.utmMedium || null,
        utmCampaign: validatedData.utmCampaign || null,
        expiresAt: validatedData.expiresAt,
      },
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
              }
            }
          }
        },
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            category: true,
            imageUrl: true,
          }
        }
      }
    })

    return NextResponse.json({
      message: 'Link criado com sucesso',
      link: {
        ...link,
        url: link.customSlug 
          ? `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/ref/${user.affiliate.affiliateCode}/${link.customSlug}`
          : `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/ref/${user.affiliate.affiliateCode}`,
        product: link.product ? {
          ...link.product,
          price: link.product.price.toNumber(),
        } : null
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Erro ao criar link:', error)
    
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
