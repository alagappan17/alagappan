import { type ThemeConfig } from '../types'
import { BrutalismBackground } from './Background'

export const brutalismTheme: ThemeConfig = {
  id: 'brutalism',
  name: 'Neo Brutalism',
  colors: {
    background: '#FCEE4B',
    text: '#111',
    cardBackground: '#FFF7E0',
    cardBorder: '#111',
    accentPrimary: '#FF6F91',
    accentSecondary: '#2EC4B6',
  },
  fonts: {
    heading: '"Space Grotesk", "Arial Black", sans-serif',
    body: '"Inter", "Helvetica Neue", sans-serif',
  },
  cardStyles: {
    containerClassName:
      'relative z-10 w-full max-w-md space-y-4 rounded-[1.5rem] border-[3px] border-black bg-[#FFF7E0] p-[1.125rem] shadow-[8px_8px_0_0_#111] sm:max-w-2xl sm:space-y-8 sm:rounded-[2.5rem] sm:border-4 sm:p-[1.75rem] sm:shadow-[18px_18px_0_0_#111] md:space-y-10 md:p-[2.25rem]',
    borderClassName: 'border-[3px] border-black sm:border-4',
    shadowClassName: 'shadow-[8px_8px_0_0_#111] sm:shadow-[18px_18px_0_0_#111]',
    backgroundClassName: 'bg-[#FFF7E0]',
    gradientAnimation: {
      gradients: [
        'linear-gradient(135deg, rgba(255, 182, 193, 0.4) 0%, transparent 60%)',
        'linear-gradient(135deg, rgba(94, 234, 212, 0.35) 20%, transparent 70%)',
        'linear-gradient(135deg, rgba(92, 124, 250, 0.35) 10%, transparent 65%)',
        'linear-gradient(135deg, rgba(255, 182, 193, 0.4) 0%, transparent 60%)',
      ],
      duration: 12,
      borderRadius: 'rounded-[1.5rem] sm:rounded-[2.5rem]',
    },
  },
  badgeStyles: {
    containerClassName:
      'relative z-10 inline-flex items-center gap-1.5 rounded-full border-[2.5px] border-black bg-[#FFFBF3] px-3 py-1.5 text-[0.6rem] font-black uppercase tracking-[0.18em] text-[#111] shadow-[3px_3px_0_0_#111] sm:gap-3 sm:border-[3px] sm:px-6 sm:py-3 sm:text-xs sm:tracking-[0.35em] sm:shadow-[6px_6px_0_0_#111]',
    dotClassName:
      'h-1.5 w-1.5 rounded-full bg-[#2EC4B6] ring-2 ring-black sm:h-3 sm:w-3',
  },
  headingStyles: {
    titleClassName:
      'text-[1.875rem] font-black leading-[1.05] sm:text-4xl md:text-5xl lg:text-6xl',
    bioClassName:
      'max-w-xl text-[0.875rem] leading-[1.55] text-[#222] sm:text-base md:text-xl',
  },
  linkStyles: {
    containerClassName:
      'group relative flex flex-col gap-0.5 overflow-hidden rounded-xl border-[3px] border-black px-3 py-2 text-[#111] sm:gap-2 sm:rounded-3xl sm:border-4 sm:px-5 sm:py-4',
    labelClassName: 'text-[0.875rem] font-black sm:text-lg',
    captionClassName:
      'text-[0.65rem] font-medium leading-[1.2] text-[#333] sm:text-sm',
    iconContainerClassName:
      'flex h-7 w-7 items-center justify-center rounded-lg border-[2.5px] border-black bg-white text-[#111] sm:h-10 sm:w-10 sm:rounded-2xl sm:border-[3px]',
    hoverEffect: '6px 6px 0 0 #111',
  },
  locationStyles: {
    containerClassName:
      'relative z-10 flex items-center gap-1.5 text-[0.65rem] font-medium text-[#333] sm:gap-3 sm:text-sm',
    iconContainerClassName:
      'relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg border-[2.5px] border-black bg-white shadow-[3px_3px_0_0_#111] sm:h-12 sm:w-12 sm:rounded-3xl sm:border-4 sm:shadow-[8px_8px_0_0_#111]',
    textClassName: 'text-[0.75rem] font-black leading-[1.2] text-[#111] sm:text-base',
  },
  projectLinkStyles: {
    linkClassName:
      'font-black text-[#111] underline decoration-[3px] decoration-[#111]/80 transition-colors hover:text-[#FF6F91]',
    textClassName:
      'max-w-xl text-[0.875rem] leading-[1.55] text-[#222] sm:text-base md:text-xl',
  },
  animations: {
    badge: {
      initial: { opacity: 0, y: 16 },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.9,
          delay: 0.1,
          ease: [0.25, 0.1, 0.25, 1] as const,
        },
      },
    },
    heading: {
      initial: { opacity: 0, y: 24 },
      animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 1, delay: 0.25, ease: [0.19, 1, 0.22, 1] as const },
      },
    },
    body: {
      initial: { opacity: 0, y: 20 },
      animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 1, delay: 0.5, ease: 'easeOut' as const },
      },
    },
    links: (index: number) => ({
      initial: { opacity: 0, y: 24 },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          delay: 0.65 + index * 0.12,
          duration: 0.85,
          ease: [0.25, 0.8, 0.25, 1] as const,
        },
      },
    }),
  },
  interactionConfig: {
    cardTiltMax: 6,
    cardGlareRest: { x: 52, y: 48 },
    cardScaleMin: 0.78,
    enableCardTilt: true,
    enableGlareEffect: true,
    pointerVelocityMultiplier: 0,
  },
  mobileConfig: {
    background: 'linear-gradient(135deg, #FCEE4B 0%, #FFB6C1 50%, #2EC4B6 100%)',
    disableAnimations: false,
  },
  BackgroundComponent: BrutalismBackground,
}

