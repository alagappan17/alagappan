import { type ThemeConfig } from '../types'
import { LiquidGlassBackground } from './Background'

export const liquidGlassTheme: ThemeConfig = {
  id: 'liquidGlass',
  name: 'Liquid Glass',
  colors: {
    background: 'rgba(15, 23, 42, 1)',
    text: 'rgba(241, 245, 249, 1)',
    cardBackground: 'rgba(255, 255, 255, 0.1)',
    cardBorder: 'rgba(255, 255, 255, 0.2)',
    accentPrimary: 'rgba(103, 232, 249, 1)',
    accentSecondary: 'rgba(244, 114, 182, 1)',
  },
  fonts: {
    heading: '"Inter", -apple-system, sans-serif',
    body: '"Inter", -apple-system, sans-serif',
  },
  cardStyles: {
    containerClassName:
      'relative z-10 w-full max-w-md space-y-4 rounded-[1.75rem] border border-white/20 bg-gradient-to-br from-white/[0.15] via-white/[0.08] to-white/[0.12] p-5 shadow-[0_4px_12px_0_rgba(15,23,42,0.28),0_0_0_1px_rgba(255,255,255,0.14)_inset] backdrop-blur-2xl before:pointer-events-none before:absolute before:inset-0 before:rounded-[1.75rem] before:bg-gradient-to-br before:from-white/[0.25] before:via-transparent before:to-transparent before:opacity-40 sm:max-w-2xl sm:space-y-8 sm:rounded-[2rem] sm:p-8 sm:before:rounded-[2rem] sm:before:opacity-50 sm:backdrop-blur-3xl md:space-y-10 md:rounded-[2.5rem] md:p-10 md:shadow-[0_8px_32px_0_rgba(15,23,42,0.37),0_0_0_1px_rgba(255,255,255,0.18)_inset] md:before:rounded-[2.5rem]',
    borderClassName: 'border border-white/20',
    shadowClassName:
      'shadow-[0_4px_12px_0_rgba(15,23,42,0.28),0_0_0_1px_rgba(255,255,255,0.14)_inset] md:shadow-[0_8px_32px_0_rgba(15,23,42,0.37),0_0_0_1px_rgba(255,255,255,0.18)_inset]',
    backgroundClassName:
      'bg-gradient-to-br from-white/[0.15] via-white/[0.08] to-white/[0.12] backdrop-blur-2xl sm:backdrop-blur-3xl',
    gradientAnimation: {
      gradients: [
        'radial-gradient(circle at 20% 30%, rgba(94, 234, 212, 0.4) 0%, transparent 50%)',
        'radial-gradient(circle at 80% 70%, rgba(244, 114, 182, 0.4) 0%, transparent 50%)',
        'radial-gradient(circle at 40% 80%, rgba(147, 197, 253, 0.4) 0%, transparent 50%)',
        'radial-gradient(circle at 20% 30%, rgba(94, 234, 212, 0.4) 0%, transparent 50%)',
      ],
      duration: 14,
      borderRadius: 'rounded-[1.75rem] sm:rounded-[2rem] md:rounded-[2.5rem]',
    },
  },
  badgeStyles: {
    containerClassName:
      'relative z-10 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-slate-200 sm:gap-2 sm:px-5 sm:py-2 sm:text-xs sm:tracking-[0.35em]',
    dotClassName: 'h-1.5 w-1.5 rounded-full bg-cyan-300 drop-shadow-glow sm:h-2 sm:w-2',
  },
  headingStyles: {
    titleClassName:
      'text-[1.875rem] font-semibold leading-[1.05] sm:text-4xl md:text-5xl lg:text-6xl',
    bioClassName:
      'max-w-xl text-[0.875rem] leading-[1.55] text-slate-300 sm:text-base md:text-xl',
  },
  linkStyles: {
    containerClassName:
      'group relative flex flex-col gap-0.5 overflow-hidden rounded-lg border border-white/10 bg-white/5 px-3 py-2 transition-all duration-500 hover:border-white/30 hover:bg-white/10 sm:rounded-xl sm:px-4 sm:py-3',
    labelClassName: 'text-[0.875rem] font-semibold sm:text-base',
    captionClassName: 'text-[0.65rem] leading-[1.2] text-slate-300/70 sm:text-xs',
    iconContainerClassName:
      'flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-white/10 sm:h-7 sm:w-7',
    hoverEffect: 'border-white/30 bg-white/10',
  },
  locationStyles: {
    containerClassName:
      'relative z-10 flex items-center gap-1.5 text-[0.65rem] text-slate-400 sm:gap-3 sm:text-sm',
    iconContainerClassName:
      'relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/5 sm:h-10 sm:w-10 sm:rounded-2xl',
    textClassName: 'text-[0.75rem] leading-[1.2] sm:text-sm',
  },
  projectLinkStyles: {
    linkClassName:
      'text-cyan-300 transition-colors hover:text-cyan-100',
    textClassName:
      'max-w-xl text-[0.875rem] leading-[1.55] text-slate-300 sm:text-base md:text-xl',
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
      'radial-gradient(140% 140% at 20% 20%, rgba(56, 189, 248, 0.28), transparent 65%), radial-gradient(170% 170% at 80% 60%, rgba(244, 114, 182, 0.24), transparent 70%), linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(30, 64, 175, 0.4))',
    disableAnimations: false,
  },
  BackgroundComponent: LiquidGlassBackground,
}

