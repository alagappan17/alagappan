import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { type ThemeConfig } from '../themes/types'
import { ThreeObject } from './ThreeObject'
import { SpotifyNowPlaying } from './SpotifyNowPlaying'

interface SocialLink {
  label: string
  href: string
  icon: string
}

interface ConnectSectionProps {
  theme: ThemeConfig
  socialLinks: SocialLink[]
}

export function ConnectSection({ theme, socialLinks }: ConnectSectionProps) {
  const [formData, setFormData] = useState({ email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')
  const [hoveredSocialIndex, setHoveredSocialIndex] = useState<number | null>(
    null
  )
  const isBrutalism = theme.id === 'brutalism'

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // EmailJS configuration
      const serviceId =
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id'
      const templateId =
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id'
      const publicKey =
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key'

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_email: formData.email,
          message: formData.message,
          to_name: 'Alagappan',
        },
        publicKey
      )

      setSubmitStatus('success')
      setFormData({ email: '', message: '' })
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      console.error('EmailJS error:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getSocialIcon = (iconName: string) => {
    const icon = iconName.toLowerCase()

    // Map email to mail.png
    const iconFile = icon === 'email' ? 'mail' : icon
    const iconPath = `/social/${iconFile}.png`

    return (
      <img src={iconPath} alt={iconName} className="h-6 w-6" loading="lazy" />
    )
  }

  // Group social links
  const getSocialGroup = (link: SocialLink) => {
    const turquoiseGroup = ['linkedin', 'github', 'twitter', 'email']
    const pinkGroup = ['behance', 'instagram', 'artgrab']

    const iconLower = link.icon.toLowerCase()
    if (turquoiseGroup.includes(iconLower)) {
      return 'turquoise'
    }
    if (pinkGroup.includes(iconLower)) {
      return 'pink'
    }
    return 'default'
  }

  if (isBrutalism) {
    // Get background color based on group
    const getBgColor = (link: SocialLink) => {
      const group = getSocialGroup(link)
      if (group === 'turquoise') {
        // Turquoise shades
        return '#2EC4B6'
      }
      if (group === 'pink') {
        // Pink/Magenta shades
        return '#FF6F91'
      }
      return '#FFFFFF'
    }

    // Get tooltip background color based on group
    const getTooltipBgColor = (link: SocialLink) => {
      const group = getSocialGroup(link)
      if (group === 'turquoise') {
        // Turquoise shades
        return '#1A9B8E'
      }
      if (group === 'pink') {
        // Pink/Magenta shades
        return '#FF6F91'
      }
      return '#1A9B8E'
    }

    return (
      <div className="relative w-full pb-8 sm:pb-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20, rotate: -2 }}
          whileInView={{ opacity: 1, x: 0, rotate: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            type: 'spring',
            stiffness: 100,
          }}
          className="mb-6 sm:mb-8">
          <div className="inline-flex rotate-1 items-center gap-2 rounded-xl border-[3px] border-black bg-[#FF6F91] px-4 py-2 shadow-[4px_4px_0_0_#111] sm:gap-3 sm:px-6 sm:py-3">
            <div className="h-2 w-2 rounded-full bg-white ring-2 ring-black sm:h-3 sm:w-3" />
            <span className="text-xs font-black uppercase tracking-wider text-white sm:text-sm md:text-base">
              Connect
            </span>
          </div>
        </motion.div>

        {/* Main Container Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative rounded-2xl border-[3px] border-black bg-[#FF8C42] p-6 shadow-[8px_8px_0_0_#111] sm:rounded-3xl sm:border-4 sm:p-8 md:p-10">
          {/* Pattern overlay - black dots */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle, #111 1.5px, transparent 1.5px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Mobile: Vertical Stack | Desktop: Two Column Layout */}
          <div className="relative z-10 flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-12">
            {/* Mobile Order: 5. Message Component | Desktop: Left Column */}
            <div className="order-5 relative rounded-xl border-[3px] border-black bg-[#FFD93D] p-6 shadow-[6px_6px_0_0_#111] sm:rounded-2xl sm:p-8 lg:order-1">
              {/* Pattern overlay - grid lines */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)',
                  backgroundSize: '16px 16px',
                }}
              />
              <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
                {/* Message */}
                <p className="mb-4 text-base font-semibold text-[#111] sm:text-lg md:text-xl">
                  Leave a message and I'll get back to you ASAP!
                </p>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-black uppercase tracking-wider text-[#111] sm:text-base">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full rounded-lg border-[3px] border-black bg-[#FFFBF3] px-4 py-3 text-[#111] shadow-[3px_3px_0_0_#111] transition-all focus:outline-none focus:ring-2 focus:ring-[#FF8C42] focus:shadow-[5px_5px_0_0_#111] sm:px-5 sm:py-4"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-black uppercase tracking-wider text-[#111] sm:text-base">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full rounded-lg border-[3px] border-black bg-[#FFFBF3] px-4 py-3 text-[#111] shadow-[3px_3px_0_0_#111] transition-all focus:outline-none focus:ring-2 focus:ring-[#FF8C42] focus:shadow-[5px_5px_0_0_#111] sm:px-5 sm:py-4"
                    placeholder="Your message here..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || submitStatus !== 'idle'}
                  whileHover={
                    submitStatus === 'idle' ? { scale: 1.02, y: -2 } : {}
                  }
                  whileTap={submitStatus === 'idle' ? { scale: 0.98 } : {}}
                  className={`w-full rounded-lg border-[3px] border-black px-6 py-3 text-sm font-black uppercase tracking-wider text-white shadow-[4px_4px_0_0_#111] transition-all sm:px-8 sm:py-4 sm:text-base ${
                    submitStatus === 'success'
                      ? 'bg-[#2EC4B6] hover:shadow-[6px_6px_0_0_#111]'
                      : submitStatus === 'error'
                      ? 'bg-red-500 hover:shadow-[6px_6px_0_0_#111]'
                      : 'bg-[#FF6F91] hover:shadow-[6px_6px_0_0_#111] disabled:opacity-50'
                  }`}>
                  {isSubmitting
                    ? 'Sending...'
                    : submitStatus === 'success'
                    ? 'Message sent successfully!'
                    : submitStatus === 'error'
                    ? 'Failed to send. Try again?'
                    : 'Send Message'}
                </motion.button>
              </form>
            </div>

            {/* Desktop: Right Column Container */}
            <div className="order-1 flex flex-col gap-6 lg:order-2">
              {/* Mobile Order: 1. 3D Object */}
              <div className="h-[250px] w-full sm:h-[300px] md:h-[320px]">
                <ThreeObject themeId="brutalism" />
              </div>

              {/* Mobile Order: 2. Find Me (Social Links) */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#111] sm:text-sm">
                  Find me on
                </h4>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {socialLinks.map((link, index) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, scale: 0.5, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{
                        delay: 0.5 + index * 0.06,
                        duration: 0.5,
                        type: 'spring',
                        stiffness: 180,
                        damping: 14,
                      }}
                      onHoverStart={() => setHoveredSocialIndex(index)}
                      onHoverEnd={() => setHoveredSocialIndex(null)}
                      className="relative">
                      <motion.a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                          scale: 1.15,
                          rotate: index % 2 === 0 ? 5 : -5,
                          y: -8,
                        }}
                        whileTap={{ scale: 0.95 }}
                        style={{ backgroundColor: getBgColor(link) }}
                        className="flex h-12 w-12 items-center justify-center rounded-xl border-[3px] border-black shadow-[4px_4px_0_0_#111] transition-shadow hover:shadow-[6px_6px_0_0_#111] sm:h-14 sm:w-14 sm:rounded-2xl">
                        <div className="text-white">
                          {getSocialIcon(link.icon)}
                        </div>
                      </motion.a>

                      {/* Tooltip */}
                      <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.8 }}
                        animate={{
                          opacity: hoveredSocialIndex === index ? 1 : 0,
                          y: hoveredSocialIndex === index ? 0 : 5,
                          scale: hoveredSocialIndex === index ? 1 : 0.8,
                          rotate: hoveredSocialIndex === index ? -2 : 0,
                        }}
                        transition={{
                          duration: 0.2,
                          type: 'spring',
                          stiffness: 200,
                        }}
                        style={{ backgroundColor: getTooltipBgColor(link) }}
                        className="pointer-events-none absolute -bottom-12 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-lg border-[2.5px] border-black px-3 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-[4px_4px_0_0_#111] sm:-bottom-14 sm:px-4 sm:py-2 sm:text-sm">
                        {link.label}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mobile: Side by side | Desktop: Side by side */}
              <div className="space-y-4">
                {/* Heading: Mobile above both, Desktop above both */}
                <h4 className="text-xs font-black uppercase tracking-wider text-[#111] sm:text-sm">
                  Now playing
                </h4>

                <div className="flex flex-row gap-3">
                  {/* Mobile Order: 3. Spotify */}
                  <div className="flex-1 min-w-0">
                    <SpotifyNowPlaying theme={theme} />
                  </div>

                  {/* Mobile Order: 4. Games */}
                  <div className="flex-shrink-0">
                    <motion.div
                      key="ghost-of-yotei"
                      initial={{ opacity: 0, scale: 0.5, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{
                        delay: 0.7,
                        duration: 0.5,
                        type: 'spring',
                        stiffness: 180,
                        damping: 14,
                      }}
                      onHoverStart={() => setHoveredSocialIndex(100)}
                      onHoverEnd={() => setHoveredSocialIndex(null)}
                      className="relative">
                      <motion.div
                        whileHover={{
                          scale: 1.15,
                          rotate: 5,
                          y: -8,
                        }}
                        whileTap={{ scale: 0.95 }}
                        style={{ backgroundColor: '#FF8C42' }}
                        className="flex h-16 w-28 items-center justify-center overflow-hidden rounded-xl border-[3px] border-black shadow-[4px_4px_0_0_#111] transition-shadow hover:shadow-[6px_6px_0_0_#111] sm:h-20 sm:w-36 sm:rounded-2xl">
                        <img
                          src="/games/ghost-of-yotei-wide.jpg"
                          alt="Ghost of Yotei"
                          className="h-full w-full object-cover"
                        />
                      </motion.div>
                      {/* Tooltip */}
                      <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.8 }}
                        animate={{
                          opacity: hoveredSocialIndex === 100 ? 1 : 0,
                          y: hoveredSocialIndex === 100 ? 0 : 5,
                          scale: hoveredSocialIndex === 100 ? 1 : 0.8,
                          rotate: hoveredSocialIndex === 100 ? -2 : 0,
                        }}
                        transition={{
                          duration: 0.2,
                          type: 'spring',
                          stiffness: 200,
                        }}
                        style={{ backgroundColor: '#FF8C42' }}
                        className="pointer-events-none absolute -bottom-12 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-lg border-[2.5px] border-black px-3 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-[4px_4px_0_0_#111] sm:-bottom-14 sm:px-4 sm:py-2 sm:text-sm">
                        Ghost of Yotei
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  // Liquid Glass Theme
  return (
    <div className="relative w-full pb-8 sm:pb-0">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-6 sm:mb-8">
        <h2 className="text-2xl font-semibold text-fuchsia-400 sm:text-3xl md:text-4xl">
          Connect
        </h2>
      </motion.div>

      {/* Main Container Box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative rounded-[1.5rem] border border-white/20 bg-gradient-to-br from-fuchsia-400/20 via-purple-400/20 to-pink-400/20 p-6 backdrop-blur-[24px] shadow-[0_8px_32px_0_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.1)_inset] sm:rounded-[2rem] sm:p-8 md:p-10 md:shadow-[0_12px_40px_0_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.15)_inset] md:backdrop-blur-[28px]">
        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 2px, transparent 2px, transparent 10px)',
          }}
        />

        {/* Two Column Layout */}
        <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: Form Box */}
          <div className="rounded-xl border border-white/30 bg-amber-400/20 p-6 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] sm:rounded-2xl sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Message */}
              <p className="mb-4 text-base font-medium text-slate-700 sm:text-lg md:text-xl">
                Leave a message and I'll get back to you ASAP!
              </p>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email-glass"
                  className="mb-2 block text-sm font-semibold text-slate-800 sm:text-base">
                  Email
                </label>
                <input
                  type="email"
                  id="email-glass"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-lg border border-white/40 bg-white/20 px-4 py-3 text-slate-800 backdrop-blur-sm shadow-[0_4px_16px_0_rgba(0,0,0,0.2)] transition-all focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:bg-white/30 sm:px-5 sm:py-4"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message-glass"
                  className="mb-2 block text-sm font-semibold text-slate-800 sm:text-base">
                  Message
                </label>
                <textarea
                  id="message-glass"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full rounded-lg border border-white/40 bg-white/20 px-4 py-3 text-slate-800 backdrop-blur-sm shadow-[0_4px_16px_0_rgba(0,0,0,0.2)] transition-all focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:bg-white/30 sm:px-5 sm:py-4"
                  placeholder="Your message here..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || submitStatus !== 'idle'}
                whileHover={
                  submitStatus === 'idle' ? { scale: 1.02, y: -2 } : {}
                }
                whileTap={submitStatus === 'idle' ? { scale: 0.98 } : {}}
                className={`w-full rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white shadow-[0_6px_24px_0_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all sm:px-8 sm:py-4 sm:text-base ${
                  submitStatus === 'success'
                    ? 'bg-gradient-to-r from-green-400 to-green-500 hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]'
                    : submitStatus === 'error'
                    ? 'bg-gradient-to-r from-red-400 to-red-500 hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]'
                    : 'bg-gradient-to-r from-fuchsia-400 to-purple-500 hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] disabled:opacity-50'
                }`}>
                {isSubmitting
                  ? 'Sending...'
                  : submitStatus === 'success'
                  ? 'Message sent successfully!'
                  : submitStatus === 'error'
                  ? 'Failed to send. Try again?'
                  : 'Send Message'}
              </motion.button>
            </form>
          </div>

          {/* Right: 3D Object and Social Links */}
          <div className="flex flex-col gap-6">
            {/* 3D Object Container */}
            <div className="h-[250px] w-full sm:h-[300px] md:h-[320px]">
              <ThreeObject themeId="liquidGlass" />
            </div>

            {/* Social Links - Matching Tech Stack Style */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 sm:text-sm">
                Find me on
              </h4>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {socialLinks.map((link, index) => {
                  const group = getSocialGroup(link)
                  let bgColor = 'bg-white/15'
                  let textColor = 'text-slate-800'

                  if (group === 'turquoise') {
                    // Turquoise/Teal shades for liquid glass
                    bgColor = 'bg-teal-400/30'
                    textColor = 'text-teal-50'
                  } else if (group === 'pink') {
                    // Pink/Magenta shades for liquid glass
                    bgColor = 'bg-fuchsia-400/30'
                    textColor = 'text-fuchsia-50'
                  }

                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      whileHover={{ scale: 1.1, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 ${bgColor} backdrop-blur-[20px] ${textColor} transition-colors hover:opacity-80 sm:h-14 sm:w-14`}
                      aria-label={link.label}
                      title={link.label}>
                      {getSocialIcon(link.icon)}
                    </motion.a>
                  )
                })}
              </div>
            </div>

            {/* Music Section */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 sm:text-sm">
                Now playing
              </h4>

              {/* Spotify and Games Side by Side */}
              <div className="flex gap-3 sm:gap-4">
                {/* Spotify Integration - takes space of 3 social icons */}
                <div className="flex-1 min-w-0">
                  <SpotifyNowPlaying theme={theme} />
                </div>

                {/* Games Section - takes space of 3 social icons */}
                <motion.div
                  key="ghost-of-yotei"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setHoveredSocialIndex(100)}
                  onHoverEnd={() => setHoveredSocialIndex(null)}
                  className="relative flex h-16 w-28 items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-amber-400/30 backdrop-blur-[20px] transition-colors hover:opacity-80 sm:h-20 sm:w-36"
                  aria-label="Ghost of Yotei"
                  title="Ghost of Yotei">
                  <img
                    src="/games/ghost-of-yotei-wide.jpg"
                    alt="Ghost of Yotei"
                    className="h-full w-full object-cover"
                  />
                  {/* Tooltip */}
                  <motion.div
                    initial={{ opacity: 0, y: 5, scale: 0.8 }}
                    animate={{
                      opacity: hoveredSocialIndex === 100 ? 1 : 0,
                      y: hoveredSocialIndex === 100 ? 0 : 5,
                      scale: hoveredSocialIndex === 100 ? 1 : 0.8,
                      rotate: hoveredSocialIndex === 100 ? -2 : 0,
                    }}
                    transition={{
                      duration: 0.2,
                      type: 'spring',
                      stiffness: 200,
                    }}
                    className="pointer-events-none absolute -bottom-12 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/40 bg-amber-400/30 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-50 backdrop-blur-sm shadow-[0_4px_16px_0_rgba(0,0,0,0.2)] sm:-bottom-14 sm:px-4 sm:py-2 sm:text-sm">
                    Ghost of Yotei
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
