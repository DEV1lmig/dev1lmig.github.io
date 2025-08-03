import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CircleNav } from '@/components/CircleNav'
import { TypingTitle } from '@/components/TypingTitle'
import { ContentDisplay } from '@/components/ContentDisplay'
import { ArrowLeft, Menu } from 'lucide-react'

export default function App() {
  const [selectedOption, setSelectedOption] = useState('')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [showMobileNav, setShowMobileNav] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleGoBack = () => {
    setSelectedOption('')
    setShowMobileNav(false)
  }

  useEffect(() => {
    document.title = 'DEV1lmig'
    
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && !isMobile) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault()
      }
    }

    const container = containerRef.current
    if (container && !isMobile) {
      container.addEventListener('mousemove', handleMouseMove)
    }
    document.addEventListener('keydown', handleTabKey)

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove)
      }
      document.removeEventListener('keydown', handleTabKey)
      window.removeEventListener('resize', checkMobile)
    }
  }, [isMobile])

  // Mobile Layout
  if (isMobile) {
    return (
      <div className="min-h-screen bg-black text-white">
        <motion.div
          className="min-h-screen bg-gray-900 relative"
          style={{
            boxShadow: selectedOption ? 'none' : `0 0 40px 5px rgba(255, 255, 255, 0.1)`,
          }}
        >
          {/* Mobile Header */}
          <div className="relative z-20 flex justify-between items-center p-4">
            {selectedOption ? (
              <button
                onClick={handleGoBack}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
              >
                <ArrowLeft size={20} className="text-white" />
              </button>
            ) : (
              <button
                onClick={() => setShowMobileNav(!showMobileNav)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
              >
                <Menu size={20} className="text-white" />
              </button>
            )}
            
            {selectedOption && (
              <h2 className="text-lg font-bold">{selectedOption}</h2>
            )}
            <div></div> {/* Spacer for flex layout */}
          </div>

          {/* Content Area */}
          <div className="relative z-10 min-h-screen">
            {/* Main Profile - Mobile */}
            {!selectedOption && (
              <motion.div
                initial={{ opacity: 1 }}
                className="flex flex-col items-center justify-center min-h-screen p-6 text-center"
              >
                <div className="mb-8">
                  <h1 className="font-bold text-4xl mb-4">Miguel Quiroz</h1>
                  <TypingTitle/>
                </div>
                <p className="text-sm leading-relaxed max-w-sm">
                  Mi nombre es Miguel Quiroz, desarrollador front-end venezolano apasionado por crear UIs intuitivas y minimalistas. Con experiencia en el diseño de interfaces completas, componentes web3, aplicaciones AI, y plataformas de comercio electrónico.
                </p>
                
                {/* Mobile Navigation Hint */}
                <div className="mt-8 text-gray-400 text-sm">
                  Toca el menú ☰ para navegar
                </div>
              </motion.div>
            )}

            {/* Selected Content - Mobile */}
            {selectedOption && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="p-4 pt-0"
              >
                <ContentDisplay selectedOption={selectedOption} />
              </motion.div>
            )}
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {showMobileNav && !selectedOption && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-30 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                onClick={() => setShowMobileNav(false)}
              >
                <motion.div
                  className="bg-gray-800 rounded-2xl p-8 m-4 max-w-sm w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-xl font-bold mb-6 text-center">Navegación</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['FAQ', 'INFO', 'CONTACTO', 'PROYECTOS'].map((option) => (
                      <motion.button
                        key={option}
                        className="bg-gray-700 hover:bg-gray-600 rounded-xl p-4 text-center transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedOption(option)
                          setShowMobileNav(false)
                        }}
                      >
                        <span className="font-medium">{option}</span>
                      </motion.button>
                    ))}
                  </div>
                  <button
                    className="w-full mt-6 p-3 bg-white/10 rounded-xl text-gray-400"
                    onClick={() => setShowMobileNav(false)}
                  >
                    Cerrar
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    )
  }

  // Desktop Layout (your existing code)
  return (
    <div className="min-h-screen bg-black text-white flex flex-col pt-5 md:pt-10">
      <div className="flex-grow flex flex-col justify-center items-center">
        <motion.div
          ref={containerRef}
          className="container mx-auto bg-gray-900 rounded-3xl overflow-hidden relative mb-4 md:mb-8 px-4 md:px-8"
          style={{
            boxShadow: `0 0 40px 5px rgba(255, 255, 255, 0.1)`,
          }}
          animate={{ 
            height: selectedOption ? '80vh' : 'auto',
          }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 80%)`,
            }}
            transition={{ type: 'tween', ease: 'linear', duration: 0.2 }}
          />
          
          {/* Back Arrow Button - only show when option is selected */}
          <AnimatePresence>
            {selectedOption && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                onClick={handleGoBack}
                className="absolute top-4 left-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm"
              >
                <ArrowLeft size={20} className="text-white" />
              </motion.button>
            )}
          </AnimatePresence>
          
          <div className='relative z-10 h-full flex'>
            {/* When NO option is selected - Profile + CircleNav at right */}
            {!selectedOption && (
              <>
                {/* Profile Section */}
                <motion.section 
                  className="flex flex-col justify-center p-4 md:p-8"
                  style={{ width: '70%' }}
                >
                  <div className='pb-14'>
                    <h1 className="font-bold text-4xl md:text-6xl">Miguel Quiroz</h1>
                    <TypingTitle/>
                  </div>
                  <p className="text-sm md:text-base">Mi nombre es Miguel Quiroz, desarrollador front-end venezolano apasionado por crear UIs intuitivas y minimalistas. Con experiencia en el diseño de interfaces completas, componentes web3, aplicaciones AI, y plataformas de comercio electrónico. Comprometido con el aprendizaje continuo y la exploración de nuevas tecnologías.</p>
                </motion.section>

                {/* CircleNav at Right Border */}
                <motion.section 
                  className="flex items-center justify-end relative"
                  style={{ width: '30%' }}
                >
                  <div className="relative overflow-hidden w-48 h-96">
                    <div style={{ transform: 'translateX(50%)' }}>
                      <CircleNav selectedOption={selectedOption} onSelect={setSelectedOption} />
                    </div>
                  </div>
                </motion.section>
              </>
            )}

            {/* When option IS selected - CircleNav at left + Content at right */}
            {selectedOption && (
              <>
                {/* CircleNav at Left Border */}
                <motion.section 
                  className="flex items-center justify-start relative overflow-hidden"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  style={{ width: '30%' }}
                >
                  <div className="relative w-48 h-96" style={{ marginLeft: '-270px' }}>
                    <CircleNav selectedOption={selectedOption} onSelect={setSelectedOption} />
                  </div>
                </motion.section>

                {/* Content Section */}
                <motion.section
                  className="flex-1 p-4 md:p-8 overflow-y-auto"
                  initial={{ opacity: 0, x: '100%' }}
                  animate={{ opacity: 1, x: '0%' }}
                  exit={{ opacity: 0, x: '100%' }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  <ContentDisplay selectedOption={selectedOption} />
                </motion.section>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
