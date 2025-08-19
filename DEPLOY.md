# Instruções Rápidas de Deploy - Railway 🚀

## ✅ Arquivos Criados/Configurados

- `Dockerfile` - Container otimizado para produção
- `railway.toml` - Configurações do Railway
- `next.config.ts` - Configuração standalone do Next.js
- `.env.example` - Template das variáveis de ambiente
- `.dockerignore` - Otimização do build Docker
- `package.json` - Scripts atualizados com Prisma

## 🔗 Passos para Deploy

### 1. Commit e Push
```bash
git add .
git commit -m "Configuração para deploy Railway"
git push origin main
```

### 2. Railway Setup
1. Acesse https://railway.app
2. Login com GitHub
3. "New Project" > "Deploy from GitHub repo"
4. Selecione seu repositório

### 3. Adicionar PostgreSQL
- No dashboard: "Add Plugin" > PostgreSQL
- A `DATABASE_URL` será gerada automaticamente

### 4. Variáveis de Ambiente Obrigatórias
```
DATABASE_URL=postgresql://... (gerada pelo plugin)
NEXTAUTH_URL=https://seu-app.railway.app
NEXTAUTH_SECRET=gere-um-secret-forte-aqui
NODE_ENV=production
```

### 5. Deploy Automático
- O Railway detecta Next.js automaticamente
- Build e deploy acontecem automaticamente
- URL será fornecida após o deploy

## 🛠️ Comandos Úteis

```bash
# Railway CLI (opcional)
npm install -g @railway/cli
railway login
railway logs

# Desenvolvimento local
npm run dev

# Test build
npm run build
npm start
```

## 📋 Checklist Pré-Deploy

- [ ] Código commitado no GitHub
- [ ] Variáveis de ambiente configuradas
- [ ] PostgreSQL adicionado no Railway
- [ ] NEXTAUTH_URL configurada com domínio Railway
- [ ] Testado localmente com `npm run build`

## 🆘 Troubleshooting

- **Erro de build**: Verifique os logs no Railway dashboard
- **Erro de DB**: Confirme se a DATABASE_URL está correta
- **Erro de Auth**: Verifique NEXTAUTH_URL e NEXTAUTH_SECRET
- **Timeout**: Ajuste healthcheckTimeout no railway.toml

## 🎉 Após Deploy

1. Teste todas as funcionalidades
2. Configure domínio customizado (opcional)
3. Configure analytics e monitoramento
4. Documente a URL de produção

---
**Boa sorte com o deploy! 🚀**
