import { type ComponentType } from 'react'
import { type Variant, type Variants } from 'framer-motion'

export interface AnimationVariant extends Variants {
  initial: Variant
  animate: Variant
}

export interface ThemeColors {
  background: string
  text: string
  cardBackground: string
  cardBorder: string
  accentPrimary: string
  accentSecondary: string
}

export interface ThemeFonts {
  heading: string
  body: string
  mono?: string
}

export interface CardGradientAnimation {
  gradients: string[]
  duration: number
  borderRadius?: string
}

export interface CardStyles {
  containerClassName: string
  borderClassName: string
  shadowClassName: string
  backgroundClassName: string
  glassEffect?: string
  gradientAnimation?: CardGradientAnimation
}

export interface BadgeStyles {
  containerClassName: string
  dotClassName: string
}

export interface HeadingStyles {
  titleClassName: string
  bioClassName: string
}

export interface LinkStyles {
  containerClassName: string
  labelClassName: string
  captionClassName: string
  iconContainerClassName: string
  hoverEffect: string
}

export interface LocationStyles {
  containerClassName: string
  iconContainerClassName: string
  textClassName: string
}

export interface ProjectLinkStyles {
  linkClassName: string
  textClassName: string
}

export interface ThemeAnimations {
  badge: AnimationVariant
  heading: AnimationVariant
  body: AnimationVariant
  links: (index: number) => AnimationVariant
}

export interface InteractionConfig {
  cardTiltMax: number
  cardGlareRest: { x: number; y: number }
  cardScaleMin: number
  enableCardTilt: boolean
  enableGlareEffect: boolean
  pointerVelocityMultiplier: number
}

export interface MobileConfig {
  background: string
  disableAnimations: boolean
}

export interface ThemeConfig {
  id: string
  name: string
  colors: ThemeColors
  fonts: ThemeFonts
  cardStyles: CardStyles
  badgeStyles: BadgeStyles
  headingStyles: HeadingStyles
  linkStyles: LinkStyles
  locationStyles: LocationStyles
  projectLinkStyles: ProjectLinkStyles
  animations: ThemeAnimations
  interactionConfig: InteractionConfig
  mobileConfig: MobileConfig
  BackgroundComponent: ComponentType<{ isMobile: boolean }>
}
