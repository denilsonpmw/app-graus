import { PrismaClient, SubscriptionPlan, SubscriptionStatus, SaleStatus, PaymentStatus } from '@prisma/client'
import { hashPassword, generateAffiliateCode } from '../src/lib/utils/server-helpers'
import { getPlanPrice, addYears } from '../src/lib/utils/helpers'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Limpar dados existentes
  await prisma.commission.deleteMany()
  await prisma.sale.deleteMany()
  await prisma.customer.deleteMany()
  await prisma.linkClick.deleteMany()
  await prisma.affiliateLink.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.subscription.deleteMany()
  await prisma.affiliate.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()
  await prisma.product.deleteMany()
  await prisma.contentItem.deleteMany()

  console.log('🗑️  Dados antigos removidos')

  // Criar usuário admin
  const adminPassword = await hashPassword('admin123')
  const admin = await prisma.user.create({
    data: {
      name: 'Administrador',
      email: 'admin@graussolar.com.br',
      password: adminPassword,
  role: 'ADMIN',
      phone: '(11) 99999-9999',
      isActive: true,
      isAdmin: true,
    }
  })

  console.log('👤 Usuário admin criado')

  // Criar produtos
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Kit Solar Residencial 5kWp',
        description: 'Kit completo para residências com consumo médio de 600-800 kWh/mês',
        price: 18500.00,
        category: 'Residencial',
        imageUrl: '/produtos/kit-5kwp.jpg',
        isActive: true,
      }
    }),
    prisma.product.create({
      data: {
        name: 'Kit Solar Comercial 10kWp',
        description: 'Solução ideal para pequenos comércios e escritórios',
        price: 32000.00,
        category: 'Comercial',
        imageUrl: '/produtos/kit-10kwp.jpg',
        isActive: true,
      }
    }),
    prisma.product.create({
      data: {
        name: 'Kit Solar Rural 15kWp',
        description: 'Sistema robusto para propriedades rurais e agronegócio',
        price: 45000.00,
        category: 'Rural',
        imageUrl: '/produtos/kit-15kwp.jpg',
        isActive: true,
      }
    }),
    prisma.product.create({
      data: {
        name: 'Painel Solar 540W Monocristalino',
        description: 'Painel de alta eficiência para projetos customizados',
        price: 890.00,
        category: 'Componentes',
        imageUrl: '/produtos/painel-540w.jpg',
        isActive: true,
      }
    }),
  ])

  console.log('📦 Produtos criados')

  // Criar afiliados de teste
  const affiliatesData = [
    {
      name: 'Maria Silva Afiliada',
      email: 'maria.silva@graussolar.com.br',
      phone: '(11) 99999-1234',
      cpfCnpj: '12345678900',
  plan: SubscriptionPlan.PREMIUM,
    },
    {
      name: 'João Silva',
      email: 'joao.silva@email.com',
      phone: '(11) 99999-9999',
      cpfCnpj: '12345678901',
  plan: SubscriptionPlan.PREMIUM,
    },
    {
      name: 'Ana Costa',
      email: 'ana.costa@email.com',
      phone: '(21) 98888-8888',
      cpfCnpj: '12345678902',
  plan: SubscriptionPlan.ADVANCED,
    },
    {
      name: 'Pedro Oliveira',
      email: 'pedro.oliveira@email.com',
      phone: '(31) 97777-7777',
      cpfCnpj: '12345678903',
  plan: SubscriptionPlan.PREMIUM,
    },
    {
      name: 'Carlos Lima',
      email: 'carlos.lima@email.com',
      phone: '(41) 96666-6666',
      cpfCnpj: '12345678904',
  plan: SubscriptionPlan.LIGHT,
    },
    {
      name: 'Fernanda Santos',
      email: 'fernanda.santos@email.com',
      phone: '(51) 95555-5555',
      cpfCnpj: '12345678905',
  plan: SubscriptionPlan.ADVANCED,
    },
  ]

  // Tipar explicitamente para evitar inferência 'never'
  const affiliates: Awaited<ReturnType<typeof prisma.affiliate.create>>[] = []
  for (const affiliateData of affiliatesData) {
    const password = await hashPassword('123456')
    const affiliateCode = generateAffiliateCode()
    const subscriptionDate = new Date()
    const subscriptionExpiry = addYears(subscriptionDate, 1)

    const user = await prisma.user.create({
      data: {
        name: affiliateData.name,
        email: affiliateData.email,
        phone: affiliateData.phone,
        cpfCnpj: affiliateData.cpfCnpj,
        password,
  role: 'AFFILIATE',
        isActive: true,
      }
    })

    const affiliate = await prisma.affiliate.create({
      data: {
        userId: user.id,
        affiliateCode,
  subscriptionPlan: affiliateData.plan,
  subscriptionStatus: SubscriptionStatus.ACTIVE,
        subscriptionDate,
        subscriptionExpiry,
        bankAccount: '12345-6',
        bankCode: '001',
        bankAgency: '1234',
        pixKey: affiliateData.email,
      }
    })

    // Criar assinatura
    await prisma.subscription.create({
      data: {
        affiliateId: affiliate.id,
  plan: affiliateData.plan,
  status: SubscriptionStatus.ACTIVE,
        amount: getPlanPrice(affiliateData.plan),
        paymentMethod: 'PIX',
        startDate: subscriptionDate,
        endDate: subscriptionExpiry,
      }
    })

    affiliates.push(affiliate)
  }

  console.log('👥 Afiliados criados')

  // Criar clientes
  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        name: 'Maria Silva',
        email: 'maria.silva@email.com',
        phone: '(11) 99999-9999',
        cpfCnpj: '98765432101',
        address: {
          street: 'Rua das Flores',
          number: '123',
          neighborhood: 'Centro',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01234-567',
        }
      }
    }),
    prisma.customer.create({
      data: {
        name: 'Roberto Costa',
        email: 'roberto.costa@email.com',
        phone: '(21) 98888-8888',
        cpfCnpj: '98765432102',
        address: {
          street: 'Av. Principal',
          number: '456',
          neighborhood: 'Copacabana',
          city: 'Rio de Janeiro',
          state: 'RJ',
          zipCode: '22070-000',
        }
      }
    }),
  ])

  console.log('👤 Clientes criados')

  // Criar vendas de exemplo
  const sales: Awaited<ReturnType<typeof prisma.sale.create>>[] = []
  for (let i = 0; i < 10; i++) {
    const affiliate = affiliates[Math.floor(Math.random() * affiliates.length)]
    const product = products[Math.floor(Math.random() * products.length)]
    const customer = customers[Math.floor(Math.random() * customers.length)]
    
  const commissionRate = affiliate.subscriptionPlan === SubscriptionPlan.PREMIUM ? 5 : 
              affiliate.subscriptionPlan === SubscriptionPlan.ADVANCED ? 3 : 2
    const commissionAmount = (product.price.toNumber() * commissionRate) / 100

    const sale = await prisma.sale.create({
      data: {
        customerId: customer.id,
        productId: product.id,
        affiliateId: affiliate.id,
        amount: product.price,
  status: Math.random() > 0.3 ? SaleStatus.PAID : SaleStatus.CLOSED,
        commissionRate,
        commissionAmount,
        contractSigned: true,
        notes: 'Venda de exemplo criada no seed',
      }
    })

    // Criar comissão
    await prisma.commission.create({
      data: {
        saleId: sale.id,
        affiliateId: affiliate.id,
        amount: commissionAmount,
  status: sale.status === SaleStatus.PAID ? PaymentStatus.PAID : PaymentStatus.PENDING,
  paymentDate: sale.status === SaleStatus.PAID ? new Date() : null,
      }
    })

    sales.push(sale)
  }

  console.log('💰 Vendas e comissões criadas')

  // Criar conteúdo da área exclusiva
  await Promise.all([
    prisma.contentItem.create({
      data: {
        title: 'Treinamento: Como Vender Energia Solar',
        description: 'Curso completo sobre vendas de energia solar',
        type: 'VIDEO',
        url: '/content/video1.mp4',
        category: 'TRAINING',
        planAccess: JSON.stringify(['LIGHT', 'ADVANCED', 'PREMIUM']),
        isActive: true,
        order: 1,
      }
    }),
    prisma.contentItem.create({
      data: {
        title: 'Material: Apresentação Comercial',
        description: 'Slides para apresentação aos clientes',
        type: 'PDF',
        url: '/content/apresentacao.pdf',
        category: 'MARKETING',
        planAccess: JSON.stringify(['ADVANCED', 'PREMIUM']),
        isActive: true,
        order: 2,
      }
    }),
    prisma.contentItem.create({
      data: {
        title: 'Calculadora de Economia Solar',
        description: 'Ferramenta para calcular economia dos clientes',
        type: 'TOOL',
        url: '/content/calculadora',
        category: 'MARKETING',
        planAccess: JSON.stringify(['PREMIUM']),
        isActive: true,
        order: 3,
      }
    }),
  ])

  console.log('📚 Conteúdo da área exclusiva criado')

  console.log('✅ Seed concluído com sucesso!')
  console.log(`
📊 Resumo:
- 1 Admin criado (admin@graussolar.com.br / admin123)
- ${affiliates.length} Afiliados criados (senha: 123456)
- ${products.length} Produtos criados
- ${customers.length} Clientes criados
- ${sales.length} Vendas criadas
- 3 Itens de conteúdo criados
  `)
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
