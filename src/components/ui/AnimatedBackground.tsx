'use client'

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'dark';
  showParticles?: boolean;
  showGrid?: boolean;
}

export default function AnimatedBackground({ 
  children, 
  variant = 'primary', 
  showParticles = true,
  showGrid = true 
}: AnimatedBackgroundProps) {
  const getBackgroundClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-br from-[#00445d] via-[#00a9ec] to-[#00445d]';
      case 'secondary':
        return 'bg-gradient-to-br from-[#00445d] via-[#00a9ec]/50 to-[#ffcc00]/20';
      case 'dark':
        return 'bg-gradient-to-br from-[#00445d] via-[#003347] to-[#00445d]';
      default:
        return 'bg-gradient-to-br from-[#00445d] via-[#00a9ec] to-[#00445d]';
    }
  };

  return (
    <div className={`min-h-screen ${getBackgroundClasses()} relative overflow-hidden`}>
      {/* Partículas animadas - Cores da marca Graus Solar */}
      {showParticles && (
        <>
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#00a9ec]/30 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-[#ffcc00]/40 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-40 w-72 h-72 bg-[#00a9ec]/25 rounded-full mix-blend-multiply filter blur-xl opacity-35 animate-pulse animation-delay-4000"></div>
          <div className="absolute bottom-20 right-40 w-72 h-72 bg-[#ffcc00]/20 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse animation-delay-6000"></div>
        </>
      )}

      {/* Grid pattern overlay */}
      {showGrid && (
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
      )}

      {/* Conteúdo */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}
