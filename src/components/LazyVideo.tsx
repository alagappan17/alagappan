import { useRef, useState, useEffect } from 'react'

interface LazyVideoProps {
  src: string
  className?: string
  loop?: boolean
  muted?: boolean
  playsInline?: boolean
}

export function LazyVideo({
  src,
  className = '',
  loop = true,
  muted = true,
  playsInline = true,
}: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasStartedLoading, setHasStartedLoading] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (!hasStartedLoading) {
            setHasStartedLoading(true)
          }
        } else {
          setIsVisible(false)
        }
      },
      { rootMargin: '200px', threshold: 0.01 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasStartedLoading])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isVisible) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [isVisible])

  return (
    <div ref={containerRef} className={className} style={{ minHeight: '1px' }}>
      {hasStartedLoading ? (
        <video
          ref={videoRef}
          src={src}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          controls={false}
          preload="none"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-900/20">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-black" />
        </div>
      )}
    </div>
  )
}
