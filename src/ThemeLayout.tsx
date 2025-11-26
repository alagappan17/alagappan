import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { type ThemeConfig } from './themes/types'
import { personalInfo } from './content/personal-info'
import { ProfileCard } from './components/ProfileCard'
import { Badge } from './components/Badge'
import { ProfileHeader } from './components/ProfileHeader'
import { IntroductionSection } from './components/IntroductionSection'
import { DevPortfolioSection } from './components/DevPortfolioSection'
import { ProjectSection } from './components/ProjectSection'
import { LinksList } from './components/LinksList'
import { LocationFooter } from './components/LocationFooter'
import { ArtworksSection } from './components/ArtworksSection'
import { ConnectSection } from './components/ConnectSection'
import { LifestyleSection } from './components/LifestyleSection'

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
  const { scrollY } = useScroll()
  const scrollProgress = useTransform(scrollY, [0, 1000], [0, 1])

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
      return {
        ...baseStyle,
        background:
          'repeating-linear-gradient(135deg, #FCEE4B 0px, #FCEE4B 120px, #FFF5CC 120px, #FFF5CC 122px)',
      }
    }
    // liquid glass
    return baseStyle
  }

  const getSecondScreenStyle = () => {
    const baseStyle: React.CSSProperties = {
      fontFamily: theme.fonts.body,
    }

    if (theme.id === 'brutalism') {
      return {
        ...baseStyle,
        background: `
          repeating-linear-gradient(0deg, transparent 0px, transparent 39px, rgba(0,0,0,0.04) 39px, rgba(0,0,0,0.04) 40px),
          repeating-linear-gradient(90deg, transparent 0px, transparent 39px, rgba(0,0,0,0.04) 39px, rgba(0,0,0,0.04) 40px),
          repeating-linear-gradient(45deg, rgba(252, 238, 75, 0.08) 0px, rgba(252, 238, 75, 0.08) 20px, transparent 20px, transparent 40px),
          repeating-linear-gradient(-45deg, rgba(255, 111, 145, 0.08) 0px, rgba(255, 111, 145, 0.08) 20px, transparent 20px, transparent 40px),
          #FFF7E0
        `,
      }
    }
    // liquid glass
    return baseStyle
  }

  const getLifestyleScreenStyle = () => {
    const baseStyle: React.CSSProperties = {
      fontFamily: theme.fonts.body,
    }

    if (theme.id === 'brutalism') {
      return {
        ...baseStyle,
        background: `
          repeating-linear-gradient(90deg, 
            #FEF3C7 0px, 
            #FEF3C7 40px, 
            rgba(251, 191, 36, 0.3) 40px, 
            rgba(251, 191, 36, 0.3) 80px
          ),
          repeating-linear-gradient(0deg, 
            #FEF3C7 0px, 
            #FEF3C7 40px, 
            rgba(251, 146, 60, 0.3) 40px, 
            rgba(251, 146, 60, 0.3) 80px
          ),
          #FEF3C7
        `,
        backgroundSize: '80px 80px',
      }
    }
    // liquid glass
    return baseStyle
  }

  const getThirdScreenStyle = () => {
    const baseStyle: React.CSSProperties = {
      fontFamily: theme.fonts.body,
    }

    if (theme.id === 'brutalism') {
      return {
        ...baseStyle,
        background: `
          repeating-conic-gradient(from 0deg at 50% 50%, 
            #2EC4B6 0deg 90deg, 
            #5EDCD4 90deg 180deg, 
            #2EC4B6 180deg 270deg, 
            #5EDCD4 270deg 360deg
          ),
          #2EC4B6
        `,
        backgroundSize: '80px 80px',
        backgroundPosition: '0 0',
      }
    }
    // liquid glass
    return baseStyle
  }

  const getFourthScreenStyle = () => {
    const baseStyle: React.CSSProperties = {
      fontFamily: theme.fonts.body,
    }

    if (theme.id === 'brutalism') {
      return {
        ...baseStyle,
        background: `
          repeating-linear-gradient(45deg, #FF6F91 0px, #FF6F91 60px, #FF8FAA 60px, #FF8FAA 62px),
          repeating-linear-gradient(-45deg, transparent 0px, transparent 60px, rgba(0,0,0,0.05) 60px, rgba(0,0,0,0.05) 62px),
          #FF6F91
        `,
      }
    }
    // liquid glass
    return baseStyle
  }

  const getFifthScreenStyle = () => {
    const baseStyle: React.CSSProperties = {
      fontFamily: theme.fonts.body,
    }

    if (theme.id === 'brutalism') {
      return {
        ...baseStyle,
        background: `
          repeating-linear-gradient(0deg, transparent 0px, transparent 39px, rgba(0,0,0,0.04) 39px, rgba(0,0,0,0.04) 40px),
          repeating-linear-gradient(90deg, transparent 0px, transparent 39px, rgba(0,0,0,0.04) 39px, rgba(0,0,0,0.04) 40px),
          repeating-linear-gradient(45deg, rgba(255, 111, 145, 0.08) 0px, rgba(255, 111, 145, 0.08) 20px, transparent 20px, transparent 40px),
          repeating-linear-gradient(-45deg, rgba(46, 196, 182, 0.08) 0px, rgba(46, 196, 182, 0.08) 20px, transparent 20px, transparent 40px),
          #FFF7E0
        `,
      }
    }
    // liquid glass
    return baseStyle
  }

  const firstScreenClasses =
    theme.id === 'brutalism'
      ? 'relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 pt-0 pb-20 text-[#111] sm:px-6 sm:pt-4 sm:pb-24 md:min-h-0 md:pt-12 md:pb-16 lg:pt-16 lg:pb-20'
      : 'relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F5F5FA] px-4 pt-0 pb-20 text-slate-900 sm:px-6 sm:pt-4 sm:pb-24 md:min-h-0 md:pt-12 md:pb-16 lg:pt-16 lg:pb-20'

  const secondScreenClasses =
    theme.id === 'brutalism'
      ? 'relative min-h-screen w-full overflow-hidden px-6 py-12 text-[#111] sm:px-8 sm:py-16 md:min-h-0 md:px-12 md:py-16 lg:px-16 lg:py-20'
      : 'relative min-h-screen w-full overflow-hidden px-6 py-12 bg-[#F5F5FA] text-slate-900 sm:px-8 sm:py-16 md:min-h-0 md:px-12 md:py-16 lg:px-16 lg:py-20'

  const lifestyleScreenClasses =
    theme.id === 'brutalism'
      ? 'relative min-h-screen w-full overflow-hidden px-6 py-12 text-[#111] sm:px-8 sm:py-16 md:min-h-0 md:px-12 md:py-16 lg:px-16 lg:py-20'
      : 'relative min-h-screen w-full overflow-hidden px-6 py-12 bg-[#F5F5FA] text-slate-900 sm:px-8 sm:py-16 md:min-h-0 md:px-12 md:py-16 lg:px-16 lg:py-20'

  const thirdScreenClasses =
    theme.id === 'brutalism'
      ? 'relative min-h-screen w-full overflow-hidden px-4 py-20 text-[#111] sm:px-6 sm:py-24 md:min-h-0 md:py-16 lg:py-20'
      : 'relative min-h-screen w-full overflow-hidden px-4 py-20 bg-[#F5F5FA] text-slate-900 sm:px-6 sm:py-24 md:min-h-0 md:py-16 lg:py-20'

  const fourthScreenClasses =
    theme.id === 'brutalism'
      ? 'relative min-h-screen w-full overflow-hidden px-4 py-20 text-[#111] sm:px-6 sm:py-24 md:min-h-0 md:py-16 lg:py-20'
      : 'relative min-h-screen w-full overflow-hidden px-4 py-20 bg-[#F5F5FA] text-slate-900 sm:px-6 sm:py-24 md:min-h-0 md:py-16 lg:py-20'

  const fifthScreenClasses =
    theme.id === 'brutalism'
      ? 'relative min-h-screen w-full overflow-hidden px-4 py-20 text-[#111] sm:px-6 sm:py-24 md:min-h-0 md:px-12 md:py-16 lg:px-16 lg:py-20'
      : 'relative min-h-screen w-full overflow-hidden px-4 py-20 bg-[#F5F5FA] text-slate-900 sm:px-6 sm:py-24 md:min-h-0 md:px-12 md:py-16 lg:px-16 lg:py-20'

  return (
    <>
      {/* First Screen - Profile Card */}
      <div
        id="section-home"
        className={firstScreenClasses}
        style={getContainerStyle()}>
        <theme.BackgroundComponent
          isMobile={isMobile}
          scrollProgress={scrollProgress}
        />

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
            {personalInfo.project.description && (
              <ProjectSection
                description={personalInfo.project.description}
                url={personalInfo.project.url}
                displayUrl={personalInfo.project.displayUrl}
                theme={theme}
              />
            )}
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

      {/* Second Screen - About Me with Timeline */}
      <div
        id="section-about"
        className={secondScreenClasses}
        style={getSecondScreenStyle()}>
        <theme.BackgroundComponent
          isMobile={isMobile}
          scrollProgress={scrollProgress}
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={theme.animations.body}>
            <IntroductionSection
              paragraphs={personalInfo.introduction}
              theme={theme}
            />
          </motion.div>
        </div>
      </div>

      {/* Third Screen - Dev Portfolio (Tech Stack & Projects) */}
      <div
        id="section-journey"
        className={thirdScreenClasses}
        style={getThirdScreenStyle()}>
        <theme.BackgroundComponent
          isMobile={isMobile}
          scrollProgress={scrollProgress}
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={theme.animations.body}>
            <DevPortfolioSection
              techStack={personalInfo.techStack}
              projects={personalInfo.projects}
              timeline={personalInfo.timeline}
              theme={theme}
            />
          </motion.div>
        </div>
      </div>

      {/* Fourth Screen - Artworks */}
      <div
        id="section-artworks"
        className={fourthScreenClasses}
        style={getFourthScreenStyle()}>
        <theme.BackgroundComponent
          isMobile={isMobile}
          scrollProgress={scrollProgress}
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={theme.animations.body}>
            <ArtworksSection artworks={personalInfo.artworks} theme={theme} />
          </motion.div>
        </div>
      </div>

      {/* Lifestyle Screen - Life & Interests Scrapbook */}
      <div
        id="section-lifestyle"
        className={lifestyleScreenClasses}
        style={getLifestyleScreenStyle()}>
        <theme.BackgroundComponent
          isMobile={isMobile}
          scrollProgress={scrollProgress}
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={theme.animations.body}>
            <LifestyleSection
              lifestyleItems={personalInfo.lifestyle}
              theme={theme}
            />
          </motion.div>
        </div>
      </div>

      {/* Fifth Screen - Connect */}
      <div
        id="section-connect"
        className={fifthScreenClasses}
        style={getFifthScreenStyle()}>
        <theme.BackgroundComponent
          isMobile={isMobile}
          scrollProgress={scrollProgress}
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={theme.animations.body}>
            <ConnectSection
              theme={theme}
              socialLinks={personalInfo.socialLinks}
            />
          </motion.div>
        </div>
      </div>
    </>
  )
}
