// Google Analytics 4 utility functions

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void
    dataLayer: unknown[]
  }
}

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XN3QJMHVD0'

/**
 * Initialize Google Analytics 4
 * Note: gtag is already initialized in index.html, this just ensures it's ready
 */
export const initGA = (): void => {
  if (typeof window === 'undefined') return

  // Wait for gtag to be available (it's loaded asynchronously)
  if (typeof window.gtag === 'undefined') {
    // If gtag isn't available yet, wait a bit and try again
    setTimeout(() => {
      if (typeof window.gtag !== 'undefined') {
        trackPageView(window.location.pathname, document.title)
      }
    }, 100)
    return
  }

  // Track initial page view
  trackPageView(window.location.pathname, document.title)
}

/**
 * Track a page view
 */
export const trackPageView = (path: string, title?: string): void => {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('config', MEASUREMENT_ID, {
    page_path: path,
    page_title: title || document.title,
  })
}

/**
 * Track a custom event
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
): void => {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', eventName, eventParams)
}

/**
 * Track theme change
 */
export const trackThemeChange = (fromTheme: string, toTheme: string): void => {
  trackEvent('theme_change', {
    from_theme: fromTheme,
    to_theme: toTheme,
    theme_name: toTheme,
  })
}

/**
 * Track scroll depth
 */
export const trackScrollDepth = (depth: number): void => {
  trackEvent('scroll', {
    scroll_depth: depth,
    scroll_percentage: depth,
  })
}

/**
 * Track engagement time
 */
export const trackEngagementTime = (seconds: number): void => {
  trackEvent('user_engagement', {
    engagement_time_msec: seconds * 1000,
  })
}

/**
 * Track when user becomes inactive
 */
export const trackUserInactive = (): void => {
  trackEvent('user_inactive')
}
