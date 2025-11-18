import { motion } from 'framer-motion'
import { type ThemeConfig } from '../themes/types'
import { type Link } from '../content/personal-info'

interface LinksListProps {
  links: Link[]
  theme: ThemeConfig
  copiedEmail: boolean
  onCopyEmail: (e: React.MouseEvent) => void
}

export function LinksList({
  links,
  theme,
  copiedEmail,
  onCopyEmail,
}: LinksListProps) {
  const getLinkStyle = (link: Link) => {
    if (theme.id === 'brutalism') {
      return {
        backgroundColor: link.type === 'email' ? '#FFB6C1' : '#FFFBF3',
        boxShadow: '6px 6px 0 0 #111',
      }
    }
    if (theme.id === 'minimalism') {
      return {
        backgroundColor: '#FFFFFF',
      }
    }
    return {}
  }

  const getHoverAnimation = (link: Link) => {
    if (theme.id === 'brutalism') {
      return {
        y: -8,
        boxShadow: '14px 14px 0 0 #111',
        rotate: link.type === 'email' ? 1.2 : -1.2,
      }
    }
    if (theme.id === 'minimalism') {
      return { y: -1 }
    }
    return { y: -2, scale: 1.01 }
  }

  const getTapAnimation = () => {
    if (theme.id === 'brutalism') {
      return { scale: 0.96, boxShadow: '5px 5px 0 0 #111' }
    }
    if (theme.id === 'minimalism') {
      return { scale: 0.98 }
    }
    return { scale: 0.99 }
  }

  const getTransition = () => {
    if (theme.id === 'brutalism') {
      return {
        type: 'spring' as const,
        stiffness: 240,
        damping: 20,
        mass: 0.8,
      }
    }
    return {}
  }

  const getIconStyle = () => {
    if (theme.id === 'brutalism') {
      return {
        backgroundColor: '#FFFFFF',
        boxShadow: '3px 3px 0 0 #111',
      }
    }
    return {}
  }

  const getIconHoverAnimation = () => {
    if (theme.id === 'brutalism') {
      return {
        y: -4,
        boxShadow: '7px 7px 0 0 #111',
        rotate: -3,
      }
    }
    if (theme.id === 'minimalism') {
      return { scale: 1.05 }
    }
    return { scale: 1.1 }
  }

  const getIconTapAnimation = () => {
    if (theme.id === 'brutalism') {
      return {
        scale: 0.88,
        boxShadow: '2px 2px 0 0 #111',
      }
    }
    if (theme.id === 'minimalism') {
      return { scale: 0.92 }
    }
    return { scale: 0.95 }
  }

  return (
    <motion.ul
      className="grid gap-2 sm:grid-cols-2 sm:gap-3"
      initial="initial"
      animate="animate">
      {links.map((link, index) => (
        <motion.li key={link.label} variants={theme.animations.links(index)}>
          <motion.a
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
            className={theme.linkStyles.containerClassName}
            style={getLinkStyle(link)}
            whileHover={getHoverAnimation(link)}
            whileTap={getTapAnimation()}
            transition={getTransition()}>
            <div className="flex items-center justify-between">
              <span className={theme.linkStyles.labelClassName}>
                {link.label}
              </span>
              <div className="flex items-center gap-1 sm:gap-2">
                {link.type === 'email' && (
                  <motion.button
                    onClick={onCopyEmail}
                    className={
                      theme.id === 'brutalism'
                        ? 'flex h-7 w-7 items-center justify-center rounded-lg border-[2.5px] border-black text-black sm:h-10 sm:w-10 sm:rounded-2xl sm:border-[3px]'
                        : theme.id === 'minimalism'
                        ? 'flex h-6 w-6 items-center justify-center border-2 border-black bg-white text-black sm:h-7 sm:w-7'
                        : 'flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-white/10 transition-colors hover:bg-white/20 sm:h-7 sm:w-7'
                    }
                    style={getIconStyle()}
                    whileHover={getIconHoverAnimation()}
                    whileTap={getIconTapAnimation()}
                    title="Copy email">
                    {copiedEmail ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={
                          theme.id === 'brutalism'
                            ? 'h-3 w-3 text-[#22B573] sm:h-4 sm:w-4'
                            : theme.id === 'minimalism'
                            ? 'h-3 w-3 text-black sm:h-3.5 sm:w-3.5'
                            : 'h-3 w-3 text-green-400 sm:h-3.5 sm:w-3.5'
                        }>
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={
                          theme.id === 'brutalism'
                            ? 'h-3 w-3 text-[#111] sm:h-4 sm:w-4'
                            : theme.id === 'minimalism'
                            ? 'h-3 w-3 text-black sm:h-3.5 sm:w-3.5'
                            : 'h-3 w-3 text-cyan-200 sm:h-3.5 sm:w-3.5'
                        }>
                        <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
                        <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
                      </svg>
                    )}
                  </motion.button>
                )}
                <motion.span
                  className={
                    theme.id === 'brutalism'
                      ? 'flex h-7 w-7 items-center justify-center rounded-lg border-[2.5px] border-black bg-white text-[#111] sm:h-10 sm:w-10 sm:rounded-2xl sm:border-[3px]'
                      : theme.id === 'minimalism'
                      ? 'flex h-7 w-7 items-center justify-center border-2 border-black bg-white text-black sm:h-10 sm:w-10'
                      : theme.linkStyles.iconContainerClassName
                  }
                  style={
                    theme.id === 'brutalism'
                      ? { boxShadow: '3px 3px 0 0 #111' }
                      : {}
                  }
                  animate={
                    theme.id === 'brutalism'
                      ? {
                          y: [0, -4, 0],
                          rotate: [0, 4, -4, 0],
                        }
                      : theme.id === 'minimalism'
                      ? { x: [0, 2, 0] }
                      : { rotate: [0, 6, -4, 0] }
                  }
                  transition={{
                    duration:
                      theme.id === 'brutalism'
                        ? 5
                        : theme.id === 'minimalism'
                        ? 3
                        : 6,
                    repeat: Infinity,
                    repeatType: theme.id === 'brutalism' ? 'mirror' : undefined,
                    ease: 'easeInOut' as const,
                    delay:
                      index *
                      (theme.id === 'brutalism'
                        ? 0.35
                        : theme.id === 'minimalism'
                        ? 0.2
                        : 0.4),
                  }}>
                  <span
                    className={
                      theme.id === 'brutalism'
                        ? 'text-sm font-black sm:text-lg'
                        : theme.id === 'minimalism'
                        ? 'text-xs font-semibold text-black transition-transform duration-300 group-hover:translate-x-1 sm:text-sm'
                        : 'text-xs text-cyan-200 transition-transform duration-500 group-hover:translate-x-0.5'
                    }>
                    →
                  </span>
                </motion.span>
              </div>
            </div>
            <p className={theme.linkStyles.captionClassName}>{link.caption}</p>

            {theme.id === 'brutalism' ? (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="absolute inset-x-5 bottom-4 h-2 rounded-full bg-[#111]/10" />
              </motion.span>
            ) : theme.id === 'minimalism' ? (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            ) : (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
              </motion.span>
            )}
          </motion.a>
        </motion.li>
      ))}
    </motion.ul>
  )
}
