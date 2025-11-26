import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { type ThemeConfig } from '../themes/types'
import { type LifestyleItem } from '../content/personal-info'

interface LifestyleSectionProps {
  lifestyleItems: LifestyleItem[]
  theme: ThemeConfig
}

export function LifestyleSection({
  lifestyleItems,
  theme,
}: LifestyleSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const isBrutalism = theme.id === 'brutalism'

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [30, -30])
  const y2 = useTransform(scrollYProgress, [0, 1], [-20, 20])
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 180])

  if (isBrutalism) {
    return (
      <div
        ref={sectionRef}
        className="relative w-full space-y-8 sm:space-y-10 md:space-y-12">
        {/* Decorative header */}
        <motion.div
          initial={{ opacity: 0, x: -40, rotate: -5 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 sm:mb-10">
          <div className="inline-flex -rotate-1 items-center gap-2 rounded-xl border-[3px] border-black bg-[#2EC4B6] px-4 py-2 shadow-[4px_4px_0_0_#111] sm:gap-3 sm:px-6 sm:py-3">
            <div className="h-2 w-2 rounded-full bg-white ring-2 ring-black sm:h-3 sm:w-3" />
            <span className="text-xs font-black uppercase tracking-wider text-white sm:text-sm md:text-base">
              Life Lately
            </span>
          </div>
        </motion.div>

        {/* Masonry container */}
        <div className="relative z-20 w-full">
          <div className="relative mx-auto w-full max-w-6xl">
            {/* Column-based masonry layout */}
            <div
              className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-3 sm:gap-4 md:gap-5"
              style={{ columnFill: 'balance' as const }}>
              {lifestyleItems.map((item, index) => {
                // Different colors for each image tag
                const tagColors = [
                  '#FCEE4B', // Yellow
                  '#FF6F91', // Pink
                  '#2EC4B6', // Teal
                  '#FBBF24', // Amber
                  '#FB923C', // Orange
                  '#A78BFA', // Purple
                  '#34D399', // Green
                  '#F87171', // Red
                  '#60A5FA', // Blue
                  '#FCD34D', // Light Yellow
                  '#F472B6', // Light Pink
                  '#4ADE80', // Light Green
                  '#818CF8', // Indigo
                  '#F59E0B', // Dark Amber
                  '#EC4899', // Magenta
                  '#14B8A6', // Cyan
                ]
                const tagBgColor = tagColors[index % tagColors.length]

                return (
                  <motion.div
                    key={item.id}
                    className="cursor-pointer mb-3 sm:mb-4 md:mb-5 break-inside-avoid relative group"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{
                      delay: index * 0.03,
                      duration: 0.4,
                      type: 'spring',
                      stiffness: 200,
                      damping: 15,
                    }}
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    whileHover={{
                      scale: 1.05,
                      zIndex: 100,
                      transition: { duration: 0.2 },
                    }}>
                    <div className="relative w-full rounded-lg border-[3px] border-black bg-white p-0.5 shadow-[6px_6px_0_0_#111] transition-all hover:shadow-[8px_8px_0_0_#111] sm:rounded-xl sm:border-4 sm:p-1 md:rounded-2xl">
                      <div className="relative w-full overflow-hidden rounded-md border-2 border-black bg-white sm:rounded-lg">
                        <img
                          src={item.url}
                          alt={item.interest}
                          className="w-full h-auto block"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            const colors = ['#FCEE4B', '#FF6F91', '#2EC4B6']
                            const color = colors[index % colors.length]
                            target.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="${encodeURIComponent(
                              color
                            )}" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="%23111"%3E${encodeURIComponent(
                              item.interest
                            )}%3C/text%3E%3C/svg%3E`
                          }}
                        />
                      </div>
                      {/* Decorative corner accent */}
                      <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-black bg-[#FF6F91] sm:h-4 sm:w-4 md:h-5 md:w-5" />
                    </div>

                    {/* Label - visible by default on mobile, hover on desktop, bottom right */}
                    <motion.div
                      initial={{
                        opacity: isMobile ? 1 : 0,
                        scale: isMobile ? 1 : 0.8,
                        y: isMobile ? 0 : 5,
                      }}
                      animate={{
                        opacity: isMobile ? 1 : hoveredIndex === index ? 1 : 0,
                        scale: isMobile ? 1 : hoveredIndex === index ? 1 : 0.8,
                        y: isMobile ? 0 : hoveredIndex === index ? 0 : 5,
                      }}
                      transition={{
                        duration: 0.2,
                        type: 'spring',
                        stiffness: 200,
                      }}
                      style={{ backgroundColor: tagBgColor }}
                      className="pointer-events-none absolute bottom-1.5 right-1.5 z-20 whitespace-nowrap rounded-md border-[2.5px] border-black px-1.5 py-0.5 text-[0.6rem] font-black uppercase tracking-wider text-[#111] shadow-[3px_3px_0_0_#111] sm:bottom-2 sm:right-2 sm:px-2 sm:py-1 sm:text-xs">
                      {item.interest}
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Decorative background shapes */}
        <div className="pointer-events-none absolute inset-0 z-5 overflow-hidden">
          <motion.div
            className="absolute right-[8%] top-[15%] h-12 w-12 rounded-full border-[3px] border-black bg-[#FF6F91] opacity-20 sm:h-16 sm:w-16 md:h-20 md:w-20"
            style={{ y: y1, rotate: rotate1 }}
          />
          <motion.div
            className="absolute left-[12%] bottom-[20%] h-10 w-10 rotate-45 border-[3px] border-black bg-[#FCEE4B] opacity-20 sm:h-14 sm:w-14 md:h-18 md:w-18"
            style={{ y: y2 }}
          />
          <motion.div
            className="absolute right-[15%] bottom-[12%] h-16 w-16 border-[3px] border-black bg-[#2EC4B6] opacity-15 sm:h-20 sm:w-20 md:h-24 md:w-24"
            style={{
              y: y1,
              rotate: rotate1,
              clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
            }}
          />
        </div>
      </div>
    )
  }

  // Placeholder for other themes
  return <div>Lifestyle section - theme not implemented</div>
}
