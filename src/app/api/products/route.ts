import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

// GET /api/products - Listar produtos ativos
export async function GET(request: NextRequest) {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        category: true,
        imageUrl: true,
      },
      orderBy: {
        name: 'asc'
      }
    })

    // Converter Decimal para number
    const productsWithNumberPrice = products.map((product: any) => ({
      ...product,
      price: product.price.toNumber()
    }))

    return NextResponse.json(productsWithNumberPrice)
    
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
