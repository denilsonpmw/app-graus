'use client'

import { ReactNode, ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export default function GradientButton({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: GradientButtonProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-[#00a9ec] to-[#ffcc00] hover:from-[#0099d9] hover:to-[#e6b800] shadow-[#00a9ec]/25';
      case 'secondary':
        return 'bg-gradient-to-r from-[#ffcc00] to-[#00a9ec] hover:from-[#e6b800] hover:to-[#0099d9] shadow-[#ffcc00]/25';
      case 'success':
        return 'bg-gradient-to-r from-[#00a9ec] to-[#00445d] hover:from-[#0099d9] hover:to-[#003347] shadow-[#00a9ec]/25';
      case 'warning':
        return 'bg-gradient-to-r from-[#ffcc00] to-[#00445d] hover:from-[#e6b800] hover:to-[#003347] shadow-[#ffcc00]/25';
      case 'danger':
        return 'bg-gradient-to-r from-[#00445d] to-[#ffcc00] hover:from-[#003347] hover:to-[#e6b800] shadow-[#00445d]/25';
      default:
        return 'bg-gradient-to-r from-[#00a9ec] to-[#ffcc00] hover:from-[#0099d9] hover:to-[#e6b800] shadow-[#00a9ec]/25';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-2 text-sm';
      case 'md':
        return 'px-4 py-3 text-base';
      case 'lg':
        return 'px-6 py-4 text-lg';
      default:
        return 'px-4 py-3 text-base';
    }
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled || isLoading ? 'opacity-50 cursor-not-allowed transform-none' : '';

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${widthClass}
        ${disabledClass}
        text-white font-semibold rounded-xl shadow-lg hover:shadow-xl 
        transform hover:scale-105 focus:outline-none focus:ring-2 
        focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-transparent 
        transition-all duration-200
        ${className}
      `}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin h-5 w-5 mr-2 inline" />
          Carregando...
        </>
      ) : (
        children
      )}
    </button>
  );
}
