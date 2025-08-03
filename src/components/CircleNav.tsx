import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

const options = ['FAQ', 'INFO', 'CONTACTO', 'PROYECTOS']

export const CircleNav = ({ selectedOption, onSelect }: { selectedOption: string, onSelect: (option: string) => void }) => {
  const [rotation, setRotation] = useState(0)
  const circleRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef<{ y: number; rotation: number }>({ y: 0, rotation: 0 })
  const isDraggingRef = useRef(false)

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault()
    const sensitivity = 0.5
    const newRotation = rotation + e.deltaY * sensitivity
    const snappedRotation = Math.round(newRotation / 90) * 90
    setRotation(snappedRotation % 360)
  }, [rotation])

  const handleTouchStart = useCallback((e: TouchEvent) => {
    e.preventDefault() // Prevent page scrolling
    touchStartRef.current = {
      y: e.touches[0].clientY,
      rotation: rotation
    }
    isDraggingRef.current = true
  }, [rotation])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDraggingRef.current) return
    e.preventDefault() // Prevent page scrolling
    
    const touchDelta = touchStartRef.current.y - e.touches[0].clientY
    const sensitivity = 0.8 // Reduced sensitivity for better control
    const newRotation = touchStartRef.current.rotation + touchDelta * sensitivity
    
    // Apply rotation without snapping during drag
    setRotation(newRotation % 360)
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    
    // Snap to nearest 90-degree position on touch end
    const snappedRotation = Math.round(rotation / 90) * 90
    setRotation(snappedRotation % 360)
  }, [rotation])

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
      className="relative w-72 md:w-96 h-72 md:h-96 cursor-pointer touch-none select-none"
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
            className={`border-solid absolute w-full z-10 text-lg font-bold ${isSelected ? 'text-xl' : ''}`}
            style={{
              top: angle === 0 ? '0%' : angle === 180 ? '100%' : '50%',
              left: angle === 90 ? '100%' : angle === 270 ? '0%' : '50%',
              transform: `translate(-50%, -50%)`,
            }}
            onClick={() => onSelect(option)}
            animate={{ fontSize: isSelected ? '1.35rem' : '1.25rem' }}
            transition={{ duration: 0.3 }}
          >
            <span className='w-full'
              style={{
                display: 'inline-block',
                transform: `rotate(${textRotation}deg)`,
              }}
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
          stroke="white"
          strokeWidth="1.4"
          strokeDasharray="40 40"
          strokeDashoffset="63"
        />
      </svg>
    </motion.div>
  )
}
