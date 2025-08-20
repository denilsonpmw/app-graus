'use client'

import { ReactNode } from 'react';

interface ModernCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'glass' | 'solid' | 'gradient';
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export default function ModernCard({ 
  children, 
  className = '', 
  variant = 'glass',
  hover = true,
  padding = 'md'
}: ModernCardProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'glass':
        return 'bg-white/10 backdrop-blur-lg border border-white/20';
      case 'solid':
        return 'bg-white border border-gray-200 shadow-xl';
      case 'gradient':
        return 'bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-lg border border-white/30';
      default:
        return 'bg-white/10 backdrop-blur-lg border border-white/20';
    }
  };

  const getPaddingClasses = () => {
    switch (padding) {
      case 'sm':
        return 'p-4';
      case 'md':
        return 'p-6';
      case 'lg':
        return 'p-8';
      default:
        return 'p-6';
    }
  };

  const hoverClasses = hover ? 'hover:shadow-2xl hover:scale-105 transform transition-all duration-200' : '';

  return (
    <div className={`
      ${getVariantClasses()} 
      ${getPaddingClasses()} 
      ${hoverClasses}
      rounded-2xl shadow-xl
      ${className}
    `}>
      {children}
    </div>
  );
}
