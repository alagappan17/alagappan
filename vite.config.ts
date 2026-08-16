import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { cloudflare } from "@cloudflare/vite-plugin";

// Fonts are only discovered after the stylesheet downloads and parses, which
// puts the heading font two round-trips behind the HTML. Preloading the ones
// used above the fold pulls them onto the critical path immediately.
const PRELOAD_FONTS = [/space-grotesk-latin-wght-normal-.*\.woff2$/, /inter-latin-wght-normal-.*\.woff2$/]

function preloadCriticalFonts() {
  return {
    name: 'preload-critical-fonts',
    enforce: 'post' as const,
    transformIndexHtml(html: string, ctx: { bundle?: Record<string, unknown> }) {
      const files = Object.keys(ctx.bundle ?? {}).filter((f) =>
        PRELOAD_FONTS.some((re) => re.test(f))
      )
      return {
        html,
        tags: files.map((file) => ({
          tag: 'link',
          attrs: {
            rel: 'preload',
            as: 'font',
            type: 'font/woff2',
            href: `/${file}`,
            crossorigin: '',
          },
          injectTo: 'head-prepend' as const,
        })),
      }
    },
  }
}

export default defineConfig({
  base: '/',
  plugins: [react({
    babel: {
      plugins: [['babel-plugin-react-compiler']],
    },
  }), cloudflare(), preloadCriticalFonts()],
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('three') || id.includes('@react-three')) {
            return 'three-vendor'
          }
          if (id.includes('framer-motion')) {
            return 'framer'
          }
          if (id.includes('node_modules/react-dom')) {
            return 'react-dom'
          }
          if (id.includes('@emailjs')) {
            return 'emailjs'
          }
        },
      },
    },
  },
})