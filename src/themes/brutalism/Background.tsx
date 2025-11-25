import { motion, useTransform, type MotionValue } from 'framer-motion'

interface BrutalismBackgroundProps {
  isMobile: boolean
  scrollProgress?: MotionValue<number>
}

export function BrutalismBackground({ isMobile, scrollProgress }: BrutalismBackgroundProps) {
  // Always call hooks, use fallback if scrollProgress is not provided
  const fallback = { get: () => 0 } as MotionValue<number>
  const progress = scrollProgress || fallback
  // Varied parallax speeds for depth effect - slower (0.5x), normal (1x), faster (1.5x)
  const scrollY1 = useTransform(progress, [0, 1], [0, 150]) // Slow parallax
  const scrollY2 = useTransform(progress, [0, 1], [0, 600]) // Fast parallax
  const scrollY3 = useTransform(progress, [0, 1], [0, 300]) // Normal parallax
  const scrollY4 = useTransform(progress, [0, 1], [0, 450]) // Fast parallax
  const scrollY5 = useTransform(progress, [0, 1], [0, 200]) // Slow parallax
  const scrollY6 = useTransform(progress, [0, 1], [0, 180]) // Slow parallax
  const scrollY7 = useTransform(progress, [0, 1], [0, 220]) // Normal parallax
  const scrollY8 = useTransform(progress, [0, 1], [0, 240]) // Normal parallax
  const scrollRotate1 = useTransform(progress, [0, 1], [0, 20]) // Slow rotation
  const scrollRotate2 = useTransform(progress, [0, 1], [0, -40]) // Fast rotation
  const scrollRotate3 = useTransform(progress, [0, 1], [0, 15]) // Slow rotation
  const scrollRotate4 = useTransform(progress, [0, 1], [0, -25]) // Fast rotation
  const scrollRotate5 = useTransform(progress, [0, 1], [0, 18]) // Slow rotation

  return (
    <>
      {/* Striped Square - Top Left - Slow Parallax */}
      <motion.div
        aria-hidden
        className="absolute -left-32 -top-40 h-80 w-80 border-4 border-black shadow-[24px_24px_0_0_#111] overflow-hidden"
        style={{
          background:
            'repeating-linear-gradient(45deg, #FF6F91 0px, #FF6F91 20px, #FFB6C1 20px, #FFB6C1 40px)',
          borderRadius: '2.75rem',
          y: scrollY1,
          rotate: scrollRotate1,
        }}
        animate={{
          x: [0, 32, -24],
          y: scrollProgress ? undefined : [0, 24, -16],
          rotate: scrollProgress ? undefined : [-6, -3, -8],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut' as const,
        }}
      />
      {/* Grid Pattern Square - Bottom Right - Fast Parallax */}
      <motion.div
        aria-hidden
        className="absolute -bottom-44 right-[-6rem] h-[26rem] w-[26rem] border-4 border-black shadow-[28px_28px_0_0_#111]"
        style={{
          background:
            'linear-gradient(90deg, #111 2px, transparent 2px), linear-gradient(0deg, #111 2px, transparent 2px), #2EC4B6',
          backgroundSize: '40px 40px',
          borderRadius: '3rem',
          y: scrollY2,
          rotate: scrollRotate2,
        }}
        animate={{
          x: [0, -40, 16],
          y: scrollProgress ? undefined : [0, -18, 28],
          rotate: scrollProgress ? undefined : [3, 6, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut' as const,
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Checkerboard Pattern - Top Left - Normal Parallax */}
        <motion.div
          className="absolute left-[5%] top-[15%]"
          style={{
            y: scrollY3,
            rotate: scrollRotate3,
          }}
          animate={{
            x: [-32, 20, -28, 16],
            y: scrollProgress ? undefined : [-24, 16, -20, 12],
            rotate: scrollProgress ? undefined : [-8, 8, -6],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut' as const,
          }}>
          <div
            className="border-4 border-black shadow-[16px_16px_0_0_#111] overflow-hidden"
            style={{
              width: isMobile ? '140px' : 'min(20vw, 12rem)',
              height: isMobile ? '140px' : 'min(20vw, 12rem)',
              background:
                'repeating-conic-gradient(#FFDF6B 0% 25%, #FCEE4B 0% 50%) 50% / 40px 40px',
              borderRadius: '2rem',
            }}
          />
        </motion.div>

        {/* Dot Grid Circle - Top Right - Fast Parallax */}
        <motion.div
          className="absolute right-[8%] top-[20%]"
          style={{
            y: scrollY4,
          }}
          animate={{
            x: [20, -16, 24, -12],
            y: scrollProgress ? undefined : [-20, 12, -24, 16],
            rotate: [4, -4, 2],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut' as const,
          }}>
          <div
            className="rounded-full border-4 border-black shadow-[14px_14px_0_0_#111] overflow-hidden"
            style={{
              width: isMobile ? '120px' : 'min(18vw, 11rem)',
              height: isMobile ? '120px' : 'min(18vw, 11rem)',
              background:
                'radial-gradient(circle, #111 15%, transparent 15%), radial-gradient(circle, #111 15%, transparent 15%), #FF6F91',
              backgroundSize: '24px 24px',
              backgroundPosition: '0 0, 12px 12px',
            }}
          />
        </motion.div>

        {/* Concentric Circles - Bottom Center - Slow Parallax */}
        <motion.div
          className="absolute bottom-[10%] left-1/2 -translate-x-1/2"
          style={{
            y: scrollY5,
          }}
          animate={{
            x: [-24, 18, -20, 14],
            y: scrollProgress ? undefined : [16, -12, 20, -8],
            rotate: [-5, 6, -4],
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut' as const,
          }}>
          <div
            className="rounded-full border-4 border-black shadow-[16px_16px_0_0_#111] relative overflow-hidden"
            style={{
              width: isMobile ? '140px' : 'min(22vw, 13rem)',
              height: isMobile ? '140px' : 'min(22vw, 13rem)',
              background: '#2EC4B6',
            }}>
            <div
              className="absolute inset-0"
              style={{
                background:
                  'repeating-radial-gradient(circle at center, transparent 0px, transparent 16px, #111 16px, #111 20px)',
              }}
            />
          </div>
        </motion.div>

        {/* Striped Triangle - Left Middle - Slow Parallax */}
        <motion.div
          className="absolute left-[12%] top-[45%]"
          style={{
            y: scrollY6,
            rotate: scrollRotate4,
          }}
          animate={{
            x: [-16, 24, -20, 20],
            y: scrollProgress ? undefined : [20, -16, 24, -12],
            rotate: scrollProgress ? undefined : [0, 12, -8],
            scale: [1, 1.08, 0.96],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut' as const,
          }}>
          <div
            className="border-4 border-black shadow-[14px_16px_0_0_#111] overflow-hidden"
            style={{
              width: isMobile ? '110px' : 'min(18vw, 10rem)',
              height: isMobile ? '110px' : 'min(18vw, 10rem)',
              clipPath: 'polygon(50% 0%, 100% 90%, 0% 90%)',
              background:
                'repeating-linear-gradient(90deg, #FF8C42 0px, #FF8C42 16px, #FFA366 16px, #FFA366 32px)',
            }}
          />
        </motion.div>

        {/* Patterned Circle - Right Middle - Normal Parallax */}
        <motion.div
          className="absolute right-[15%] top-[55%]"
          style={{
            y: scrollY7,
          }}
          animate={{
            x: [18, -20, 16, -18],
            y: scrollProgress ? undefined : [-18, 20, -16, 18],
            rotate: [2, -8, 6],
          }}
          transition={{
            duration: 38,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut' as const,
          }}>
          <div
            className="rounded-full border-4 border-black shadow-[14px_14px_0_0_#111] relative overflow-hidden"
            style={{
              width: isMobile ? '120px' : 'min(16vw, 11rem)',
              height: isMobile ? '120px' : 'min(16vw, 11rem)',
              background: '#FFB6C1',
            }}>
            <div className="absolute inset-[30%] rounded-full border-4 border-black bg-[#FFF7E0]" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 0deg, transparent 80deg, #111 80deg, #111 100deg, transparent 100deg, transparent 180deg, #111 180deg, #111 200deg, transparent 200deg)',
              }}
            />
          </div>
        </motion.div>

        {/* Triangle Pattern - Top Center Right */}
        <motion.div
          className="absolute right-[20%] top-[8%]"
          style={{
            y: scrollY6,
          }}
          animate={{
            x: [-14, 18, -12, 16],
            y: scrollProgress ? undefined : [12, -16, 10, -14],
            rotate: [0, 8, -6, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut' as const,
          }}>
          <div
            className="border-4 border-black shadow-[12px_12px_0_0_#111] overflow-hidden"
            style={{
              width: isMobile ? '95px' : 'min(13vw, 8.5rem)',
              height: isMobile ? '95px' : 'min(13vw, 8.5rem)',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              background:
                'repeating-linear-gradient(45deg, #2EC4B6 0px, #2EC4B6 12px, #5EDCD4 12px, #5EDCD4 24px)',
            }}
          />
        </motion.div>

        {/* Circle with Concentric Rings Pattern - Left Bottom */}
        <motion.div
          className="absolute left-[18%] bottom-[20%]"
          style={{
            y: scrollY7,
            rotate: scrollRotate3,
          }}
          animate={{
            x: [20, -18, 16, -20],
            y: scrollProgress ? undefined : [-16, 20, -14, 18],
            rotate: scrollProgress ? undefined : [6, -8, 4],
          }}
          transition={{
            duration: 29,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut' as const,
          }}>
          <div
            className="rounded-full border-4 border-black shadow-[14px_14px_0_0_#111] relative overflow-hidden"
            style={{
              width: isMobile ? '110px' : 'min(15vw, 9.5rem)',
              height: isMobile ? '110px' : 'min(15vw, 9.5rem)',
              background: '#FCEE4B',
            }}>
            <div
              className="absolute inset-0"
              style={{
                background:
                  'repeating-radial-gradient(circle at center, transparent 0px, transparent 8px, #111 8px, #111 12px, transparent 12px, transparent 20px, #111 20px, #111 24px)',
              }}
            />
          </div>
        </motion.div>

        {/* Hexagon Pattern - Top Left Middle - Normal Parallax */}
        <motion.div
          className="absolute left-[25%] top-[35%]"
          style={{
            y: scrollY8,
            rotate: scrollRotate5,
          }}
          animate={{
            x: [-18, 22, -16, 20],
            y: scrollProgress ? undefined : [14, -18, 12, -16],
            rotate: scrollProgress ? undefined : [-5, 7, -4],
          }}
          transition={{
            duration: 31,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut' as const,
          }}>
          <div
            className="border-4 border-black shadow-[15px_15px_0_0_#111] overflow-hidden"
            style={{
              width: isMobile ? '100px' : 'min(14vw, 9rem)',
              height: isMobile ? '100px' : 'min(14vw, 9rem)',
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              background:
                'repeating-linear-gradient(60deg, #FF6F91 0px, #FF6F91 10px, #FFB6C1 10px, #FFB6C1 20px)',
            }}
          />
        </motion.div>
      </motion.div>
    </>
  )
}

