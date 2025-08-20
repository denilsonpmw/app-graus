'use client'

import { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'rainbow' | 'light' | 'contrast';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  className?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
}

export default function GradientText({
  children,
  variant = 'primary',
  size = 'md',
  weight = 'normal',
  className = '',
  as: Component = 'span'
}: GradientTextProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-[#00a9ec] via-[#ffcc00] to-[#00a9ec]';
      case 'secondary':
        return 'bg-gradient-to-r from-[#ffcc00] via-[#00a9ec] to-[#ffcc00]';
      case 'success':
        return 'bg-gradient-to-r from-[#00a9ec] to-[#00445d]';
      case 'warning':
        return 'bg-gradient-to-r from-[#ffcc00] to-[#00a9ec]';
      case 'rainbow':
        return 'bg-gradient-to-r from-[#00445d] via-[#00a9ec] to-[#ffcc00]';
      case 'light':
        return 'bg-gradient-to-r from-white via-[#ffcc00] to-white';
      case 'contrast':
        return 'bg-gradient-to-r from-[#ffcc00] to-white';
      default:
        return 'bg-gradient-to-r from-[#00a9ec] via-[#ffcc00] to-[#00a9ec]';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-sm';
      case 'md':
        return 'text-base';
      case 'lg':
        return 'text-lg';
      case 'xl':
        return 'text-xl';
      case '2xl':
        return 'text-2xl';
      case '3xl':
        return 'text-3xl';
      case '4xl':
        return 'text-4xl';
      default:
        return 'text-base';
    }
  };

  const getWeightClasses = () => {
    switch (weight) {
      case 'normal':
        return 'font-normal';
      case 'medium':
        return 'font-medium';
      case 'semibold':
        return 'font-semibold';
      case 'bold':
        return 'font-bold';
      case 'extrabold':
        return 'font-extrabold';
      default:
        return 'font-normal';
    }
  };

  return (
    <Component className={`
      ${getVariantClasses()}
      ${getSizeClasses()}
      ${getWeightClasses()}
      bg-clip-text text-transparent
      ${className}
    `}>
      {children}
    </Component>
  );
}
