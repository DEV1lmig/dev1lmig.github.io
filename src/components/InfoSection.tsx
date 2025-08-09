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
      className="bg-gray-800 text-white p-10 rounded-lg shadow-lg w-auto mx-auto"
    >
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-3 flex items-center">
          <Briefcase className="mr-2" size={20} />
          {t('info.experience.title')}
        </h3>
        <ul className="space-y-4">
          {experienceItems.map((item, idx) => (
            <li key={idx}>
              <h4 className="font-medium">{item.role}</h4>
              <p className="text-gray-400">{item.period}</p>
              <p className="text-gray-300">{item.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-3 flex items-center">
          <GraduationCap className="mr-2" size={20} />
          {t('info.education.title')}
        </h3>
        <ul className="space-y-4">
          {educationItems.map((item, idx) => (
            <li key={idx}>
              <h4 className="font-medium">{item.title}</h4>
              <p className="text-gray-400">{item.period}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-3 flex items-center">
          <Code className="mr-2" size={20} />
          {t('info.skills.title')}
        </h3>
        <ul className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <li key={skill} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
              {skill}
            </li>
          ))}
        </ul>
      </section>
    </motion.div>
  )
}
