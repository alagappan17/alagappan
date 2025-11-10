/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(20px, -35px) scale(1.1)' },
          '66%': { transform: 'translate(-25px, 25px) scale(0.95)' },
          '100%': { transform: 'translate(0, 0) scale(1)' },
        },
        'slow-pulse': {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(0)' },
          '50%': { transform: 'rotate(180deg) translateX(6px)' },
          '100%': { transform: 'rotate(360deg) translateX(0)' },
        },
      },
      animation: {
        blob: 'blob 18s ease-in-out infinite',
        'slow-pulse': 'slow-pulse 12s ease-in-out infinite',
        orbit: 'orbit 6s ease-in-out infinite',
      },
      dropShadow: {
        glow: '0 35px 50px rgba(56, 189, 248, 0.45)',
      },
    },
  },
  plugins: [],
}
