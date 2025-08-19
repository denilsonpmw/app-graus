# 🔧 Resolvendo Problema de Conexão PostgreSQL Railway

## ❌ **Erro Encontrado:**
```
Error: P1001: Can't reach database server at `postgres.railway.internal:5432`
```

## 🎯 **Causa:**
- `postgres.railway.internal` só funciona **dentro do Railway**
- Não é acessível do seu computador local
- Você tentou executar `railway run` localmente

## ✅ **Soluções:**

### **1. Deploy Automático (RECOMENDADO)**

As migrations são aplicadas automaticamente no deploy:

```bash
# ✅ Já fizemos isso:
git add .
git commit -m "Fix database setup for Railway"
git push origin main
```

**O Railway executará automaticamente:**
1. `npm install`
2. `npx prisma generate` (postinstall)
3. Migrations são aplicadas durante o build
4. Deploy da aplicação

### **2. Obter URL Pública do PostgreSQL**

Para desenvolvimento local:

1. **No Railway Dashboard:**
   - Acesse seu projeto
   - Clique no **PostgreSQL plugin**
   - Na aba **"Connect"**
   - Copie a **"Public URL"**

2. **Formato da URL pública:**
```
postgresql://postgres:senha@containers-us-west-xxx.railway.app:6543/railway
```

### **3. Ambiente Local com SQLite**

Para desenvolvimento, use SQLite:

```bash
# Crie arquivo .env.local
cp .env.local.example .env.local

# Execute migrations locais
npx prisma db push

# Desenvolvimento local
npm run dev
```

## 🚀 **Verificar Status do Deploy**

1. **No Railway Dashboard:**
   - Vá para **Deployments**
   - Veja os logs do último deploy
   - Confirme que não há erros

2. **Teste a aplicação:**
   - Acesse: `https://graussolar.railway.app`
   - Verifique se carrega corretamente

## 📊 **Scripts Corretos para Cada Ambiente**

### **Local (Desenvolvimento):**
```bash
npm run dev              # Usar SQLite local
npx prisma db push       # Aplicar mudanças no schema
npx prisma studio        # Visualizar dados
```

### **Railway (Produção):**
```bash
# Migrations aplicadas automaticamente no deploy
# Não execute comandos locais para produção
```

## ⚠️ **Importante:**
- **Nunca** execute `railway run npx prisma migrate` localmente
- **Sempre** use a URL interna (`postgres.railway.internal`) nas variáveis do Railway
- **Para dev local**, use SQLite ou URL pública do PostgreSQL

## 🎯 **Status Atual:**
✅ Código commitado e enviado para o Railway  
✅ Deploy será executado automaticamente  
✅ Migrations aplicadas durante o build  
✅ Aplicação disponível em: https://graussolar.railway.app  

**Aguarde alguns minutos e verifique se a aplicação está funcionando!**
