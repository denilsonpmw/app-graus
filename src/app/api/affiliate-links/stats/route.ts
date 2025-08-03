import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth.config'
import { prisma } from '@/lib/db/prisma'

// GET /api/affiliate-links/stats - Estatísticas do afiliado
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

    // Buscar estatísticas do afiliado
    const [linksCount, totalClicks, totalSales, totalCommissions] = await Promise.all([
      // Total de links
      prisma.affiliateLink.count({
        where: { affiliateId: user.affiliate.id }
      }),
      
      // Total de cliques
      prisma.linkClick.count({
        where: { affiliateId: user.affiliate.id }
      }),
      
      // Total de vendas pagas
      prisma.sale.count({
        where: { 
          affiliateId: user.affiliate.id,
          status: 'PAID'
        }
      }),
      
      // Total de comissões
      prisma.commission.aggregate({
        where: { 
          affiliateId: user.affiliate.id,
          status: 'PAID'
        },
        _sum: {
          amount: true
        }
      })
    ])

    const conversionRate = totalClicks > 0 ? (totalSales / totalClicks) * 100 : 0

    return NextResponse.json({
      totalClicks,
      totalConversions: totalSales,
      conversionRate: parseFloat(conversionRate.toFixed(2)),
      totalCommissions: totalCommissions._sum.amount?.toNumber() || 0,
      linksCount
    })

  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
