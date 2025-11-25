import {
  motion,
  useMotionTemplate,
  useSpring,
  useTransform,
} from 'framer-motion'
import {
  useEffect,
  useRef,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from 'react'
import { type ThemeConfig } from '../themes/types'

interface ProfileCardProps {
  children: ReactNode
  theme: ThemeConfig
  isMobile: boolean
  onMouseMove?: (event: ReactMouseEvent<HTMLDivElement>) => void
  onMouseLeave?: () => void
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

export function ProfileCard({
  children,
  theme,
  isMobile,
  onMouseMove,
  onMouseLeave,
}: ProfileCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const rotateX = useSpring(0, { stiffness: 160, damping: 22 })
  const rotateY = useSpring(0, { stiffness: 160, damping: 22 })
  const cardGlareX = useSpring(theme.interactionConfig.cardGlareRest.x, {
    stiffness: 150,
    damping: 20,
  })
  const cardGlareY = useSpring(theme.interactionConfig.cardGlareRest.y, {
    stiffness: 150,
    damping: 20,
  })
  const cardScale = useSpring(1, { stiffness: 160, damping: 24 })
  const pointerSpeed = useSpring(0, { stiffness: 120, damping: 24 })

  const cardSheen = useMotionTemplate`
    radial-gradient(90% 90% at ${cardGlareX}% ${cardGlareY}%, rgba(255, 255, 255, 0.25), transparent 70%),
    radial-gradient(140% 140% at ${cardGlareY}% ${cardGlareX}%, rgba(0, 122, 255, 0.05), transparent 80%)
  `

  const brutalismSheen = useMotionTemplate`
    linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 70%),
    repeating-linear-gradient(
      135deg,
      rgba(17, 17, 17, 0.06) 0px,
      rgba(17, 17, 17, 0.06) 20px,
      transparent 20px,
      transparent 40px
    )
  `

  const cardSheenOpacity = useTransform(pointerSpeed, [0, 1], [0.15, 0.35])
  const brutalismSheenOpacity = useTransform(pointerSpeed, [0, 1], [0.2, 0.42])

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
        isMobile ? 0.92 : theme.interactionConfig.cardScaleMin,
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
  }, [cardScale, isMobile, theme.interactionConfig.cardScaleMin])

  const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!theme.interactionConfig.enableCardTilt) return

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
        clamp(
          -clampedX * theme.interactionConfig.cardTiltMax,
          -theme.interactionConfig.cardTiltMax,
          theme.interactionConfig.cardTiltMax
        )
      )
      rotateX.set(
        clamp(
          clampedY * theme.interactionConfig.cardTiltMax,
          -theme.interactionConfig.cardTiltMax,
          theme.interactionConfig.cardTiltMax
        )
      )

      if (theme.interactionConfig.enableGlareEffect) {
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
    }

    onMouseMove?.(event)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    cardGlareX.set(theme.interactionConfig.cardGlareRest.x)
    cardGlareY.set(theme.interactionConfig.cardGlareRest.y)
    pointerSpeed.set(0)
    onMouseLeave?.()
  }

  return (
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
      className={theme.cardStyles.containerClassName}
      onMouseMove={isMobile ? undefined : handleMouseMove}
      onMouseLeave={isMobile ? undefined : handleMouseLeave}>
      {theme.cardStyles.gradientAnimation && (
        <motion.div
          aria-hidden
          className={`absolute inset-0 ${
            theme.cardStyles.gradientAnimation.borderRadius || ''
          }`}
          animate={{
            background: theme.cardStyles.gradientAnimation.gradients,
          }}
          transition={{
            duration: theme.cardStyles.gradientAnimation.duration,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        />
      )}
      {theme.interactionConfig.enableGlareEffect && (
        <motion.div
          aria-hidden
          className={`pointer-events-none absolute inset-0 ${
            theme.id === 'brutalism'
              ? 'rounded-[1.5rem] sm:rounded-[2.5rem]'
              : 'rounded-[1.75rem] sm:rounded-[2rem] md:rounded-[2.5rem]'
          }`}
          style={{
            background: theme.id === 'brutalism' ? brutalismSheen : cardSheen,
            opacity: isMobile
              ? 0.15
              : theme.id === 'brutalism'
              ? brutalismSheenOpacity
              : cardSheenOpacity,
            mixBlendMode: isMobile
              ? 'normal'
              : theme.id === 'brutalism'
              ? 'multiply'
              : 'screen',
          }}
        />
      )}
      {/* Grey dots pattern overlay for brutalism theme */}
      {theme.id === 'brutalism' && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.5rem] sm:rounded-[2.5rem] opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, #999 1.5px, transparent 1.5px)',
            backgroundSize: '16px 16px',
          }}
        />
      )}
      {children}
    </motion.main>
  )
}
