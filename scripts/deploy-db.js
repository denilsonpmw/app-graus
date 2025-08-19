#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🚀 Deploy Database - Railway Production\n');

// Verificar se DATABASE_URL está definida
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL não encontrada nas variáveis de ambiente');
  process.exit(1);
}

console.log('✅ DATABASE_URL encontrada');
console.log('📊 Configurando banco de dados...\n');

try {
  // Gerar cliente Prisma
  console.log('🔄 Gerando cliente Prisma...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Cliente Prisma gerado\n');

  // Aplicar migrations em produção
  console.log('🔄 Aplicando migrations...');
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  console.log('✅ Migrations aplicadas\n');

  // Seed do banco (opcional)
  console.log('🌱 Verificando se há seed...');
  try {
    execSync('npx prisma db seed', { stdio: 'inherit' });
    console.log('✅ Seed executado\n');
  } catch (error) {
    console.log('ℹ️  Nenhum seed definido (isso é normal)\n');
  }

  console.log('🎉 Banco de dados configurado com sucesso!');

} catch (error) {
  console.error('❌ Erro na configuração do banco:', error.message);
  
  // Fallback: usar db push se migrations falharem
  console.log('🔄 Tentando fallback com db push...');
  try {
    execSync('npx prisma db push', { stdio: 'inherit' });
    console.log('✅ Banco sincronizado com db push');
  } catch (pushError) {
    console.error('❌ Erro no fallback:', pushError.message);
    process.exit(1);
  }
}
