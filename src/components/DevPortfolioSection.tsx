import { motion } from 'framer-motion'
import { type ThemeConfig } from '../themes/types'
import {
  type TechStackItem,
  type Project,
  type TimelineItem,
} from '../content/personal-info'
import { Timeline } from './Timeline'

interface DevPortfolioSectionProps {
  techStack: TechStackItem[]
  projects: Project[]
  timeline: TimelineItem[]
  theme: ThemeConfig
}

export function DevPortfolioSection({
  techStack,
  projects,
  timeline,
  theme,
}: DevPortfolioSectionProps) {
  const isBrutalism = theme.id === 'brutalism'

  if (isBrutalism) {
    return (
      <div className="relative w-full space-y-8 sm:space-y-12 md:space-y-16">
        {/* Timeline Section */}
        <Timeline timeline={timeline} theme={theme} />

        {/* Projects Section */}
        <div className="relative w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-4 sm:mb-6">
            <div className="inline-flex -rotate-1 items-center gap-2 rounded-xl border-[3px] border-black bg-[#2EC4B6] px-4 py-2 shadow-[4px_4px_0_0_#111] sm:gap-3 sm:px-6 sm:py-3">
              <div className="h-2 w-2 rounded-full bg-white ring-2 ring-black sm:h-3 sm:w-3" />
              <span className="text-xs font-black uppercase tracking-wider text-white sm:text-sm md:text-base">
                Projects
              </span>
            </div>
          </motion.div>

          {/* Projects grid */}
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.4 + index * 0.15,
                  duration: 0.6,
                  ease: 'easeOut' as const,
                }}
                whileHover={{
                  y: -8,
                  boxShadow: '8px 8px 0 0 #111',
                  transition: { duration: 0.3, ease: 'easeOut' },
                }}
                className={`relative overflow-hidden rounded-2xl border-[3px] border-black bg-white p-5 shadow-[6px_6px_0_0_#111] sm:rounded-3xl sm:border-4 sm:p-6 ${
                  index % 3 === 0
                    ? 'rotate-[0.5deg]'
                    : index % 3 === 1
                    ? '-rotate-[0.3deg]'
                    : 'rotate-[0.3deg]'
                }`}
                style={{ fontFamily: theme.fonts.body }}>
                {/* Background accent */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background:
                      index % 3 === 0
                        ? 'linear-gradient(135deg, rgba(46, 196, 182, 0.1) 0%, transparent 60%)'
                        : index % 3 === 1
                        ? 'linear-gradient(135deg, rgba(94, 220, 212, 0.1) 0%, transparent 60%)'
                        : 'linear-gradient(135deg, rgba(26, 155, 142, 0.1) 0%, transparent 60%)',
                  }}
                  whileHover={{
                    background:
                      index % 3 === 0
                        ? 'linear-gradient(135deg, rgba(46, 196, 182, 0.15) 0%, transparent 60%)'
                        : index % 3 === 1
                        ? 'linear-gradient(135deg, rgba(94, 220, 212, 0.15) 0%, transparent 60%)'
                        : 'linear-gradient(135deg, rgba(26, 155, 142, 0.15) 0%, transparent 60%)',
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="mb-2 text-lg font-black text-[#111] sm:mb-3 sm:text-xl">
                    {project.name}
                  </h3>
                  <p className="mb-3 text-sm leading-relaxed text-[#333] sm:mb-4 sm:text-base">
                    {project.description}
                  </p>

                  {/* Link if available */}
                  {project.url && (
                    <motion.a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-4 inline-flex items-center gap-2 rounded-lg border-[2.5px] border-black bg-[#1A9B8E] px-3 py-2 text-xs font-black uppercase tracking-wider text-white shadow-[3px_3px_0_0_#111] transition-all hover:shadow-[4px_4px_0_0_#111] sm:text-sm">
                      Website →
                    </motion.a>
                  )}
                </div>

                {/* Decorative corner */}
                <div className="absolute -bottom-2 -right-2 h-8 w-8 rotate-45 border-[2.5px] border-black bg-[#2EC4B6] sm:-bottom-3 sm:-right-3 sm:h-10 sm:w-10" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Liquid glass theme
  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Timeline Section */}
      <Timeline timeline={timeline} theme={theme} />

      {/* Tech Stack */}
      <div className="rounded-[1.5rem] border border-white/20 bg-white/10 p-5 backdrop-blur-[24px] sm:rounded-[2rem] sm:p-8">
        <h2 className="mb-6 text-xl font-semibold text-slate-900 sm:text-2xl">
          Tech Stack
        </h2>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          {techStack.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="flex h-16 w-16 items-center justify-center rounded-xl border border-white/20 bg-white/15 backdrop-blur-[20px] sm:h-20 sm:w-20">
              <img
                src={item.logoUrl}
                alt={`${item.name} logo`}
                className="h-8 w-8 sm:h-10 sm:w-10"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{
              y: -6,
              scale: 1.02,
              transition: { duration: 0.3, ease: 'easeOut' },
            }}
            className="rounded-xl border border-white/20 bg-white/10 p-5 backdrop-blur-[20px] transition-shadow hover:border-white/30 hover:bg-white/15 hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]">
            <h3 className="mb-2 text-lg font-semibold text-slate-900">
              {project.name}
            </h3>
            <p className="mb-3 text-sm text-slate-600">{project.description}</p>
            {project.url && (
              <motion.a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-3 inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/20 px-3 py-2 text-xs font-semibold text-slate-800 backdrop-blur-sm transition-all hover:bg-white/30 sm:text-sm">
                Website →
              </motion.a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
