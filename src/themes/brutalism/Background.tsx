import { motion } from 'framer-motion'

interface BrutalismBackgroundProps {
  isMobile: boolean
}

export function BrutalismBackground({ isMobile }: BrutalismBackgroundProps) {
  if (isMobile) {
    return (
      <>
        {/* Mobile animated background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-95"
          style={{ background: 'linear-gradient(135deg, #FCEE4B 0%, #FFB6C1 50%, #2EC4B6 100%)' }}
        />
        
        {/* Mobile animated shapes - optimized for performance */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-80">
          {/* Top left shape */}
          <motion.div
            className="absolute left-[-10%] top-[-5%]"
            animate={{
              x: [0, 15, -10, 0],
              y: [0, 10, -8, 0],
              rotate: [-3, 2, -4, -3],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut' as const,
            }}>
            <div
              className="border-3 border-black shadow-[8px_8px_0_0_#111] overflow-hidden"
              style={{
                width: '100px',
                height: '100px',
                background: 'repeating-linear-gradient(45deg, #FF6F91 0px, #FF6F91 15px, #FFB6C1 15px, #FFB6C1 30px)',
                borderRadius: '1.5rem',
              }}
            />
          </motion.div>

          {/* Top right shape */}
          <motion.div
            className="absolute right-[-8%] top-[8%]"
            animate={{
              x: [0, -12, 8, 0],
              y: [0, 12, -6, 0],
              rotate: [2, -2, 1, 2],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut' as const,
            }}>
            <div
              className="rounded-full border-3 border-black shadow-[8px_8px_0_0_#111] overflow-hidden"
              style={{
                width: '80px',
                height: '80px',
                background: 'radial-gradient(circle, #111 15%, transparent 15%), radial-gradient(circle, #111 15%, transparent 15%), #2EC4B6',
                backgroundSize: '16px 16px',
                backgroundPosition: '0 0, 8px 8px',
              }}
            />
          </motion.div>

          {/* Bottom left shape */}
          <motion.div
            className="absolute left-[5%] bottom-[15%]"
            animate={{
              x: [0, -10, 12, 0],
              y: [0, 8, -10, 0],
              rotate: [0, 8, -6, 0],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: 'easeInOut' as const,
            }}>
            <div
              className="border-3 border-black shadow-[8px_8px_0_0_#111] overflow-hidden"
              style={{
                width: '85px',
                height: '85px',
                clipPath: 'polygon(50% 0%, 100% 90%, 0% 90%)',
                background: 'repeating-linear-gradient(90deg, #FF8C42 0px, #FF8C42 12px, #FFA366 12px, #FFA366 24px)',
              }}
            />
          </motion.div>

          {/* Bottom right shape */}
          <motion.div
            className="absolute right-[8%] bottom-[8%]"
            animate={{
              x: [0, 10, -8, 0],
              y: [0, -8, 10, 0],
              rotate: [1, -6, 4, 1],
            }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: 'easeInOut' as const,
            }}>
            <div
              className="rounded-full border-3 border-black shadow-[8px_8px_0_0_#111] relative overflow-hidden"
              style={{
                width: '90px',
                height: '90px',
                background: '#FFB6C1',
              }}>
              <div className="absolute inset-[30%] rounded-full border-3 border-black bg-[#FFF7E0]" />
            </div>
          </motion.div>
        </motion.div>
      </>
    )
  }

  return (
    <>
      {/* Striped Square - Top Left */}
      <motion.div
        aria-hidden
        className="absolute -left-32 -top-40 h-80 w-80 border-4 border-black shadow-[24px_24px_0_0_#111] overflow-hidden"
        style={{
          background:
            'repeating-linear-gradient(45deg, #FF6F91 0px, #FF6F91 20px, #FFB6C1 20px, #FFB6C1 40px)',
          borderRadius: '2.75rem',
        }}
        animate={{
          x: [0, 32, -24],
          y: [0, 24, -16],
          rotate: [-6, -3, -8],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut' as const,
        }}
      />
      {/* Grid Pattern Square - Bottom Right */}
      <motion.div
        aria-hidden
        className="absolute -bottom-44 right-[-6rem] h-[26rem] w-[26rem] border-4 border-black shadow-[28px_28px_0_0_#111]"
        style={{
          background:
            'linear-gradient(90deg, #111 2px, transparent 2px), linear-gradient(0deg, #111 2px, transparent 2px), #2EC4B6',
          backgroundSize: '40px 40px',
          borderRadius: '3rem',
        }}
        animate={{
          x: [0, -40, 16],
          y: [0, -18, 28],
          rotate: [3, 6, 1],
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
        className="pointer-events-none absolute inset-0">
        {/* Checkerboard Pattern - Top Left */}
        <motion.div
          className="absolute left-[2%] top-[8%]"
          animate={{
            x: [-32, 20, -28, 16],
            y: [-24, 16, -20, 12],
            rotate: [-8, 8, -6],
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

        {/* Dot Grid Circle - Top Right */}
        <motion.div
          className="absolute right-[2%] top-[12%]"
          animate={{
            x: [20, -16, 24, -12],
            y: [-20, 12, -24, 16],
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

        {/* Concentric Circles - Bottom Center */}
        <motion.div
          className="absolute bottom-[5%] left-1/2 -translate-x-1/2"
          animate={{
            x: [-24, 18, -20, 14],
            y: [16, -12, 20, -8],
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

        {/* Striped Triangle - Bottom Left */}
        <motion.div
          className="absolute left-[3%] bottom-[8%]"
          animate={{
            x: [-16, 24, -20, 20],
            y: [20, -16, 24, -12],
            rotate: [0, 12, -8],
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

        {/* Segmented Ring - Bottom Right */}
        <motion.div
          className="absolute right-[4%] bottom-[10%]"
          animate={{
            x: [18, -20, 16, -18],
            y: [-18, 20, -16, 18],
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

        {/* Cross-hatch Octagon - Top Center */}
        <motion.div
          className="absolute top-[3%] left-1/2 -translate-x-1/2"
          animate={{
            x: [-20, 28, -24, 24],
            y: [24, -20, 28, -16],
            rotate: [0, 10, -8],
          }}
          transition={{
            duration: 34,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut' as const,
          }}>
          <div
            className="border-4 border-black shadow-[12px_12px_0_0_#111] overflow-hidden"
            style={{
              width: isMobile ? '130px' : 'min(18vw, 11rem)',
              height: isMobile ? '130px' : 'min(18vw, 11rem)',
              clipPath:
                'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
              position: 'relative',
              background:
                'repeating-linear-gradient(45deg, transparent, transparent 8px, #111 8px, #111 10px), repeating-linear-gradient(-45deg, transparent, transparent 8px, #111 8px, #111 10px), #FFFBF3',
            }}
          />
        </motion.div>

        {/* Diamond Grid - Middle Left */}
        <motion.div
          className="absolute left-[1%] top-[50%]"
          animate={{
            x: [-24, 28, -20, 24],
            y: [20, -24, 16, -20],
            rotate: [-10, 12, -8],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut' as const,
          }}>
          <div
            className="border-4 border-black shadow-[16px_16px_0_0_#111] overflow-hidden"
            style={{
              width: isMobile ? '100px' : 'min(14vw, 9rem)',
              height: isMobile ? '100px' : 'min(14vw, 9rem)',
              borderRadius: '1.5rem',
              background:
                'repeating-linear-gradient(45deg, #2EC4B6 0px, #2EC4B6 12px, transparent 12px, transparent 24px), repeating-linear-gradient(-45deg, #2EC4B6 0px, #2EC4B6 12px, transparent 12px, transparent 24px), #5EDCD4',
            }}
          />
        </motion.div>

        {/* Radial Segments Circle - Right Middle */}
        <motion.div
          className="absolute right-[1%] top-[55%]"
          animate={{
            x: [24, -28, 20, -24],
            y: [-24, 28, -20, 24],
            rotate: [6, -8, 4],
          }}
          transition={{
            duration: 29,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut' as const,
          }}>
          <div
            className="rounded-full border-4 border-black shadow-[14px_14px_0_0_#111] overflow-hidden"
            style={{
              width: isMobile ? '110px' : 'min(15vw, 9.5rem)',
              height: isMobile ? '110px' : 'min(15vw, 9.5rem)',
              background:
                'conic-gradient(from 0deg, #FCEE4B 0deg, #FCEE4B 60deg, #FFEF8A 60deg, #FFEF8A 120deg, #FCEE4B 120deg, #FCEE4B 180deg, #FFEF8A 180deg, #FFEF8A 240deg, #FCEE4B 240deg, #FCEE4B 300deg, #FFEF8A 300deg)',
            }}
          />
        </motion.div>

        {/* Wavy Lines Square - Top Left 2 */}
        <motion.div
          className="absolute left-[8%] top-[28%]"
          animate={{
            x: [-20, 24, -16, 20],
            y: [16, -20, 12, -16],
            rotate: [3, -5, 2],
          }}
          transition={{
            duration: 27,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut' as const,
          }}>
          <div
            className="border-4 border-black shadow-[12px_12px_0_0_#111] overflow-hidden"
            style={{
              width: isMobile ? '90px' : 'min(12vw, 8rem)',
              height: isMobile ? '90px' : 'min(12vw, 8rem)',
              borderRadius: '1.5rem',
              background:
                'repeating-linear-gradient(0deg, #FF6F91 0px, #FF6F91 12px, #FFB6C1 12px, #FFB6C1 24px)',
            }}
          />
        </motion.div>

        {/* Plus Pattern - Right Upper */}
        <motion.div
          className="absolute right-[6%] top-[32%]"
          animate={{
            x: [18, -22, 14, -18],
            y: [-18, 22, -14, 18],
            rotate: [-4, 6, -3],
            scale: [1, 1.05, 0.98],
          }}
          transition={{
            duration: 31,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut' as const,
          }}>
          <div
            className="border-4 border-black shadow-[12px_12px_0_0_#111] overflow-hidden"
            style={{
              width: isMobile ? '95px' : 'min(13vw, 8.5rem)',
              height: isMobile ? '95px' : 'min(13vw, 8.5rem)',
              borderRadius: '1.5rem',
              background:
                'linear-gradient(90deg, transparent 35%, #111 35%, #111 65%, transparent 65%), linear-gradient(0deg, transparent 35%, #111 35%, #111 65%, transparent 65%), #2EC4B6',
            }}
          />
        </motion.div>
      </motion.div>
    </>
  )
}

