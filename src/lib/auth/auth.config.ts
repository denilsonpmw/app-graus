import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/db/prisma"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          console.log('🔍 Tentativa de login:', credentials?.email)
          
          // Validar credenciais com Zod
          const { email, password } = loginSchema.parse(credentials)

          console.log('✅ Credenciais validadas')

          // Buscar usuário no banco
          const user = await prisma.user.findUnique({
            where: { email },
            include: {
              affiliate: true
            }
          })

          if (!user) {
            console.log('❌ Usuário não encontrado:', email)
            return null
          }

          console.log('✅ Usuário encontrado:', user.email)

          // Verificar se a conta está ativa
          if (!user.isActive) {
            console.log('❌ Conta inativa')
            throw new Error('Conta inativa. Entre em contato com o suporte.')
          }

          // Verificar senha
          const isPasswordValid = await bcrypt.compare(password, user.password)
          console.log('🔐 Senha válida:', isPasswordValid)
          
          if (!isPasswordValid) {
            console.log('❌ Senha incorreta')
            return null
          }

          console.log('✅ Login autorizado para:', user.email, 'isAdmin:', user.isAdmin)

          // Retornar dados do usuário para a sessão
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            plan: user.affiliate?.subscriptionPlan || 'LIGHT',
            affiliateCode: user.affiliate?.affiliateCode,
            isAdmin: user.isAdmin || false
          }

        } catch (error) {
          console.error('❌ Erro na autenticação:', error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.plan = user.plan
        token.affiliateCode = user.affiliateCode
        token.isAdmin = user.isAdmin
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.plan = token.plan as string
        session.user.affiliateCode = token.affiliateCode as string
        session.user.isAdmin = token.isAdmin as boolean
      }
      return session
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  }
}
