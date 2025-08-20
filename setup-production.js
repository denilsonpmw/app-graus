// Script para configurar ambiente de produção
console.log('🚀 CONFIGURANDO AMBIENTE PRODUÇÃO');
console.log('=================================\n');

const fs = require('fs');
const path = require('path');

// Conteúdo do .env para produção
const prodEnv = `# Ambiente PRODUÇÃO - Railway
DATABASE_URL="postgresql://postgres:GFeaKTxnSwGKlgMtoLfWkCVmMxTanAoo@interchange.proxy.rlwy.net:46286/railway"

# NextAuth - PRODUCTION
NEXTAUTH_URL="https://graussolar.up.railway.app"
NEXTAUTH_SECRET="eoThd8rRdEM/A7dU30an6WuK7wLqAsMvtNnlFp1oSeuof/6xJes+2ZriWaI="

# App Settings
NODE_ENV="production"
APP_URL="https://graussolar.up.railway.app"
`;

try {
  fs.writeFileSync('.env', prodEnv);
  console.log('✅ Arquivo .env configurado para produção');
  console.log('🌐 NEXTAUTH_URL: https://graussolar.up.railway.app');
  console.log('📊 NODE_ENV: production');
  console.log('\n🚀 Agora você pode fazer deploy:');
  console.log('   railway up');
  console.log('\n⚠️  Para desenvolvimento, rode: node setup-local.js');
} catch (error) {
  console.error('❌ Erro ao configurar .env:', error);
}
