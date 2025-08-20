'use client'

import { ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ElementType;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  variant?: 'glass' | 'solid' | 'gradient';
  color?: 'blue' | 'green' | 'yellow' | 'purple' | 'pink' | 'indigo' | 'cyan' | 'orange' | 'emerald';
  highContrast?: boolean; // força branco puro no ícone
  className?: string;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  variant = 'glass',
  color = 'blue',
  highContrast = false,
  className = ''
}: StatsCardProps) {
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

  const getColorClasses = () => {
    if (highContrast) return 'text-white drop-shadow-md';
    const colors = {
      blue: 'text-[#29c3ff]',
      green: 'text-green-300',
      yellow: 'text-yellow-300',
      purple: 'text-purple-300',
      pink: 'text-pink-300',
      indigo: 'text-indigo-300',
      cyan: 'text-cyan-300',
      orange: 'text-orange-300',
      emerald: 'text-emerald-300'
    } as const;
    return colors[color] || 'text-white';
  };

  const getIconBgClasses = () => {
    const backgrounds = {
      blue: 'bg-[#00a9ec]/25',
      green: 'bg-green-500/25',
      yellow: 'bg-[#ffcc00]/25',
      purple: 'bg-purple-500/25',
      pink: 'bg-pink-500/25',
      indigo: 'bg-[#00445d]/40',
      cyan: 'bg-cyan-500/25',
      orange: 'bg-orange-500/25',
      emerald: 'bg-emerald-500/25'
    } as const;
    return backgrounds[color] || 'bg-white/20';
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      case 'neutral':
        return <Minus className="w-4 h-4 text-gray-400" />;
      default:
        return null;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-400';
      case 'down':
        return 'text-red-400';
      case 'neutral':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className={`
      ${getVariantClasses()}
      rounded-2xl p-6 hover:shadow-2xl hover:scale-105 
      transform transition-all duration-200
      ${className}
    `}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {Icon && (
            <div className={`p-3 rounded-xl ${getIconBgClasses()}`}>
              <Icon className={`w-6 h-6 ${getColorClasses()}`} />
            </div>
          )}
          <div>
            <p className="text-gray-300 text-sm font-medium">{title}</p>
            {subtitle && (
              <p className="text-gray-400 text-xs">{subtitle}</p>
            )}
          </div>
        </div>

        {trend && trendValue && (
          <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="text-sm font-medium">{trendValue}</span>
          </div>
        )}
      </div>

      <div className="mb-2">
        <h3 className="text-3xl font-bold text-white">{value}</h3>
      </div>
    </div>
  );
}
