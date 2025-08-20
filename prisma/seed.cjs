const { PrismaClient, SubscriptionPlan, SubscriptionStatus, SaleStatus, PaymentStatus } = require('@prisma/client');
// Implementações locais para evitar import de arquivos TypeScript no ambiente CJS puro
const bcrypt = require('bcryptjs');
const { nanoid } = require('nanoid');

async function hashPassword(password) { return bcrypt.hash(password, 12); }
function generateAffiliateCode() { return `GS${nanoid(6).toUpperCase()}`; }
function getPlanPrice(plan) {
  const prices = { LIGHT: 387.30, ADVANCED: 597.30, PREMIUM: 897.30 };
  return prices[plan];
}
function addYears(date, years) { const d = new Date(date); d.setFullYear(d.getFullYear() + years); return d; }

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seed JS iniciado...');
  await prisma.commission.deleteMany();
  await prisma.sale.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.linkClick.deleteMany();
  await prisma.affiliateLink.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.affiliate.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();
  await prisma.contentItem.deleteMany();

  const adminPassword = await hashPassword('admin123');
  await prisma.user.create({
    data: { name: 'Administrador', email: 'admin@graussolar.com.br', password: adminPassword, role: 'ADMIN', isActive: true, isAdmin: true }
  });

  const products = await Promise.all([
    prisma.product.create({ data: { name: 'Kit Solar Residencial 5kWp', description: 'Kit completo', price: 18500.00, category: 'Residencial', isActive: true } }),
    prisma.product.create({ data: { name: 'Kit Solar Comercial 10kWp', description: 'Solução ideal', price: 32000.00, category: 'Comercial', isActive: true } }),
    prisma.product.create({ data: { name: 'Kit Solar Rural 15kWp', description: 'Sistema robusto', price: 45000.00, category: 'Rural', isActive: true } })
  ]);

  const affiliatesData = [SubscriptionPlan.PREMIUM, SubscriptionPlan.ADVANCED, SubscriptionPlan.LIGHT];
  const affiliates = [];
  for (const plan of affiliatesData) {
    const password = await hashPassword('123456');
    const affiliateCode = generateAffiliateCode();
    const subscriptionDate = new Date();
    const subscriptionExpiry = addYears(subscriptionDate, 1);
    const user = await prisma.user.create({ data: { name: `Afiliado ${plan}`, email: `afiliado_${plan.toLowerCase()}@test.com`, password, role: 'AFFILIATE', isActive: true } });
    const affiliate = await prisma.affiliate.create({ data: { userId: user.id, affiliateCode, subscriptionPlan: plan, subscriptionStatus: SubscriptionStatus.ACTIVE, subscriptionDate, subscriptionExpiry } });
    await prisma.subscription.create({ data: { affiliateId: affiliate.id, plan, status: SubscriptionStatus.ACTIVE, amount: getPlanPrice(plan), paymentMethod: 'PIX', startDate: subscriptionDate, endDate: subscriptionExpiry } });
    affiliates.push(affiliate);
    // Link primário (sem produto específico)
    await prisma.affiliateLink.create({ data: { affiliateId: affiliate.id, isPrimary: true, customSlug: `${affiliate.affiliateCode.toLowerCase()}-main` } });
    // Links por produto com sufixo aleatório para evitar colisões
    for (const p of products) {
      const suffix = nanoid(4).toLowerCase();
      await prisma.affiliateLink.create({ data: { affiliateId: affiliate.id, productId: p.id, customSlug: `${affiliate.affiliateCode.toLowerCase()}-${suffix}` } });
    }
  }

  // Criar alguns clientes
  const customers = [];
  for (let c = 0; c < 3; c++) {
    customers.push(await prisma.customer.create({ data: { name: `Cliente ${c}`, email: `cliente${c}@test.com` } }));
  }
  for (let i = 0; i < 5; i++) {
    const affiliate = affiliates[Math.floor(Math.random() * affiliates.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const commissionRate = affiliate.subscriptionPlan === SubscriptionPlan.PREMIUM ? 5 : affiliate.subscriptionPlan === SubscriptionPlan.ADVANCED ? 3 : 2;
    const priceNumber = typeof product.price === 'number' ? product.price : (product.price?.toNumber ? product.price.toNumber() : Number(product.price));
    const commissionAmount = priceNumber * commissionRate / 100;
    const sale = await prisma.sale.create({ data: { customerId: customer.id, productId: product.id, affiliateId: affiliate.id, amount: product.price, status: SaleStatus.PAID, commissionRate, commissionAmount, contractSigned: true } });
    await prisma.commission.create({ data: { saleId: sale.id, affiliateId: affiliate.id, amount: commissionAmount, status: PaymentStatus.PAID, paymentDate: new Date() } });
  }

  console.log('✅ Seed JS finalizado.');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
