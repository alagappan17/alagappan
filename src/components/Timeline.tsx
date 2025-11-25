import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { type ThemeConfig } from '../themes/types'
import { type TimelineItem } from '../content/personal-info'

interface TimelineProps {
  timeline: TimelineItem[]
  theme: ThemeConfig
}

// Helper function to calculate duration (includes last month)
function calculateDuration(startDate: string, endDate: string): string {
  const start = new Date(startDate)
  const end = endDate === 'Present' ? new Date() : new Date(endDate)

  // Include the last month by adding 1 to the month difference
  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) +
    1
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12

  if (years === 0) {
    return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`
  } else if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? 's' : ''}`
  } else {
    return `${years} year${years !== 1 ? 's' : ''}, ${remainingMonths} month${
      remainingMonths !== 1 ? 's' : ''
    }`
  }
}

export function Timeline({ timeline, theme }: TimelineProps) {
  const isBrutalism = theme.id === 'brutalism'
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [clickedCard, setClickedCard] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth <= 768
  })
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    const updateIsMobile = () => setIsMobile(mediaQuery.matches)
    updateIsMobile()
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateIsMobile)
    } else {
      mediaQuery.addListener(updateIsMobile)
    }
    return () => {
      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', updateIsMobile)
      } else {
        mediaQuery.removeListener(updateIsMobile)
      }
    }
  }, [])

  if (isBrutalism) {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return

      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current
      setShowLeftArrow(scrollLeft > 10)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
    }

    const scrollToNext = () => {
      if (!scrollContainerRef.current) return
      const cardWidth =
        scrollContainerRef.current.querySelector('.timeline-card')
          ?.clientWidth || 0
      const gap = 20 // gap between cards
      scrollContainerRef.current.scrollBy({
        left: cardWidth + gap,
        behavior: 'smooth',
      })
    }

    const scrollToPrev = () => {
      if (!scrollContainerRef.current) return
      const cardWidth =
        scrollContainerRef.current.querySelector('.timeline-card')
          ?.clientWidth || 0
      const gap = 20 // gap between cards
      scrollContainerRef.current.scrollBy({
        left: -(cardWidth + gap),
        behavior: 'smooth',
      })
    }

    return (
      <div className="relative w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-4 sm:mb-6 flex justify-end">
          <div className="inline-flex rotate-1 items-center gap-2 rounded-xl border-[3px] border-black bg-[#FCEE4B] px-4 py-2 shadow-[4px_4px_0_0_#111] sm:gap-3 sm:px-6 sm:py-3">
            <div className="h-2 w-2 rounded-full bg-[#111] ring-2 ring-black sm:h-3 sm:w-3" />
            <span className="text-xs font-black uppercase tracking-wider text-[#111] sm:text-sm md:text-base">
              My Journey
            </span>
          </div>
        </motion.div>

        {/* Timeline container with horizontal scroll */}
        <div className="relative -rotate-[0.3deg] overflow-hidden rounded-2xl border-[3px] border-black bg-white p-4 shadow-[6px_6px_0_0_#111] sm:rounded-3xl sm:border-4 sm:p-6 md:p-8">
          {/* Pattern overlay */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                'radial-gradient(circle, #111 2.5px, transparent 2.5px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Left Arrow */}
          {showLeftArrow && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={scrollToPrev}
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-black bg-[#FCEE4B] shadow-[4px_4px_0_0_#111] transition-all hover:shadow-[6px_6px_0_0_#111] sm:h-14 sm:w-14"
              aria-label="Previous cards">
              <svg
                className="h-6 w-6"
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
          {showRightArrow && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={scrollToNext}
              className="absolute right-2 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-black bg-[#FCEE4B] shadow-[4px_4px_0_0_#111] transition-all hover:shadow-[6px_6px_0_0_#111] sm:h-14 sm:w-14"
              aria-label="Next cards">
              <svg
                className="h-6 w-6"
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

          {/* Horizontal container - show 3.5 cards */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="relative z-10 overflow-x-auto scrollbar-hide scroll-smooth">
            <div className="flex gap-5 pb-2">
              {timeline.map((item, index) => {
                const isHovered = hoveredCard === index
                const isClicked = clickedCard === index
                const isExpanded = isMobile ? isClicked : isHovered
                // All cards now have roles (even if just one)
                const hasRoles = item.roles && item.roles.length > 0
                const duration = calculateDuration(item.startDate, item.endDate)
                
                const handleCardClick = () => {
                  if (isMobile) {
                    setClickedCard(isClicked ? null : index)
                  }
                }
                // Different colors and patterns for each card
                // Color mapping based on organization
                const getCardStyle = (org: string) => {
                  if (org.includes('TANSAM')) {
                    return {
                      bg: 'bg-[#3498DB]',
                      pattern:
                        'repeating-linear-gradient(-45deg, #111 0px, #111 1px, transparent 1px, transparent 8px)',
                      corner: 'bg-[#2980B9]',
                    } // Blue
                  }
                  if (org.includes('OnePlus')) {
                    return {
                      bg: 'bg-[#E74C3C]',
                      pattern:
                        'radial-gradient(circle, #111 2px, transparent 2px)',
                      patternSize: '18px 18px',
                      corner: 'bg-[#C0392B]',
                    } // Red
                  }
                  if (org.includes('Procedure')) {
                    return {
                      bg: 'bg-[#9B59B6]',
                      pattern:
                        'repeating-linear-gradient(45deg, #111 0px, #111 1px, transparent 1px, transparent 8px)',
                      corner: 'bg-[#8E44AD]',
                    } // Purple
                  }
                  // SVCE - Orange
                  return {
                    bg: 'bg-[#F39C12]',
                    pattern:
                      'repeating-linear-gradient(90deg, #111 0px, #111 2px, transparent 2px, transparent 12px)',
                    corner: 'bg-[#E67E22]',
                  } // Orange
                }
                const style = getCardStyle(item.organization)

                // Single card design for all items
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.4 + index * 0.15,
                      duration: 0.6,
                      ease: 'easeOut' as const,
                    }}
                    onHoverStart={() => !isMobile && setHoveredCard(index)}
                    onHoverEnd={() => !isMobile && setHoveredCard(null)}
                    onClick={handleCardClick}
                    className={`timeline-card relative flex-shrink-0 rounded-xl border-[3px] border-black shadow-[4px_4px_0_0_#111] transition-all hover:shadow-[6px_6px_0_0_#111] cursor-pointer sm:rounded-2xl ${style.bg}`}
                    style={{
                      fontFamily: theme.fonts.body,
                      width: 'calc((100% - 60px) / 3.3)',
                      minWidth: '280px',
                      height: '320px',
                      overflow: 'hidden',
                    }}>
                    {/* Pattern overlay */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: style.pattern,
                        backgroundSize: style.patternSize || 'auto',
                      }}
                    />

                    {/* Logo box - stays in same position (top right) */}
                    {item.logoUrl && (
                      <div className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border-[2.5px] border-black bg-white sm:h-12 sm:w-12">
                        <img
                          src={item.logoUrl}
                          alt={`${item.organization} logo`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {/* Icon - below logo on regular, left of logo on hover */}
                    <div
                      className={`absolute z-20 flex h-10 w-10 items-center justify-center rounded-lg border-[2.5px] border-black bg-white sm:h-12 sm:w-12 transition-all ${
                        isExpanded
                          ? 'right-[3.75rem] top-3 sm:right-[4.5rem]'
                          : 'right-3 top-[3.75rem] sm:top-[4.5rem]'
                      }`}>
                      <svg
                        className="h-5 w-5 sm:h-6 sm:w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        {item.type === 'work' ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        )}
                      </svg>
                    </div>

                    {/* Type indicator */}
                    <div
                      className={`absolute -right-2 -top-2 z-20 h-8 w-8 rotate-45 border-[2.5px] border-black sm:-right-3 sm:-top-3 sm:h-10 sm:w-10 ${style.corner}`}
                    />

                    {/* Main content (default view) */}
                    <motion.div
                      initial={false}
                      animate={{
                        opacity: isExpanded ? 0 : 1,
                        y: isExpanded ? -20 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                      className="relative z-10 p-4 pr-16 sm:p-5 sm:pr-20">
                      {/* Date badge */}
                      <div className="mb-3 inline-flex items-center rounded-lg border-[2.5px] border-black bg-white px-3 py-1 sm:mb-4">
                        <span className="text-xs font-black text-[#111] sm:text-sm">
                          {item.startDate} - {item.endDate}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="mb-1 text-base font-black leading-tight text-white sm:mb-2 sm:text-lg break-words pr-2">
                        {item.title}
                      </h3>

                      {/* Organization */}
                      <p className="mb-2 text-sm font-bold text-white/90 sm:text-base break-words pr-2">
                        {item.organization}
                      </p>

                      {/* Location and Employment Type */}
                      <p className="mb-3 text-xs font-bold text-white/80">
                        {item.location}
                        {item.employmentType && ` • ${item.employmentType}`}
                      </p>

                      {/* Description */}
                      <p className="text-xs leading-relaxed text-white/80 sm:text-sm">
                        {item.description}
                      </p>
                    </motion.div>

                    {/* Breakdown content (on hover/click - all cards now have roles) */}
                    {hasRoles && (
                      <motion.div
                        initial={false}
                        animate={{
                          opacity: isExpanded ? 1 : 0,
                          y: isExpanded ? 0 : 20,
                        }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 z-10 overflow-y-auto p-4 sm:p-5 scrollbar-hide"
                        style={{
                          pointerEvents: isExpanded ? 'auto' : 'none',
                        }}>
                        {/* Header */}
                        <div className="pr-16 sm:pr-20">
                          <h3 className="mb-1 text-base font-black leading-tight text-white sm:mb-2 sm:text-lg break-words">
                            {item.hoverOrganization || item.organization}
                          </h3>
                          <p className="mb-4 text-xs font-bold text-white/80">
                            {duration}
                          </p>
                        </div>

                        {/* Roles list */}
                        <div className="space-y-3">
                          {item.roles!.map((role, roleIndex) => (
                            <div
                              key={roleIndex}
                              className="rounded-lg border-[2px] border-black bg-white/20 p-3 backdrop-blur-sm">
                              <div className="mb-1 flex items-start justify-between gap-2">
                                <h4 className="text-sm font-black leading-tight text-white break-words flex-1 min-w-0">
                                  {item.hoverTitle && roleIndex === 0
                                    ? item.hoverTitle
                                    : role.title}
                                </h4>
                                <span className="flex-shrink-0 text-xs font-bold text-white/80 whitespace-nowrap ml-2">
                                  {role.period}
                                </span>
                              </div>
                              <p className="text-xs leading-relaxed text-white/80">
                                {role.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Decorative corner element */}
          <div className="absolute -bottom-3 -left-3 h-10 w-10 rounded-full border-[3px] border-black bg-[#FCEE4B] sm:-bottom-4 sm:-left-4 sm:h-14 sm:w-14" />
        </div>

        {/* Custom scrollbar styles */}
        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    )
  }

  // Liquid glass theme
  return (
    <div className="relative w-full overflow-x-auto scrollbar-hide rounded-[1.5rem] border border-white/20 bg-white/10 p-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.1)_inset] backdrop-blur-[24px] sm:rounded-[2rem] sm:p-8 md:p-10">
      <div className="flex gap-4 sm:gap-6">
        {timeline.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.2 + index * 0.1,
              duration: 0.6,
              ease: 'easeOut' as const,
            }}
            className="w-64 flex-shrink-0 rounded-xl border border-white/20 bg-white/10 p-5 backdrop-blur-[20px] sm:w-72">
            <div className="mb-3 inline-flex rounded-lg border border-white/30 bg-white/20 px-3 py-1">
              <span className="text-xs font-semibold text-slate-800">
                {item.year}
              </span>
            </div>
            <h3 className="mb-1 text-base font-semibold text-slate-900 sm:text-lg">
              {item.title}
            </h3>
            <p className="mb-2 text-sm text-slate-600">{item.organization}</p>
            <p className="text-xs leading-relaxed text-slate-500 sm:text-sm">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Custom scrollbar styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
