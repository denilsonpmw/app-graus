// Teste simples das funções de cumprimento
console.log('🇧🇷 CUMPRIMENTOS PERSONALIZADOS - TESTE SIMPLES');
console.log('===============================================\n');

// Simular função getGreeting
function getGreeting(name) {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const brazilTime = new Date(utc + (-3 * 3600000)); // GMT-3
  const hour = brazilTime.getHours();

  let greeting = "";
  if (hour >= 5 && hour < 12) {
    greeting = "Bom dia";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Boa tarde"; 
  } else {
    greeting = "Boa noite";
  }

  return `${greeting}, ${name}!`;
}

const brazilTime = new Date();
const utc = brazilTime.getTime() + (brazilTime.getTimezoneOffset() * 60000);
const brTime = new Date(utc + (-3 * 3600000));

console.log(`⏰ Horário do Brasil: ${brTime.toLocaleTimeString('pt-BR')}`);
console.log(`📅 Data: ${brTime.toLocaleDateString('pt-BR')}`);
console.log(`🕐 Hora: ${brTime.getHours()}h${brTime.getMinutes().toString().padStart(2, '0')}\n`);

console.log('👋 EXEMPLOS DE CUMPRIMENTOS:');
console.log('============================');
console.log(getGreeting('João Silva'));
console.log(getGreeting('Administrador'));
console.log(getGreeting('Maria Santos'));

console.log('\n🕒 HORÁRIOS DOS CUMPRIMENTOS:');
console.log('=============================');
console.log('🌅 Bom dia: 05:00 - 11:59');
console.log('☀️  Boa tarde: 12:00 - 17:59');
console.log('🌙 Boa noite: 18:00 - 04:59');

console.log('\n✅ Sistema implementado nos dashboards:');
console.log('• Dashboard Afiliado: getGreeting(affiliateData.name)');
console.log('• Dashboard Admin: getGreeting(session?.user?.name || "Administrador")');
console.log('\n🔄 Para testar: Faça login em http://localhost:3000');
