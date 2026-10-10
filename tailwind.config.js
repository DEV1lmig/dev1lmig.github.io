/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    borderRadius: { none: '0', DEFAULT: '0' },
    extend: {
      fontFamily: {
        display: ['"Archivo Black"', 'Impact', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: '#0a0a0a',
        panel: '#121212',
        line: '#2a2a2a',
        phosphor: '#eaeaea',
        mute: '#8d8d8d',
        hazard: '#ff2a2a',
      },
    },
  },
  plugins: [],
}
