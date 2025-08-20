// Script para testar autenticação local
const fetch = require('node-fetch');

async function testLocalAuth() {
  console.log('🔐 Testando autenticação no localhost...\n');

  const baseUrl = 'http://localhost:3000';
  
  // Teste 1: Verificar se a página de login carrega
  try {
    console.log('1. Testando página de login...');
    const response = await fetch(`${baseUrl}/login`);
    console.log(`✅ Login page: ${response.status} ${response.statusText}`);
  } catch (error) {
    console.log(`❌ Login page: ${error.message}`);
  }

  // Teste 2: Verificar API NextAuth
  try {
    console.log('2. Testando API NextAuth...');
    const response = await fetch(`${baseUrl}/api/auth/providers`);
    const data = await response.json();
    console.log(`✅ NextAuth API: ${response.status} - Providers:`, Object.keys(data));
  } catch (error) {
    console.log(`❌ NextAuth API: ${error.message}`);
  }

  // Teste 3: Verificar CSRF token
  try {
    console.log('3. Testando CSRF token...');
    const response = await fetch(`${baseUrl}/api/auth/csrf`);
    const data = await response.json();
    console.log(`✅ CSRF: ${response.status} - Token disponível:`, !!data.csrfToken);
  } catch (error) {
    console.log(`❌ CSRF: ${error.message}`);
  }

  console.log('\n📋 Para testar login manual:');
  console.log('• URL: http://localhost:3000/login');
  console.log('• Admin: admin@graussolar.com.br / admin123');
  console.log('• Afiliado: afiliado1@teste.com / 123456');
}

testLocalAuth();
