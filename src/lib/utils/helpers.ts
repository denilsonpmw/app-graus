import bcrypt from 'bcryptjs'
import { nanoid } from 'nanoid'
import { Decimal } from '@prisma/client/runtime/library'

// Utilitários para autenticação
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

// Utilitários para cálculos
export function calculateCommission(amount: number, rate: number): number {
  return (amount * rate) / 100
}

export function getCommissionRate(plan: 'LIGHT' | 'ADVANCED' | 'PREMIUM'): number {
  const rates = {
    LIGHT: 2,
    ADVANCED: 3,
    PREMIUM: 5,
  }
  return rates[plan]
}

export function getPlanPrice(plan: 'LIGHT' | 'ADVANCED' | 'PREMIUM'): number {
  const prices = {
    LIGHT: 387.30,
    ADVANCED: 597.30,
    PREMIUM: 897.30,
  }
  return prices[plan]
}

// Utilitários para datas
export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export function addYears(date: Date, years: number): Date {
  const result = new Date(date)
  result.setFullYear(result.getFullYear() + years)
  return result
}

// Utilitários para formatação
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR').format(date)
}

// Utilitários para paginação
export interface PaginationResult<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export function createPaginationResult<T>(
  data: T[],
  total: number,
  page: number,
  limit: number
): PaginationResult<T> {
  const totalPages = Math.ceil(total / limit)
  
  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    }
  }
}

// Utilitários para validação
export function isValidCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]/g, '')
  
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false
  }
  
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i)
  }
  
  let checkDigit = 11 - (sum % 11)
  if (checkDigit === 10 || checkDigit === 11) {
    checkDigit = 0
  }
  
  if (checkDigit !== parseInt(cpf.charAt(9))) {
    return false
  }
  
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i)
  }
  
  checkDigit = 11 - (sum % 11)
  if (checkDigit === 10 || checkDigit === 11) {
    checkDigit = 0
  }
  
  return checkDigit === parseInt(cpf.charAt(10))
}

export function isValidCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/[^\d]/g, '')
  
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
    return false
  }
  
  // Validação do primeiro dígito verificador
  let sum = 0
  let weight = 5
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnpj.charAt(i)) * weight
    weight = weight === 2 ? 9 : weight - 1
  }
  
  let checkDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (checkDigit !== parseInt(cnpj.charAt(12))) {
    return false
  }
  
  // Validação do segundo dígito verificador
  sum = 0
  weight = 6
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cnpj.charAt(i)) * weight
    weight = weight === 2 ? 9 : weight - 1
  }
  
  checkDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  return checkDigit === parseInt(cnpj.charAt(13))
}

// Utilitários para URLs
export function generateAffiliateLink(affiliateCode: string, productId: string, baseUrl: string): string {
  return `${baseUrl}/p/${productId}?ref=${affiliateCode}`
}

// Utilitários para Decimal do Prisma
export function decimalToNumber(decimal: Decimal): number {
  return decimal.toNumber()
}

export function numberToDecimal(num: number): Decimal {
  return new Decimal(num)
}

// Utilitários para status
export function getNextSaleStatus(currentStatus: string): string | null {
  const statusFlow = {
    LEAD: 'PROPOSAL',
    PROPOSAL: 'CLOSED',
    CLOSED: 'PAID',
    PAID: null,
    CANCELLED: null,
  }
  
  return statusFlow[currentStatus as keyof typeof statusFlow] || null
}

// Utilitários para filtros e busca
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
