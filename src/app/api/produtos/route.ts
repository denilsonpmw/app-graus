import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { 
  createProductSchema, 
  productFiltersSchema,
  type CreateProductData,
  type ProductFilters 
} from '@/lib/validations/schemas'
import { 
  createPaginationResult,
  buildWhereClause
} from '@/lib/utils/helpers'
import { nanoid } from 'nanoid'

// GET /api/produtos - Listar produtos com filtros e paginação
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const filters: ProductFilters = {
      search: searchParams.get('search') || undefined,
      category: searchParams.get('category') || undefined,
      priceMin: searchParams.get('priceMin') ? parseFloat(searchParams.get('priceMin')!) : undefined,
      priceMax: searchParams.get('priceMax') ? parseFloat(searchParams.get('priceMax')!) : undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
    }

    // Validar filtros
    const validatedFilters = productFiltersSchema.parse(filters)
    
    const page = validatedFilters.page || 1
    const limit = validatedFilters.limit || 10
    const skip = (page - 1) * limit

    // Construir where clause
    const where: any = {}

    if (validatedFilters.category) {
      where.category = validatedFilters.category
    }

    if (validatedFilters.priceMin !== undefined || validatedFilters.priceMax !== undefined) {
      where.price = {}
      if (validatedFilters.priceMin !== undefined) {
        where.price.gte = validatedFilters.priceMin
      }
      if (validatedFilters.priceMax !== undefined) {
        where.price.lte = validatedFilters.priceMax
      }
    }

    // Busca por texto
    if (validatedFilters.search) {
      where.OR = [
        { name: { contains: validatedFilters.search, mode: 'insensitive' } },
        { description: { contains: validatedFilters.search, mode: 'insensitive' } },
        { category: { contains: validatedFilters.search, mode: 'insensitive' } },
      ]
    }

    // Buscar produtos
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          sales: {
            select: {
              id: true,
              amount: true,
              status: true,
            }
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
      prisma.product.count({ where })
    ])

    // Processar dados para o frontend
    const processedProducts = products.map((product: any) => {
      const totalSales = product.sales.filter((sale: any) => sale.status === 'COMPLETED').length
      const totalRevenue = product.sales
        .filter((sale: any) => sale.status === 'COMPLETED')
        .reduce((sum: number, sale: any) => sum + sale.amount.toNumber(), 0)
      const totalQuantitySold = product.sales
        .filter((sale: any) => sale.status === 'COMPLETED')
        .length // Count of completed sales instead of quantity

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price.toNumber(),
        category: product.category,
        imageUrl: product.imageUrl,
        isActive: product.isActive,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        stats: {
          totalSales,
          totalRevenue,
          totalQuantitySold,
        }
      }
    })

    const pagination = createPaginationResult(processedProducts, total, page, limit)

    return NextResponse.json({
      data: processedProducts,
      pagination: pagination.pagination
    })

  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST /api/produtos - Criar novo produto
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar dados de entrada
    const validatedData = createProductSchema.parse(body)

    // Verificar se já existe produto com mesmo nome
    const existingProduct = await prisma.product.findFirst({
      where: { 
        name: validatedData.name,
        isActive: true 
      }
    })

    if (existingProduct) {
      return NextResponse.json(
        { error: 'Já existe um produto com este nome' },
        { status: 400 }
      )
    }

    // Criar produto
    const product = await prisma.product.create({
      data: {
        id: nanoid(),
        name: validatedData.name,
        description: validatedData.description,
        price: validatedData.price,
        category: validatedData.category,
        imageUrl: validatedData.imageUrl,
        isActive: true,
      },
    })

    return NextResponse.json({
      message: 'Produto criado com sucesso',
      product: {
        ...product,
        price: product.price.toNumber()
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Erro ao criar produto:', error)
    
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
