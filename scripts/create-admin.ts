import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createAdmin() {
  try {
    // Hash da senha
    const hashedPassword = await bcrypt.hash('admin123', 12)

    // Criar usuário admin
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@graussolar.com',
        name: 'Administrador',
        password: hashedPassword,
        role: 'ADMIN',
        isAdmin: true,
        isActive: true
      }
    })

    console.log('✅ Usuário administrador criado:', {
      id: adminUser.id,
      email: adminUser.email,
      name: adminUser.name,
      isAdmin: adminUser.isAdmin
    })

  } catch (error) {
    if (error.code === 'P2002') {
      console.log('⚠️ Usuário admin já existe')
    } else {
      console.error('❌ Erro ao criar admin:', error)
    }
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()
