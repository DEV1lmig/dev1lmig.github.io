import { motion } from 'framer-motion'
import Cover from '@/assets/Cover.png'
import Thumbnail from '@/assets/Thumbnail.jpg'
import SpellyCover from '@/assets/spelly-cover.png'
import { useTranslation } from 'react-i18next'

const imageMap: Record<string, string> = {
  'Belkys Manga TC LP': Thumbnail,
  'Mundo Peludo': Cover,
  'Spelly': SpellyCover,
}

export const ProjectCards = () => {
  const { t } = useTranslation()
  const projects = t('projects.items', { returnObjects: true }) as Array<{ id: number; title: string; url: string }>

  return (
    <div className="grid grid-cols-2 gap-4">
      {projects.map((project) => (
        <motion.a
          key={project.id}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[var(--nes-black)] pixel-border rounded-lg overflow-hidden"
          whileHover={{ scale: 1.03 }}
        >
          <img src={imageMap[project.title] || Thumbnail} alt={project.title} className="w-full h-40 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-vt">{project.title}</h3>
          </div>
        </motion.a>
      ))}
    </div>
  )
}
