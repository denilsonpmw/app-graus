import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function POST(request: NextRequest) {
  try {
    // Validar se o corpo da requisição é um JSON válido
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Formato de dados inválido' }, 
        { status: 400 }
      );
    }

    const { 
      affiliateCode, 
      customSlug, 
      source,
      userAgent,
      referer,
      utmSource,
      utmMedium,
      utmCampaign 
    } = body;

    // Validar dados obrigatórios
    if (!affiliateCode) {
      return NextResponse.json(
        { error: 'Código do afiliado é obrigatório' }, 
        { status: 400 }
      );
    }

    // Buscar o afiliado pelo código
    const affiliate = await prisma.affiliate.findUnique({
      where: { 
        affiliateCode,
        subscriptionStatus: 'ACTIVE' // Só permite rastreamento de afiliados ativos
      }
    });

    if (!affiliate) {
      return NextResponse.json(
        { error: 'Afiliado não encontrado ou inativo' }, 
        { status: 404 }
      );
    }

    // Buscar ou criar o link
    let affiliateLink = await prisma.affiliateLink.findFirst({
      where: {
        affiliateId: affiliate.id,
        customSlug: customSlug || null
      }
    });

    if (!affiliateLink) {
      // Criar o link se não existir
      affiliateLink = await prisma.affiliateLink.create({
        data: {
          affiliateId: affiliate.id,
          customSlug: customSlug || null,
          isPrimary: !customSlug, // Link principal se não tem slug customizado
          utmSource,
          utmMedium,
          utmCampaign,
          campaignName: customSlug ? `Campanha ${customSlug}` : 'Link Principal'
        }
      });
    }

    // Obter IP do cliente de forma correta
    const getClientIP = (request: NextRequest): string => {
      const forwarded = request.headers.get('x-forwarded-for');
      const realIP = request.headers.get('x-real-ip');
      const cfConnectingIP = request.headers.get('cf-connecting-ip');
      
      if (forwarded) {
        return forwarded.split(',')[0].trim();
      }
      if (realIP) {
        return realIP;
      }
      if (cfConnectingIP) {
        return cfConnectingIP;
      }
      return 'unknown';
    };

    // Verificar se não é um clique duplicado recente (mesmo IP nos últimos 5 minutos)
    const recentClick = await prisma.linkClick.findFirst({
      where: {
        affiliateId: affiliate.id,
        ipAddress: getClientIP(request),
        createdAt: {
          gte: new Date(Date.now() - 5 * 60 * 1000) // 5 minutos atrás
        }
      }
    });

    if (recentClick) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Clique já registrado recentemente',
          clickId: recentClick.id,
          linkId: recentClick.linkId
        }
      );
    }

    // Registrar o clique
    const click = await prisma.linkClick.create({
      data: {
        linkId: affiliateLink.id,
        affiliateId: affiliate.id,
        ipAddress: getClientIP(request),
        userAgent: userAgent || request.headers.get('user-agent') || '',
        referer: referer || request.headers.get('referer') || '',
        utmSource,
        utmMedium,
        utmCampaign,
        sessionId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      }
    });

    // Atualizar contador de cliques
    await prisma.affiliateLink.update({
      where: { id: affiliateLink.id },
      data: {
        clicksCount: {
          increment: 1
        }
      }
    });

    return NextResponse.json({ 
      success: true, 
      clickId: click.id,
      linkId: affiliateLink.id
    });

  } catch (error) {
    console.error('Erro ao registrar clique:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' }, 
      { status: 500 }
    );
  }
}
