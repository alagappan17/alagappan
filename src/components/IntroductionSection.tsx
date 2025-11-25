import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import { type ThemeConfig } from '../themes/types'
import { type TechStackItem } from '../content/personal-info'

interface IntroductionSectionProps {
  paragraphs: string[]
  theme: ThemeConfig
}

// Dev tools - Primary Stack
const primaryStack: TechStackItem[] = [
  { name: 'TypeScript', logoUrl: '/stack/TypeScript.png' },
  { name: 'React', logoUrl: '/stack/React.png' },
  { name: 'Material UI', logoUrl: '/stack/Material UI.png' },
  { name: 'Node', logoUrl: '/stack/Node.js.png' },
  { name: 'Mongo', logoUrl: '/stack/MongoDB.png' },
  { name: 'Koa', logoUrl: '/stack/Koa.png' },
  { name: 'Docker', logoUrl: '/stack/Docker.png' },
  { name: 'AWS', logoUrl: '/stack/AWS.png' },
]

// Dev tools - Tool Stack
const toolStack: TechStackItem[] = [
  { name: 'Cursor', logoUrl: '/stack/Cursor.png' },
  { name: 'Claude', logoUrl: '/stack/Claude.png' },
  { name: 'Comet', logoUrl: '/stack/Comet.jpg' },
  { name: 'CodeRabbit', logoUrl: '/stack/Coderabbit.png' },
  { name: 'Excalidraw', logoUrl: '/stack/Excalidraw.png' },
  { name: 'Notion', logoUrl: '/stack/Notion.png' },
]

// Creative tools
const creativeTools: TechStackItem[] = [
  { name: 'Blender', logoUrl: '/stack/Blender.png' },
  { name: 'DaVinci', logoUrl: '/stack/Davinci.png' },
  { name: 'Figma', logoUrl: '/stack/Figma.png' },
]

