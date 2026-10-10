import { useTranslation } from 'react-i18next'
import { Project, type Media, type ProjectData } from '@/components/Project'
import d2b1 from '@/assets/work/d2b-1.webp'
import d2b2 from '@/assets/work/d2b-2.webp'
import d2b3 from '@/assets/work/d2b-3.webp'
import d2b4 from '@/assets/work/d2b-4.webp'
import pcBoard from '@/assets/work/pc-board.webp'
import pcSite from '@/assets/work/pc-site.webp'

const MEDIA: Record<string, Media[]> = {
  data2bids: [
    { src: d2b1, w: 1600, h: 900, span: 'full' },
    { src: d2b2, w: 1600, h: 900, span: 'full' },
    { src: d2b3, w: 1600, h: 900, span: 'full' },
    { src: d2b4, w: 1600, h: 900, span: 'full' },
  ],
  playchive: [
    { src: pcBoard, w: 1600, h: 1200, span: 'full' },
    { src: pcSite, w: 1264, h: 790, span: 'full' },
  ],
}

export function Work() {
  const { t } = useTranslation()
  const projects = t('projects.items', { returnObjects: true }) as ProjectData[]

  return (
    <section id="work" aria-label={t('work.label')} className="flex flex-col gap-24 px-4 py-24 md:gap-32 md:px-6 md:py-32">
      {projects.map((p) => (
        <Project key={p.id} project={p} media={MEDIA[p.id] ?? []} />
      ))}
    </section>
  )
}
