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

function App() {
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

  const inverseGradientX = useTransform(gradientX, (value) => 100 - value)
  const inverseGradientY = useTransform(gradientY, (value) => 100 - value)
  const gradientAngle = useTransform(gradientX, (value) => value * 3.6)

  const gradientBackground = useMotionTemplate`
    radial-gradient(165% 165% at ${gradientX}% ${gradientY}%, rgba(56, 189, 248, 0.32), transparent 62%),
    radial-gradient(185% 185% at ${inverseGradientX}% ${inverseGradientY}%, rgba(244, 114, 182, 0.28), transparent 68%),
    radial-gradient(220% 220% at ${gradientY}% ${inverseGradientX}%, rgba(129, 140, 248, 0.18), transparent 74%),
    radial-gradient(260% 260% at 50% 60%, rgba(14, 165, 233, 0.18), transparent 86%)
  `

  const spectralBackground = useMotionTemplate`
    radial-gradient(140% 160% at ${inverseGradientY}% ${gradientX}%, rgba(59, 130, 246, 0.14), transparent 62%),
    radial-gradient(110% 150% at ${gradientY}% ${inverseGradientX}%, rgba(236, 72, 153, 0.12), transparent 58%),
    conic-gradient(from ${gradientAngle}deg at 50% 50%, rgba(103, 232, 249, 0.16), rgba(244, 114, 182, 0.08), rgba(129, 140, 248, 0.14), rgba(103, 232, 249, 0.16))
  `

  const sheenOpacity = useTransform(pointerSpeedSpring, [0, 1], [0.28, 0.62])
  const cardSheen = useMotionTemplate`
    radial-gradient(90% 90% at ${cardGlareX}% ${cardGlareY}%, rgba(255, 255, 255, 0.22), transparent 70%),
    radial-gradient(140% 140% at ${cardGlareY}% ${cardGlareX}%, rgba(103, 232, 249, 0.1), transparent 80%)
  `
  const cardSheenOpacity = useTransform(
    pointerSpeedSpring,
    [0, 1],
    [0.18, 0.45]
  )
  const mobileBackground =
    'radial-gradient(140% 140% at 20% 20%, rgba(56, 189, 248, 0.28), transparent 65%), radial-gradient(170% 170% at 80% 60%, rgba(244, 114, 182, 0.24), transparent 70%), linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(30, 64, 175, 0.4))'

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

    const xVelocity = BASE_VELOCITY.x + pointerVelocity.current.x
    const yVelocity = BASE_VELOCITY.y + pointerVelocity.current.y

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
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 sm:py-12"
      style={isMobile ? { background: mobileBackground } : undefined}
      onMouseMove={isMobile ? undefined : handleMouseMove}
      onMouseLeave={isMobile ? undefined : handleMouseLeave}>
      {!isMobile && (
        <>
          <motion.div
            aria-hidden
            className="absolute -left-24 top-[-8rem] h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"
            animate={{
              x: [0, 30, -20, 0],
              y: [0, 20, -10, 0],
              scale: [1, 1.05, 0.95, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut' as const,
            }}
          />
          <motion.div
            aria-hidden
            className="absolute bottom-[-12rem] right-[-6rem] h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/20 blur-3xl"
            animate={{
              x: [0, -40, 10, 0],
              y: [0, -10, 25, 0],
              scale: [1, 0.92, 1.04, 1],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
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
            className="pointer-events-none absolute inset-0 mix-blend-screen"
            style={{ background: spectralBackground, opacity: sheenOpacity }}
            animate={{ rotate: [0, 1.8, 0], scale: [1.01, 1.04, 1.01] }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: 'easeInOut' as const,
            }}
          />
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
        className="relative z-10 w-full max-w-md space-y-8 rounded-[2rem] border border-white/20 bg-gradient-to-br from-white/[0.15] via-white/[0.08] to-white/[0.12] p-6 shadow-[0_6px_16px_0_rgba(15,23,42,0.28),0_0_0_1px_rgba(255,255,255,0.14)_inset] backdrop-blur-2xl before:pointer-events-none before:absolute before:inset-0 before:rounded-[2rem] before:bg-gradient-to-br before:from-white/[0.25] before:via-transparent before:to-transparent before:opacity-40 sm:max-w-2xl sm:space-y-10 sm:rounded-[2.5rem] sm:p-10 sm:before:rounded-[2.5rem] sm:before:opacity-50 sm:backdrop-blur-3xl md:p-12 md:shadow-[0_8px_32px_0_rgba(15,23,42,0.37),0_0_0_1px_rgba(255,255,255,0.18)_inset]">
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-[2rem] opacity-30 sm:rounded-[2.5rem]"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(94, 234, 212, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 70%, rgba(244, 114, 182, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 80%, rgba(147, 197, 253, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 30%, rgba(94, 234, 212, 0.4) 0%, transparent 50%)',
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
          className="pointer-events-none absolute inset-0 rounded-[2rem] sm:rounded-[2.5rem]"
          style={{
            background: cardSheen,
            opacity: isMobile ? 0.28 : cardSheenOpacity,
            mixBlendMode: isMobile ? 'normal' : 'screen',
          }}
        />
        <motion.span
          variants={badgeVariants}
          className="relative z-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2 text-xs font-medium uppercase tracking-[0.35em] text-slate-200">
          <span className="h-2 w-2 rounded-full bg-cyan-300 drop-shadow-glow" />
          Initial Commit Deployed
        </motion.span>

        <motion.div
          className="relative z-10 space-y-6 font-display"
          variants={headingVariants}>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
            Alagappan N
          </h1>
          <motion.p
            variants={bodyVariants}
            className="max-w-xl text-base leading-relaxed text-slate-300 sm:text-xl">
            Hey, I&apos;m a Software Engineer with a foundation rooted in early
            curiosity for computers and how things work. Over time, I found
            programming to be the right blend of my creative and logical
            personas.
          </motion.p>
        </motion.div>

        <motion.div
          className="relative z-10 space-y-6"
          initial="initial"
          animate="animate"
          variants={bodyVariants}>
          <motion.p
            variants={bodyVariants}
            className="max-w-xl text-base leading-relaxed text-slate-300 sm:text-xl">
            Right now, I'm building HierBridge, a platform to address
            disengagement and lost feedback within organisations. You can learn
            more about it on{' '}
            <a
              href="https://www.hierbridge.com"
              target="_blank"
              rel="noreferrer"
              className="text-cyan-300 transition-colors hover:text-cyan-100">
              www.hierbridge.com
            </a>
            .
          </motion.p>
          <motion.ul
            className="grid gap-3 sm:grid-cols-2"
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
                  className="group relative flex flex-col gap-1 overflow-hidden rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-all duration-500 hover:border-white/30 hover:bg-white/10"
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold">
                      {link.label}
                    </span>
                    <div className="flex items-center gap-2">
                      {link.type === 'email' && (
                        <motion.button
                          onClick={handleCopyEmail}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/10 transition-colors hover:bg-white/20"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          title="Copy email">
                          {copiedEmail ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="h-3.5 w-3.5 text-green-400">
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
                              className="h-3.5 w-3.5 text-cyan-200">
                              <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
                              <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
                            </svg>
                          )}
                        </motion.button>
                      )}
                      <motion.span
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/10"
                        animate={{ rotate: [0, 6, -4, 0] }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          delay: index * 0.4,
                          ease: 'easeInOut' as const,
                        }}>
                        <span className="text-xs text-cyan-200 transition-transform duration-500 group-hover:translate-x-0.5">
                          →
                        </span>
                      </motion.span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300/70">{link.caption}</p>

                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                  </motion.span>
                </motion.a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          className="relative z-10 flex items-center gap-3 text-sm text-slate-400"
          variants={bodyVariants}>
          <motion.span
            className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5"
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
              className="h-5 w-5 text-cyan-300">
              <path
                fillRule="evenodd"
                d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
            <motion.span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-fuchsia-500/10"
              animate={{ opacity: [0.6, 0.2, 0.6] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut' as const,
              }}
            />
          </motion.span>

          <span>Based in Hyderabad, India</span>
        </motion.div>
      </motion.main>
    </div>
  )
}

export default App
