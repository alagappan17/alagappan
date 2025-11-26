import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

type SectionId = 'home' | 'about' | 'lifestyle' | 'journey' | 'artworks' | 'connect'

interface Section {
  id: SectionId
  label: string
  icon: React.ReactNode
}

interface SectionSelectorProps {
  themeId: string
  activeSection: SectionId
}

export function SectionSelector({
  themeId,
  activeSection,
}: SectionSelectorProps) {
  const [tooltipSection, setTooltipSection] = useState<SectionId | null>(null)
  const hideTooltipTimeout = useRef<number | null>(null)

  const sections: Section[] = [
    {
      id: 'home',
      label: 'Home',
      icon: (
        <img
          src="/icons/landing.png"
          alt="Home"
          className="h-5 w-5 md:h-6 md:w-6"
        />
      ),
    },
    {
      id: 'about',
      label: 'About',
      icon: (
        <img
          src="/icons/about.png"
          alt="About"
          className="h-5 w-5 md:h-6 md:w-6"
        />
      ),
    },
    {
      id: 'journey',
      label: 'Dev',
      icon: (
        <img src="/icons/dev.png" alt="Dev" className="h-5 w-5 md:h-6 md:w-6" />
      ),
    },
    {
      id: 'artworks',
      label: 'Art',
      icon: (
        <img src="/icons/art.png" alt="Art" className="h-5 w-5 md:h-6 md:w-6" />
      ),
    },
    {
      id: 'lifestyle',
      label: 'Lifestyle',
      icon: (
        <svg
          className="h-5 w-5 md:h-6 md:w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
    },
    {
      id: 'connect',
      label: 'Connect',
      icon: (
        <svg
          className="h-5 w-5 md:h-6 md:w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
    },
  ]

  const showMobileTooltip = (sectionId: SectionId) => {
    if (typeof window === 'undefined') return

    if (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(min-width: 768px)').matches
    ) {
      setTooltipSection(null)
      return
    }

    if (hideTooltipTimeout.current !== null) {
      window.clearTimeout(hideTooltipTimeout.current)
      hideTooltipTimeout.current = null
    }

    setTooltipSection(sectionId)
    hideTooltipTimeout.current = window.setTimeout(() => {
      setTooltipSection((current) => (current === sectionId ? null : current))
      hideTooltipTimeout.current = null
    }, 1600)
  }

  const handleSectionClick = (sectionId: SectionId) => {
    const element = document.getElementById(`section-${sectionId}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    showMobileTooltip(sectionId)
  }

  const hoverLabelBaseClasses =
    'pointer-events-none absolute bottom-full right-1/2 z-10 mb-2 translate-x-1/2 translate-y-2 whitespace-nowrap origin-bottom opacity-0 scale-95 mix-blend-normal transition-all duration-200 ease-out md:bottom-auto md:right-full md:top-1/2 md:mb-0 md:mr-4 md:-translate-y-1/2 md:-translate-x-3 md:translate-x-0 md:origin-right md:opacity-0 md:scale-95 md:group-hover:opacity-100 md:group-hover:-translate-x-0 md:group-hover:scale-100'

  const hoverLabelThemeStyles: Record<string, string> = {
    brutalism:
      'rounded-xl border-[3px] border-black bg-[#FCEE4B] px-3 py-1 text-[0.7rem] font-black uppercase tracking-[0.22em] text-[#111] shadow-[4px_4px_0_0_#111] md:px-4 md:py-1.5 md:text-xs',
    liquidGlass:
      'rounded-xl border border-white/40 bg-white/20 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-slate-800 shadow-[0_6px_24px_0_rgba(0,0,0,0.3),0_0_0_0.5px_rgba(255,255,255,0.2)_inset] backdrop-blur-xl md:px-4 md:py-1.5 md:text-xs md:shadow-[0_8px_32px_0_rgba(0,0,0,0.3),0_0_0_0.5px_rgba(255,255,255,0.25)_inset]',
  }

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center md:bottom-auto md:left-auto md:right-6 md:top-1/2 md:justify-end md:-translate-y-1/2">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className={`flex items-center gap-2.5 md:flex-col md:gap-3 ${
          themeId === 'brutalism' ? '' : 'md:mix-blend-difference'
        }`}>
        {sections.map((section) => {
          const isActive = activeSection === section.id

          if (themeId === 'brutalism') {
            return (
              <motion.button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className={`group relative flex h-14 w-14 items-center justify-center rounded-xl border-[3px] border-black transition-all duration-300 md:h-16 md:w-16 md:rounded-2xl md:border-4 ${
                  isActive
                    ? 'bg-[#10B981] shadow-[5px_5px_0_0_#111] scale-110 md:shadow-[8px_8px_0_0_#111]'
                    : 'bg-white/80 shadow-[3px_3px_0_0_#111] hover:shadow-[4px_4px_0_0_#111] md:shadow-[4px_4px_0_0_#111] md:hover:shadow-[6px_6px_0_0_#111]'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Navigate to ${section.label} section`}
                type="button">
                <div className="text-[#111] opacity-100">{section.icon}</div>
                <span
                  aria-hidden="true"
                  className={`${hoverLabelBaseClasses} ${
                    hoverLabelThemeStyles[themeId]
                  } ${
                    tooltipSection === section.id
                      ? 'opacity-100 translate-y-0 scale-100'
                      : ''
                  }`}>
                  {section.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="section-indicator"
                    className="absolute inset-0 rounded-xl border-[3px] border-black md:rounded-2xl md:border-4"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    initial={false}
                  />
                )}
              </motion.button>
            )
          }

          // Liquid Glass theme
          return (
            <motion.button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`group relative flex h-14 w-14 items-center justify-center rounded-xl border transition-all duration-300 md:h-16 md:w-16 md:rounded-2xl ${
                isActive
                  ? 'border-emerald-400/60 bg-emerald-500/20 shadow-[0_6px_24px_0_rgba(16,185,129,0.4)] backdrop-blur-xl scale-110 md:shadow-[0_8px_32px_0_rgba(16,185,129,0.4)]'
                  : 'border-black/40 bg-white/60 shadow-[3px_3px_0_0_rgba(0,0,0,0.2)] backdrop-blur-sm hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] md:shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] md:hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.3)]'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Navigate to ${section.label} section`}
              type="button">
              <div className="text-slate-800 opacity-100 md:mix-blend-normal">{section.icon}</div>
              <span
                aria-hidden="true"
                className={`${hoverLabelBaseClasses} ${
                  hoverLabelThemeStyles[themeId]
                } ${
                  tooltipSection === section.id
                    ? 'opacity-100 translate-y-0 scale-100'
                    : ''
                }`}>
                {section.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="section-indicator-glass"
                  className="absolute inset-0 rounded-xl border-2 border-emerald-400/70 md:rounded-2xl"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  initial={false}
                />
              )}
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}
