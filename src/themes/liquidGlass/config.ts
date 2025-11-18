import { type ThemeConfig } from '../types'
import { LiquidGlassBackground } from './Background'

export const liquidGlassTheme: ThemeConfig = {
  id: 'liquidGlass',
  name: 'Liquid Glass',
  colors: {
    background: 'rgba(245, 245, 250, 1)',
    text: 'rgba(30, 30, 40, 1)',
    cardBackground: 'rgba(255, 255, 255, 0.7)',
    cardBorder: 'rgba(255, 255, 255, 0.8)',
    accentPrimary: 'rgba(0, 122, 255, 1)',
    accentSecondary: 'rgba(175, 82, 222, 1)',
  },
  fonts: {
    heading: '"Inter", -apple-system, sans-serif',
    body: '"Inter", -apple-system, sans-serif',
  },
  cardStyles: {
    containerClassName:
      'relative z-10 w-full max-w-md space-y-4 rounded-[2rem] border border-white/10 bg-transparent p-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.1)_inset] backdrop-blur-[24px] before:pointer-events-none before:absolute before:inset-0 before:rounded-[2rem] before:bg-gradient-to-br before:from-white/5 before:via-transparent before:to-transparent before:opacity-20 sm:max-w-2xl sm:space-y-8 sm:rounded-[2.5rem] sm:p-8 sm:before:rounded-[2.5rem] sm:backdrop-blur-[28px] md:space-y-10 md:rounded-[3rem] md:p-10 md:shadow-[0_20px_60px_0_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.15)_inset] md:before:rounded-[3rem] md:backdrop-blur-[32px]',
    borderClassName: 'border border-white/10',
    shadowClassName:
      'shadow-[0_8px_32px_0_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.1)_inset] md:shadow-[0_20px_60px_0_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.15)_inset]',
    backgroundClassName:
      'bg-transparent backdrop-blur-[24px] sm:backdrop-blur-[28px] md:backdrop-blur-[32px]',
    gradientAnimation: {
      gradients: [
        'radial-gradient(circle at 20% 30%, rgba(0, 122, 255, 0.08) 0%, transparent 60%)',
        'radial-gradient(circle at 80% 70%, rgba(175, 82, 222, 0.06) 0%, transparent 60%)',
        'radial-gradient(circle at 50% 50%, rgba(52, 199, 89, 0.05) 0%, transparent 60%)',
        'radial-gradient(circle at 20% 30%, rgba(0, 122, 255, 0.08) 0%, transparent 60%)',
      ],
      duration: 20,
      borderRadius: 'rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem]',
    },
  },
  badgeStyles: {
    containerClassName:
      'relative z-10 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-slate-800 backdrop-blur-[20px] shadow-[0_2px_8px_0_rgba(0,0,0,0.1),0_0_0_0.5px_rgba(255,255,255,0.2)_inset] sm:gap-2 sm:px-5 sm:py-2 sm:text-xs sm:tracking-[0.35em]',
    dotClassName: 'h-1.5 w-1.5 rounded-full bg-blue-500 sm:h-2 sm:w-2',
  },
  headingStyles: {
    titleClassName:
      'text-[1.875rem] font-semibold leading-[1.05] text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl',
    bioClassName:
      'max-w-xl text-[0.875rem] leading-[1.55] text-slate-600 sm:text-base md:text-xl',
  },
  linkStyles: {
    containerClassName:
      'group relative flex flex-col gap-0.5 overflow-hidden rounded-xl border border-white/15 bg-white/8 px-3 py-2 transition-all duration-300 hover:border-white/20 hover:bg-white/12 hover:shadow-[0_4px_16px_0_rgba(0,0,0,0.15),0_0_0_0.5px_rgba(255,255,255,0.3)_inset] sm:rounded-2xl sm:px-4 sm:py-3 backdrop-blur-[20px] shadow-[0_2px_8px_0_rgba(0,0,0,0.1),0_0_0_0.5px_rgba(255,255,255,0.2)_inset]',
    labelClassName: 'text-[0.875rem] font-semibold text-slate-800 sm:text-base',
    captionClassName: 'text-[0.65rem] leading-[1.2] text-slate-500 sm:text-xs',
    iconContainerClassName:
      'flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-white/8 sm:h-7 sm:w-7 backdrop-blur-[16px] shadow-[0_1px_4px_0_rgba(0,0,0,0.08),0_0_0_0.5px_rgba(255,255,255,0.2)_inset]',
    hoverEffect: 'border-white/20 bg-white/12 shadow-[0_4px_16px_0_rgba(0,0,0,0.15),0_0_0_0.5px_rgba(255,255,255,0.3)_inset]',
  },
  locationStyles: {
    containerClassName:
      'relative z-10 flex items-center gap-1.5 text-[0.65rem] text-slate-600 sm:gap-3 sm:text-sm',
    iconContainerClassName:
      'relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-white/8 sm:h-10 sm:w-10 sm:rounded-2xl backdrop-blur-[20px] shadow-[0_2px_8px_0_rgba(0,0,0,0.1),0_0_0_0.5px_rgba(255,255,255,0.2)_inset]',
    textClassName: 'text-[0.75rem] leading-[1.2] text-slate-700 sm:text-sm',
  },
  projectLinkStyles: {
    linkClassName:
      'text-blue-600 transition-colors hover:text-blue-700',
    textClassName:
      'max-w-xl text-[0.875rem] leading-[1.55] text-slate-600 sm:text-base md:text-xl',
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
    pointerVelocityMultiplier: 0.0012,
  },
  mobileConfig: {
    background:
      'linear-gradient(135deg, rgba(245, 245, 250, 1) 0%, rgba(235, 238, 250, 1) 50%, rgba(250, 245, 255, 1) 100%), radial-gradient(circle at 20% 30%, rgba(0, 122, 255, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(175, 82, 222, 0.06) 0%, transparent 50%)',
    disableAnimations: false,
  },
  BackgroundComponent: LiquidGlassBackground,
}

