// Utilitários para cálculos (sem dependências do servidor)
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

export function isDateExpired(date: Date): boolean {
  return new Date() > date
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

export function formatDateTime(date: Date): string {
  return date.toLocaleString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

// Utilitários para formatação
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount)
}

export function formatPercentage(rate: number): string {
  return `${rate}%`
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim()
}

// Utilitários para validação
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/
  return phoneRegex.test(phone)
}

export function validateCPF(cpf: string): boolean {
  const cleanCPF = cpf.replace(/[^\d]/g, '')
  
  if (cleanCPF.length !== 11) return false
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false
  
  // Validação do algoritmo do CPF
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF[i]) * (10 - i)
  }
  let remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleanCPF[9])) return false
  
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF[i]) * (11 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleanCPF[10])) return false
  
  return true
}

export function maskCPF(cpf: string): string {
  const cleanCPF = cpf.replace(/[^\d]/g, '')
  return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

export function maskPhone(phone: string): string {
  const cleanPhone = phone.replace(/[^\d]/g, '')
  if (cleanPhone.length === 11) {
    return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  } else if (cleanPhone.length === 10) {
    return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }
  return phone
}

// Utilitários para URL
export function getBaseURL(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  
  return process.env.NEXTAUTH_URL || 'http://localhost:3000'
}

export function createAffiliateLink(affiliateCode: string, productSlug?: string): string {
  const baseUrl = getBaseURL()
  if (productSlug) {
    return `${baseUrl}/ref/${affiliateCode}/${productSlug}`
  }
  return `${baseUrl}/ref/${affiliateCode}`
}

// Utilitários para status
export function getStatusColor(status: string): string {
  const colors = {
    ATIVO: 'text-green-600 bg-green-100',
    INATIVO: 'text-red-600 bg-red-100',
    PENDENTE: 'text-yellow-600 bg-yellow-100',
    APROVADO: 'text-green-600 bg-green-100',
    REJEITADO: 'text-red-600 bg-red-100',
    PAGO: 'text-green-600 bg-green-100',
    AGUARDANDO: 'text-yellow-600 bg-yellow-100',
  }
  return colors[status as keyof typeof colors] || 'text-gray-600 bg-gray-100'
}

export function getStatusText(status: string): string {
  const texts = {
    ATIVO: 'Ativo',
    INATIVO: 'Inativo',
    PENDENTE: 'Pendente',
    APROVADO: 'Aprovado',
    REJEITADO: 'Rejeitado',
    PAGO: 'Pago',
    AGUARDANDO: 'Aguardando',
  }
  return texts[status as keyof typeof texts] || status
}

// Utilitários para array
export function paginate<T>(array: T[], page: number, limit: number): T[] {
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  return array.slice(startIndex, endIndex)
}

export function getTotalPages(totalItems: number, itemsPerPage: number): number {
  return Math.ceil(totalItems / itemsPerPage)
}
