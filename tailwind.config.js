/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    borderRadius: { none: '0', DEFAULT: '0', media: '12px', card: '24px', full: '9999px' },
    extend: {
      fontFamily: {
        sans: ['"Inter Variable"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'monospace'],
      },
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        fg: 'rgb(var(--fg) / <alpha-value>)',
        // Brand: Signal orange (the cursor) and the Ink/Paper pair, fixed in both themes.
        signal: '#FF5A1F',
        ink: '#121212',
        paper: '#F5F4F0',
      },
    },
  },
  plugins: [],
}
