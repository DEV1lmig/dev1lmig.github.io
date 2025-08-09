import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Menu } from 'lucide-react'
import { TypingTitle } from './TypingTitle'
import { ContentDisplay } from './ContentDisplay'
import { useTranslation } from 'react-i18next'

interface MobileViewProps {
  selectedOption: string
  showMobileNav: boolean
  onGoBack: () => void
  onToggleMobileNav: () => void
  onSelectOption: (option: string) => void
  onCloseMobileNav: () => void
}

export const MobileView = ({
  selectedOption,
  showMobileNav,
  onGoBack,
  onToggleMobileNav,
  onSelectOption,
  onCloseMobileNav
}: MobileViewProps) => {
  const { t } = useTranslation()
  const options = [t('nav.faq'), t('nav.info'), t('nav.contact'), t('nav.projects')]
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
              onClick={onGoBack}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
            >
              <ArrowLeft size={20} className="text-white" /> 
            </button>
          ) : (
            <button
              onClick={onToggleMobileNav}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
            >
              <Menu size={20} className="text-white" />
            </button>
          )}
          
          {selectedOption && (
            <h2 className="text-lg font-bold">{t('content.title', { section: selectedOption })}</h2>
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
                <h1 className="font-bold text-4xl mb-4">{t('name')}</h1>
                <TypingTitle/>
              </div>
              <p className="text-sm leading-relaxed max-w-sm">
                {t('profile.blurb')}
              </p>
              
              {/* Mobile Navigation Hint */}
              <div className="mt-8 text-gray-400 text-sm">
                {t('mobile.hint')}
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
              onClick={onCloseMobileNav}
            >
              <motion.div
                className="bg-gray-800 rounded-2xl p-8 m-4 max-w-sm w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold mb-6 text-center">{t('mobile.navTitle')}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {options.map((option) => (
                    <motion.button
                      key={option}
                      className="bg-gray-700 hover:bg-gray-600 rounded-xl p-4 text-center transition-colors duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        onSelectOption(option)
                        onCloseMobileNav()
                      }}
                    >
                      <span className="font-medium">{option}</span>
                    </motion.button>
                  ))}
                </div>
                <button
                  className="w-full mt-6 p-3 bg-white/10 rounded-xl text-gray-400"
                  onClick={onCloseMobileNav}
                >
                  {t('mobile.close')}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}