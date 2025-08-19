# 🐘 PostgreSQL + Prisma no Railway - Guia Completo

## 📋 Pré-requisitos
- Projeto Next.js com Prisma configurado
- Conta no Railway
- Repositório no GitHub

## 🚀 Passo a Passo Completo

### 1. **Configuração Local (Desenvolvimento)**

```bash
# Instalar dependências
npm install

# Setup inicial do banco
npm run db:setup

# Executar em desenvolvimento (SQLite local)
npm run dev
```

### 2. **Deploy no Railway**

#### 2.1 Criar Projeto no Railway
1. Acesse [railway.app](https://railway.app)
2. Login com GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Selecione seu repositório

#### 2.2 Adicionar PostgreSQL Plugin
1. No dashboard do projeto, clique em **"+ Add Plugin"**
2. Selecione **"PostgreSQL"**
3. O Railway criará automaticamente:
   - Banco PostgreSQL
   - Variável `DATABASE_URL`
   - Credenciais seguras

#### 2.3 Configurar Variáveis de Ambiente
No Railway Dashboard → **Variables**, adicione:

```bash
# Gerada automaticamente pelo plugin PostgreSQL
DATABASE_URL=postgresql://postgres:senha@postgres.railway.internal:5432/railway

# Configurações da aplicação
NEXTAUTH_URL=https://seu-app.railway.app
NEXTAUTH_SECRET=seu-secret-super-forte-aqui
NODE_ENV=production

# Outras variáveis conforme necessário...
```

### 3. **Configuração Automática**

O Railway executará automaticamente:
1. **`npm install`** - Instalar dependências
2. **`npx prisma generate`** (via postinstall) - Gerar cliente
3. **`npm run build`** - Build da aplicação
4. **`npm start`** - Iniciar servidor

### 4. **Migrations e Schema**

#### Aplicar Migrations em Produção:
```bash
# Método 1: Deploy automático (recomendado)
# As migrations são aplicadas automaticamente no postinstall

# Método 2: Manual via Railway CLI
railway run npx prisma migrate deploy

# Método 3: Forçar sincronização do schema
railway run npx prisma db push
```

## 🔧 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run db:setup` | Setup inicial local |
| `npm run db:deploy` | Deploy de produção |
| `npm run db:push` | Sincronizar schema |
| `npm run db:migrate` | Aplicar migrations |
| `npm run db:studio` | Abrir Prisma Studio |
| `npm run db:reset` | Reset do banco (dev) |

## 🛠️ Troubleshooting

### Erro: "Cannot connect to database"
```bash
# Verifique se DATABASE_URL está correta
echo $DATABASE_URL

# Teste a conexão
railway run npx prisma db push
```

### Erro: "Migration failed"
```bash
# Reset e reaplicar migrations
railway run npx prisma migrate reset
railway run npx prisma migrate deploy
```

### Erro: "Prisma Client not generated"
```bash
# Regenerar cliente
railway run npx prisma generate
```

## 🌐 URLs e Acesso

### Desenvolvimento Local:
- App: http://localhost:3000
- Prisma Studio: http://localhost:5555

### Produção Railway:
- App: https://seu-app.railway.app
- Logs: Railway Dashboard → Deployments
- Banco: Railway Dashboard → PostgreSQL Plugin

## 📊 Monitoramento

### Logs do Banco:
```bash
# Via Railway CLI
railway logs --service postgresql

# Logs da aplicação
railway logs
```

### Performance:
- Railway Dashboard → Metrics
- PostgreSQL Usage
- Connection Pool Status

## 🔐 Segurança

### Configurações Recomendadas:
1. **SSL**: Habilitado por padrão no Railway
2. **Backup**: Automático pelo Railway
3. **Environment Variables**: Sempre usar variáveis para credenciais
4. **Connection Pooling**: Configurar se necessário

### Exemplo de Connection String Segura:
```bash
DATABASE_URL="postgresql://user:pass@host:port/db?sslmode=require&connection_limit=20"
```

## 🎉 Verificação Final

✅ **Checklist de Deploy:**
- [ ] PostgreSQL plugin adicionado
- [ ] DATABASE_URL configurada
- [ ] Migrations aplicadas
- [ ] App acessível na URL Railway
- [ ] Funcionalidades testadas
- [ ] Logs sem erros críticos

## 🆘 Suporte

- **Railway Docs**: [docs.railway.app](https://docs.railway.app)
- **Prisma Docs**: [prisma.io/docs](https://prisma.io/docs)
- **Discord Railway**: [railway.app/discord](https://railway.app/discord)

---
**🚀 Seu sistema de afiliação está pronto para produção!**
