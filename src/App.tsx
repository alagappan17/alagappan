import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { brutalismTheme } from './themes/brutalism'
import { liquidGlassTheme } from './themes/liquidGlass'
import { ThemeLayout } from './ThemeLayout'
import { type ThemeConfig } from './themes/types'
import {
  trackThemeChange,
  trackScrollDepth,
  trackEngagementTime,
  trackUserInactive,
} from './utils/analytics'
import { SectionSelector } from './components/SectionSelector'

type ThemeId = 'brutalism' | 'liquidGlass'
type SectionId = 'home' | 'about' | 'journey' | 'artworks' | 'connect'

const themes: Record<ThemeId, ThemeConfig> = {
  brutalism: brutalismTheme,
  liquidGlass: liquidGlassTheme,
}

function App() {
  const [themeId, setThemeId] = useState<ThemeId>('brutalism')
  const [tooltipTheme, setTooltipTheme] = useState<ThemeId | null>(null)
  const [hoveredTheme, setHoveredTheme] = useState<ThemeId | null>(null)
  const [activeSection, setActiveSection] = useState<SectionId>('home')
  const hideTooltipTimeout = useRef<number | null>(null)
  const previousThemeRef = useRef<ThemeId>('brutalism')
  const scrollTrackedRef = useRef<Set<number>>(new Set())
  const engagementStartTimeRef = useRef<number>(Date.now())
  const engagementIntervalRef = useRef<number | null>(null)
  const inactiveTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (hideTooltipTimeout.current !== null) {
        window.clearTimeout(hideTooltipTimeout.current)
        hideTooltipTimeout.current = null
      }
      if (engagementIntervalRef.current !== null) {
        window.clearInterval(engagementIntervalRef.current)
        engagementIntervalRef.current = null
      }
      if (inactiveTimeoutRef.current !== null) {
        window.clearTimeout(inactiveTimeoutRef.current)
        inactiveTimeoutRef.current = null
      }
    }
  }, [])

  // Track engagement time every 10 seconds
  useEffect(() => {
    engagementIntervalRef.current = window.setInterval(() => {
      const timeSpent = Math.floor(
        (Date.now() - engagementStartTimeRef.current) / 1000
      )
      if (timeSpent > 0) {
        trackEngagementTime(timeSpent)
      }
    }, 10000) // Track every 10 seconds

    return () => {
      if (engagementIntervalRef.current !== null) {
        window.clearInterval(engagementIntervalRef.current)
        engagementIntervalRef.current = null
      }
    }
  }, [])

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Safety check: ensure document has scrollable content
      if (documentHeight <= windowHeight) {
        // If page is shorter than viewport, track 100% immediately
        if (!scrollTrackedRef.current.has(100)) {
          scrollTrackedRef.current.add(100)
          trackScrollDepth(100)
        }
        return
      }

      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const scrollPercentage = Math.round(
        ((scrollTop + windowHeight) / documentHeight) * 100
      )

      // Track milestones: 25%, 50%, 75%, 100%
      const milestones = [25, 50, 75, 100]
      milestones.forEach((milestone) => {
        if (
          scrollPercentage >= milestone &&
          !scrollTrackedRef.current.has(milestone)
        ) {
          scrollTrackedRef.current.add(milestone)
          trackScrollDepth(milestone)
        }
      })
    }

    // Check initial scroll position
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track user activity/inactivity
  useEffect(() => {
    const resetInactiveTimer = () => {
      if (inactiveTimeoutRef.current !== null) {
        window.clearTimeout(inactiveTimeoutRef.current)
      }

      inactiveTimeoutRef.current = window.setTimeout(() => {
        trackUserInactive()
      }, 30000) // Track as inactive after 30 seconds of no activity
    }

    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
    ]
    events.forEach((event) => {
      window.addEventListener(event, resetInactiveTimer, { passive: true })
    })

    resetInactiveTimer()

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetInactiveTimer)
      })
      if (inactiveTimeoutRef.current !== null) {
        window.clearTimeout(inactiveTimeoutRef.current)
      }
    }
  }, [])

  // Track active section based on scroll position
  useEffect(() => {
    const sections: SectionId[] = ['home', 'about', 'journey', 'artworks', 'connect']
    const intersectingEntries = new Map<string, IntersectionObserverEntry>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id.replace('section-', '')
          if (entry.isIntersecting) {
            intersectingEntries.set(sectionId, entry)
          } else {
            intersectingEntries.delete(sectionId)
          }
        })

        // Find the most visible section (highest intersection ratio)
        let mostVisibleSection: SectionId | null = null
        let maxRatio = 0

        intersectingEntries.forEach((entry, sectionId) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio
            mostVisibleSection = sectionId as SectionId
          }
        })

        if (mostVisibleSection) {
          setActiveSection(mostVisibleSection)
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin: '-10% 0px -10% 0px',
      }
    )

    // Wait a bit for DOM to be ready
    setTimeout(() => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(`section-${sectionId}`)
        if (element) {
          observer.observe(element)
        }
      })
    }, 100)

    return () => {
      intersectingEntries.clear()
      sections.forEach((sectionId) => {
        const element = document.getElementById(`section-${sectionId}`)
        if (element) {
          observer.unobserve(element)
        }
      })
      observer.disconnect()
    }
  }, [])

  const showMobileTooltip = (nextTheme: ThemeId) => {
    if (typeof window === 'undefined') return

    if (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(min-width: 768px)').matches
    ) {
      setTooltipTheme(null)
      return
    }

    if (hideTooltipTimeout.current !== null) {
      window.clearTimeout(hideTooltipTimeout.current)
      hideTooltipTimeout.current = null
    }

    setTooltipTheme(nextTheme)
    hideTooltipTimeout.current = window.setTimeout(() => {
      setTooltipTheme((current) => (current === nextTheme ? null : current))
      hideTooltipTimeout.current = null
    }, 1600)
  }

  const handleThemeClick = (nextTheme: ThemeId) => {
    const previousTheme = previousThemeRef.current
    if (previousTheme !== nextTheme) {
      trackThemeChange(previousTheme, nextTheme)
      previousThemeRef.current = nextTheme
    }
    setThemeId(nextTheme)
    showMobileTooltip(nextTheme)
  }

  const hoverLabelBaseClasses =
    'pointer-events-none absolute top-full left-1/2 z-10 mt-2 -translate-x-1/2 -translate-y-2 whitespace-nowrap origin-top opacity-0 scale-95 mix-blend-normal transition-all duration-200 ease-out md:bottom-auto md:left-full md:top-1/2 md:mt-0 md:mb-0 md:ml-4 md:-translate-y-1/2 md:translate-x-3 md:origin-left md:opacity-0 md:scale-95 md:group-hover:opacity-100 md:group-hover:translate-x-0 md:group-hover:scale-100'
  const hoverLabelThemeStyles: Record<ThemeId, string> = {
    brutalism:
      'rounded-xl border-[3px] border-black bg-[#FCEE4B] px-3 py-1 text-[0.7rem] font-black uppercase tracking-[0.22em] text-[#111] shadow-[4px_4px_0_0_#111] md:px-4 md:py-1.5 md:text-xs',
    liquidGlass:
      'rounded-xl border border-white/40 bg-white/20 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-slate-800 shadow-[0_6px_24px_0_rgba(0,0,0,0.3),0_0_0_0.5px_rgba(255,255,255,0.2)_inset] backdrop-blur-xl md:px-4 md:py-1.5 md:text-xs md:shadow-[0_8px_32px_0_rgba(0,0,0,0.3),0_0_0_0.5px_rgba(255,255,255,0.25)_inset]',
  }

  // Determine which theme style to use for labels (hovered theme takes precedence)
  const activeLabelTheme = hoveredTheme || themeId

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Section Selector */}
      <SectionSelector themeId={themeId} activeSection={activeSection} />

      {/* Theme Picker */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center md:bottom-auto md:left-6 md:right-auto md:top-1/2 md:justify-start md:-translate-y-1/2">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className={`flex items-center gap-2.5 md:flex-col md:gap-3 ${
            themeId === 'brutalism' ? '' : 'mix-blend-difference'
          }`}>
          <motion.button
            onClick={() => handleThemeClick('brutalism')}
            onMouseEnter={() => setHoveredTheme('brutalism')}
            onMouseLeave={() => setHoveredTheme(null)}
            className={`group relative flex h-14 w-14 items-center justify-center rounded-xl border-[3px] border-black transition-all md:h-16 md:w-16 md:rounded-2xl md:border-4 ${
              themeId === 'brutalism'
                ? 'bg-[#FCEE4B] shadow-[5px_5px_0_0_#111] md:shadow-[8px_8px_0_0_#111]'
                : 'bg-white/80 shadow-[3px_3px_0_0_#111] hover:shadow-[4px_4px_0_0_#111] md:shadow-[4px_4px_0_0_#111] md:hover:shadow-[6px_6px_0_0_#111]'
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Switch to the Neo Brutalism theme"
            type="button">
            <div className="flex flex-col items-center gap-0.5 md:gap-1">
              <div className="h-2 w-2 rounded-sm border-2 border-black bg-[#FF6F91] md:h-3 md:w-3" />
              <div className="h-1.5 w-6 border-2 border-black bg-[#2EC4B6] md:h-2 md:w-8" />
            </div>
            <span
              aria-hidden="true"
              className={`${hoverLabelBaseClasses} ${
                hoverLabelThemeStyles[activeLabelTheme]
              } ${
                tooltipTheme === 'brutalism'
                  ? 'opacity-100 -translate-y-0 scale-100'
                  : ''
              }`}>
              Neo Brutalism
            </span>
            {themeId === 'brutalism' && (
              <motion.div
                layoutId="theme-indicator"
                className="absolute inset-0 rounded-xl border-[3px] border-black md:rounded-2xl md:border-4"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>

          {/* Liquid Glass theme - commented out temporarily */}
          {/* <motion.button
            onClick={() => handleThemeClick('liquidGlass')}
            onMouseEnter={() => setHoveredTheme('liquidGlass')}
            onMouseLeave={() => setHoveredTheme(null)}
            className={`group relative flex h-14 w-14 items-center justify-center rounded-xl border transition-all md:h-16 md:w-16 md:rounded-2xl ${
              themeId === 'liquidGlass'
                ? 'border-white/40 bg-white/20 shadow-[0_6px_24px_0_rgba(0,0,0,0.3)] backdrop-blur-xl md:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]'
                : 'border-black/40 bg-white/60 shadow-[3px_3px_0_0_rgba(0,0,0,0.2)] backdrop-blur-sm hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] md:shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] md:hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.3)]'
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Switch to the Liquid Glass theme"
            type="button">
            <div className="flex flex-col items-center gap-0.5 md:gap-1">
              <div className="h-2 w-2 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 md:h-3 md:w-3" />
              <div className="h-1.5 w-6 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 md:h-2 md:w-8" />
            </div>
            <span
              aria-hidden="true"
              className={`${hoverLabelBaseClasses} ${
                hoverLabelThemeStyles[activeLabelTheme]
              } ${
                tooltipTheme === 'liquidGlass'
                  ? 'opacity-100 -translate-y-0 scale-100'
                  : ''
              }`}>
              Liquid Glass
            </span>
            {themeId === 'liquidGlass' && (
              <motion.div
                layoutId="theme-indicator-glass"
                className="absolute inset-0 rounded-xl border-2 border-white/60 md:rounded-2xl"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button> */}
        </motion.div>
      </div>

      {/* Render selected theme */}
      <ThemeLayout key={themeId} theme={themes[themeId]} />
    </div>
  )
}

export default App
