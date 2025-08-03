import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkAffiliate() {
  try {
    console.log('🔍 Verificando afiliado...')

    // Buscar usuário afiliado
    const user = await prisma.user.findUnique({
      where: { email: 'afiliado@teste.com' },
      include: {
        affiliate: true
      }
    })

    if (!user) {
      console.log('❌ Usuário afiliado não encontrado')
      
      // Listar todos os usuários
      const allUsers = await prisma.user.findMany({
        select: {
          email: true,
          name: true,
          isAdmin: true
        }
      })
      
      console.log('📋 Usuários existentes:')
      allUsers.forEach(u => console.log(`  - ${u.email} (${u.name}) [Admin: ${u.isAdmin}]`))
      
      return
    }

    console.log('✅ Usuário afiliado encontrado:', {
      id: user.id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      isActive: user.isActive
    })

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

checkAffiliate()
