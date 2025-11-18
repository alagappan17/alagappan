import { motion } from 'framer-motion'
import { type ThemeConfig } from '../themes/types'

interface ProjectSectionProps {
  description: string
  url: string
  displayUrl: string
  theme: ThemeConfig
}

export function ProjectSection({
  description,
  url,
  displayUrl,
  theme,
}: ProjectSectionProps) {
  return (
    <motion.p
      variants={theme.animations.body}
      className={theme.projectLinkStyles.textClassName}>
      {description}{' '}
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className={theme.projectLinkStyles.linkClassName}>
        {displayUrl}
      </a>
      .
    </motion.p>
  )
}
