import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'

type FAQItem = {
  question: string
  answer: string
}

const FAQItemRow = ({ item }: { item: FAQItem }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-700">
      <button
        className="flex justify-between items-center w-full py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-medium">{item.question}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="pb-4 text-gray-300">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export const FAQSection = () => {
  const { t } = useTranslation()
  const items = t('faq.items', { returnObjects: true }) as Array<{ q: string; a: string }>
  const faqItems: FAQItem[] = items.map((it) => ({ question: it.q, answer: it.a }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 text-white p-10 rounded-lg shadow-lg w-auto mx-auto"
    >
      <h3 className="text-2xl font-bold mb-6">{t('faq.title')}</h3>
      <div className="space-y-2">
        {faqItems.map((item, index) => (
          <FAQItemRow key={index} item={item} />
        ))}
      </div>
    </motion.div>
  )
}
