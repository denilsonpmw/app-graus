import { z } from 'zod'

// Validações para Afiliados
export const createAffiliateSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  cpfCnpj: z.string().min(11, 'CPF/CNPJ inválido'),
  subscriptionPlan: z.enum(['LIGHT', 'ADVANCED', 'PREMIUM']),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  bankAccount: z.string().optional(),
  bankCode: z.string().optional(),
  bankAgency: z.string().optional(),
  pixKey: z.string().optional(),
})

export const updateAffiliateSchema = createAffiliateSchema.partial()

// Validações para Produtos
export const createProductSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  description: z.string().optional(),
  price: z.number().positive('Preço deve ser positivo'),
  category: z.string().optional(),
  imageUrl: z.string().optional(),
})

export const updateProductSchema = createProductSchema.partial()

// Validações para Vendas
export const createSaleSchema = z.object({
  customerId: z.string().cuid(),
  productId: z.string().cuid(),
  affiliateId: z.string().cuid(),
  affiliateLinkId: z.string().cuid().optional(),
  amount: z.number().positive('Valor deve ser positivo'),
  status: z.enum(['LEAD', 'PROPOSAL', 'CLOSED', 'PAID', 'CANCELLED']).optional(),
  notes: z.string().optional(),
})

// Validações para Clientes
export const createCustomerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  cpfCnpj: z.string().optional(),
  address: z.object({
    street: z.string(),
    number: z.string(),
    complement: z.string().optional(),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
  }).optional(),
})

// Validações para Links de Afiliado
export const createAffiliateLinkSchema = z.object({
  productId: z.string().cuid().optional(),
  customSlug: z.string().optional(),
  campaignName: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  expiresAt: z.date().optional(),
})

// Validações para Login
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
})

// Validações para Filtros
export const affiliateFiltersSchema = z.object({
  search: z.string().optional(),
  status: z.enum(['PENDING', 'ACTIVE', 'EXPIRED', 'CANCELLED']).optional(),
  plan: z.enum(['LIGHT', 'ADVANCED', 'PREMIUM']).optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
})

export const salesFiltersSchema = z.object({
  search: z.string().optional(),
  status: z.enum(['LEAD', 'PROPOSAL', 'CLOSED', 'PAID', 'CANCELLED']).optional(),
  affiliateId: z.string().cuid().optional(),
  productId: z.string().cuid().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
})

export const productFiltersSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  priceMin: z.number().positive().optional(),
  priceMax: z.number().positive().optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
})

export type CreateAffiliateData = z.infer<typeof createAffiliateSchema>
export type UpdateAffiliateData = z.infer<typeof updateAffiliateSchema>
export type CreateProductData = z.infer<typeof createProductSchema>
export type CreateSaleData = z.infer<typeof createSaleSchema>
export type CreateCustomerData = z.infer<typeof createCustomerSchema>
export type CreateAffiliateLinkData = z.infer<typeof createAffiliateLinkSchema>
export type LoginData = z.infer<typeof loginSchema>
export type AffiliateFilters = z.infer<typeof affiliateFiltersSchema>
export type SalesFilters = z.infer<typeof salesFiltersSchema>
export type ProductFilters = z.infer<typeof productFiltersSchema>
