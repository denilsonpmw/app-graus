import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value / 100)
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('pt-BR').format(d)
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(d)
}

export function generateAffiliateCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function generateLinkCode(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function validateCPF(cpf: string): boolean {
  // Remove formatação
  cpf = cpf.replace(/[^\d]/g, '')
  
  if (cpf.length !== 11) return false
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cpf)) return false
  
  // Validação do primeiro dígito verificador
  let soma = 0
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf[i]) * (10 - i)
  }
  let resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(cpf[9])) return false
  
  // Validação do segundo dígito verificador
  soma = 0
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf[i]) * (11 - i)
  }
  resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(cpf[10])) return false
  
  return true
}

export function validateCNPJ(cnpj: string): boolean {
  // Remove formatação
  cnpj = cnpj.replace(/[^\d]/g, '')
  
  if (cnpj.length !== 14) return false
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{13}$/.test(cnpj)) return false
  
  // Validação dos dígitos verificadores
  const calcularDigito = (cnpj: string, posicoes: number[]) => {
    let soma = 0
    for (let i = 0; i < posicoes.length; i++) {
      soma += parseInt(cnpj[i]) * posicoes[i]
    }
    const resto = soma % 11
    return resto < 2 ? 0 : 11 - resto
  }
  
  const posicoes1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const posicoes2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  
  const digito1 = calcularDigito(cnpj, posicoes1)
  const digito2 = calcularDigito(cnpj, posicoes2)
  
  return digito1 === parseInt(cnpj[12]) && digito2 === parseInt(cnpj[13])
}

export function getCommissionRate(plan: string): number {
  switch (plan) {
    case 'LIGHT': return 2
    case 'ADVANCED': return 3
    case 'PREMIUM': return 5
    default: return 0
  }
}

export function getPlanPrice(plan: string): number {
  switch (plan) {
    case 'LIGHT': return 387.30
    case 'ADVANCED': return 597.30
    case 'PREMIUM': return 897.30
    default: return 0
  }
}

export function getPlanName(plan: string): string {
  switch (plan) {
    case 'LIGHT': return 'Light'
    case 'ADVANCED': return 'Advanced'
    case 'PREMIUM': return 'Premium'
    default: return 'Desconhecido'
  }
}
