import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createAffiliatePrimaryLinks() {
  try {
    console.log('🔍 Buscando afiliados sem links primários...');

    // Buscar todos os afiliados
    const affiliates = await prisma.affiliate.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        affiliateLinks: true
      }
    });

    console.log(`📋 Encontrados ${affiliates.length} afiliados`);

    for (const affiliate of affiliates) {
      // Verificar se já tem link primário
      const primaryLink = affiliate.affiliateLinks.find((link: any) => link.isPrimary);

      if (!primaryLink) {
        console.log(`➕ Criando link primário para ${affiliate.user.name} (${affiliate.affiliateCode})`);

        await prisma.affiliateLink.create({
          data: {
            affiliateId: affiliate.id,
            isPrimary: true,
            campaignName: 'Link Principal',
            isActive: true
          }
        });

        console.log(`✅ Link primário criado para ${affiliate.user.name}`);
      } else {
        console.log(`⏭️  ${affiliate.user.name} já possui link primário`);
      }
    }

    console.log('🎉 Processo concluído!');
  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAffiliatePrimaryLinks();
