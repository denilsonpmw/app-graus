# Sistema de Afiliação de Energia Solar

[![Next.js](https://img.shields.io/badge/Next.js-15.4.4-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.12.0-2D3748)](https://www.prisma.io/)

Sistema web completo para gerenciamento de programa de afiliação focado em vendas de energia solar. Permite que afiliados se cadastrem em diferentes planos, recebam links únicos de rastreamento, acompanhem suas vendas e ganhem comissões.

## 🌟 Principais Funcionalidades

### Para Afiliados
- **3 Planos de Assinatura**: Light (R$ 387,30), Advanced (R$ 597,30), Premium (R$ 897,30)
- **Comissões Progressivas**: 2%, 3% e 5% respectivamente
- **Links Únicos**: Rastreamento completo de indicações
- **Dashboard Personalizado**: Métricas e gráficos em tempo real
- **Área Exclusiva**: Conteúdo educacional e materiais de marketing
- **Suporte Integrado**: Acesso direto ao grupo de suporte

### Para Administradores
- **Gestão Completa**: Controle total de afiliados e vendas
- **Analytics Avançado**: Relatórios detalhados e insights
- **Gerenciamento de Conteúdo**: Upload de materiais e treinamentos
- **Sistema de Pagamentos**: Automação de comissões
- **Auditoria**: Rastreamento completo de atividades

## 🚀 Tecnologias Utilizadas

### Frontend
- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones modernos
- **Recharts** - Gráficos e visualizações

### Backend & Database
- **Prisma** - ORM moderno
- **PostgreSQL** - Banco de dados relacional
- **NextAuth.js** - Autenticação completa

### Integrações
- **Stripe** - Processamento de pagamentos
- **PagSeguro** - Gateway nacional
- **Mercado Pago** - Pagamentos alternativos
- **WhatsApp API** - Comunicação com afiliados

## 📊 Modelo de Negócio

### Planos de Assinatura Anual

| Plano | Valor | Comissão | Recursos |
|-------|-------|----------|-----------|
| **Light** | R$ 387,30 | 2% | Básico, suporte email, dashboard |
| **Advanced** | R$ 597,30 | 3% | Avançado, suporte prioritário, webinars |
| **Premium** | R$ 897,30 | 5% | Completo, suporte 24/7, consultoria |

### Formas de Pagamento
- **PIX** - À vista com desconto
- **Cartão de Crédito** - Até 12x sem juros

## 🏗️ Arquitetura do Sistema

### Estrutura de Dados
```
Users (Usuários)
├── Affiliates (Afiliados)
│   ├── Subscriptions (Assinaturas)
│   ├── AffiliateLinks (Links de Rastreamento)
│   ├── Sales (Vendas)
│   └── Commissions (Comissões)
├── Products (Produtos)
├── Customers (Clientes)
└── ContentItems (Conteúdo)
```

### Rastreamento de Vendas
1. **Geração de Link**: Cada afiliado recebe links únicos por produto
2. **Tracking de Cliques**: Cookies/LocalStorage persistem por 30-90 dias
3. **Atribuição Last-Click**: Último afiliado antes da conversão
4. **Validação**: Venda confirmada apenas após assinatura de contrato

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js 18+
- PostgreSQL 13+
- npm ou yarn

### Passos de Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/app-graus.git
cd app-graus
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. **Configure o banco de dados**
```bash
npx prisma migrate dev
npx prisma generate
```

5. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

6. **Acesse a aplicação**
```
http://localhost:3000
```

## ⚙️ Configuração do Ambiente

### Variáveis de Ambiente Obrigatórias

```env
# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/app_graus_db"

# NextAuth.js
NEXTAUTH_SECRET="seu_secret_super_seguro"
NEXTAUTH_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."

# PagSeguro
PAGSEGURO_EMAIL="seu_email@exemplo.com"
PAGSEGURO_TOKEN="seu_token"

# MercadoPago
MERCADOPAGO_ACCESS_TOKEN="TEST-..."
```

## 📱 Funcionalidades Principais

### Sistema de Afiliação
- [x] Cadastro de afiliados com validação
- [x] Planos de assinatura com pagamento
- [x] Geração de links únicos
- [x] Rastreamento de cliques e conversões
- [x] Cálculo automático de comissões

### Dashboard e Analytics
- [x] Painel personalizado por afiliado
- [x] Métricas em tempo real
- [x] Gráficos de performance
- [x] Relatórios de vendas
- [x] Histórico de comissões

### Gestão de Conteúdo
- [x] Upload de materiais de marketing
- [x] Vídeos de treinamento
- [x] PDFs e documentos
- [x] Acesso baseado em plano
- [x] Versionamento de conteúdo

### Pagamentos e Comissões
- [x] Integração com múltiplos gateways
- [x] Pagamento recorrente automático
- [x] Cálculo de comissões em tempo real
- [x] Relatórios financeiros
- [x] Controle de inadimplência

## 🔒 Segurança e Compliance

### Medidas de Segurança
- **Autenticação JWT** - Tokens seguros
- **Rate Limiting** - Proteção contra spam
- **Validação CORS** - Controle de origem
- **Sanitização** - Limpeza de inputs
- **HTTPS** - Comunicação criptografada

### Compliance
- **LGPD** - Lei Geral de Proteção de Dados
- **Termos de Uso** - Políticas claras
- **Auditoria** - Log de atividades
- **Backup** - Proteção de dados

## 📈 Roadmap

### Versão 1.0 (Atual)
- [x] Sistema de afiliação básico
- [x] Dashboard de vendas
- [x] Integração de pagamentos
- [x] Área de conteúdo

### Versão 1.1 (Próxima)
- [ ] App mobile
- [ ] Notificações push
- [ ] Gamificação
- [ ] Programa de referência

### Versão 1.2 (Futuro)
- [ ] IA para recomendações
- [ ] Chatbot integrado
- [ ] Multi-idioma
- [ ] API pública

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🆘 Suporte

- **Email**: suporte@app-graus.com.br
- **WhatsApp**: +55 (11) 99999-9999
- **Documentação**: [docs.app-graus.com.br](https://docs.app-graus.com.br)

---

**Desenvolvido com ❤️ para revolucionar o mercado de energia solar no Brasil**
