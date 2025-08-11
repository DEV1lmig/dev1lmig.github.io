import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export const CircleNav = ({ selectedOption, onSelect }: { selectedOption: string, onSelect: (option: string) => void }) => {
  const { t } = useTranslation()
  const options = [t('nav.faq'), t('nav.info'), t('nav.contact'), t('nav.projects')]
  const [rotation, setRotation] = useState(0)
  // Keep a ref in sync with rotation to avoid stale values inside stable callbacks
  const rotationRef = useRef(0)
  useEffect(() => { rotationRef.current = rotation }, [rotation])

  const circleRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef<{ y: number; rotation: number }>({ y: 0, rotation: 0 })
  const isDraggingRef = useRef(false)
  // Timeout used to detect end of wheel momentum and then snap
  const wheelEndTimeoutRef = useRef<number | null>(null)

  // Normalize wheel delta across devices (pixels/lines/pages)
  const normalizeWheelDelta = (e: WheelEvent) => {
    let delta = e.deltaY
    if (e.deltaMode === 1) {
      // DOM_DELTA_LINE ~ 16px per line
      delta *= 16
    } else if (e.deltaMode === 2) {
      // DOM_DELTA_PAGE ~ viewport height
      delta *= window.innerHeight
    }
    return delta
  }

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault()
    const raw = normalizeWheelDelta(e)
    // Clamp extremes to avoid erratic jumps on high-sensitivity trackpads
    const clamped = Math.max(-60, Math.min(60, raw))
    const sensitivity = 0.25

    const newRotation = rotationRef.current + clamped * sensitivity
    // Keep rotation within [0, 360)
    const wrapped = ((newRotation % 360) + 360) % 360
    setRotation(wrapped)

    // Debounce snapping until scrolling settles
    if (wheelEndTimeoutRef.current) {
      window.clearTimeout(wheelEndTimeoutRef.current)
    }
    wheelEndTimeoutRef.current = window.setTimeout(() => {
      const snapped = Math.round(rotationRef.current / 90) * 90
      const wrappedSnap = ((snapped % 360) + 360) % 360
      setRotation(wrappedSnap)
    }, 140)
  }, [])

  const handleTouchStart = useCallback((e: TouchEvent) => {
    e.preventDefault() // Prevent page scrolling
    touchStartRef.current = {
      y: e.touches[0].clientY,
      rotation: rotationRef.current
    }
    isDraggingRef.current = true
  }, [])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDraggingRef.current) return
    e.preventDefault() // Prevent page scrolling
    
    const touchDelta = touchStartRef.current.y - e.touches[0].clientY
    const sensitivity = 0.8 // Reduced sensitivity for better control
    const newRotation = touchStartRef.current.rotation + touchDelta * sensitivity
    
    // Apply rotation without snapping during drag
    const wrapped = ((newRotation % 360) + 360) % 360
    setRotation(wrapped)
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    
    // Snap to nearest 90-degree position on touch end
    const snappedRotation = Math.round(rotationRef.current / 90) * 90
    const wrappedSnap = ((snappedRotation % 360) + 360) % 360
    setRotation(wrappedSnap)
  }, [])

  useEffect(() => {
    const circle = circleRef.current
    if (circle) {
      // Desktop wheel events
      circle.addEventListener('wheel', handleWheel, { passive: false })
      
      // Mobile touch events
      circle.addEventListener('touchstart', handleTouchStart, { passive: false })
      circle.addEventListener('touchmove', handleTouchMove, { passive: false })
      circle.addEventListener('touchend', handleTouchEnd, { passive: true })
      circle.addEventListener('touchcancel', handleTouchEnd, { passive: true })
    }
    
    return () => {
      if (circle) {
        circle.removeEventListener('wheel', handleWheel)
        circle.removeEventListener('touchstart', handleTouchStart)
        circle.removeEventListener('touchmove', handleTouchMove)
        circle.removeEventListener('touchend', handleTouchEnd)
        circle.removeEventListener('touchcancel', handleTouchEnd)
      }
      if (wheelEndTimeoutRef.current) {
        window.clearTimeout(wheelEndTimeoutRef.current)
        wheelEndTimeoutRef.current = null
      }
    }
  }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd])

  return (
    <motion.div
      ref={circleRef}
      className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 cursor-pointer touch-none select-none"
      style={{ rotate: rotation }}
      animate={{ rotate: rotation }}
      transition={{ 
        type: 'spring', 
        stiffness: isDraggingRef.current ? 300 : 80, 
        damping: isDraggingRef.current ? 30 : 20 
      }}
    >
      {options.map((option, index) => {
        const angle = index * 90
        const isSelected = option === selectedOption

        const buttonRotation = angle - rotation
        let textRotation = -angle
        if (buttonRotation % 360 === 90 || buttonRotation % 360 === -270) {
          textRotation += 90
        } else if (buttonRotation % 360 === -90 || buttonRotation % 360 === 270) {
          textRotation -= 90
        } else if (buttonRotation % 360 === 180 || buttonRotation % 360 === -180) {
          textRotation += 180
        }

        return (
          <motion.button
            key={option}
            className={`absolute w-full z-10 font-pixel tracking-widest ${isSelected ? 'scale-110 text-[var(--nes-yellow)]' : 'text-[var(--nes-light)]'} text-xs sm:text-sm md:text-base lg:text-lg`}
            style={{
              top: angle === 0 ? '0%' : angle === 180 ? '100%' : '50%',
              left: angle === 90 ? '100%' : angle === 270 ? '0%' : '50%',
              transform: `translate(-50%, -50%)`,
            }}
            onClick={() => onSelect(option)}
            transition={{ duration: 0.3 }}
          >
            <span 
              className='w-full inline-block leading-tight'
              style={{ transform: `rotate(${textRotation}deg)` }}
            >
              {option}
            </span>
          </motion.button>
        )
      })}
      <svg className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-500" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="50"
          fill="none"
          stroke="var(--nes-cyan)"
          strokeWidth="1"
          strokeDasharray="40 40"
          strokeDashoffset="63"
        />
      </svg>
    </motion.div>
  )
}
