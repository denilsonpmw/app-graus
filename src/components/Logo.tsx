'use client'

import Image from 'next/image'
import { Zap } from 'lucide-react'
import { useState } from 'react'

interface LogoProps {
  className?: string
  width?: number
  height?: number
}

export default function Logo({ className = "", width = 32, height = 32 }: LogoProps) {
  const [imageError, setImageError] = useState(false);

  // Fallback para ícone SVG se a imagem não carregar
  if (imageError) {
    return (
      <div className={`flex items-center justify-center bg-solar-600 rounded-lg ${className}`} style={{ width, height }}>
        <Zap className="text-white" size={width * 0.6} />
      </div>
    );
  }

  return (
    <Image
      src="/logo.png"
      alt="Graus Solar"
      width={width}
      height={height}
      className={className}
      priority={true}
      unoptimized={true}
      onError={() => {
        console.warn('Logo PNG não encontrada, usando fallback');
        setImageError(true);
      }}
    />
  )
}
