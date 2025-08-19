#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🚀 Setup PostgreSQL + Prisma no Railway\n');

// Função para executar comandos
function runCommand(command, description) {
  console.log(`⏳ ${description}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} - Concluído\n`);
  } catch (error) {
    console.error(`❌ Erro em: ${description}`);
    console.error(error.message);
    process.exit(1);
  }
}

// Verificar se Prisma CLI está instalado
console.log('🔍 Verificando Prisma CLI...');
try {
  execSync('npx prisma --version', { stdio: 'pipe' });
  console.log('✅ Prisma CLI encontrado\n');
} catch (error) {
  console.log('📦 Instalando Prisma CLI...');
  runCommand('npm install prisma @prisma/client', 'Instalação do Prisma');
}

// Gerar cliente Prisma
runCommand('npx prisma generate', 'Gerando cliente Prisma');

// Aplicar migrations (para Railway)
console.log('📊 Para aplicar as migrations no Railway:');
console.log('1. Configure a DATABASE_URL nas variáveis de ambiente');
console.log('2. Execute: npx prisma db push');
console.log('3. Ou use: npx prisma migrate deploy (em produção)');

console.log('\n🎉 Setup local concluído!');
console.log('\n📋 Próximos passos no Railway:');
console.log('1. Adicione plugin PostgreSQL');
console.log('2. Copie a DATABASE_URL gerada');
console.log('3. Configure nas variáveis de ambiente');
console.log('4. O deploy rodará automaticamente as migrations');
