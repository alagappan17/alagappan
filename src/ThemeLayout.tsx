import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { type ThemeConfig } from './themes/types'
import { personalInfo } from './content/personal-info'
import { ProfileCard } from './components/ProfileCard'
import { Badge } from './components/Badge'
import { ProfileHeader } from './components/ProfileHeader'
import { ProjectSection } from './components/ProjectSection'
import { LinksList } from './components/LinksList'
import { LocationFooter } from './components/LocationFooter'

interface ThemeLayoutProps {
  theme: ThemeConfig
}

export function ThemeLayout({ theme }: ThemeLayoutProps) {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    const touchDevice =
      typeof navigator !== 'undefined' ? navigator.maxTouchPoints > 1 : false
    return window.innerWidth <= 768 || touchDevice
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mediaQuery = window.matchMedia('(max-width: 768px)')

    const updateIsMobile = () => {
      const touchDevice =
        typeof navigator !== 'undefined' ? navigator.maxTouchPoints > 1 : false
      setIsMobile(mediaQuery.matches || touchDevice)
    }

    updateIsMobile()

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateIsMobile)
    } else {
      mediaQuery.addListener(updateIsMobile)
    }

    window.addEventListener('resize', updateIsMobile)

    return () => {
      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', updateIsMobile)
      } else {
        mediaQuery.removeListener(updateIsMobile)
      }

      window.removeEventListener('resize', updateIsMobile)
    }
  }, [])

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault()
    const emailLink = personalInfo.links.find((link) => link.type === 'email')
    if (!emailLink?.email) return

    try {
      await navigator.clipboard.writeText(emailLink.email)
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }

  const getContainerStyle = () => {
    const baseStyle: React.CSSProperties = {
      fontFamily: theme.fonts.body,
    }

    if (theme.id === 'brutalism') {
      if (isMobile) {
        return { ...baseStyle, background: theme.mobileConfig.background }
      }
      return {
        ...baseStyle,
        background:
          'repeating-linear-gradient(135deg, #FCEE4B 0px, #FCEE4B 120px, #FFF5CC 120px, #FFF5CC 122px)',
      }
    }
    // liquid glass
    return isMobile
      ? { ...baseStyle, background: theme.mobileConfig.background }
      : baseStyle
  }

  const containerClasses =
    theme.id === 'brutalism'
      ? 'relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden px-4 py-20 text-[#111] sm:px-6 sm:py-24 md:py-8'
      : 'relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[#F5F5FA] px-4 py-20 text-slate-900 sm:px-6 sm:py-24 md:py-12'

  return (
    <div className={containerClasses} style={getContainerStyle()}>
      <theme.BackgroundComponent isMobile={isMobile} />

      <ProfileCard theme={theme} isMobile={isMobile}>
        <Badge text={personalInfo.badge.text} theme={theme} />

        <ProfileHeader
          name={personalInfo.name}
          bio={personalInfo.bio}
          theme={theme}
        />

        <motion.div
          className="relative z-10 space-y-3 sm:space-y-6"
          initial="initial"
          animate="animate"
          variants={theme.animations.body}>
          <ProjectSection
            description={personalInfo.project.description}
            url={personalInfo.project.url}
            displayUrl={personalInfo.project.displayUrl}
            theme={theme}
          />
          <LinksList
            links={personalInfo.links}
            theme={theme}
            copiedEmail={copiedEmail}
            onCopyEmail={handleCopyEmail}
          />
        </motion.div>

        <LocationFooter
          city={personalInfo.location.city}
          country={personalInfo.location.country}
          theme={theme}
        />
      </ProfileCard>
    </div>
  )
}
