// Funções para cumprimentos baseados no horário do Brasil (GMT-3)

/**
 * Obtém o horário atual do Brasil (GMT-3)
 */
export function getBrazilTime(): Date {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const brazilTime = new Date(utc + (-3 * 3600000)); // GMT-3
  return brazilTime;
}

/**
 * Gera cumprimento baseado no horário do Brasil
 * @param name - Nome da pessoa
 * @returns Cumprimento personalizado
 */
export function getGreeting(name: string): string {
  const brazilTime = getBrazilTime();
  const hour = brazilTime.getHours();

  let greeting: string;

  if (hour >= 5 && hour < 12) {
    greeting = "Bom dia";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Boa tarde";
  } else {
    greeting = "Boa noite";
  }

  return `${greeting}, ${name}!`;
}

/**
 * Formata a hora atual do Brasil
 * @returns Hora formatada (HH:MM)
 */
export function getBrazilTimeFormatted(): string {
  const brazilTime = getBrazilTime();
  return brazilTime.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Sao_Paulo'
  });
}

/**
 * Obtém informações completas do horário e cumprimento
 */
export function getGreetingInfo(name: string) {
  const brazilTime = getBrazilTime();
  const hour = brazilTime.getHours();
  const timeFormatted = getBrazilTimeFormatted();
  const greeting = getGreeting(name);

  return {
    greeting,
    hour,
    timeFormatted,
    brazilTime,
    period: hour >= 5 && hour < 12 ? 'morning' : 
           hour >= 12 && hour < 18 ? 'afternoon' : 'night'
  };
}
