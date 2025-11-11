import { useEffect, useRef, useState } from 'react'
import { BrutalismTheme } from './BrutalismTheme'
import { LiquidGlassTheme } from './LiquidGlassTheme'
import { motion } from 'framer-motion'

type Theme = 'brutalism' | 'liquidGlass'

function App() {
  const [theme, setTheme] = useState<Theme>('brutalism')
  const [tooltipTheme, setTooltipTheme] = useState<Theme | null>(null)
  const hideTooltipTimeout = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (hideTooltipTimeout.current !== null) {
        window.clearTimeout(hideTooltipTimeout.current)
        hideTooltipTimeout.current = null
      }
    }
  }, [])

  const showMobileTooltip = (nextTheme: Theme) => {
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

  const handleThemeClick = (nextTheme: Theme) => {
    setTheme(nextTheme)
    showMobileTooltip(nextTheme)
  }

  const hoverLabelBaseClasses =
    'pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 translate-y-2 whitespace-nowrap origin-bottom opacity-0 scale-95 mix-blend-normal transition-all duration-200 ease-out md:bottom-auto md:left-full md:top-1/2 md:mb-0 md:ml-4 md:-translate-y-1/2 md:translate-x-3 md:origin-left md:opacity-0 md:scale-95 md:group-hover:opacity-100 md:group-hover:translate-x-0 md:group-hover:scale-100'
  const hoverLabelThemeStyles: Record<Theme, string> = {
    brutalism:
      'rounded-xl border-[3px] border-black bg-[#FCEE4B] px-3 py-1 text-[0.7rem] font-black uppercase tracking-[0.22em] text-[#111] shadow-[4px_4px_0_0_#111] md:px-4 md:py-1.5 md:text-xs',
    liquidGlass:
      'rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-slate-100 shadow-[0_12px_32px_0_rgba(15,23,42,0.45)] backdrop-blur-md md:px-4 md:py-1.5 md:text-xs',
  }

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden">
      {/* Theme Picker */}
      <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center md:bottom-auto md:left-6 md:right-auto md:top-1/2 md:justify-start md:-translate-y-1/2">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className={`flex items-center gap-2.5 md:flex-col md:gap-3 ${
            theme === 'brutalism' ? '' : 'mix-blend-difference'
          }`}>
          <motion.button
            onClick={() => handleThemeClick('brutalism')}
            className={`group relative flex h-14 w-14 items-center justify-center rounded-xl border-[3px] border-black transition-all md:h-16 md:w-16 md:rounded-2xl md:border-4 ${
              theme === 'brutalism'
                ? 'bg-[#FCEE4B] shadow-[5px_5px_0_0_#111] md:shadow-[8px_8px_0_0_#111]'
                : 'bg-white/80 shadow-[3px_3px_0_0_#111] hover:shadow-[4px_4px_0_0_#111] md:shadow-[4px_4px_0_0_#111] md:hover:shadow-[6px_6px_0_0_#111]'
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Switch to the Brutalism theme"
            type="button">
            <div className="flex flex-col items-center gap-0.5 md:gap-1">
              <div className="h-2 w-2 rounded-sm border-2 border-black bg-[#FF6F91] md:h-3 md:w-3" />
              <div className="h-1.5 w-6 border-2 border-black bg-[#2EC4B6] md:h-2 md:w-8" />
            </div>
            <span
              aria-hidden="true"
              className={`${hoverLabelBaseClasses} ${
                hoverLabelThemeStyles[theme]
              } ${
                tooltipTheme === 'brutalism'
                  ? 'opacity-100 translate-y-0 scale-100'
                  : ''
              }`}>
              Brutalism
            </span>
            {theme === 'brutalism' && (
              <motion.div
                layoutId="theme-indicator"
                className="absolute inset-0 rounded-xl border-[3px] border-black md:rounded-2xl md:border-4"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>

          <motion.button
            onClick={() => handleThemeClick('liquidGlass')}
            className={`group relative flex h-14 w-14 items-center justify-center rounded-xl border transition-all md:h-16 md:w-16 md:rounded-2xl ${
              theme === 'liquidGlass'
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
                hoverLabelThemeStyles[theme]
              } ${
                tooltipTheme === 'liquidGlass'
                  ? 'opacity-100 translate-y-0 scale-100'
                  : ''
              }`}>
              Liquid Glass
            </span>
            {theme === 'liquidGlass' && (
              <motion.div
                layoutId="theme-indicator-glass"
                className="absolute inset-0 rounded-xl border-2 border-white/60 md:rounded-2xl"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        </motion.div>
      </div>

      {/* Render selected theme */}
      {theme === 'brutalism' ? <BrutalismTheme /> : <LiquidGlassTheme />}
    </div>
  )
}

export default App
