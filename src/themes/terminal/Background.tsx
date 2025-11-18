import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface TerminalBackgroundProps {
  isMobile: boolean
}

export function TerminalBackground({ isMobile }: TerminalBackgroundProps) {
  const [matrixChars, setMatrixChars] = useState<Array<{ char: string; x: number; delay: number }>>([])

  useEffect(() => {
    // Generate random matrix characters
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
    const columns = isMobile ? 8 : 15
    const generatedChars = Array.from({ length: columns }, (_, i) => ({
      char: chars[Math.floor(Math.random() * chars.length)],
      x: (i / columns) * 100,
      delay: Math.random() * 2,
    }))
    setMatrixChars(generatedChars)
  }, [isMobile])

  const mobileBackground = 'linear-gradient(135deg, #000000 0%, #001a00 100%)'

  if (isMobile) {
    return (
      <>
        {/* Base gradient background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: mobileBackground }}
        />
        
        {/* Grid pattern */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 65, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 65, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px',
            opacity: 0.3,
          }}
        />

        {/* Scanline effect */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,transparent_50%,rgba(0,255,65,0.03)_50%)] bg-[length:100%_4px] opacity-50" />
        
        {/* Animated matrix-style characters - mobile optimized */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            aria-hidden
            className="absolute top-0 font-mono text-[#00FF41] opacity-25"
            style={{
              left: `${15 + i * 20}%`,
              fontSize: '12px',
            }}
            initial={{ y: -20, opacity: 0 }}
            animate={{
              y: ['0vh', '100vh'],
              opacity: [0, 0.25, 0.25, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              delay: i * 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {['01', 'アイ', '>', '_', '//'][i]}
          </motion.div>
        ))}

        {/* Corner brackets - minimal for mobile */}
        <motion.div
          aria-hidden
          className="absolute left-4 top-4 h-10 w-10 border-l border-t border-[#00FF41] opacity-40"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' as const }}
        />
        <motion.div
          aria-hidden
          className="absolute right-4 top-4 h-10 w-10 border-r border-t border-[#00FF41] opacity-40"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' as const }}
        />
        <motion.div
          aria-hidden
          className="absolute bottom-4 left-4 h-10 w-10 border-b border-l border-[#00FF41] opacity-40"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' as const }}
        />
        <motion.div
          aria-hidden
          className="absolute bottom-4 right-4 h-10 w-10 border-b border-r border-[#00FF41] opacity-40"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' as const }}
        />

        {/* Pulsing circle */}
        <motion.div
          aria-hidden
          className="absolute left-1/4 top-1/4 h-20 w-20 rounded-full border border-[#00FF41]/20"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        />

        {/* Command prompt text */}
        <motion.div
          aria-hidden
          className="absolute bottom-12 left-6 font-mono text-[0.65rem] text-[#00FF41] opacity-30"
          animate={{ opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div>&gt; online</div>
          <motion.div
            className="mt-1"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            &gt; _
          </motion.div>
        </motion.div>

        {/* Scanning line */}
        <motion.div
          aria-hidden
          className="absolute left-0 h-px w-full bg-gradient-to-r from-transparent via-[#00FF41]/40 to-transparent shadow-[0_0_8px_2px_rgba(0,255,65,0.3)]"
          animate={{
            top: ['0%', '100%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </>
    )
  }

  return (
    <>
      {/* Base gradient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black via-[#001a00] to-black"
      />

      {/* Grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          opacity: 0.2,
        }}
      />

      {/* Scanline effect */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,transparent_50%,rgba(0,255,65,0.03)_50%)] bg-[length:100%_4px] opacity-50"
      />

      {/* Animated matrix-style falling characters */}
      {matrixChars.map((item, i) => (
        <motion.div
          key={i}
          aria-hidden
          className="absolute top-0 font-mono text-[#00FF41] opacity-30"
          style={{
            left: `${item.x}%`,
            fontSize: '14px',
          }}
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: ['0vh', '100vh'],
            opacity: [0, 0.3, 0.3, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            delay: item.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {item.char}
        </motion.div>
      ))}

      {/* Corner brackets - top left */}
      <motion.div
        aria-hidden
        className="absolute left-8 top-8 h-16 w-16 border-l-2 border-t-2 border-[#00FF41] opacity-60"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* Corner brackets - top right */}
      <motion.div
        aria-hidden
        className="absolute right-8 top-8 h-16 w-16 border-r-2 border-t-2 border-[#00FF41] opacity-60"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 1, delay: 0.6 }}
      />

      {/* Corner brackets - bottom left */}
      <motion.div
        aria-hidden
        className="absolute bottom-8 left-8 h-16 w-16 border-b-2 border-l-2 border-[#00FF41] opacity-60"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 1, delay: 0.7 }}
      />

      {/* Corner brackets - bottom right */}
      <motion.div
        aria-hidden
        className="absolute bottom-8 right-8 h-16 w-16 border-b-2 border-r-2 border-[#00FF41] opacity-60"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 1, delay: 0.8 }}
      />

      {/* Pulsing circle accent */}
      <motion.div
        aria-hidden
        className="absolute left-1/4 top-1/3 h-32 w-32 rounded-full border border-[#00FF41]/30"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Glowing crosshair */}
      <motion.div
        aria-hidden
        className="absolute right-1/4 top-2/3"
        initial={{ opacity: 0, rotate: 0 }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
          rotate: 360,
        }}
        transition={{
          opacity: { duration: 3, repeat: Infinity },
          rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
        }}
      >
        <div className="relative h-20 w-20">
          <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#00FF41] to-transparent" />
          <div className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-[#00FF41] to-transparent" />
        </div>
      </motion.div>

      {/* Command prompt style text */}
      <motion.div
        aria-hidden
        className="absolute bottom-16 left-16 font-mono text-xs text-[#00FF41] opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div>&gt; system_online</div>
        <div className="mt-1">&gt; portfolio_loaded</div>
        <motion.div
          className="mt-1"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          &gt; _
        </motion.div>
      </motion.div>

      {/* Horizontal scanning line */}
      <motion.div
        aria-hidden
        className="absolute left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#00FF41]/50 to-transparent shadow-[0_0_10px_2px_rgba(0,255,65,0.5)]"
        animate={{
          top: ['0%', '100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </>
  )
}

