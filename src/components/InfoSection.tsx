import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Code } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const InfoSection = () => {
  const { t } = useTranslation()
  const experienceItems = t('info.experience.items', { returnObjects: true }) as Array<{ role: string; period: string; desc: string }>
  const educationItems = t('info.education.items', { returnObjects: true }) as Array<{ title: string; period: string }>
  const skills = t('info.skills.items', { returnObjects: true }) as string[]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[var(--nes-black)] pixel-border text-[var(--nes-light)] p-10 rounded-lg shadow-lg w-auto mx-auto"
    >
      <section className="mb-6">
        <h3 className="text-xl font-pixel mb-3 flex items-center text-[var(--nes-yellow)]">
          <Briefcase className="mr-2" size={20} />
          {t('info.experience.title')}
        </h3>
        <ul className="space-y-4">
          {experienceItems.map((item, idx) => (
            <li key={idx}>
              <h4 className="font-vt">{item.role}</h4>
              <p className="text-[color:rgba(215,227,252,0.7)]">{item.period}</p>
              <p className="text-[color:rgba(215,227,252,0.85)]">{item.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-pixel mb-3 flex items-center text-[var(--nes-yellow)]">
          <GraduationCap className="mr-2" size={20} />
          {t('info.education.title')}
        </h3>
        <ul className="space-y-4">
          {educationItems.map((item, idx) => (
            <li key={idx}>
              <h4 className="font-vt">{item.title}</h4>
              <p className="text-[color:rgba(215,227,252,0.7)]">{item.period}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-pixel mb-3 flex items-center text-[var(--nes-yellow)]">
          <Code className="mr-2" size={20} />
          {t('info.skills.title')}
        </h3>
        <ul className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <li key={skill} className="bg-[color:rgba(45,226,230,0.1)] border border-[var(--nes-cyan)] px-3 py-1 rounded-pixel text-sm font-vt">
              {skill}
            </li>
          ))}
        </ul>
      </section>
    </motion.div>
  )
}
