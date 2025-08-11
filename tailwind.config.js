/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
        vt: ['VT323', 'monospace'],
      },
      colors: {
        // NES palette inspired
        nes: {
          black: '#0f0f1b',
          dark: '#111827',
          gray: '#2b2f42',
          light: '#d7e3fc',
          neon: '#75f94c',
          magenta: '#ff3aa7',
          cyan: '#2de2e6',
          yellow: '#f5e663',
        },
      },
      boxShadow: {
        crt: '0 0 0 1px rgba(255,255,255,0.06), 0 0 10px 2px rgba(45,226,230,0.12), inset 0 0 0 1px rgba(255,255,255,0.04)',
        glow: '0 0 8px 2px rgba(255, 58, 167, 0.6), 0 0 20px 6px rgba(45, 226, 230, 0.35)'
      },
      backgroundImage: {
        scanlines: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
      },
      backgroundSize: {
        scanlines: '100% 2px, 2px 100%'
      },
      borderRadius: {
        pixel: '0.25rem',
      },
    },
  },
  plugins: [],
}
