// Script para testar as principais funcionalidades da aplicação
import fetch from 'node-fetch';

const BASE_URL = 'https://graussolar.up.railway.app';

async function testApp() {
  console.log('🚀 Testando aplicação no Railway...\n');

  // Teste 1: Homepage
  console.log('1. Testando homepage...');
  try {
    const response = await fetch(`${BASE_URL}`);
    console.log(`✅ Homepage: ${response.status} ${response.statusText}`);
  } catch (error) {
    console.log(`❌ Homepage: ${error.message}`);
  }

  // Teste 2: Página de login
  console.log('2. Testando página de login...');
  try {
    const response = await fetch(`${BASE_URL}/login`);
    console.log(`✅ Login page: ${response.status} ${response.statusText}`);
  } catch (error) {
    console.log(`❌ Login page: ${error.message}`);
  }

  // Teste 3: API de produtos
  console.log('3. Testando API de produtos...');
  try {
    const response = await fetch(`${BASE_URL}/api/produtos`);
    const data = await response.json();
    console.log(`✅ API produtos: ${response.status} - ${data.length || 0} produtos encontrados`);
  } catch (error) {
    console.log(`❌ API produtos: ${error.message}`);
  }

  // Teste 4: API de afiliados
  console.log('4. Testando API de afiliados...');
  try {
    const response = await fetch(`${BASE_URL}/api/afiliados`);
    console.log(`✅ API afiliados: ${response.status} ${response.statusText}`);
  } catch (error) {
    console.log(`❌ API afiliados: ${error.message}`);
  }

  // Teste 5: Link de afiliado (GRAU001)
  console.log('5. Testando link de afiliado...');
  try {
    const response = await fetch(`${BASE_URL}/ref/GRAU001`, { redirect: 'manual' });
    console.log(`✅ Link afiliado: ${response.status} - ${response.headers.get('location') || 'OK'}`);
  } catch (error) {
    console.log(`❌ Link afiliado: ${error.message}`);
  }

  console.log('\n📋 Credenciais para teste manual:');
  console.log('• Admin: admin@graussolar.com.br / admin123');
  console.log('• Afiliado: Vários criados com senha 123456');
  console.log('\n🌐 URLs importantes:');
  console.log(`• App: ${BASE_URL}`);
  console.log(`• Login: ${BASE_URL}/login`);
  console.log(`• Admin: ${BASE_URL}/admin/dashboard`);
  console.log(`• Afiliado: ${BASE_URL}/dashboard`);
}

testApp();
