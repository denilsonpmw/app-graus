import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Para Railway funcionar corretamente
  output: 'standalone',
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
