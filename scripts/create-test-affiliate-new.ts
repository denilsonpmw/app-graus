import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { nanoid } from 'nanoid'

const prisma = new PrismaClient()

async function createTestAffiliate() {
  try {
    // Hash da senha
    const hashedPassword = await bcrypt.hash('123456', 12)
    
    // Gerar código único para o afiliado
    const affiliateCode = nanoid(10)

    // Criar usuário + afiliado em transação
    const result = await prisma.$transaction(async (tx: any) => {
      // Criar usuário
      const user = await tx.user.create({
        data: {
          email: 'afiliado.teste@graussolar.com',
          name: 'Maria Silva Afiliada',
          password: hashedPassword,
          phone: '11987654321',
          cpfCnpj: '98765432100', // CPF diferente
          role: 'AFFILIATE',
          isActive: true,
          isAdmin: false
        }
      })

      // Criar perfil de afiliado
      const affiliate = await tx.affiliate.create({
        data: {
          userId: user.id,
          affiliateCode: affiliateCode,
          subscriptionPlan: 'ADVANCED',
          subscriptionStatus: 'ACTIVE',
          subscriptionDate: new Date(),
          subscriptionExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 ano
          joinedGroupSupport: true
        }
      })

      return { user, affiliate }
    })

    console.log('✅ Afiliado de teste criado:', {
      id: result.user.id,
      email: result.user.email,
      name: result.user.name,
      isAdmin: result.user.isAdmin,
      affiliateCode: result.affiliate.affiliateCode,
      plan: result.affiliate.subscriptionPlan,
      status: result.affiliate.subscriptionStatus
    })

    console.log('\n🔐 Credenciais de teste:')
    console.log('Email: afiliado.teste@graussolar.com')
    console.log('Senha: 123456')

  } catch (error: any) {
    if (error.code === 'P2002') {
      console.log('⚠️ Afiliado de teste já existe')
      console.log('\n🔐 Credenciais de teste:')
      console.log('Email: afiliado.teste@graussolar.com')
      console.log('Senha: 123456')
    } else {
      console.error('❌ Erro ao criar afiliado:', error)
    }
  } finally {
    await prisma.$disconnect()
  }
}

createTestAffiliate()
