# 🔧 Guia de Configuração de Ambientes

## 📋 Problema Resolvido
A URL de callback do NextAuth agora se ajusta automaticamente baseada no ambiente:

- **Local**: `http://localhost:3000/login?callbackUrl=http://localhost:3000/dashboard`
- **Produção**: `https://graussolar.up.railway.app/login?callbackUrl=https://graussolar.up.railway.app/dashboard`

## ⚙️ Scripts de Configuração

### 🏠 Para Desenvolvimento Local:
```bash
node setup-local.js
npm run dev
```

### 🚀 Para Deploy em Produção:
```bash
node setup-production.js
railway up
```

## 📁 Arquivos Criados

- `.env.local` - Configurações para desenvolvimento
- `.env.production` - Configurações para produção  
- `setup-local.js` - Script para configurar ambiente local
- `setup-production.js` - Script para configurar ambiente de produção
- `src/lib/utils/env.ts` - Funções auxiliares para detectar ambiente

## 🔄 Alterações Realizadas

### ✅ Correções no NextAuth:
- Logout agora redireciona para `/` (raiz) ao invés de `/login`
- URLs de callback são geradas dinamicamente baseadas no ambiente

### ✅ Correções no Logo:
- Componente Logo agora tem fallback para ícone SVG
- Adicionado `unoptimized={true}` para funcionar no Railway

### ✅ Configuração de Ambiente:
- `.env` agora se ajusta automaticamente
- Scripts para alternar entre desenvolvimento e produção

## 🧪 Como Testar

1. **Localmente**: 
   - `node setup-local.js`
   - `npm run dev`
   - Acesse: http://localhost:3000

2. **Produção**:
   - `node setup-production.js` 
   - `railway up`
   - Acesse: https://graussolar.up.railway.app

## ✅ Resultado

Agora não haverá mais conflito entre URLs locais e de produção. O NextAuth sempre usará o ambiente correto!
