import Image from 'next/image'

interface LogoProps {
  className?: string
  width?: number
  height?: number
}

export default function Logo({ className = "", width = 32, height = 32 }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="Graus Solar"
      width={width}
      height={height}
      className={className}
    />
  )
}
