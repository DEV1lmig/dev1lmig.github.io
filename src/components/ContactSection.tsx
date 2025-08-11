import React from 'react'
import { motion } from 'framer-motion'
import { Github, Instagram, Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const ContactSection = () => {
  const { t } = useTranslation()
  const socialLinks = t('contact.social', { returnObjects: true }) as Array<{ name: string; url: string }>

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[var(--nes-black)] pixel-border text-[var(--nes-light)] p-10 rounded-lg shadow-lg w-auto mx-auto"
    >
      <h3 className="text-2xl font-pixel mb-6 text-[var(--nes-yellow)]">{t('contact.title')}</h3>

      <div className="flex flex-wrap justify-center gap-6 mb-8">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 pixel-border rounded bg-transparent hover:shadow-[0_0_10px_2px_rgba(45,226,230,0.35)] transition-colors duration-300"
            aria-label={link.name}
          >
            {link.name.toLowerCase() === 'github' ? (
              <Github size={24} />
            ) : link.name.toLowerCase() === 'instagram' ? (
              <Instagram size={24} />
            ) : (
              <Github size={24} />
            )}
          </a>
        ))}
      </div>

      <div className="text-center">
        <a
          href={`mailto:${t('contact.email')}`}
          className="inline-flex items-center font-vt hover:text-[var(--nes-yellow)] transition-colors duration-300"
        >
          <Mail size={20} className="mr-2" />
          {t('contact.email')}
        </a>
      </div>
    </motion.div>
  )
}
