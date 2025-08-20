import bcrypt from 'bcryptjs'
import { nanoid } from 'nanoid'
import { Decimal } from '@prisma/client/runtime/library'

// Utilitários para autenticação (apenas servidor)
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

// Gerador de códigos únicos
export function generateAffiliateCode(): string {
  return `GS${nanoid(6).toUpperCase()}`
}

export function generateLinkCode(): string {
  return nanoid(12)
}

// Utilitários para paginação (servidor)
export interface PaginationResult<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export function createPaginationResult<T>(
  data: T[],
  page: number,
  limit: number,
  total: number
): PaginationResult<T> {
  return {
    data,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  }
}

// Utilitários para Decimal do Prisma
export function decimalToNumber(decimal: Decimal): number {
  return decimal.toNumber()
}

export function numberToDecimal(num: number): Decimal {
  return new Decimal(num)
}

// Utilitários para tracking de links
export function generateTrackingId(): string {
  return nanoid(16)
}

export function sanitizeCustomSlug(slug: string): string {
  return slug
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50)
}

// Utilitários para filtros e busca (servidor)
export function buildWhereClause(filters: Record<string, any>) {
  const where: Record<string, any> = {}
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (key === 'search') {
        // Implementar busca por múltiplos campos
        where.OR = [
          { name: { contains: value, mode: 'insensitive' } },
          { email: { contains: value, mode: 'insensitive' } },
        ]
      } else {
        where[key] = value
      }
    }
  })
  
  return where
}
