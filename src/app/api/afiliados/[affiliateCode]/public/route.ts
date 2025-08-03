import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { affiliateCode: string } }
) {
  try {
    const { affiliateCode } = params;

    const affiliate = await prisma.affiliate.findUnique({
      where: { affiliateCode },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true
          }
        }
      }
    });

    if (!affiliate) {
      return NextResponse.json(
        { error: 'Afiliado não encontrado' }, 
        { status: 404 }
      );
    }

    // Retornar apenas dados públicos
    const publicData = {
      id: affiliate.id,
      name: affiliate.user.name,
      email: affiliate.user.email,
      phone: affiliate.user.phone,
      affiliateCode: affiliate.affiliateCode,
      subscriptionPlan: affiliate.subscriptionPlan
    };

    return NextResponse.json(publicData);

  } catch (error) {
    console.error('Erro ao buscar dados do afiliado:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' }, 
      { status: 500 }
    );
  }
}
