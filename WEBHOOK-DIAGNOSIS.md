# Diagnóstico GitHub → Railway Webhook

## ✅ Commits Enviados (Últimos 5):
- `dc33f4e` - WEBHOOK TEST: Explicit deploy trigger for Railway - v0.1.2 (AGORA)
- `763014f` - Fix ESLint/TypeScript errors: Configure for production build  
- `445e463` - FORCE DEPLOY: Version bump and Railway config update
- `b724fb5` - Add nixpacks config and deploy status
- `b1193ce` - Force Railway redeploy

## 🔍 Verificações no Railway Dashboard:

### 1. **Settings → Source/GitHub Integration:**
- ✅ Repository: `denilsonpmw/app-graus` deve estar conectado
- ✅ Branch: `main` deve estar selecionado  
- ✅ Auto Deploy: deve estar habilitado (toggle ON)

### 2. **Webhook Status:**
- Vá em Settings → Integrations
- Verifique se GitHub webhook está "Active" 
- Se houver erro, reconnect GitHub

### 3. **Deploy Manual (se webhook falhar):**
- No projeto, procure botão "Deploy Now" 
- Ou "Redeploy" próximo ao último deploy
- Selecione branch `main` e commit `dc33f4e`

### 4. **Logs de Deploy:**
- Na aba Deployments, verifique se há mensagens de erro
- Logs podem mostrar se webhook foi recebido

## 🚨 **Possíveis Causas:**

### Webhook Issues:
1. **GitHub webhook URL incorreta**
2. **Railway webhook secret inválido** 
3. **Permissions GitHub insuficientes**
4. **Rate limiting ou timeout**

### Railway Issues:
1. **Auto-deploy desabilitado**
2. **Branch configuration incorreta**
3. **Repository access revogado**
4. **Railway service outage**

## 🔧 **Soluções:**

### Immediate Fix:
```bash
# Railway CLI deploy
npm install -g @railway/cli
railway login
railway link  # conectar ao projeto
railway up    # deploy manual
```

### Long-term Fix:
1. Disconnect GitHub integration
2. Reconnect GitHub integration  
3. Reauthorize all permissions
4. Test with empty commit

## ⏱️ **Timeline de Testes:**
- 13:00 - Primeiro commit com correções
- 13:10 - Force deploy attempts  
- 13:15 - **WEBHOOK TEST commit (dc33f4e)**

**Aguarde 2-3 minutos e verifique Railway Dashboard!**
