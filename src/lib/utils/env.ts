// Função para obter a URL base baseada no ambiente
export function getBaseUrl(): string {
  // Se estiver no navegador, usar o origin atual
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  // Se estiver no servidor, detectar baseado nas variáveis de ambiente
  if (process.env.NODE_ENV === 'production') {
    return process.env.NEXTAUTH_URL || 'https://graussolar.up.railway.app';
  }

  // Desenvolvimento local
  return process.env.NEXTAUTH_URL || 'http://localhost:3000';
}

// Função para obter URLs de callback dinâmicas
export function getCallbackUrl(path: string = '/dashboard'): string {
  const baseUrl = getBaseUrl();
  return `${baseUrl}${path}`;
}

// Função para detectar se está em produção
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

// Função para detectar se está executando no cliente
export function isClient(): boolean {
  return typeof window !== 'undefined';
}
