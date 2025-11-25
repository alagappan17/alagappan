import { motion, useTransform, type MotionValue } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface LiquidGlassBackgroundProps {
  isMobile: boolean
  scrollProgress?: MotionValue<number>
}

export function LiquidGlassBackground({
  isMobile,
  scrollProgress,
}: LiquidGlassBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  // Always call hooks, use fallback if scrollProgress is not provided
  const fallback = { get: () => 0 } as MotionValue<number>
  const progress = scrollProgress || fallback
  // Varied parallax speeds for depth effect - slower (0.5x), normal (1x), faster (1.5x)
  const scrollY1 = useTransform(progress, [0, 1], [0, 100]) // Slow parallax
  const scrollY2 = useTransform(progress, [0, 1], [0, 500]) // Fast parallax
  const scrollY3 = useTransform(progress, [0, 1], [0, 250]) // Normal parallax
  const scrollY4 = useTransform(progress, [0, 1], [0, 400]) // Fast parallax
  const scrollY5 = useTransform(progress, [0, 1], [0, 150]) // Slow parallax
  const scrollY6 = useTransform(progress, [0, 1], [0, 180]) // Slow parallax
  const scrollY7 = useTransform(progress, [0, 1], [0, 280]) // Normal parallax
  const scrollY8 = useTransform(progress, [0, 1], [0, 260]) // Normal parallax
  const scrollRotate1 = useTransform(progress, [0, 1], [0, 15]) // Slow rotation
  const scrollRotate2 = useTransform(progress, [0, 1], [0, -30]) // Fast rotation
  const scrollRotate3 = useTransform(progress, [0, 1], [0, 10]) // Slow rotation
  const scrollRotate4 = useTransform(progress, [0, 1], [0, -20]) // Fast rotation
  const scrollRotate5 = useTransform(progress, [0, 1], [0, 12]) // Slow rotation

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Ensure video plays
    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.error('Error playing video:', error)
      })
    }
  }, [])

  return (
    <>
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}>
        <source src="/liquid-glass-bg-5.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay to reduce brightness */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-black/10"
      />

      {/* Subtle overlay to maintain glass effect aesthetic */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent"
        animate={{
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
      />

      {/* Floating glass shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden max-w-full">
        {/* Glass Circle 1 - Top Left - Slow Parallax */}
        <motion.div
          aria-hidden
          className="absolute left-[8%] top-[15%] rounded-full border border-white/20 bg-white/10 backdrop-blur-xl"
          style={{
            width: isMobile ? '120px' : '180px',
            height: isMobile ? '120px' : '180px',
            y: scrollY1,
            rotate: scrollRotate1,
            boxShadow:
              '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
          }}
          animate={{
            x: scrollProgress ? undefined : [0, 20, -15, 0],
            y: scrollProgress ? undefined : [0, 15, -10, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        />

        {/* Glass Circle 2 - Top Right - Fast Parallax */}
        <motion.div
          aria-hidden
          className="absolute right-[10%] top-[20%] rounded-full border border-white/20 bg-white/8 backdrop-blur-xl"
          style={{
            width: isMobile ? '100px' : '150px',
            height: isMobile ? '100px' : '150px',
            y: scrollY2,
            rotate: scrollRotate2,
            boxShadow:
              '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
          }}
          animate={{
            x: scrollProgress ? undefined : [0, -18, 12, 0],
            y: scrollProgress ? undefined : [0, 12, -8, 0],
            scale: [1, 0.9, 1.05, 1],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        />

        {/* Glass Blob 1 - Bottom Left - Normal Parallax */}
        <motion.div
          aria-hidden
          className="absolute left-[5%] bottom-[15%] rounded-3xl border border-white/15 bg-white/6 backdrop-blur-xl"
          style={{
            width: isMobile ? '140px' : '200px',
            height: isMobile ? '100px' : '140px',
            y: scrollY3,
            boxShadow:
              '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.15)',
          }}
          animate={{
            x: scrollProgress ? undefined : [0, 15, -12, 0],
            y: scrollProgress ? undefined : [0, -10, 8, 0],
            rotate: [0, 5, -3, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        />

        {/* Glass Blob 2 - Bottom Right - Fast Parallax */}
        <motion.div
          aria-hidden
          className="absolute right-[8%] bottom-[12%] rounded-3xl border border-white/15 bg-white/8 backdrop-blur-xl"
          style={{
            width: isMobile ? '110px' : '160px',
            height: isMobile ? '130px' : '180px',
            y: scrollY4,
            rotate: scrollRotate3,
            boxShadow:
              '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
          }}
          animate={{
            x: scrollProgress ? undefined : [0, -14, 10, 0],
            y: scrollProgress ? undefined : [0, 12, -9, 0],
            rotate: scrollProgress ? undefined : [0, -4, 3, 0],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        />

        {/* Glass Circle 3 - Middle Center - Slow Parallax */}
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-[50%] -translate-x-1/2 rounded-full border border-white/18 bg-white/7 backdrop-blur-xl"
          style={{
            width: isMobile ? '90px' : '130px',
            height: isMobile ? '90px' : '130px',
            y: scrollY5,
            boxShadow:
              '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.18)',
          }}
          animate={{
            x: scrollProgress ? undefined : [0, 16, -12, 0],
            y: scrollProgress ? undefined : [0, -14, 10, 0],
            scale: [1, 1.08, 0.92, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        />

        {/* Glass Triangle - Left Middle - Slow Parallax */}
        <motion.div
          aria-hidden
          className="absolute left-[15%] top-[45%]"
          style={{
            y: scrollY6,
            rotate: scrollRotate4,
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          }}
          animate={{
            x: scrollProgress ? undefined : [0, 14, -10, 0],
            y: scrollProgress ? undefined : [0, -12, 8, 0],
            rotate: scrollProgress ? undefined : [0, 5, -3, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}>
          <div
            className="rounded-2xl border border-white/15 bg-white/8 backdrop-blur-xl"
            style={{
              width: isMobile ? '100px' : '140px',
              height: isMobile ? '100px' : '140px',
              boxShadow:
                '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
            }}
          />
        </motion.div>

        {/* Glass Circle with Pattern - Right Middle - Normal Parallax */}
        <motion.div
          aria-hidden
          className="absolute right-[18%] top-[55%] rounded-full border border-white/18 bg-white/9 backdrop-blur-xl"
          style={{
            width: isMobile ? '105px' : '145px',
            height: isMobile ? '105px' : '145px',
            y: scrollY7,
            boxShadow:
              '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
          }}
          animate={{
            x: scrollProgress ? undefined : [0, -17, 13, 0],
            y: scrollProgress ? undefined : [0, 11, -7, 0],
            scale: [1, 0.94, 1.06, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}>
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 30% 30%, rgba(0, 122, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(175, 82, 222, 0.12) 0%, transparent 50%)',
            }}
          />
        </motion.div>

        {/* Glass Triangle - Top Right - Slow Parallax */}
        <motion.div
          aria-hidden
          className="absolute right-[22%] top-[10%]"
          style={{
            y: scrollY6,
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          }}
          animate={{
            x: scrollProgress ? undefined : [0, -12, 9, 0],
            y: scrollProgress ? undefined : [0, 10, -7, 0],
            rotate: [0, -4, 3, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}>
          <div
            className="rounded-xl border border-white/12 bg-white/6 backdrop-blur-xl"
            style={{
              width: isMobile ? '85px' : '120px',
              height: isMobile ? '85px' : '120px',
              boxShadow:
                '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.15)',
            }}
          />
        </motion.div>

        {/* Glass Circle with Dots - Left Bottom - Normal Parallax */}
        <motion.div
          aria-hidden
          className="absolute left-[20%] bottom-[18%] rounded-full border border-white/18 bg-white/7 backdrop-blur-xl"
          style={{
            width: isMobile ? '95px' : '135px',
            height: isMobile ? '95px' : '135px',
            y: scrollY7,
            rotate: scrollRotate3,
            boxShadow:
              '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.18)',
          }}
          animate={{
            x: scrollProgress ? undefined : [0, 15, -11, 0],
            y: scrollProgress ? undefined : [0, -13, 9, 0],
            rotate: scrollProgress ? undefined : [3, -5, 2],
          }}
          transition={{
            duration: 27,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}>
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(0, 122, 255, 0.2) 2px, transparent 2px), radial-gradient(circle, rgba(0, 122, 255, 0.2) 2px, transparent 2px)',
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 10px 10px',
            }}
          />
        </motion.div>

        {/* Glass Hexagon - Top Left Middle - Normal Parallax */}
        <motion.div
          aria-hidden
          className="absolute left-[28%] top-[38%]"
          style={{
            y: scrollY8,
            rotate: scrollRotate5,
            clipPath:
              'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
          animate={{
            x: scrollProgress ? undefined : [0, -16, 12, 0],
            y: scrollProgress ? undefined : [0, 13, -9, 0],
            rotate: scrollProgress ? undefined : [0, -4, 3, 0],
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}>
          <div
            className="rounded-2xl border border-white/15 bg-white/8 backdrop-blur-xl"
            style={{
              width: isMobile ? '100px' : '140px',
              height: isMobile ? '100px' : '140px',
              boxShadow:
                '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
            }}
          />
        </motion.div>
      </div>
    </>
  )
}
