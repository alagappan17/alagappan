import { type ThemeConfig } from '../types'
import { SynthwaveBackground } from './Background'

export const synthwaveTheme: ThemeConfig = {
  id: 'synthwave',
  name: 'Synthwave',
  colors: {
    background: '#0a0014',
    text: '#F0E6FF',
    cardBackground: 'rgba(26, 0, 51, 0.8)',
    cardBorder: '#FF006E',
    accentPrimary: '#FF006E',
    accentSecondary: '#00F5FF',
  },
  fonts: {
    heading: '"Orbitron", "Exo 2", "Rajdhani", -apple-system, sans-serif',
    body: '"Rajdhani", "Exo 2", -apple-system, sans-serif',
    mono: '"Share Tech Mono", "Courier New", monospace',
  },
  cardStyles: {
    containerClassName:
      'relative z-10 w-full max-w-md space-y-4 rounded-2xl border-2 border-[#FF006E] bg-gradient-to-br from-[#1a0033]/95 via-[#2d004d]/90 to-[#1a0033]/95 p-[1.125rem] shadow-[0_0_30px_0_rgba(255,0,110,0.4),0_0_60px_0_rgba(0,245,255,0.2),inset_0_0_40px_0_rgba(255,0,255,0.1)] backdrop-blur-xl sm:max-w-2xl sm:space-y-8 sm:rounded-[1.5rem] sm:border-[3px] sm:p-[1.75rem] sm:shadow-[0_0_40px_0_rgba(255,0,110,0.5),0_0_80px_0_rgba(0,245,255,0.3),inset_0_0_50px_0_rgba(255,0,255,0.15)] md:space-y-10 md:rounded-[2rem] md:p-[2.25rem] md:border-[3px]',
    borderClassName: 'border-2 border-[#FF006E] sm:border-[3px]',
    shadowClassName: 'shadow-[0_0_30px_0_rgba(255,0,110,0.4),0_0_60px_0_rgba(0,245,255,0.2)] md:shadow-[0_0_40px_0_rgba(255,0,110,0.5),0_0_80px_0_rgba(0,245,255,0.3)]',
    backgroundClassName: 'bg-gradient-to-br from-[#1a0033]/95 via-[#2d004d]/90 to-[#1a0033]/95 backdrop-blur-xl',
    glassEffect: 'backdrop-blur-xl',
    gradientAnimation: {
      gradients: [
        'radial-gradient(circle at 20% 30%, rgba(255, 0, 110, 0.25) 0%, transparent 50%)',
        'radial-gradient(circle at 80% 70%, rgba(0, 245, 255, 0.2) 0%, transparent 50%)',
        'radial-gradient(circle at 50% 50%, rgba(181, 55, 242, 0.18) 0%, transparent 60%)',
        'radial-gradient(circle at 70% 20%, rgba(255, 107, 0, 0.15) 0%, transparent 55%)',
        'radial-gradient(circle at 20% 30%, rgba(255, 0, 110, 0.25) 0%, transparent 50%)',
      ],
      duration: 16,
      borderRadius: 'rounded-2xl sm:rounded-[1.5rem] md:rounded-[2rem]',
    },
  },
  badgeStyles: {
    containerClassName:
      'relative z-10 inline-flex items-center gap-1.5 rounded-full border-2 border-[#00F5FF] bg-gradient-to-r from-[#FF006E]/20 to-[#00F5FF]/20 px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.25em] text-[#00F5FF] sm:gap-2 sm:px-4 sm:py-2 sm:text-[0.65rem] sm:tracking-[0.3em] shadow-[0_0_15px_0_rgba(0,245,255,0.6),inset_0_0_10px_0_rgba(255,0,110,0.3)]',
    dotClassName: 'h-1.5 w-1.5 rounded-full bg-[#00F5FF] animate-pulse sm:h-2 sm:w-2 shadow-[0_0_8px_2px_rgba(0,245,255,1)]',
  },
  headingStyles: {
    titleClassName:
      'text-[1.875rem] font-black leading-[1.05] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FF006E] via-[#FF00FF] to-[#00F5FF] sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-[0_0_20px_rgba(255,0,110,0.8)]',
    bioClassName:
      'max-w-xl text-[0.875rem] font-medium leading-[1.65] text-[#E0D4FF] sm:text-base md:text-xl drop-shadow-[0_0_5px_rgba(224,212,255,0.3)]',
  },
  linkStyles: {
    containerClassName:
      'group relative flex flex-col gap-0.5 overflow-hidden rounded-xl border-2 border-[#FF006E]/40 bg-gradient-to-br from-[#1a0033]/80 to-[#2d004d]/60 px-3 py-3 transition-all duration-300 hover:border-[#00F5FF] hover:bg-gradient-to-br hover:from-[#2d004d]/90 hover:to-[#4d007d]/70 sm:px-4 sm:py-4 hover:shadow-[0_0_25px_0_rgba(0,245,255,0.5),inset_0_0_20px_0_rgba(255,0,110,0.2)] backdrop-blur-sm',
    labelClassName: 'text-[0.875rem] font-bold tracking-wide text-[#00F5FF] sm:text-base drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]',
    captionClassName: 'text-[0.65rem] font-medium leading-[1.4] text-[#B8A8FF] sm:text-xs',
    iconContainerClassName:
      'flex h-6 w-6 items-center justify-center rounded-lg border-2 border-[#FF006E]/60 bg-gradient-to-br from-[#FF006E]/30 to-[#B537F2]/30 sm:h-7 sm:w-7 shadow-[0_0_10px_0_rgba(255,0,110,0.5)]',
    hoverEffect: 'border-[#00F5FF] bg-gradient-to-br from-[#00F5FF]/30 to-[#B537F2]/30 shadow-[0_0_15px_0_rgba(0,245,255,0.7)]',
  },
  locationStyles: {
    containerClassName:
      'relative z-10 flex items-center gap-1.5 text-[0.65rem] font-medium text-[#B8A8FF] sm:gap-3 sm:text-sm',
    iconContainerClassName:
      'relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-xl border-2 border-[#FF006E] bg-gradient-to-br from-[#FF006E]/30 to-[#B537F2]/30 sm:h-10 sm:w-10 sm:rounded-2xl shadow-[0_0_15px_0_rgba(255,0,110,0.6),inset_0_0_10px_0_rgba(181,55,242,0.4)]',
    textClassName: 'text-[0.75rem] font-semibold leading-[1.4] tracking-wide text-[#00F5FF] sm:text-sm drop-shadow-[0_0_8px_rgba(0,245,255,0.6)]',
  },
  projectLinkStyles: {
    linkClassName:
      'font-bold text-[#00F5FF] underline decoration-2 decoration-[#FF006E] underline-offset-4 transition-all hover:text-[#FF00FF] hover:decoration-[#00F5FF] drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]',
    textClassName:
      'max-w-xl text-[0.875rem] font-medium leading-[1.65] text-[#E0D4FF] sm:text-base md:text-xl',
  },
  animations: {
    badge: {
      initial: { opacity: 0, scale: 0.8, y: -20 },
      animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          duration: 0.7,
          delay: 0.1,
          ease: [0.34, 1.56, 0.64, 1] as const, // Bouncy ease
        },
      },
    },
    heading: {
      initial: { opacity: 0, y: 30, scale: 0.95 },
      animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { 
          duration: 0.9, 
          delay: 0.2, 
          ease: [0.34, 1.56, 0.64, 1] as const,
        },
      },
    },
    body: {
      initial: { opacity: 0, y: 20 },
      animate: {
        opacity: 1,
        y: 0,
        transition: { 
          duration: 0.8, 
          delay: 0.4, 
          ease: [0.25, 0.46, 0.45, 0.94] as const,
        },
      },
    },
    links: (index: number) => ({
      initial: { opacity: 0, x: -30, scale: 0.9 },
      animate: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
          delay: 0.5 + index * 0.1,
          duration: 0.7,
          ease: [0.34, 1.56, 0.64, 1] as const,
        },
      },
    }),
  },
  interactionConfig: {
    cardTiltMax: 8,
    cardGlareRest: { x: 50, y: 50 },
    cardScaleMin: 0.75,
    enableCardTilt: true,
    enableGlareEffect: true,
    pointerVelocityMultiplier: 0.4,
  },
  mobileConfig: {
    background: 'linear-gradient(180deg, #0a0014 0%, #1a0033 35%, #2d004d 60%, #1a0033 85%, #0a0014 100%)',
    disableAnimations: false,
  },
  BackgroundComponent: SynthwaveBackground,
}



