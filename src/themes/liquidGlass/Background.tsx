import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

export function LiquidGlassBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)

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
    </>
  )
}
