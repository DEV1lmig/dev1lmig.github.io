import { motion } from 'framer-motion'
import { InfoSection } from './InfoSection'
import { ProjectCards } from './ProjectCards'
import { ContactSection } from './ContactSection'
import { FAQSection } from './FAQSection'
import { useTranslation } from 'react-i18next'

export const ContentDisplay = ({ selectedOption }: { selectedOption: string }) => {
    const { t } = useTranslation()
    let content

    // Map section keys across languages to components
    const nav = {
      projects: t('nav.projects'),
      contact: t('nav.contact'),
      info: t('nav.info'),
      faq: t('nav.faq'),
    }

    if (selectedOption === nav.projects) {
      content = <ProjectCards />
    } else if (selectedOption === nav.contact) {
      content = <ContactSection />
    } else if (selectedOption === nav.info) {
      content = <InfoSection />
    } else if (selectedOption === nav.faq) {
      content = <FAQSection />
    } else {
      content = <p></p>
    }

    return (
      <motion.div
        key={selectedOption}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
        className="h-full"
      >
        <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-4">{t('content.title', { section: selectedOption })}</h2>
        <div className="overflow-y-auto pb-4">
          {content}
        </div>
      </motion.div>
    )
}
