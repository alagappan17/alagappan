import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'

const badgeVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: 0.1,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
}

const headingVariants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: 0.25, ease: [0.19, 1, 0.22, 1] as const },
  },
}

const bodyVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: 0.5, ease: 'easeOut' as const },
  },
}

const links = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/alagappan-n/',
    caption: "Let's connect!",
    type: 'link' as const,
  },
  {
    label: 'Email',
    href: 'mailto:alagappanforwork@gmail.com',
    caption: 'alagappanforwork@gmail.com',
    type: 'email' as const,
    email: 'alagappanforwork@gmail.com',
  },
]

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)
const wrapProgress = (value: number) => ((value % 100) + 100) % 100

const BASE_VELOCITY = { x: 0.0018, y: 0.0013 }
const POINTER_MULTIPLIER = 0.0012
const MAX_POINTER_BOOST = 0.05
const POINTER_SMOOTHING = 0.32
const POINTER_DECAY = 0.9
const CARD_TILT_MAX = 6
const CARD_GLARE_REST = { x: 52, y: 48 }
const CARD_SCALE_MIN = 0.78

export function BrutalismTheme() {
  const [copiedEmail, setCopiedEmail] = useState(false)

  const gradientX = useMotionValue(56)
  const gradientY = useMotionValue(42)
  const pointerVelocity = useRef({ x: 0, y: 0 })
  const pointerSpeed = useMotionValue(0)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    const touchDevice =
      typeof navigator !== 'undefined' ? navigator.maxTouchPoints > 1 : false
    return window.innerWidth <= 768 || touchDevice
  })

  const pointerSpeedSpring = useSpring(pointerSpeed, {
    stiffness: 120,
    damping: 24,
  })
  const cardRef = useRef<HTMLDivElement | null>(null)
  const rotateX = useSpring(0, { stiffness: 160, damping: 22 })
  const rotateY = useSpring(0, { stiffness: 160, damping: 22 })
  const cardGlareX = useSpring(CARD_GLARE_REST.x, {
    stiffness: 150,
    damping: 20,
  })
  const cardGlareY = useSpring(CARD_GLARE_REST.y, {
    stiffness: 150,
    damping: 20,
  })
  const cardScale = useSpring(1, { stiffness: 160, damping: 24 })

  const gradientBackground = useMotionTemplate`
    linear-gradient(135deg, rgba(255, 111, 145, 0.35) 0%, transparent 65%),
    linear-gradient(215deg, rgba(46, 196, 182, 0.3) 10%, transparent 60%),
    radial-gradient(120% 120% at ${gradientX}% ${gradientY}%, rgba(255, 255, 255, 0.28), transparent 72%)
  `

  const spectralBackground = `
    radial-gradient(38% 38% at 28% 32%, rgba(255, 111, 145, 0.16), transparent 72%),
    radial-gradient(32% 32% at 68% 30%, rgba(252, 238, 75, 0.18), transparent 74%),
    radial-gradient(42% 42% at 52% 74%, rgba(46, 196, 182, 0.15), transparent 78%)
  `

  const sheenOpacity = useTransform(pointerSpeedSpring, [0, 1], [0.24, 0.52])
  const cardSheen = useMotionTemplate`
    linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 70%),
    repeating-linear-gradient(
      135deg,
      rgba(17, 17, 17, 0.06) 0px,
      rgba(17, 17, 17, 0.06) 20px,
      transparent 20px,
      transparent 40px
    )
  `
  const cardSheenOpacity = useTransform(pointerSpeedSpring, [0, 1], [0.2, 0.42])
  const mobileBackground =
    'linear-gradient(135deg, #FCEE4B 0%, #FFB6C1 50%, #2EC4B6 100%)'

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mediaQuery = window.matchMedia('(max-width: 768px)')

    const updateIsMobile = () => {
      const touchDevice =
        typeof navigator !== 'undefined' ? navigator.maxTouchPoints > 1 : false
      setIsMobile(mediaQuery.matches || touchDevice)
    }

    updateIsMobile()

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateIsMobile)
    } else {
      mediaQuery.addListener(updateIsMobile)
    }

    window.addEventListener('resize', updateIsMobile)

    return () => {
      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', updateIsMobile)
      } else {
        mediaQuery.removeListener(updateIsMobile)
      }

      window.removeEventListener('resize', updateIsMobile)
    }
  }, [])

  useAnimationFrame((_, delta) => {
    if (isMobile) return

    const xVelocity = BASE_VELOCITY.x
    const yVelocity = BASE_VELOCITY.y

    const nextX = wrapProgress(gradientX.get() + xVelocity * delta)
    const nextY = wrapProgress(gradientY.get() + yVelocity * delta)

    gradientX.set(nextX)
    gradientY.set(nextY)

    pointerVelocity.current.x *= POINTER_DECAY
    pointerVelocity.current.y *= POINTER_DECAY

    const pointerMagnitude = Math.sqrt(
      pointerVelocity.current.x ** 2 + pointerVelocity.current.y ** 2
    )
    pointerSpeed.set(clamp(pointerMagnitude / MAX_POINTER_BOOST, 0, 1))

    if (Math.abs(pointerVelocity.current.x) < 0.0001)
      pointerVelocity.current.x = 0
    if (Math.abs(pointerVelocity.current.y) < 0.0001)
      pointerVelocity.current.y = 0
  })

  useEffect(() => {
    if (!isMobile) return
    gradientX.set(56)
    gradientY.set(42)
    pointerVelocity.current.x = 0
    pointerVelocity.current.y = 0
    pointerSpeed.set(0)
  }, [gradientX, gradientY, isMobile, pointerSpeed])

  const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (card) {
      const rect = card.getBoundingClientRect()
      const relativeX =
        (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
      const relativeY =
        (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)

      const clampedX = clamp(relativeX, -1, 1)
      const clampedY = clamp(relativeY, -1, 1)

      rotateY.set(
        clamp(-clampedX * CARD_TILT_MAX, -CARD_TILT_MAX, CARD_TILT_MAX)
      )
      rotateX.set(
        clamp(clampedY * CARD_TILT_MAX, -CARD_TILT_MAX, CARD_TILT_MAX)
      )

      const glareX = clamp(
        ((event.clientX - rect.left) / rect.width) * 100,
        0,
        100
      )
      const glareY = clamp(
        ((event.clientY - rect.top) / rect.height) * 100,
        0,
        100
      )
      cardGlareX.set(glareX)
      cardGlareY.set(glareY)
    }

    pointerVelocity.current.x = clamp(
      pointerVelocity.current.x * POINTER_SMOOTHING +
        event.movementX * POINTER_MULTIPLIER,
      -MAX_POINTER_BOOST,
      MAX_POINTER_BOOST
    )
    pointerVelocity.current.y = clamp(
      pointerVelocity.current.y * POINTER_SMOOTHING +
        event.movementY * POINTER_MULTIPLIER,
      -MAX_POINTER_BOOST,
      MAX_POINTER_BOOST
    )
  }

  const handleMouseLeave = () => {
    pointerVelocity.current.x = 0
    pointerVelocity.current.y = 0
    pointerSpeed.set(0)
    rotateX.set(0)
    rotateY.set(0)
    cardGlareX.set(CARD_GLARE_REST.x)
    cardGlareY.set(CARD_GLARE_REST.y)
  }
  useEffect(() => {
    const updateCardScale = () => {
      const card = cardRef.current
      if (!card) return

      const naturalHeight = card.scrollHeight
      const naturalWidth = card.scrollWidth

      const verticalPadding = isMobile ? 72 : 96
      const horizontalPadding = isMobile ? 32 : 48

      const availableHeight = Math.max(
        window.innerHeight - verticalPadding,
        320
      )
      const availableWidth = Math.max(
        window.innerWidth - horizontalPadding,
        320
      )

      const heightScale = availableHeight / naturalHeight
      const widthScale = availableWidth / naturalWidth
      const nextScale = clamp(
        Math.min(heightScale, widthScale),
        isMobile ? 0.92 : CARD_SCALE_MIN,
        1
      )

      cardScale.set(nextScale)
    }

    updateCardScale()
    window.addEventListener('resize', updateCardScale)

    const card = cardRef.current
    let resizeObserver: ResizeObserver | undefined
    if (card && 'ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(updateCardScale)
      resizeObserver.observe(card)
    }

    return () => {
      window.removeEventListener('resize', updateCardScale)
      resizeObserver?.disconnect()
    }
  }, [cardScale, isMobile])

  const handleCopyEmail = async (e: ReactMouseEvent) => {
    e.preventDefault()
    try {
      await navigator.clipboard.writeText('alagappanforwork@gmail.com')
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }
  return (
    <div
      className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden px-4 py-20 text-[#111] sm:px-6 sm:py-24 md:py-8"
      style={
        isMobile
          ? { background: mobileBackground }
          : {
              background:
                'repeating-linear-gradient(135deg, #FCEE4B 0px, #FCEE4B 120px, #FFF5CC 120px, #FFF5CC 122px)',
            }
      }
      onMouseMove={isMobile ? undefined : handleMouseMove}
      onMouseLeave={isMobile ? undefined : handleMouseLeave}>
      {!isMobile && (
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
            className="pointer-events-none absolute inset-0"
            style={{ background: gradientBackground }}
            animate={{ opacity: [0.8, 0.92, 0.8] }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: 'easeInOut' as const,
            }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-multiply"
            style={{ background: spectralBackground, opacity: sheenOpacity }}
            animate={{ rotate: [0, 1.8, 0], scale: [1.01, 1.04, 1.01] }}
            transition={{
              duration: 16,
              repeat: Infinity,
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
                    'repeating-linear-gradient(90deg, #FCEE4B 0px, #FCEE4B 16px, #FFE8A8 16px, #FFE8A8 32px)',
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
      )}
      {isMobile && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-95"
          style={{ background: mobileBackground }}
        />
      )}
      <motion.main
        ref={cardRef}
        initial="initial"
        animate="animate"
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          scale: cardScale,
          transformPerspective: '1600px',
          transformStyle: isMobile ? 'flat' : 'preserve-3d',
          willChange: isMobile ? 'auto' : 'transform',
        }}
        className="relative z-10 w-full max-w-md space-y-4 rounded-[1.5rem] border-[3px] border-black bg-[#FFF7E0] p-5 shadow-[8px_8px_0_0_#111] sm:max-w-2xl sm:space-y-8 sm:rounded-[2.5rem] sm:border-4 sm:p-10 sm:shadow-[18px_18px_0_0_#111] md:space-y-10 md:p-12">
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-[1.5rem] sm:rounded-[2.5rem]"
          animate={{
            background: [
              'linear-gradient(135deg, rgba(255, 182, 193, 0.4) 0%, transparent 60%)',
              'linear-gradient(135deg, rgba(94, 234, 212, 0.35) 20%, transparent 70%)',
              'linear-gradient(135deg, rgba(92, 124, 250, 0.35) 10%, transparent 65%)',
              'linear-gradient(135deg, rgba(255, 182, 193, 0.4) 0%, transparent 60%)',
            ],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.5rem] sm:rounded-[2.5rem]"
          style={{
            background: cardSheen,
            opacity: isMobile ? 0.24 : cardSheenOpacity,
            mixBlendMode: isMobile ? 'normal' : 'multiply',
          }}
        />
        <motion.span
          variants={badgeVariants}
          className="relative z-10 inline-flex items-center gap-1.5 rounded-full border-[2.5px] border-black bg-[#FFFBF3] px-3 py-1.5 text-[0.6rem] font-black uppercase tracking-[0.18em] text-[#111] shadow-[3px_3px_0_0_#111] sm:gap-3 sm:border-[3px] sm:px-6 sm:py-3 sm:text-xs sm:tracking-[0.35em] sm:shadow-[6px_6px_0_0_#111]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2EC4B6] ring-2 ring-black sm:h-3 sm:w-3" />
          Initial Commit Deployed
        </motion.span>

        <motion.div
          className="relative z-10 space-y-2.5 font-display sm:space-y-6"
          variants={headingVariants}>
          <h1 className="text-[1.875rem] font-black leading-[1.05] sm:text-4xl md:text-5xl lg:text-6xl">
            Alagappan N
          </h1>
          <motion.p
            variants={bodyVariants}
            className="max-w-xl text-[0.875rem] leading-[1.55] text-[#222] sm:text-base md:text-xl">
            Hey, I&apos;m a Software Engineer with a foundation rooted in early
            curiosity for computers and how things work. Over time, I found
            programming to be the right blend of my creative and logical
            personas.
          </motion.p>
        </motion.div>

        <motion.div
          className="relative z-10 space-y-3 sm:space-y-6"
          initial="initial"
          animate="animate"
          variants={bodyVariants}>
          <motion.p
            variants={bodyVariants}
            className="max-w-xl text-[0.875rem] leading-[1.55] text-[#222] sm:text-base md:text-xl">
            Right now, I'm building HierBridge, a platform to address
            disengagement and lost feedback within organisations. You can learn
            more about it on{' '}
            <a
              href="https://www.hierbridge.com"
              target="_blank"
              rel="noreferrer"
              className="font-black text-[#111] underline decoration-[3px] decoration-[#111]/80 transition-colors hover:text-[#FF6F91]">
              www.hierbridge.com
            </a>
            .
          </motion.p>
          <motion.ul
            className="grid gap-2 sm:grid-cols-2 sm:gap-4"
            initial="initial"
            animate="animate">
            {links.map((link, index) => (
              <motion.li
                key={link.label}
                variants={{
                  initial: { opacity: 0, y: 24 },
                  animate: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 0.65 + index * 0.12,
                      duration: 0.85,
                      ease: [0.25, 0.8, 0.25, 1] as const,
                    },
                  },
                }}>
                <motion.a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="group relative flex flex-col gap-0.5 overflow-hidden rounded-xl border-[3px] border-black px-3 py-2 text-[#111] sm:gap-2 sm:rounded-3xl sm:border-4 sm:px-5 sm:py-4"
                  style={{
                    backgroundColor:
                      link.type === 'email' ? '#FFB6C1' : '#FFFBF3',
                    boxShadow: '6px 6px 0 0 #111',
                  }}
                  whileHover={{
                    y: -8,
                    boxShadow: '14px 14px 0 0 #111',
                    rotate: link.type === 'email' ? 1.2 : -1.2,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 240,
                    damping: 20,
                    mass: 0.8,
                  }}
                  whileTap={{ scale: 0.96, boxShadow: '5px 5px 0 0 #111' }}>
                  <div className="flex items-center justify-between">
                    <span className="text-[0.875rem] font-black sm:text-lg">{link.label}</span>
                    <div className="flex items-center gap-1 sm:gap-2">
                      {link.type === 'email' && (
                        <motion.button
                          onClick={handleCopyEmail}
                          className="flex h-7 w-7 items-center justify-center rounded-lg border-[2.5px] border-black text-black sm:h-10 sm:w-10 sm:rounded-2xl sm:border-[3px]"
                          style={{
                            backgroundColor: '#FFFFFF',
                            boxShadow: '3px 3px 0 0 #111',
                          }}
                          whileHover={{
                            y: -4,
                            boxShadow: '7px 7px 0 0 #111',
                            rotate: -3,
                          }}
                          whileTap={{
                            scale: 0.88,
                            boxShadow: '2px 2px 0 0 #111',
                          }}
                          title="Copy email">
                          {copiedEmail ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="h-3 w-3 text-[#22B573] sm:h-4 sm:w-4">
                              <path
                                fillRule="evenodd"
                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="h-3 w-3 text-[#111] sm:h-4 sm:w-4">
                              <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
                              <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
                            </svg>
                          )}
                        </motion.button>
                      )}
                      <motion.span
                        className="flex h-7 w-7 items-center justify-center rounded-lg border-[2.5px] border-black bg-white text-[#111] sm:h-10 sm:w-10 sm:rounded-2xl sm:border-[3px]"
                        style={{ boxShadow: '3px 3px 0 0 #111' }}
                        animate={{
                          y: [0, -4, 0],
                          rotate: [0, 4, -4, 0],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          repeatType: 'mirror',
                          ease: 'easeInOut' as const,
                          delay: index * 0.35,
                        }}>
                        <span className="text-sm font-black sm:text-lg">→</span>
                      </motion.span>
                    </div>
                  </div>
                  <p className="text-[0.65rem] font-medium leading-[1.2] text-[#333] sm:text-sm">
                    {link.caption}
                  </p>

                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="absolute inset-x-5 bottom-4 h-2 rounded-full bg-[#111]/10" />
                  </motion.span>
                </motion.a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          className="relative z-10 flex items-center gap-1.5 text-[0.65rem] font-medium text-[#333] sm:gap-3 sm:text-sm"
          variants={bodyVariants}>
          <motion.span
            className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg border-[2.5px] border-black bg-white shadow-[3px_3px_0_0_#111] sm:h-12 sm:w-12 sm:rounded-3xl sm:border-4 sm:shadow-[8px_8px_0_0_#111]"
            animate={{ y: [0, -2, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut' as const,
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 text-[#111] sm:h-6 sm:w-6">
              <path
                fillRule="evenodd"
                d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-lg bg-[#FFDF6B]/40 sm:rounded-3xl"
              animate={{ opacity: [0.7, 0.3, 0.7] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut' as const,
              }}
            />
          </motion.span>

          <span className="text-[0.75rem] font-black leading-[1.2] text-[#111] sm:text-base">
            Based in Hyderabad, India
          </span>
        </motion.div>
      </motion.main>
    </div>
  )
}

