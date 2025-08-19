import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Para Railway funcionar corretamente
  output: 'standalone',
  // Ignorar erros de ESLint durante build em produção
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ignorar erros de TypeScript durante build em produção  
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configurações de domínio para produção
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Configurações de ambiente
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

export default nextConfig;
