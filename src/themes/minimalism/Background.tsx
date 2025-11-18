import { motion } from 'framer-motion'

interface MinimalismBackgroundProps {
  isMobile: boolean
}

export function MinimalismBackground({ isMobile }: MinimalismBackgroundProps) {
  const mobileBackground = 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)'

  if (isMobile) {
    return (
      <>
        {/* Mobile base background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: mobileBackground }}
        />
        
        {/* Mobile animated elements - minimal and elegant */}
        {/* Top line */}
        <motion.div
          aria-hidden
          className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' as const }}
        />
        
        {/* Circle - top right */}
        <motion.div
          aria-hidden
          className="absolute right-[5%] top-[8%] h-24 w-24 rounded-full border border-white/10"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' as const }}
        />
        
        {/* Square - bottom left */}
        <motion.div
          aria-hidden
          className="absolute bottom-[12%] left-[8%] h-20 w-20 border border-white/10"
          style={{ rotate: 45 }}
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' as const }}
        />
        
        {/* Dot grid - bottom right */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute bottom-[8%] right-[6%]"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' as const }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="mb-2 flex gap-2">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="h-1 w-1 bg-white/15" />
              ))}
            </div>
          ))}
        </motion.div>
        
        {/* Vertical line - right */}
        <motion.div
          aria-hidden
          className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' as const }}
        />
        
        {/* Bottom line */}
        <motion.div
          aria-hidden
          className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' as const }}
        />
      </>
    )
  }

  return (
    <>
      {/* Strong horizontal line - top */}
      <motion.div
        aria-hidden
        className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
      />
      
      {/* Strong vertical line - right */}
      <motion.div
        aria-hidden
        className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 0.4 }}
      />

      {/* Large circle accent - top right */}
      <motion.div
        aria-hidden
        className="absolute right-[8%] top-[12%] h-40 w-40 rounded-full border-2 border-white/15"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
      />

      {/* Large square accent - bottom left */}
      <motion.div
        aria-hidden
        className="absolute bottom-[18%] left-[10%] h-32 w-32 border-2 border-white/15"
        initial={{ scale: 0, rotate: 0, opacity: 0 }}
        animate={{ scale: 1, rotate: 45, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
      />

      {/* Grid pattern in corner */}
      <div aria-hidden className="pointer-events-none absolute bottom-10 right-10">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="mb-3 flex gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 + i * 0.1 }}>
            {[...Array(4)].map((_, j) => (
              <div
                key={j}
                className="h-1.5 w-1.5 bg-white/20"
              />
            ))}
          </motion.div>
        ))}
      </div>

      {/* Thin line accent - bottom */}
      <motion.div
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 1.2 }}
      />
    </>
  )
}

