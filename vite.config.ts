import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  base: '/',
  plugins: [react({
    babel: {
      plugins: [['babel-plugin-react-compiler']],
    },
  }), cloudflare()],
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