import { motion } from 'framer-motion'
import { type ThemeConfig } from '../themes/types'

interface BadgeProps {
  text: string
  theme: ThemeConfig
}

export function Badge({ text, theme }: BadgeProps) {
  return (
    <motion.span
      variants={theme.animations.badge}
      className={theme.badgeStyles.containerClassName}>
      <span className={theme.badgeStyles.dotClassName} />
      {text}
    </motion.span>
  )
}



