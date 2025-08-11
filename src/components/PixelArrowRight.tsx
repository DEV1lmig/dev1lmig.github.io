import { motion } from 'framer-motion'

export const PixelArrowRight = ({ className = '' }: { className?: string }) => {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      shapeRendering="crispEdges"
      initial={{ x: 0, opacity: 0.8 }}
      animate={{ x: [0, 3, 0], opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Circle outline */}
      <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" />
      {/* Pixel-like right arrow */}
      <path
        d="M16 30 H34 V24 L48 32 34 40 V34 H16 Z"
        fill="currentColor"
      />
    </motion.svg>
  )
}
