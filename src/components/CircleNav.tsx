import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export const CircleNav = ({ selectedOption, onSelect }: { selectedOption: string, onSelect: (option: string) => void }) => {
  const { t } = useTranslation()
  const options = useMemo(() => [t('nav.faq'), t('nav.info'), t('nav.contact'), t('nav.projects')], [t])
  const [rotation, setRotation] = useState(0)
  const rotationRef = useRef(0)
  useEffect(() => { rotationRef.current = rotation }, [rotation])

  const circleRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef<{ y: number; rotation: number }>({ y: 0, rotation: 0 })
  const isDraggingRef = useRef(false)
  // --- Discrete snap-per-gesture scroll logic with cooldown ---
  const rotationMotion = useMotionValue(rotation)
  useEffect(() => {
    const unsub = rotationMotion.on('change', v => {
      setRotation(v)
      rotationRef.current = v
    })
    return unsub
  }, [rotationMotion])

  const scrollCooldownRef = useRef(false)
  const SCROLL_COOLDOWN = 250 // ms

  const handleWheel = useCallback((e: WheelEvent) => {
    // Ignore pinch-to-zoom (ctrlKey)
    if (e.ctrlKey) return
    // Ignore very small deltas (noise)
    if (Math.abs(e.deltaX) < 0.5 && Math.abs(e.deltaY) < 0.5) return
    // Only handle clear two-finger scrolls (vertical or horizontal)
    if (Math.abs(e.deltaX) > 2 && Math.abs(e.deltaY) > 2) return
    if (scrollCooldownRef.current) return
    e.preventDefault()
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
    // Snap to next/prev entry
    const direction = delta > 0 ? 1 : -1
    // Only snap if the gesture is strong enough
    if (Math.abs(delta) < 8) return
    // Compute new rotation (snap by 90deg)
    const snapped = Math.round(rotationRef.current / 90) * 90 + direction * 90
    animate(rotationMotion, snapped, { type: 'spring', stiffness: 160, damping: 18 })
    scrollCooldownRef.current = true
    setTimeout(() => { scrollCooldownRef.current = false }, SCROLL_COOLDOWN)
  }, [rotationMotion])

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

  // Memoize the angle for the selected option (so selected is at the left, 270deg)
  const targetAngle = useMemo(() => {
    if (!selectedOption) return null
    const idx = options.indexOf(selectedOption)
    if (idx === -1) return null
    // Rotate so selected entry is at 270deg (left)
    return (90 - idx * 90)
  }, [selectedOption, options])

  // When selectedOption changes, always rotate so selected is at left (angle 270)
  useEffect(() => {
    if (targetAngle == null) return
    const normalized = ((targetAngle % 360) + 360) % 360
    setRotation(normalized)
    rotationRef.current = normalized // keep ref in sync for immediate effect
  }, [targetAngle])

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
    }
  }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd])

  return (
    <motion.div
      ref={circleRef}
      className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 cursor-pointer touch-none select-none scrollbar-hide"
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
