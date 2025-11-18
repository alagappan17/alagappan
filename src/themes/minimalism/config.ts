import { type ThemeConfig } from '../types'
import { MinimalismBackground } from './Background'

export const minimalismTheme: ThemeConfig = {
  id: 'minimalism',
  name: 'Minimalism',
  colors: {
    background: '#0A0A0A',
    text: '#FFFFFF',
    cardBackground: '#FAFAFA',
    cardBorder: '#000000',
    accentPrimary: '#000000',
    accentSecondary: '#666666',
  },
  fonts: {
    heading: '"Helvetica Neue", "Arial", sans-serif',
    body: '"Helvetica Neue", "Arial", sans-serif',
  },
  cardStyles: {
    containerClassName:
      'relative z-10 w-full max-w-md space-y-4 rounded-none border-2 border-black bg-white p-[1.125rem] shadow-[0_8px_24px_0_rgba(0,0,0,0.4)] sm:max-w-2xl sm:space-y-8 sm:border-[3px] sm:p-[1.75rem] sm:shadow-[0_12px_32px_0_rgba(0,0,0,0.5)] md:space-y-10 md:p-[2.25rem]',
    borderClassName: 'border-2 border-black sm:border-[3px]',
    shadowClassName: 'shadow-[0_8px_24px_0_rgba(0,0,0,0.4)] sm:shadow-[0_12px_32px_0_rgba(0,0,0,0.5)]',
    backgroundClassName: 'bg-white',
    gradientAnimation: {
      gradients: [
        'radial-gradient(circle at 20% 30%, rgba(0, 0, 0, 0.08) 0%, transparent 50%)',
        'radial-gradient(circle at 80% 70%, rgba(120, 120, 120, 0.12) 0%, transparent 50%)',
        'radial-gradient(circle at 40% 80%, rgba(60, 60, 60, 0.1) 0%, transparent 50%)',
        'radial-gradient(circle at 20% 30%, rgba(0, 0, 0, 0.08) 0%, transparent 50%)',
      ],
      duration: 16,
      borderRadius: 'rounded-none',
    },
  },
  badgeStyles: {
    containerClassName:
      'relative z-10 inline-flex items-center gap-1.5 rounded-none border-b-2 border-black bg-white px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-black sm:gap-2 sm:px-4 sm:py-2 sm:text-[0.65rem] sm:tracking-[0.3em]',
    dotClassName: 'h-1.5 w-1.5 bg-black sm:h-2 sm:w-2',
  },
  headingStyles: {
    titleClassName:
      'text-[1.875rem] font-bold leading-[1.1] tracking-[-0.02em] text-black sm:text-4xl md:text-5xl lg:text-6xl',
    bioClassName:
      'max-w-xl text-[0.875rem] font-normal leading-[1.7] text-neutral-700 sm:text-base md:text-xl',
  },
  linkStyles: {
    containerClassName:
      'group relative flex flex-col gap-0.5 overflow-hidden border-b-2 border-neutral-200 bg-white px-3 py-3 transition-all duration-300 hover:border-black sm:px-4 sm:py-4',
    labelClassName: 'text-[0.875rem] font-semibold tracking-wide text-black sm:text-base',
    captionClassName: 'text-[0.65rem] font-normal leading-[1.4] text-neutral-600 sm:text-xs',
    iconContainerClassName:
      'flex h-6 w-6 items-center justify-center border border-black/20 bg-white sm:h-7 sm:w-7',
    hoverEffect: 'border-black',
  },
  locationStyles: {
    containerClassName:
      'relative z-10 flex items-center gap-1.5 text-[0.65rem] font-normal text-neutral-700 sm:gap-3 sm:text-sm',
    iconContainerClassName:
      'relative flex h-7 w-7 items-center justify-center overflow-hidden border-2 border-black bg-white sm:h-10 sm:w-10',
    textClassName: 'text-[0.75rem] font-normal leading-[1.4] tracking-wide text-black sm:text-sm',
  },
  projectLinkStyles: {
    linkClassName:
      'font-bold text-black underline decoration-2 underline-offset-4 transition-colors hover:text-neutral-600',
    textClassName:
      'max-w-xl text-[0.875rem] font-normal leading-[1.7] text-neutral-700 sm:text-base md:text-xl',
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
    cardTiltMax: 2,
    cardGlareRest: { x: 50, y: 50 },
    cardScaleMin: 0.78,
    enableCardTilt: true,
    enableGlareEffect: false,
    pointerVelocityMultiplier: 0,
  },
  mobileConfig: {
    background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)',
    disableAnimations: false,
  },
  BackgroundComponent: MinimalismBackground,
}

