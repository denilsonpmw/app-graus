import { z } from 'zod'

// Schema para login
export const loginSchema = z.object({
  email: z.string()
    .email('Email inválido')
    .min(1, 'Email é obrigatório'),
  password: z.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .max(50, 'Senha muito longa')
})

// Schema para registro de afiliado
export const registerSchema = z.object({
  name: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome muito longo'),
  email: z.string()
    .email('Email inválido')
    .min(1, 'Email é obrigatório'),
  password: z.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .max(50, 'Senha muito longa'),
  confirmPassword: z.string(),
  phone: z.string()
    .min(10, 'Telefone inválido')
    .max(15, 'Telefone muito longo'),
  cpf: z.string()
    .min(11, 'CPF deve ter 11 dígitos')
    .max(14, 'CPF inválido'),
  plan: z.enum(['LIGHT', 'ADVANCED', 'PREMIUM'], {
    message: 'Selecione um plano válido'
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
})

// Schema para redefinição de senha
export const resetPasswordSchema = z.object({
  email: z.string()
    .email('Email inválido')
    .min(1, 'Email é obrigatório')
})

export const newPasswordSchema = z.object({
  password: z.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .max(50, 'Senha muito longa'),
  confirmPassword: z.string(),
  token: z.string().min(1, 'Token inválido')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
})

// Tipos derivados dos schemas
export type LoginData = z.infer<typeof loginSchema>
export type RegisterData = z.infer<typeof registerSchema>
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>
export type NewPasswordData = z.infer<typeof newPasswordSchema>
