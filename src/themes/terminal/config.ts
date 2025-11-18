import { type ThemeConfig } from '../types'
import { TerminalBackground } from './Background'

export const terminalTheme: ThemeConfig = {
  id: 'terminal',
  name: 'Terminal',
  colors: {
    background: '#000000',
    text: '#00FF41',
    cardBackground: '#0A0A0A',
    cardBorder: '#00FF41',
    accentPrimary: '#00FF41',
    accentSecondary: '#00CC33',
  },
  fonts: {
    heading: '"Courier New", "Courier", "Monaco", monospace',
    body: '"Courier New", "Courier", "Monaco", monospace',
    mono: '"Courier New", "Courier", "Monaco", monospace',
  },
  cardStyles: {
    containerClassName:
      'relative z-10 w-full max-w-md space-y-4 rounded-none border-2 border-[#00FF41] bg-black/95 p-[1.125rem] shadow-[0_0_20px_0_rgba(0,255,65,0.3)] sm:max-w-2xl sm:space-y-8 sm:border-[3px] sm:p-[1.75rem] sm:shadow-[0_0_30px_0_rgba(0,255,65,0.4)] md:space-y-10 md:p-[2.25rem] backdrop-blur-sm font-mono',
    borderClassName: 'border-2 border-[#00FF41] sm:border-[3px]',
    shadowClassName: 'shadow-[0_0_20px_0_rgba(0,255,65,0.3)] sm:shadow-[0_0_30px_0_rgba(0,255,65,0.4)]',
    backgroundClassName: 'bg-black/95',
    glassEffect: 'backdrop-blur-sm',
    gradientAnimation: {
      gradients: [
        'radial-gradient(circle at 20% 30%, rgba(0, 255, 65, 0.15) 0%, transparent 50%)',
        'radial-gradient(circle at 80% 70%, rgba(0, 204, 51, 0.2) 0%, transparent 50%)',
        'radial-gradient(circle at 50% 50%, rgba(0, 255, 65, 0.12) 0%, transparent 60%)',
        'radial-gradient(circle at 20% 30%, rgba(0, 255, 65, 0.15) 0%, transparent 50%)',
      ],
      duration: 10,
      borderRadius: 'rounded-none',
    },
  },
  badgeStyles: {
    containerClassName:
      'relative z-10 inline-flex items-center gap-1.5 rounded-none border border-[#00FF41] bg-black px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.25em] text-[#00FF41] sm:gap-2 sm:px-4 sm:py-2 sm:text-[0.65rem] sm:tracking-[0.3em] font-mono shadow-[0_0_10px_0_rgba(0,255,65,0.3)]',
    dotClassName: 'h-1.5 w-1.5 bg-[#00FF41] animate-pulse sm:h-2 sm:w-2 shadow-[0_0_5px_0_rgba(0,255,65,0.8)]',
  },
  headingStyles: {
    titleClassName:
      'text-[1.875rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#00FF41] sm:text-4xl md:text-5xl lg:text-6xl font-mono text-shadow-[0_0_10px_rgba(0,255,65,0.5)]',
    bioClassName:
      'max-w-xl text-[0.875rem] font-normal leading-[1.7] text-[#00CC33] sm:text-base md:text-xl font-mono',
  },
  linkStyles: {
    containerClassName:
      'group relative flex flex-col gap-0.5 overflow-hidden border-b border-[#00FF41]/30 bg-black px-3 py-3 transition-all duration-300 hover:border-[#00FF41] hover:bg-[#00FF41]/5 sm:px-4 sm:py-4 font-mono hover:shadow-[0_0_15px_0_rgba(0,255,65,0.2)]',
    labelClassName: 'text-[0.875rem] font-semibold tracking-wide text-[#00FF41] sm:text-base font-mono',
    captionClassName: 'text-[0.65rem] font-normal leading-[1.4] text-[#00CC33]/80 sm:text-xs font-mono',
    iconContainerClassName:
      'flex h-6 w-6 items-center justify-center border border-[#00FF41]/50 bg-black sm:h-7 sm:w-7 shadow-[0_0_5px_0_rgba(0,255,65,0.3)]',
    hoverEffect: 'border-[#00FF41] bg-[#00FF41]/5',
  },
  locationStyles: {
    containerClassName:
      'relative z-10 flex items-center gap-1.5 text-[0.65rem] font-normal text-[#00CC33] sm:gap-3 sm:text-sm font-mono',
    iconContainerClassName:
      'relative flex h-7 w-7 items-center justify-center overflow-hidden border-2 border-[#00FF41] bg-black sm:h-10 sm:w-10 shadow-[0_0_10px_0_rgba(0,255,65,0.3)]',
    textClassName: 'text-[0.75rem] font-normal leading-[1.4] tracking-wide text-[#00FF41] sm:text-sm font-mono',
  },
  projectLinkStyles: {
    linkClassName:
      'font-bold text-[#00FF41] underline decoration-2 underline-offset-4 transition-colors hover:text-[#00CC33] font-mono hover:shadow-[0_0_5px_0_rgba(0,255,65,0.5)]',
    textClassName:
      'max-w-xl text-[0.875rem] font-normal leading-[1.7] text-[#00CC33] sm:text-base md:text-xl font-mono',
  },
  animations: {
    badge: {
      initial: { opacity: 0, x: -20 },
      animate: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.6,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1] as const,
        },
      },
    },
    heading: {
      initial: { opacity: 0, y: 20 },
      animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const },
      },
    },
    body: {
      initial: { opacity: 0, y: 20 },
      animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const },
      },
    },
    links: (index: number) => ({
      initial: { opacity: 0, y: 10 },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          delay: 0.5 + index * 0.08,
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1] as const,
        },
      },
    }),
  },
  interactionConfig: {
    cardTiltMax: 3,
    cardGlareRest: { x: 50, y: 50 },
    cardScaleMin: 0.78,
    enableCardTilt: true,
    enableGlareEffect: true,
    pointerVelocityMultiplier: 0.3,
  },
  mobileConfig: {
    background: 'linear-gradient(135deg, #000000 0%, #001a00 100%)',
    disableAnimations: false,
  },
  BackgroundComponent: TerminalBackground,
}

