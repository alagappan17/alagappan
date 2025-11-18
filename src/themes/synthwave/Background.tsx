import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface SynthwaveBackgroundProps {
  isMobile: boolean
}

export function SynthwaveBackground({ isMobile }: SynthwaveBackgroundProps) {
  const gridY = useMotionValue(0)
  const scanLineY = useMotionValue(0)
  const time = useRef(0)

  // Animate grid perspective scrolling
  useAnimationFrame((_, delta) => {
    time.current += delta * 0.0003
    gridY.set((time.current % 100))
  })

  // Separate scan line animation
  useEffect(() => {
    const interval = setInterval(() => {
      scanLineY.set((scanLineY.get() + 1) % 100)
    }, 50)
    return () => clearInterval(interval)
  }, [scanLineY])

  const mobileBackground = 
    'linear-gradient(180deg, #0a0014 0%, #1a0033 35%, #2d004d 60%, #1a0033 85%, #0a0014 100%)'

  if (isMobile) {
    return (
      <>
        {/* Base gradient - purple to dark */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: mobileBackground }}
        />
        
        {/* Starfield effect - mobile optimized */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            aria-hidden
            className="absolute h-0.5 w-0.5 rounded-full bg-cyan-300"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut' as const,
            }}
          />
        ))}

        {/* Neon glow orbs - mobile */}
        <motion.div
          aria-hidden
          className="absolute left-[-20%] top-[15%] h-40 w-40 rounded-full bg-[#FF006E] opacity-30 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        />
        
        <motion.div
          aria-hidden
          className="absolute right-[-15%] top-[35%] h-36 w-36 rounded-full bg-[#00F5FF] opacity-25 blur-3xl"
          animate={{
            x: [0, -25, 0],
            y: [0, 30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        />

        <motion.div
          aria-hidden
          className="absolute left-[20%] bottom-[20%] h-44 w-44 rounded-full bg-[#B537F2] opacity-30 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 25, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        />

        {/* Simplified grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 0, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 0, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Horizontal scan line */}
        <motion.div
          aria-hidden
          className="absolute left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#00F5FF] to-transparent opacity-60 shadow-[0_0_10px_2px_rgba(0,245,255,0.6)]"
          animate={{
            top: ['0%', '100%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Retro sun/horizon */}
        <div
          aria-hidden
          className="absolute bottom-0 left-1/2 h-24 w-24 -translate-x-1/2"
        >
          <div className="absolute bottom-0 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-gradient-to-t from-[#FF006E] via-[#FF6B00] to-[#FFD700] opacity-40 blur-xl" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 border-t border-[#FF006E]/40"
              style={{
                width: `${120 + i * 20}px`,
                bottom: `${i * 5}px`,
              }}
            />
          ))}
        </div>

        {/* Neon lines accent - mobile */}
        <motion.div
          aria-hidden
          className="absolute left-4 top-[20%] h-0.5 w-12 bg-gradient-to-r from-[#FF006E] to-transparent shadow-[0_0_8px_1px_rgba(255,0,110,0.8)]"
          animate={{
            opacity: [0.6, 1, 0.6],
            width: ['3rem', '4rem', '3rem'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        />
        
        <motion.div
          aria-hidden
          className="absolute right-4 top-[60%] h-0.5 w-16 bg-gradient-to-l from-[#00F5FF] to-transparent shadow-[0_0_8px_1px_rgba(0,245,255,0.8)]"
          animate={{
            opacity: [0.6, 1, 0.6],
            width: ['4rem', '5rem', '4rem'],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        />
      </>
    )
  }

  return (
    <>
      {/* Base gradient background - deep purple to dark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0014] via-[#1a0033] via-[#2d004d] to-[#0a0014]"
      />

      {/* Starfield background */}
      {Array.from({ length: 60 }).map((_, i) => (
        <motion.div
          key={i}
          aria-hidden
          className="absolute h-1 w-1 rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeInOut' as const,
          }}
        />
      ))}

      {/* Neon glow orbs */}
      <motion.div
        aria-hidden
        className="absolute left-[-15%] top-[10%] h-96 w-96 rounded-full bg-[#FF006E] opacity-40 blur-[100px]"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
      />
      
      <motion.div
        aria-hidden
        className="absolute right-[-10%] top-[25%] h-80 w-80 rounded-full bg-[#00F5FF] opacity-35 blur-[100px]"
        animate={{
          x: [0, -50, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
      />

      <motion.div
        aria-hidden
        className="absolute left-[25%] bottom-[-10%] h-[32rem] w-[32rem] rounded-full bg-[#B537F2] opacity-40 blur-[100px]"
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
      />

      <motion.div
        aria-hidden
        className="absolute right-[20%] bottom-[10%] h-72 w-72 rounded-full bg-[#FF6B00] opacity-30 blur-[90px]"
        animate={{
          x: [0, 35, 0],
          y: [0, -25, 0],
          scale: [1, 1.18, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
      />

      {/* Retro perspective grid - bottom half */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/2"
        style={{
          perspective: '400px',
          perspectiveOrigin: '50% 100%',
        }}
      >
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[200%] origin-bottom"
          style={{
            backgroundImage: `
              linear-gradient(to bottom, rgba(255, 0, 255, 0.4) 1px, transparent 1px),
              linear-gradient(to right, rgba(0, 245, 255, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: 'rotateX(60deg) translateZ(-100px)',
            y: gridY,
          }}
        />
        
        {/* Grid horizon glow */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF006E] to-transparent opacity-60 shadow-[0_0_20px_4px_rgba(255,0,110,0.6)]" />
      </div>

      {/* Retro sun/moon at horizon */}
      <motion.div
        aria-hidden
        className="absolute bottom-[15%] left-1/2 -translate-x-1/2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        {/* Sun core */}
        <div className="relative h-32 w-32">
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#FFD700] via-[#FF6B00] to-[#FF006E] opacity-90 shadow-[0_0_60px_20px_rgba(255,107,0,0.8)]" />
          
          {/* Horizontal stripes across sun */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-0 right-0 border-t-2 border-[#0a0014]"
              style={{ top: `${(i + 1) * 12.5}%` }}
              animate={{ opacity: [0.6, 0.9, 0.6] }}
              transition={{
                duration: 2 + i * 0.2,
                repeat: Infinity,
                ease: 'easeInOut' as const,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Scanline effect overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,transparent_50%,rgba(255,0,255,0.02)_50%)] bg-[length:100%_4px] opacity-60"
      />

      {/* Moving horizontal scan line */}
      <motion.div
        aria-hidden
        className="absolute left-0 h-[3px] w-full bg-gradient-to-r from-transparent via-[#00F5FF] to-transparent shadow-[0_0_20px_4px_rgba(0,245,255,0.9)]"
        animate={{
          top: ['0%', '100%'],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Vertical neon lines - left */}
      <motion.div
        aria-hidden
        className="absolute left-[8%] top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-[#FF006E] to-transparent opacity-40"
        animate={{
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
      />

      {/* Vertical neon lines - right */}
      <motion.div
        aria-hidden
        className="absolute right-[12%] top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-[#00F5FF] to-transparent opacity-40"
        animate={{
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
      />

      {/* Neon accent lines - decorative */}
      <motion.div
        aria-hidden
        className="absolute left-16 top-[15%] h-1 w-32 bg-gradient-to-r from-[#FF006E] to-transparent shadow-[0_0_15px_3px_rgba(255,0,110,0.9)]"
        animate={{
          opacity: [0.7, 1, 0.7],
          width: ['8rem', '10rem', '8rem'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
      />
      
      <motion.div
        aria-hidden
        className="absolute right-16 top-[40%] h-1 w-28 bg-gradient-to-l from-[#00F5FF] to-transparent shadow-[0_0_15px_3px_rgba(0,245,255,0.9)]"
        animate={{
          opacity: [0.7, 1, 0.7],
          width: ['7rem', '9rem', '7rem'],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
      />

      <motion.div
        aria-hidden
        className="absolute left-20 bottom-[25%] h-1 w-24 bg-gradient-to-r from-[#B537F2] to-transparent shadow-[0_0_15px_3px_rgba(181,55,242,0.9)]"
        animate={{
          opacity: [0.7, 1, 0.7],
          width: ['6rem', '8rem', '6rem'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
      />

      {/* Corner brackets - neon style */}
      <motion.div
        aria-hidden
        className="absolute left-8 top-8 h-20 w-20 border-l-2 border-t-2 border-[#FF006E] shadow-[0_0_10px_2px_rgba(255,0,110,0.6)]"
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
      />

      <motion.div
        aria-hidden
        className="absolute right-8 top-8 h-20 w-20 border-r-2 border-t-2 border-[#00F5FF] shadow-[0_0_10px_2px_rgba(0,245,255,0.6)]"
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
      />

      <motion.div
        aria-hidden
        className="absolute bottom-8 left-8 h-20 w-20 border-b-2 border-l-2 border-[#B537F2] shadow-[0_0_10px_2px_rgba(181,55,242,0.6)]"
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
      />

      <motion.div
        aria-hidden
        className="absolute bottom-8 right-8 h-20 w-20 border-b-2 border-r-2 border-[#FF006E] shadow-[0_0_10px_2px_rgba(255,0,110,0.6)]"
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
      />
    </>
  )
}



