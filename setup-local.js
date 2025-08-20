// Script para configurar ambiente de desenvolvimento
console.log('🔧 CONFIGURANDO AMBIENTE LOCAL');
console.log('=============================\n');

const fs = require('fs');
const path = require('path');

// Conteúdo do .env para desenvolvimento local
const devEnv = `# Ambiente LOCAL - Development
DATABASE_URL="postgresql://postgres:GFeaKTxnSwGKlgMtoLfWkCVmMxTanAoo@interchange.proxy.rlwy.net:46286/railway"

# NextAuth - LOCAL
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="eoThd8rRdEM/A7dU30an6WuK7wLqAsMvtNnlFp1oSeuof/6xJes+2ZriWaI="

# App Settings
NODE_ENV="development"
APP_URL="http://localhost:3000"
`;

try {
  fs.writeFileSync('.env', devEnv);
  console.log('✅ Arquivo .env configurado para desenvolvimento local');
  console.log('🌐 NEXTAUTH_URL: http://localhost:3000');
  console.log('📊 NODE_ENV: development');
  console.log('\n🚀 Agora você pode rodar:');
  console.log('   npm run dev');
  console.log('\n⚠️  Para produção, rode: node setup-production.js');
} catch (error) {
  console.error('❌ Erro ao configurar .env:', error);
}
