import { useRef, useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { type ThemeConfig } from '../themes/types'
import { type Artwork } from '../content/personal-info'

interface ArtworksSectionProps {
  artworks: Artwork[]
  theme: ThemeConfig
}

export function ArtworksSection({ artworks, theme }: ArtworksSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [visibleArtworks, setVisibleArtworks] = useState<Set<number>>(() => {
    // Initialize with first 4 artworks visible
    const initialSet = new Set<number>()
    for (let i = 0; i < Math.min(4, artworks.length); i++) {
      initialSet.add(i)
    }
    return initialSet
  })
  const artworkRefs = useRef<Map<number, HTMLDivElement>>(new Map())
  const isBrutalism = theme.id === 'brutalism'

  // Check scroll position for arrow visibility
  const checkScrollPosition = () => {
    const container = scrollContainerRef.current
    if (!container) return

    setCanScrollLeft(container.scrollLeft > 0)
    setCanScrollRight(
      container.scrollLeft + container.clientWidth < container.scrollWidth - 10
    )
  }

  const scrollLeft = () => {
    const container = scrollContainerRef.current
    if (!container) return
    container.scrollBy({ left: -400, behavior: 'smooth' })
  }

  const scrollRight = () => {
    const container = scrollContainerRef.current
    if (!container) return
    container.scrollBy({ left: 400, behavior: 'smooth' })
  }

  const getAspectRatioValue = (ratio: string): number => {
    switch (ratio) {
      case '16:9':
        return 16 / 9
      case '9:16':
        return 9 / 16
      case '3:4':
        return 3 / 4
      default:
        return 1
    }
  }

  // Calculate width based on row height and aspect ratio
  const calculateWidth = (aspectRatio: string, rowHeight: number): number => {
    const ratio = getAspectRatioValue(aspectRatio)
    return rowHeight * ratio
  }

  // Split artworks into two rows
  const rows = useMemo(() => {
    const midPoint = Math.ceil(artworks.length / 2)
    return [artworks.slice(0, midPoint), artworks.slice(midPoint)]
  }, [artworks])

  // Lazy loading with IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    const timeoutId = setTimeout(() => {
      artworkRefs.current.forEach((element, index) => {
        if (!element) return
        
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleArtworks((prev) => {
                  const newSet = new Set(prev)
                  newSet.add(index)
                  return newSet
                })
                observer.unobserve(entry.target)
              }
            })
          },
          {
            root: scrollContainerRef.current,
            rootMargin: '100px',
            threshold: 0.01,
          }
        )
        
        observer.observe(element)
        observers.push(observer)
      })
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      observers.forEach((observer) => observer.disconnect())
    }
  }, [artworks.length])

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const handleWheel = (e: WheelEvent) => {
      const atStart = scrollContainer.scrollLeft === 0
      const atEnd =
        scrollContainer.scrollLeft + scrollContainer.clientWidth >=
        scrollContainer.scrollWidth - 1

      // Determine scroll delta - prioritize deltaX (horizontal) if present, otherwise use deltaY
      // Touchpads can send both, so we check which one is more significant
      const hasHorizontalDelta = Math.abs(e.deltaX) > 0
      const hasVerticalDelta = Math.abs(e.deltaY) > 0
      
      // If we have horizontal delta, use it (touchpad horizontal gesture)
      // Otherwise, convert vertical delta to horizontal scroll
      const scrollDelta = hasHorizontalDelta ? e.deltaX : (hasVerticalDelta ? e.deltaY : 0)
      
      if (scrollDelta === 0) return

      // Check if this is a pure vertical scroll (no horizontal component)
      // Only allow vertical scroll to pass through at boundaries
      const isPureVertical = !hasHorizontalDelta && hasVerticalDelta

      // If we're at the boundaries and it's a pure vertical scroll, allow normal page scroll
      if (isPureVertical) {
        if ((atStart && e.deltaY < 0) || (atEnd && e.deltaY > 0)) {
          return
        }
      } else {
        // Horizontal or mixed gesture - check boundaries for horizontal scroll
        if ((atStart && scrollDelta < 0) || (atEnd && scrollDelta > 0)) {
          return
        }
      }

      // If we have horizontal content and we're not at the boundaries, handle the scroll
      if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
        e.preventDefault()
        e.stopPropagation()
        scrollContainer.scrollLeft += scrollDelta
      }
    }

    const handleScroll = () => {
      checkScrollPosition()
    }

    // Initial check
    checkScrollPosition()

    // Listen to scroll events
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            scrollContainer.addEventListener('wheel', handleWheel, {
              passive: false,
            })
            checkScrollPosition()
          } else {
            scrollContainer.removeEventListener('wheel', handleWheel)
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(scrollContainer)

    // Check on resize
    const handleResize = () => {
      checkScrollPosition()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel)
      scrollContainer.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
    }
  }, [])

  const renderArtworkMedia = (artwork: Artwork) => {
    if (artwork.type === 'youtube') {
      // Extract YouTube video ID from various formats
      let videoId: string | null = null
      
      // Handle regular YouTube URLs
      const watchMatch = artwork.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
      if (watchMatch) {
        videoId = watchMatch[1]
      }
      
      // Handle YouTube Shorts URLs
      const shortsMatch = artwork.url.match(/youtube\.com\/shorts\/([^&\n?#]+)/)
      if (shortsMatch) {
        videoId = shortsMatch[1]
      }
      
      if (!videoId) {
        return (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-500">
            Invalid YouTube URL
          </div>
        )
      }

      return (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          className="h-full w-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={artwork.name}
        />
      )
    }


    if (artwork.type === 'video') {
      return (
        <video
          src={artwork.url}
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          className="h-full w-full object-cover"
        />
      )
    }
    return (
      <img
        src={artwork.url}
        alt={artwork.name}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    )
  }

  if (isBrutalism) {
    return (
      <div className="relative w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20, rotate: -2 }}
          whileInView={{ opacity: 1, x: 0, rotate: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 100 }}
          className="mb-6 sm:mb-8">
          <div className="inline-flex rotate-1 items-center gap-2 rounded-xl border-[3px] border-black bg-[#8B008B] px-4 py-2 shadow-[4px_4px_0_0_#111] sm:gap-3 sm:px-6 sm:py-3">
            <div className="h-2 w-2 rounded-full bg-white ring-2 ring-black sm:h-3 sm:w-3" />
            <span className="text-xs font-black uppercase tracking-wider text-white sm:text-sm md:text-base">
              Artworks
            </span>
          </div>
        </motion.div>

        {/* Single Scrollable Container with Two Rows */}
        <div className="relative">
          {/* Left Arrow */}
          {canScrollLeft && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              onClick={scrollLeft}
              className="absolute -left-12 top-1/2 z-20 -translate-y-1/2 h-12 w-12 rounded-full border-[3px] border-black bg-[#FCEE4B] p-3 shadow-[4px_4px_0_0_#111] transition-all hover:scale-105 hover:shadow-[6px_6px_0_0_#111] sm:h-14 sm:w-14 sm:p-4 flex items-center justify-center"
              aria-label="Scroll left">
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>
          )}

          {/* Right Arrow */}
          {canScrollRight && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              onClick={scrollRight}
              className="absolute -right-12 top-1/2 z-20 -translate-y-1/2 h-12 w-12 rounded-full border-[3px] border-black bg-[#FCEE4B] p-3 shadow-[4px_4px_0_0_#111] transition-all hover:scale-105 hover:shadow-[6px_6px_0_0_#111] sm:h-14 sm:w-14 sm:p-4 flex items-center justify-center"
              aria-label="Scroll right">
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          )}

          <div
            ref={scrollContainerRef}
            className="no-scrollbar overflow-x-auto"
            style={{
              scrollSnapType: 'x proximity',
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
            }}>
            <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 pt-2" style={{ width: 'max-content' }}>
            {rows.map((rowArtworks, rowIndex) => {
              const rowHeight = 280 // Height for each row in pixels
              return (
                <motion.div
                  key={`row-${rowIndex}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + rowIndex * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex gap-3 sm:gap-4 md:gap-5"
                  style={{
                    height: `${rowHeight}px`,
                  }}>
                  {rowArtworks.map((artwork, index) => {
                    const width = calculateWidth(artwork.aspectRatio, rowHeight)
                    const isEvenRow = rowIndex % 2 === 0
                    const globalIndex = rowIndex === 0 ? index : rows[0].length + index
                    const shouldLoad = visibleArtworks.has(globalIndex)
                    
                    return (
                      <motion.div
                        key={`${artwork.name}-${rowIndex}-${index}`}
                        ref={(el) => {
                          if (el) artworkRefs.current.set(globalIndex, el)
                        }}
                        initial={{ 
                          opacity: 0, 
                          x: isEvenRow ? -50 : 50,
                          y: 20,
                          scale: 0.8,
                          rotate: isEvenRow ? -5 : 5,
                        }}
                        whileInView={{ 
                          opacity: 1, 
                          x: 0,
                          y: 0,
                          scale: 1,
                          rotate: 0,
                        }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{
                          delay: 0.4 + rowIndex * 0.15 + index * 0.08,
                          duration: 0.6,
                          type: 'spring',
                          stiffness: 100,
                          damping: 15,
                        }}
                        className="relative flex-shrink-0 cursor-pointer"
                        style={{ scrollSnapAlign: 'start' }}>
                        <a
                          href={artwork.instagramUrl || artwork.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block h-full w-full"
                          onClick={(e) => {
                            // Don't navigate if clicking on YouTube iframe
                            if (artwork.type === 'youtube') {
                              e.preventDefault()
                              window.open(artwork.instagramUrl || artwork.url, '_blank')
                            }
                          }}>
                          <div
                            className="relative h-full overflow-hidden rounded-xl border-[3px] border-black bg-white shadow-[4px_4px_0_0_#111] transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0_0_#111] hover:bg-gray-50 sm:rounded-2xl"
                            style={{
                              width: `${width}px`,
                            }}>
                            {/* Media - Lazy loaded */}
                            {shouldLoad ? (
                              renderArtworkMedia(artwork)
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-gray-100">
                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
                              </div>
                            )}

                            {/* Name Badge */}
                            <div className="absolute bottom-1.5 left-1.5 right-1.5 sm:bottom-2 sm:left-2 sm:right-2">
                              <div className="inline-block rounded-md border-2 border-black bg-[#FCEE4B] px-1.5 py-0.5 text-[0.6rem] font-bold uppercase text-black sm:text-xs">
                                {artwork.name}
                              </div>
                            </div>
                          </div>
                        </a>
                      </motion.div>
                    )
                  })}
                </motion.div>
              )
            })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Liquid Glass Theme
  return (
    <div className="relative w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-6 sm:mb-8">
        <h2 className="text-2xl font-semibold text-fuchsia-400 sm:text-3xl md:text-4xl">
          Artworks
        </h2>
      </motion.div>

      {/* Single Scrollable Container with Two Rows */}
      <div className="relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={scrollLeft}
            className="absolute -left-12 top-1/2 z-20 -translate-y-1/2 h-12 w-12 rounded-full border border-white/40 bg-white/20 p-3 shadow-[0_6px_24px_0_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all hover:scale-105 hover:bg-white/30 sm:h-14 sm:w-14 sm:p-4 flex items-center justify-center"
            aria-label="Scroll left">
            <svg
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>
        )}

        {/* Right Arrow */}
        {canScrollRight && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={scrollRight}
            className="absolute -right-12 top-1/2 z-20 -translate-y-1/2 h-12 w-12 rounded-full border border-white/40 bg-white/20 p-3 shadow-[0_6px_24px_0_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all hover:scale-105 hover:bg-white/30 sm:h-14 sm:w-14 sm:p-4 flex items-center justify-center"
            aria-label="Scroll right">
            <svg
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        )}

        <div
          ref={scrollContainerRef}
          className="no-scrollbar overflow-x-auto"
          style={{
            scrollSnapType: 'x proximity',
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
          }}>
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 pt-2" style={{ width: 'max-content' }}>
          {rows.map((rowArtworks, rowIndex) => {
            const rowHeight = 280 // Height for each row in pixels
            return (
              <motion.div
                key={`row-${rowIndex}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.7,
                  delay: 0.3 + rowIndex * 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex gap-3 sm:gap-4 md:gap-5"
                style={{
                  height: `${rowHeight}px`,
                }}>
                {rowArtworks.map((artwork, index) => {
                  const width = calculateWidth(artwork.aspectRatio, rowHeight)
                  const globalIndex = rowIndex === 0 ? index : rows[0].length + index
                  const shouldLoad = visibleArtworks.has(globalIndex)
                  
                  return (
                    <motion.div
                      key={`${artwork.name}-${rowIndex}-${index}`}
                      ref={(el) => {
                        if (el) artworkRefs.current.set(globalIndex, el)
                      }}
                      initial={{ 
                        opacity: 0, 
                        y: 30,
                        scale: 0.9,
                      }}
                      whileInView={{ 
                        opacity: 1, 
                        y: 0,
                        scale: 1,
                      }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{
                        delay: 0.4 + rowIndex * 0.2 + index * 0.1,
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="relative flex-shrink-0 cursor-pointer"
                      style={{ scrollSnapAlign: 'start' }}>
                      <a
                        href={artwork.instagramUrl || artwork.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block h-full w-full"
                        onClick={(e) => {
                          // Don't navigate if clicking on YouTube iframe
                          if (artwork.type === 'youtube') {
                            e.preventDefault()
                            window.open(artwork.instagramUrl || artwork.url, '_blank')
                          }
                        }}>
                        <div
                          className="relative h-full overflow-hidden rounded-xl border border-white/30 bg-white/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] hover:bg-white/20 hover:border-white/50 sm:rounded-2xl"
                          style={{
                            width: `${width}px`,
                          }}>
                          {/* Media - Lazy loaded */}
                          {shouldLoad ? (
                            renderArtworkMedia(artwork)
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-white/5">
                              <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/20 border-t-white/60"></div>
                            </div>
                          )}

                          {/* Name Badge */}
                          <div className="absolute bottom-1.5 left-1.5 right-1.5 sm:bottom-2 sm:left-2 sm:right-2">
                            <div className="inline-block rounded-md border border-white/40 bg-white/20 px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase text-white backdrop-blur-sm sm:text-xs">
                              {artwork.name}
                            </div>
                          </div>
                        </div>
                      </a>
                    </motion.div>
                  )
                  })}
              </motion.div>
            )
          })}
          </div>
        </div>
      </div>
    </div>
  )
}

