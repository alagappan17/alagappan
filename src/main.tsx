import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Variable fonts: one file per family covers every weight, so this is two
// requests instead of six. unicode-range keeps the browser on the latin subset.
import '@fontsource-variable/inter/wght.css'
import '@fontsource-variable/space-grotesk/wght.css'
import './index.css'
import App from './App.tsx'
import { initGA } from './utils/analytics'

// Initialize Google Analytics (page view tracking happens inside initGA)
initGA()

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
