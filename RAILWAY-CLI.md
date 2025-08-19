# Railway CLI - Deploy Manual

## Se o webhook não funcionar, use Railway CLI:

### Instalar Railway CLI:
```bash
npm install -g @railway/cli
```

### Fazer login:
```bash
railway login
```

### Conectar ao projeto:
```bash
railway link
# Selecione seu projeto quando aparecer a lista
```

### Deploy manual:
```bash
railway up
```

### Verificar logs:
```bash
railway logs
```

### Status do serviço:
```bash
railway status
```

## Comandos para troubleshooting:

### Ver variáveis de ambiente:
```bash
railway variables
```

### Executar comandos no Railway:
```bash
railway run npm run build
railway run npx prisma db push
```

### Abrir app no browser:
```bash
railway open
```

## Informações do projeto:
- **Repositório**: denilsonpmw/app-graus
- **Branch**: main
- **Último commit**: dc33f4e
- **App URL**: https://graussolar.up.railway.app
