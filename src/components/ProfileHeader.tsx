import { motion } from 'framer-motion'
import { type ThemeConfig } from '../themes/types'

interface ProfileHeaderProps {
  name: string
  bio: string
  theme: ThemeConfig
}

export function ProfileHeader({ name, bio, theme }: ProfileHeaderProps) {
  return (
    <motion.div
      className="relative z-10 space-y-2.5 sm:space-y-6"
      variants={theme.animations.heading}>
      <h1 
        className={theme.headingStyles.titleClassName}
        style={{ fontFamily: theme.fonts.heading }}>
        {name}
      </h1>
      <motion.p
        variants={theme.animations.body}
        className={theme.headingStyles.bioClassName}
        style={{ fontFamily: theme.fonts.body }}>
        {bio}
      </motion.p>
    </motion.div>
  )
}

