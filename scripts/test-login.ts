import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function testLogin() {
  try {
    console.log('🔍 Testando login...')

    // Buscar usuário admin
    const user = await prisma.user.findUnique({
      where: { email: 'admin@graussolar.com' },
      include: {
        affiliate: true
      }
    })

    if (!user) {
      console.log('❌ Usuário não encontrado')
      return
    }

    console.log('✅ Usuário encontrado:', {
      id: user.id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      isActive: user.isActive
    })

    // Testar senha
    const isPasswordValid = await bcrypt.compare('admin123', user.password)
    console.log('🔐 Senha válida:', isPasswordValid)

    if (user.affiliate) {
      console.log('👤 Dados do afiliado:', {
        affiliateCode: user.affiliate.affiliateCode,
        plan: user.affiliate.subscriptionPlan,
        status: user.affiliate.subscriptionStatus
      })
    }

  } catch (error) {
    console.error('❌ Erro:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testLogin()
