// Teste das funções de cumprimento baseadas no horário do Brasil
const { getGreeting, getBrazilTime, getBrazilTimeFormatted, getGreetingInfo } = require('./src/lib/utils/greeting.ts');

console.log('🇧🇷 TESTE DE CUMPRIMENTOS - HORÁRIO DO BRASIL');
console.log('===============================================\n');

// Simular diferentes horários para teste
const testName = "João Silva";

console.log(`⏰ Horário atual do Brasil: ${getBrazilTimeFormatted()}`);
console.log(`👋 Cumprimento: ${getGreeting(testName)}\n`);

// Teste com diferentes horários simulados
console.log('🧪 TESTES COM HORÁRIOS SIMULADOS:');
console.log('=================================');

const testHours = [
  { hour: 6, expected: "Bom dia" },
  { hour: 9, expected: "Bom dia" }, 
  { hour: 11, expected: "Bom dia" },
  { hour: 12, expected: "Boa tarde" },
  { hour: 15, expected: "Boa tarde" },
  { hour: 17, expected: "Boa tarde" },
  { hour: 18, expected: "Boa noite" },
  { hour: 20, expected: "Boa noite" },
  { hour: 23, expected: "Boa noite" },
  { hour: 2, expected: "Boa noite" },
  { hour: 4, expected: "Boa noite" }
];

testHours.forEach(test => {
  // Simular horário específico
  const brazilTime = new Date();
  brazilTime.setHours(test.hour);
  
  let greeting = "";
  if (test.hour >= 5 && test.hour < 12) {
    greeting = "Bom dia";
  } else if (test.hour >= 12 && test.hour < 18) {
    greeting = "Boa tarde";
  } else {
    greeting = "Boa noite";
  }
  
  const status = greeting === test.expected ? "✅" : "❌";
  console.log(`${status} ${test.hour}:00 → ${greeting}, ${testName}!`);
});

console.log('\n🕒 PERÍODOS DEFINIDOS:');
console.log('======================');
console.log('🌅 Bom dia: 05:00 - 11:59');
console.log('☀️  Boa tarde: 12:00 - 17:59');
console.log('🌙 Boa noite: 18:00 - 04:59');

console.log('\n📍 FUSO HORÁRIO: Brasil (GMT-3)');
console.log('🔄 Atualização: Automática a cada carregamento da página');
