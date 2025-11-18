import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useEffect, useRef } from 'react'

interface LiquidGlassBackgroundProps {
  isMobile: boolean
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)
const wrapProgress = (value: number) => ((value % 100) + 100) % 100

const BASE_VELOCITY = { x: 0.0018, y: 0.0013 }
const POINTER_MULTIPLIER = 0.0012
const MAX_POINTER_BOOST = 0.05
const POINTER_SMOOTHING = 0.32
const POINTER_DECAY = 0.9

export function LiquidGlassBackground({ isMobile }: LiquidGlassBackgroundProps) {
  const gradientX = useMotionValue(56)
  const gradientY = useMotionValue(42)
  const pointerVelocity = useRef({ x: 0, y: 0 })
  const pointerSpeed = useMotionValue(0)

  const pointerSpeedSpring = useSpring(pointerSpeed, {
    stiffness: 120,
    damping: 24,
  })

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

  const mobileBackground =
    'radial-gradient(140% 140% at 20% 20%, rgba(56, 189, 248, 0.28), transparent 65%), radial-gradient(170% 170% at 80% 60%, rgba(244, 114, 182, 0.24), transparent 70%), linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(30, 64, 175, 0.4))'

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

  // Expose velocity handlers for parent to use
  useEffect(() => {
    const handlePointerMove = (event: MouseEvent) => {
      if (isMobile) return
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

    const handlePointerLeave = () => {
      if (isMobile) return
      pointerVelocity.current.x = 0
      pointerVelocity.current.y = 0
      pointerSpeed.set(0)
    }

    document.addEventListener('mousemove', handlePointerMove)
    document.addEventListener('mouseleave', handlePointerLeave)

    return () => {
      document.removeEventListener('mousemove', handlePointerMove)
      document.removeEventListener('mouseleave', handlePointerLeave)
    }
  }, [isMobile, pointerSpeed])

  if (isMobile) {
    return (
      <>
        {/* Mobile base background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-95"
          style={{ background: mobileBackground }}
        />
        
        {/* Mobile animated blobs - optimized */}
        <motion.div
          aria-hidden
          className="absolute left-[-10%] top-[10%] h-48 w-48 rounded-full bg-cyan-400/30 blur-2xl"
          animate={{
            x: [0, 20, -15, 0],
            y: [0, 15, -10, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        />
        <motion.div
          aria-hidden
          className="absolute right-[-8%] top-[25%] h-40 w-40 rounded-full bg-fuchsia-400/25 blur-2xl"
          animate={{
            x: [0, -18, 12, 0],
            y: [0, 12, -8, 0],
            scale: [1, 0.94, 1.06, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        />
        <motion.div
          aria-hidden
          className="absolute left-[10%] bottom-[15%] h-52 w-52 rounded-full bg-blue-400/20 blur-2xl"
          animate={{
            x: [0, -15, 18, 0],
            y: [0, -12, 10, 0],
            scale: [1, 1.05, 0.98, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        />
        <motion.div
          aria-hidden
          className="absolute right-[8%] bottom-[20%] h-44 w-44 rounded-full bg-purple-400/25 blur-2xl"
          animate={{
            x: [0, 15, -12, 0],
            y: [0, -10, 15, 0],
            scale: [1, 0.96, 1.04, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        />
        
        {/* Subtle gradient overlay with animation */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-overlay"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(103, 232, 249, 0.15), transparent 60%)',
          }}
          animate={{
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        />
      </>
    )
  }

  return (
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
  )
}

