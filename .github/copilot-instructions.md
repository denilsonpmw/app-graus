# Copilot Instructions - Sistema de Afiliação Energia Solar

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Contexto do Projeto

Este é um sistema web de afiliação para vendas de energia solar (kits de instalação e outros produtos). O sistema gerencia:

- **Planos de Assinatura**: Light (R$ 387,30), Advanced (R$ 597,30), Premium (R$ 897,30)
- **Comissões**: 2%, 3% e 5% respectivamente
- **Pagamentos**: À vista (Pix) ou cartão (até 12x)
- **Rastreamento**: Links únicos por afiliado + produto
- **Dashboard**: Métricas e gráficos de vendas
- **Área Exclusiva**: Conteúdo educacional e suporte

## Stack Tecnológica

- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **Backend**: Node.js/Express (APIs REST)
- **Banco**: PostgreSQL/MongoDB (a definir)
- **Pagamentos**: Stripe, PagSeguro, Mercado Pago
- **Autenticação**: NextAuth.js ou similar
- **Analytics**: Chart.js/Recharts para dashboards

## Estrutura de Dados Principais

### Usuários
- Tipos: Admin (loja), Afiliado
- Dados: nome, email, telefone, CPF/CNPJ, plano, status

### Afiliados
- ID único para links
- Plano de assinatura
- Comissões acumuladas
- Status de pagamento

### Vendas
- Cliente final
- Produto vendido
- Valor da venda
- Afiliado responsável
- Status (lead, proposta, fechada, paga)

### Links de Rastreamento
- affiliate_id + product_id
- Cookies/LocalStorage para persistência
- Validade configurável (30-90 dias)

## Regras de Negócio

1. **Comissão válida apenas após venda efetivada**
2. **Atribuição last-click** para múltiplos afiliados
3. **Prevenção de auto-indicações**
4. **Acesso obrigatório ao grupo de suporte** após cadastro
5. **Renovação anual automática** das assinaturas

## Padrões de Código

- Use TypeScript estrito
- Componentes funcionais com hooks
- Design responsivo (mobile-first)
- Validação de dados (Zod/Yup)
- Error boundaries
- Loading states
- SEO otimizado

## Segurança

- Autenticação JWT
- Rate limiting nas APIs
- Validação CORS
- Sanitização de inputs
- HTTPS obrigatório
- Compliance LGPD

## UX/UI

- Interface intuitiva e profissional
- Cores relacionadas à energia solar (verde, azul, dourado)
- Dashboards interativos
- Notificações em tempo real
- Processo de onboarding guiado