export function IntroductionSection({
  paragraphs,
  theme,
}: IntroductionSectionProps) {
  const isBrutalism = theme.id === 'brutalism'
  const [hoveredPrimaryIndex, setHoveredPrimaryIndex] = useState<number | null>(null)
  const [hoveredToolIndex, setHoveredToolIndex] = useState<number | null>(null)
  const [hoveredCreativeIndex, setHoveredCreativeIndex] = useState<number | null>(null)
  
  // Parallax scroll effects
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  
  // Multiple parallax speeds for depth effect
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [200, -200])
  const y3 = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const y4 = useTransform(scrollYProgress, [0, 1], [150, -150])
  const y5 = useTransform(scrollYProgress, [0, 1], [-100, 100])
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -360])
  const rotate3 = useTransform(scrollYProgress, [0, 1], [0, 180])

  if (isBrutalism) {
    const bgColors = [
      '#FFFFFF', '#F0F9F8', '#FFFFFF', '#F0F9F8', '#FFFFFF', '#F0F9F8',
    ]

    return (
      <div ref={sectionRef} className="relative w-full space-y-4 sm:space-y-6 md:space-y-8">
        {/* Parallax Background Decorations - Layer 1 (Far) */}
        <motion.div
          className="pointer-events-none absolute left-[8%] top-[10%] z-0 h-20 w-20 rounded-full border-[3px] border-black bg-[#FFB6C1] shadow-[6px_6px_0_0_#111] sm:h-24 sm:w-24 md:h-28 md:w-28"
          style={{ y: y1, rotate: rotate1 }}
        />
        
        <motion.div
          className="pointer-events-none absolute right-[10%] top-[15%] z-0 h-16 w-16 rotate-45 border-[3px] border-black bg-[#FCEE4B] shadow-[6px_6px_0_0_#111] sm:h-20 sm:w-20 md:h-24 md:w-24"
          style={{ y: y2, rotate: rotate2 }}
        />
        
        <motion.div
          className="pointer-events-none absolute left-[15%] bottom-[20%] z-0 h-24 w-24 border-[3px] border-black bg-[#2EC4B6] shadow-[6px_6px_0_0_#111] sm:h-28 sm:w-28 md:h-32 md:w-32"
          style={{
            y: y3,
            rotate: rotate1,
            clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
          }}
        />
        
        <motion.div
          className="pointer-events-none absolute right-[12%] bottom-[25%] z-0 h-18 w-18 rounded-full border-[3px] border-black bg-[#FF8FB3] shadow-[6px_6px_0_0_#111] sm:h-22 sm:w-22 md:h-26 md:w-26"
          style={{ y: y4 }}
        />
        
        {/* Parallax Background Decorations - Layer 2 (Medium) */}
        <motion.div
          className="pointer-events-none absolute left-[5%] top-[45%] z-0 h-14 w-14 border-[3px] border-black bg-[#FFA366] shadow-[4px_4px_0_0_#111] sm:h-16 sm:w-16 md:h-20 md:w-20"
          style={{
            y: y5,
            clipPath: 'polygon(50% 0%, 100% 90%, 0% 90%)',
          }}
        />
        
        <motion.div
          className="pointer-events-none absolute right-[8%] top-[50%] z-0 h-16 w-16 rounded-xl border-[3px] border-black bg-[#5EDCD4] shadow-[5px_5px_0_0_#111] sm:h-20 sm:w-20 md:h-24 md:w-24"
          style={{ y: y1, rotate: rotate3 }}
        />
        
        <motion.div
          className="pointer-events-none absolute left-[20%] top-[70%] z-0 h-12 w-12 rotate-45 border-[3px] border-black bg-[#FCEE4B] shadow-[4px_4px_0_0_#111] sm:h-14 sm:w-14 md:h-16 md:w-16"
          style={{ y: y2 }}
        />
        
        <motion.div
          className="pointer-events-none absolute right-[18%] bottom-[10%] z-0 h-20 w-20 rounded-full border-[3px] border-black bg-[#FF6F91] shadow-[5px_5px_0_0_#111] sm:h-24 sm:w-24 md:h-28 md:w-28"
          style={{ y: y3, rotate: rotate2 }}
        />
        
        {/* Parallax Background Decorations - Layer 3 (Near) */}
        <motion.div
          className="pointer-events-none absolute left-[25%] top-[30%] z-0 h-10 w-10 rounded-lg border-[2.5px] border-black bg-[#2EC4B6] shadow-[3px_3px_0_0_#111] sm:h-12 sm:w-12"
          style={{ y: y4, rotate: rotate1 }}
        />
        
        <motion.div
          className="pointer-events-none absolute right-[25%] top-[65%] z-0 h-14 w-14 border-[2.5px] border-black bg-[#FFB6C1] shadow-[4px_4px_0_0_#111] sm:h-16 sm:w-16"
          style={{
            y: y5,
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
        />

        {/* Decorative header with rotated label */}
        <motion.div
          initial={{ opacity: 0, x: -40, rotate: -5 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 sm:mb-6">
          <div className="inline-flex -rotate-1 items-center gap-2 rounded-xl border-[3px] border-black bg-[#FFA366] px-4 py-2 shadow-[4px_4px_0_0_#111] sm:gap-3 sm:px-6 sm:py-3">
            <div className="h-2 w-2 rounded-full bg-white ring-2 ring-black sm:h-3 sm:w-3" />
            <span className="text-xs font-black uppercase tracking-wider text-white sm:text-sm md:text-base">
              About Me
            </span>
          </div>
        </motion.div>

        {/* Stacked cards - Blue on top-left, Pink below-right */}
        <div className="relative space-y-6 sm:space-y-8 md:space-y-10">
          {/* Profile Image Box - positioned at intersection, on top of first card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.1, duration: 0.6, type: 'spring', stiffness: 180, damping: 14 }}
            whileHover={{ y: -4, rotate: -1, transition: { duration: 0.2 } }}
            className="absolute left-1/2 -top-28 z-30 w-fit -translate-x-1/2 sm:left-auto sm:right-4 sm:top-4 sm:translate-x-0 md:right-8 md:top-8">
            <div className="relative rounded-2xl border-[3px] border-black bg-white p-3 shadow-[6px_6px_0_0_#111] sm:rounded-3xl sm:border-4 sm:p-4 md:p-5 -rotate-[1deg]">
              <div className="relative overflow-hidden rounded-xl border-[2.5px] border-black sm:rounded-2xl">
                <img
                  src="/profile.jpeg"
                  alt="Profile"
                  className="h-32 w-32 object-cover sm:h-40 sm:w-40 md:h-48 md:w-48"
                  loading="lazy"
                />
              </div>
              {/* Decorative corner element */}
              <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full border-[2.5px] border-black bg-[#FF6F91] sm:-bottom-3 sm:-right-3 sm:h-10 sm:w-10" />
            </div>
          </motion.div>
          {/* Blue Dev Card - Top Left */}
          <motion.div
            initial={{ opacity: 0, x: -60, y: 40, rotate: -3 }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0.5 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            style={{ 
              fontFamily: theme.fonts.body, 
              minHeight: '300px',
            }}
            className="relative ml-0 mr-auto max-w-4xl rounded-2xl border-[3px] border-black bg-[#2EC4B6] p-6 shadow-[6px_6px_0_0_#111] sm:rounded-3xl sm:border-4 sm:p-8 md:p-10 rotate-[0.5deg]">
            {/* Label Sticker - Top Left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -25 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -12 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.2, duration: 0.6, type: 'spring', stiffness: 180, damping: 12 }}
              className="absolute -left-4 -top-3 z-30 rounded-sm border-[2.5px] border-black bg-[#FCEE4B] px-4 py-2 shadow-[4px_4px_0_0_#111,0_0_0_2px_#FCEE4B] sm:-left-5 sm:-top-4 sm:px-5 sm:py-2.5">
              <span className="text-xs font-black uppercase tracking-wider text-[#111] sm:text-sm">
                Engineer
              </span>
            </motion.div>

            {/* Pattern overlay */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, #111 0px, #111 2px, transparent 2px, transparent 10px)',
              }}
            />
            
            {/* Content */}
            <div className="relative z-10 space-y-6">
              <p className="text-[0.875rem] font-medium leading-[1.7] text-white sm:text-base sm:leading-[1.75] md:text-lg md:leading-[1.8] pt-8 sm:pt-0">
                {paragraphs[0]}
              </p>

              {/* Primary Stack */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-white/90 sm:text-sm">
                  Primary Stack
                </h4>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {primaryStack.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, scale: 0.5, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{
                        delay: 0.3 + index * 0.06,
                        duration: 0.5,
                        type: 'spring',
                        stiffness: 180,
                        damping: 14,
                      }}
                      onHoverStart={() => setHoveredPrimaryIndex(index)}
                      onHoverEnd={() => setHoveredPrimaryIndex(null)}
                      className="relative">
                      <motion.div
                        whileHover={{
                          scale: 1.15,
                          rotate: index % 2 === 0 ? 5 : -5,
                          y: -8,
                        }}
                        whileTap={{ scale: 0.95 }}
                        style={{ backgroundColor: bgColors[index % bgColors.length] }}
                        className="flex h-12 w-12 items-center justify-center rounded-xl border-[3px] border-black shadow-[4px_4px_0_0_#111] transition-shadow hover:shadow-[6px_6px_0_0_#111] sm:h-14 sm:w-14 sm:rounded-2xl">
                        <img
                          src={item.logoUrl}
                          alt={`${item.name} logo`}
                          className="h-6 w-6 sm:h-7 sm:w-7"
                          loading="lazy"
                        />
                      </motion.div>

                      {/* Tooltip */}
                      <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.8 }}
                        animate={{
                          opacity: hoveredPrimaryIndex === index ? 1 : 0,
                          y: hoveredPrimaryIndex === index ? 0 : 5,
                          scale: hoveredPrimaryIndex === index ? 1 : 0.8,
                          rotate: hoveredPrimaryIndex === index ? -2 : 0,
                        }}
                        transition={{ duration: 0.2, type: 'spring', stiffness: 200 }}
                        className="pointer-events-none absolute -bottom-12 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-lg border-[2.5px] border-black bg-[#1A9B8E] px-3 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-[4px_4px_0_0_#111] sm:-bottom-14 sm:px-4 sm:py-2 sm:text-sm">
                        {item.name}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Tool Stack */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-white/90 sm:text-sm">
                  Tool Stack
                </h4>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {toolStack.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, scale: 0.5, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{
                        delay: 0.3 + (primaryStack.length * 0.06) + (index * 0.06),
                        duration: 0.5,
                        type: 'spring',
                        stiffness: 180,
                        damping: 14,
                      }}
                      onHoverStart={() => setHoveredToolIndex(index)}
                      onHoverEnd={() => setHoveredToolIndex(null)}
                      className="relative">
                      <motion.div
                        whileHover={{
                          scale: 1.15,
                          rotate: index % 2 === 0 ? 5 : -5,
                          y: -8,
                        }}
                        whileTap={{ scale: 0.95 }}
                        style={{ backgroundColor: bgColors[index % bgColors.length] }}
                        className="flex h-12 w-12 items-center justify-center rounded-xl border-[3px] border-black shadow-[4px_4px_0_0_#111] transition-shadow hover:shadow-[6px_6px_0_0_#111] sm:h-14 sm:w-14 sm:rounded-2xl">
                        <img
                          src={item.logoUrl}
                          alt={`${item.name} logo`}
                          className="h-6 w-6 sm:h-7 sm:w-7"
                          loading="lazy"
                        />
                      </motion.div>

                      {/* Tooltip */}
                      <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.8 }}
                        animate={{
                          opacity: hoveredToolIndex === index ? 1 : 0,
                          y: hoveredToolIndex === index ? 0 : 5,
                          scale: hoveredToolIndex === index ? 1 : 0.8,
                          rotate: hoveredToolIndex === index ? -2 : 0,
                        }}
                        transition={{ duration: 0.2, type: 'spring', stiffness: 200 }}
                        className="pointer-events-none absolute -bottom-12 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-lg border-[2.5px] border-black bg-[#1A9B8E] px-3 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-[4px_4px_0_0_#111] sm:-bottom-14 sm:px-4 sm:py-2 sm:text-sm">
                        {item.name}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative corner element */}
            <div className="absolute -bottom-3 -right-3 h-12 w-12 rounded-full border-[3px] border-black bg-[#5EDCD4] sm:h-16 sm:w-16" />
          </motion.div>

          {/* Pink Creative Card - Bottom Right */}
          <motion.div
            initial={{ opacity: 0, x: 60, y: 40, rotate: 3 }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotate: -0.5 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            style={{ 
              fontFamily: theme.fonts.body,
            }}
            className="relative ml-auto mr-0 max-w-4xl rounded-2xl border-[3px] border-black bg-[#FF8FB3] p-6 shadow-[6px_6px_0_0_#111] sm:rounded-3xl sm:border-4 sm:p-8 md:p-10 -rotate-[0.5deg]">
            {/* Label Sticker - Top Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: 25 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 12 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.35, duration: 0.6, type: 'spring', stiffness: 180, damping: 12 }}
              className="absolute right-2 top-2 z-50 rounded-sm border-[2.5px] border-black bg-[#FCEE4B] px-4 py-2 shadow-[4px_4px_0_0_#111,0_0_0_2px_#FCEE4B] sm:right-3 sm:top-3 sm:px-5 sm:py-2.5 md:-right-4 md:-top-3">
              <span className="text-xs font-black uppercase tracking-wider text-[#111] sm:text-sm">
                Artist
              </span>
            </motion.div>

            {/* Pattern overlay */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: 'radial-gradient(circle, #111 2.5px, transparent 2.5px)',
                backgroundSize: '24px 24px',
              }}
            />
            
            {/* Content */}
            <div className="relative z-10 space-y-6">
              <p className="text-[0.875rem] font-medium leading-[1.7] text-white sm:text-base sm:leading-[1.75] md:text-lg md:leading-[1.8] pt-8 sm:pt-0">
                {paragraphs[1]}
              </p>

              {/* Tools */}
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {creativeTools.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{
                      delay: 0.45 + index * 0.06,
                      duration: 0.5,
                      type: 'spring',
                      stiffness: 180,
                      damping: 14,
                    }}
                    onHoverStart={() => setHoveredCreativeIndex(index)}
                    onHoverEnd={() => setHoveredCreativeIndex(null)}
                    className="relative">
                    <motion.div
                      whileHover={{
                        scale: 1.15,
                        rotate: index % 2 === 0 ? 5 : -5,
                        y: -8,
                      }}
                      whileTap={{ scale: 0.95 }}
                      style={{ backgroundColor: bgColors[index % bgColors.length] }}
                      className="flex h-12 w-12 items-center justify-center rounded-xl border-[3px] border-black shadow-[4px_4px_0_0_#111] transition-shadow hover:shadow-[6px_6px_0_0_#111] sm:h-14 sm:w-14 sm:rounded-2xl">
                      <img
                        src={item.logoUrl}
                        alt={`${item.name} logo`}
                        className="h-6 w-6 sm:h-7 sm:w-7"
                        loading="lazy"
                      />
                    </motion.div>

                    {/* Tooltip */}
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.8 }}
                      animate={{
                        opacity: hoveredCreativeIndex === index ? 1 : 0,
                        y: hoveredCreativeIndex === index ? 0 : 5,
                        scale: hoveredCreativeIndex === index ? 1 : 0.8,
                        rotate: hoveredCreativeIndex === index ? -2 : 0,
                      }}
                      transition={{ duration: 0.2, type: 'spring', stiffness: 200 }}
                      className="pointer-events-none absolute -bottom-12 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-lg border-[2.5px] border-black bg-[#FF4081] px-3 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-[4px_4px_0_0_#111] sm:-bottom-14 sm:px-4 sm:py-2 sm:text-sm">
                      {item.name}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Decorative corner element */}
            <div className="absolute -top-3 -left-3 h-12 w-12 rounded-full border-[3px] border-black bg-[#FF4081] sm:h-16 sm:w-16" />
          </motion.div>
        </div>

        {/* Decorative accent elements - Top Right */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          whileInView={{ scale: 1, rotate: 45 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
          style={{ y: y1 }}
          className="absolute -right-4 -top-4 h-8 w-8 rotate-45 border-[3px] border-black bg-[#FFA366] sm:-right-6 sm:-top-6 sm:h-12 sm:w-12"
        />
        
        {/* Additional shapes */}
        <motion.div
          initial={{ opacity: 0, scale: 0, x: 20, y: -20 }}
          whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.7, type: 'spring', stiffness: 150 }}
          style={{ y: y2 }}
          className="absolute right-4 top-4 sm:right-8 sm:top-8 md:right-12 md:top-12">
          <motion.div
            animate={{
              rotate: [0, 15, -10, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut' as const,
            }}
            className="h-16 w-16 rounded-full border-[2.5px] border-black bg-[#2EC4B6] shadow-[4px_4px_0_0_#111] sm:h-20 sm:w-20 md:h-24 md:w-24"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0, x: 30, y: -10 }}
          whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.8, type: 'spring', stiffness: 150 }}
          style={{ y: y5 }}
          className="absolute right-20 top-2 sm:right-32 sm:top-4 md:right-40 md:top-6">
          <motion.div
            animate={{
              rotate: [0, -20, 15, 0],
              y: [0, -5, 5, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut' as const,
            }}
            className="h-14 w-14 rotate-45 border-[2.5px] border-black bg-[#FF8FB3] shadow-[3px_3px_0_0_#111] sm:h-16 sm:w-16 md:h-18 md:w-18"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0, x: 15, y: -30 }}
          whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.9, type: 'spring', stiffness: 150 }}
          style={{ y: y1 }}
          className="absolute right-8 top-20 sm:right-12 sm:top-28 md:right-16 md:top-36">
          <motion.div
            animate={{
              rotate: [0, 25, -15, 0],
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut' as const,
            }}
            style={{
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            }}
            className="h-14 w-14 border-[2.5px] border-black bg-[#FCEE4B] shadow-[3px_3px_0_0_#111] sm:h-16 sm:w-16 md:h-18 md:w-18"
          />
        </motion.div>
      </div>
    )
  }

  // Liquid glass theme
  return (
    <div className="relative space-y-8 sm:space-y-12">
      {/* Stacked cards - Blue on top-left, Pink below-right */}
      <div className="relative space-y-6 sm:space-y-8 md:space-y-10">
        {/* Profile Image Box - positioned at intersection, on top of first card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="absolute left-1/2 -top-28 z-30 w-fit -translate-x-1/2 sm:left-auto sm:right-4 sm:top-4 sm:translate-x-0 md:right-8 md:top-8">
          <div className="relative rounded-[1.5rem] border border-white/20 bg-white/10 p-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.1)_inset] backdrop-blur-[24px] sm:rounded-[2rem] sm:p-4 md:p-5">
            <div className="relative overflow-hidden rounded-xl border border-white/30 sm:rounded-2xl">
              <img
                src="/profile.jpeg"
                alt="Profile"
                className="h-32 w-32 object-cover sm:h-40 sm:w-40 md:h-48 md:w-48"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>
        {/* Blue Dev Card - Top Left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.6,
            ease: 'easeOut' as const,
          }}
          className="relative ml-0 mr-auto max-w-4xl rounded-[1.5rem] border border-white/20 bg-white/10 p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.1)_inset] backdrop-blur-[24px] sm:rounded-[2rem] sm:p-8 md:p-10 md:shadow-[0_12px_40px_0_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.15)_inset] md:backdrop-blur-[28px]"
          style={{ fontFamily: theme.fonts.body, minHeight: '300px' }}>
          {/* Label Sticker - Top Left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: -10 }}
            transition={{ delay: 0.3, duration: 0.5, type: 'spring', stiffness: 200 }}
            className="absolute -left-4 -top-3 z-30 rounded-lg border border-white/40 bg-white/30 px-4 py-2 shadow-[0_6px_16px_0_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.4)_inset] backdrop-blur-xl sm:-left-5 sm:-top-4 sm:px-5 sm:py-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-800 sm:text-sm">
              Engineer
            </span>
          </motion.div>

          <div className="relative z-10 space-y-6">
            <p className="text-[0.875rem] leading-[1.65] text-slate-600 sm:text-base sm:leading-[1.7] md:text-lg md:leading-[1.75]">
              {paragraphs[0]}
            </p>

            {/* Primary Stack */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 sm:text-sm">
                Primary Stack
              </h4>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {primaryStack.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/15 backdrop-blur-[20px] sm:h-14 sm:w-14">
                    <img
                      src={item.logoUrl}
                      alt={`${item.name} logo`}
                      className="h-6 w-6 sm:h-7 sm:w-7"
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tool Stack */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 sm:text-sm">
                Tool Stack
              </h4>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {toolStack.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + primaryStack.length * 0.05 + index * 0.05 }}
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/15 backdrop-blur-[20px] sm:h-14 sm:w-14">
                    <img
                      src={item.logoUrl}
                      alt={`${item.name} logo`}
                      className="h-6 w-6 sm:h-7 sm:w-7"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pink Creative Card - Bottom Right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.35,
            duration: 0.6,
            ease: 'easeOut' as const,
          }}
          className="relative ml-auto mr-0 max-w-4xl rounded-[1.5rem] border border-white/20 bg-white/10 p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.1)_inset] backdrop-blur-[24px] sm:rounded-[2rem] sm:p-8 md:p-10 md:shadow-[0_12px_40px_0_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.15)_inset] md:backdrop-blur-[28px]"
          style={{ fontFamily: theme.fonts.body }}>
          {/* Label Sticker - Top Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 12 }}
            animate={{ opacity: 1, scale: 1, rotate: 10 }}
            transition={{ delay: 0.45, duration: 0.5, type: 'spring', stiffness: 200 }}
            className="absolute right-2 top-2 z-50 rounded-lg border border-white/40 bg-white/30 px-4 py-2 shadow-[0_6px_16px_0_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.4)_inset] backdrop-blur-xl sm:right-3 sm:top-3 sm:px-5 sm:py-2.5 md:-right-4 md:-top-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-800 sm:text-sm">
              Artist
            </span>
          </motion.div>

          <div className="relative z-10 space-y-6">
            <p className="text-[0.875rem] leading-[1.65] text-slate-600 sm:text-base sm:leading-[1.7] md:text-lg md:leading-[1.75]">
              {paragraphs[1]}
            </p>

            {/* Tools */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {creativeTools.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.55 + index * 0.05 }}
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/15 backdrop-blur-[20px] sm:h-14 sm:w-14">
                  <img
                    src={item.logoUrl}
                    alt={`${item.name} logo`}
                    className="h-6 w-6 sm:h-7 sm:w-7"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative glass shapes - Top Right */}
      <div className="pointer-events-none absolute right-0 top-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0, x: 20, y: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 150 }}
          className="absolute right-4 top-4 sm:right-8 sm:top-8 md:right-12 md:top-12">
          <motion.div
            animate={{
              rotate: [0, 15, -10, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut' as const,
            }}
            className="h-16 w-16 rounded-full border border-white/25 bg-white/15 backdrop-blur-xl shadow-[0_4px_16px_0_rgba(0,0,0,0.15),0_0_0_0.5px_rgba(255,255,255,0.3)_inset] sm:h-20 sm:w-20 md:h-24 md:w-24"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0, x: 30, y: -10 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{ delay: 0.7, type: 'spring', stiffness: 150 }}
          className="absolute right-20 top-2 sm:right-32 sm:top-4 md:right-40 md:top-6">
          <motion.div
            animate={{
              rotate: [0, -20, 15, 0],
              y: [0, -5, 5, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut' as const,
            }}
            className="h-14 w-14 rotate-45 border border-white/25 bg-white/12 backdrop-blur-xl shadow-[0_4px_12px_0_rgba(0,0,0,0.12),0_0_0_0.5px_rgba(255,255,255,0.25)_inset] sm:h-16 sm:w-16 md:h-18 md:w-18"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0, x: 15, y: -30 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{ delay: 0.8, type: 'spring', stiffness: 150 }}
          className="absolute right-8 top-20 sm:right-12 sm:top-28 md:right-16 md:top-36">
          <motion.div
            animate={{
              rotate: [0, 25, -15, 0],
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut' as const,
            }}
            style={{
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            }}
            className="h-14 w-14 border border-white/25 bg-white/15 backdrop-blur-xl shadow-[0_4px_12px_0_rgba(0,0,0,0.12),0_0_0_0.5px_rgba(255,255,255,0.3)_inset] sm:h-16 sm:w-16 md:h-18 md:w-18"
          />
        </motion.div>
      </div>
    </div>
  )
}

