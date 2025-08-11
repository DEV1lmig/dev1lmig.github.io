import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { CircleNav } from './CircleNav'
import { TypingTitle } from './TypingTitle'
import { ContentDisplay } from './ContentDisplay'
import { MouseScrollIcon } from './MouseScrollIcon'
import { useTranslation } from 'react-i18next'
import { PixelArrowRight } from './PixelArrowRight'

interface DesktopViewProps {
  selectedOption: string
  mousePosition: { x: number; y: number }
  containerRef: React.RefObject<HTMLDivElement>
  onGoBack: () => void
  onSelectOption: (option: string) => void
}

export const DesktopView = ({
  selectedOption,
  mousePosition,
  containerRef,
  onGoBack,
  onSelectOption
}: DesktopViewProps) => {
  const { t } = useTranslation()
  return (
    <div className="min-h-screen bg-[var(--nes-black)] text-[var(--nes-light)] font-vt flex flex-col pt-2 sm:pt-5 md:pt-8 lg:pt-10">
      <div className="flex-grow flex flex-col justify-center items-center">
        <motion.div
          ref={containerRef}
          className="container mx-auto bg-[var(--pane-bg)] rounded-2xl lg:rounded-3xl overflow-hidden relative mb-2 sm:mb-4 md:mb-6 lg:mb-8 px-2 sm:px-4 md:px-6 lg:px-8 pixel-border crt"
          style={{
            boxShadow: `0 0 20px 2px rgba(45, 226, 230, 0.08), 0 0 40px 5px rgba(255, 58, 167, 0.1)`,
          }}
          animate={{ 
            height: selectedOption ? ['70vh', '75vh', '80vh'][Math.min(2, Math.floor(window.innerWidth / 400))] || '70vh' : 'auto',
          }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              background: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%) sm:radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 80%)`,
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
                onClick={onGoBack}
                className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 z-20 p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm"
              >
                <ArrowLeft size={16} className="text-white sm:w-5 sm:h-5" />
              </motion.button>
            )}
          </AnimatePresence>
          
          <div className='relative z-10 h-full flex'>
            {/* When NO option is selected - Profile + MouseScrollIcon + CircleNav */}
            {!selectedOption && (
              <>
                {/* Profile Section */}
                <motion.section 
                  className="flex flex-col justify-center p-2 sm:p-4 md:p-6 lg:p-8 w-3/5 lg:w-3/5"
                >
                  <div className='pb-6 sm:pb-10 md:pb-12 lg:pb-14'>
                    <h1 className="font-pixel font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight drop-shadow">{t('name')}</h1>
                    <TypingTitle/>
                  </div>
                  <p className="text-xs sm:text-sm md:text-base lg:text-base leading-relaxed text-[color:rgba(215,227,252,0.8)]">{t('profile.blurb')}</p>
                </motion.section>


                {/* CircleNav at Right Border */}
                <motion.section 
                  className="flex items-center justify-end flex-1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                    {/* Mouse Scroll Icon - between profile and CircleNav */}
                    <motion.section 
                    className="flex items-center justify-center w-1/12 sm:w-1/12 md:w-1/10 lg:w-1/12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0.5, 0.6] }}
                    transition={{ delay: 2 }}
                    >
                      <MouseScrollIcon className="text-[var(--nes-cyan)] animate-pulse opacity-60 scale-90 md:scale-100" />
                    </motion.section>

                    {/* Pixel arrow pointing at the circle (hidden when selectedOption) */}
                    <div className="flex items-center justify-center mx-1 sm:mx-2">
                      <PixelArrowRight className="text-[var(--nes-cyan)] w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" />
                    </div>
                  <div className="relative overflow-hidden w-24 h-48 sm:w-28 sm:h-56 md:w-32 md:h-64 lg:w-40 lg:h-80 xl:w-48 xl:h-96">
                    <div className="translate-x-1/2">
                      <CircleNav selectedOption={selectedOption} onSelect={onSelectOption} />
                    </div>
                  </div>
                </motion.section>
              </>
            )}

            {/* When option IS selected - CircleNav + MouseScrollIcon + Content */}
            {selectedOption && (
              <>
                {/* CircleNav at Left Border */}
                <motion.section 
                  className="flex items-center justify-start relative overflow-hidden"
                  style={{ width: '30%' }}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >

                    {/* Mouse Scroll Icon - between CircleNav and content */}
                  <div className="relative w-24 h-48 sm:w-28 sm:h-56 md:w-32 md:h-64 lg:w-40 lg:h-80 xl:w-48 xl:h-96 -ml-12 sm:-ml-14 md:-ml-56 lg:-ml-64 xl:-ml-72">
                    <CircleNav selectedOption={selectedOption} onSelect={onSelectOption} />
                  </div>
                    <motion.section 
                    className="flex items-center justify-center ml-90 sm:ml-24 md:ml-64 lg:ml-72 xl:ml-90"
                    style={{ width: '10%' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0.5, 0.6] }}
                    transition={{ delay: 0.8 }}
                    >
                    <MouseScrollIcon className="text-[var(--nes-cyan)] animate-pulse opacity-30 sm:opacity-40 md:opacity-50 lg:opacity-60 scale-75 sm:scale-90 md:scale-100" />
                    </motion.section>
                </motion.section>

                {/* Content Section */}
                <motion.section
                  className="flex-1 p-2 sm:p-4 md:p-6 lg:p-8 overflow-y-auto"
                  style={{ width: '60%' }}
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