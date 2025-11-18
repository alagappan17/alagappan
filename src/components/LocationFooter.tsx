import { motion } from 'framer-motion'
import { type ThemeConfig } from '../themes/types'

interface LocationFooterProps {
  city: string
  country: string
  theme: ThemeConfig
}

export function LocationFooter({ city, country, theme }: LocationFooterProps) {
  const getIconBackground = () => {
    if (theme.id === 'brutalism') {
      return 'bg-[#FFDF6B]/40 sm:rounded-3xl'
    }
    return 'bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10'
  }

  return (
    <motion.div className={theme.locationStyles.containerClassName} variants={theme.animations.body}>
      <motion.span
        className={theme.locationStyles.iconContainerClassName}
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
          className={
            theme.id === 'brutalism'
              ? 'h-4 w-4 text-[#111] sm:h-6 sm:w-6'
              : 'h-4 w-4 text-blue-600 sm:h-5 sm:w-5'
          }>
          <path
            fillRule="evenodd"
            d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"
          />
        </svg>
        <motion.span
          aria-hidden
          className={`absolute inset-0 ${theme.id === 'brutalism' ? 'rounded-lg' : ''} ${getIconBackground()}`}
          animate={{ opacity: [0.7, 0.3, 0.7] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        />
      </motion.span>

      <span className={theme.locationStyles.textClassName}>
        Based in {city}, {country}
      </span>
    </motion.div>
  )
}

