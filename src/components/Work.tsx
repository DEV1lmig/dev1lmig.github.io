import { useTranslation } from 'react-i18next'
import { Project, type Media, type ProjectData } from '@/components/Project'
import d2bPoster from '@/assets/work/d2b-poster.webp'
import d2bHero from '@/assets/work/d2b-hero.webp'
import pcPoster from '@/assets/work/pc-poster.webp'
import pcBoard from '@/assets/work/pc-board.webp'

/** Base path without extension: the player offers .mp4 and .webm. */
const video = (name: string) => `${import.meta.env.BASE_URL}media/${name}`

const MEDIA: Record<string, Media[]> = {
  data2bids: [
    { kind: 'video', src: video('data2bids'), poster: d2bPoster, w: 1280, h: 720 },
    { kind: 'image', src: d2bHero, w: 1600, h: 920 },
  ],
  playchive: [
    { kind: 'video', src: video('playchive'), poster: pcPoster, w: 1600, h: 974 },
    { kind: 'image', src: pcBoard, w: 1600, h: 1200 },
  ],
}

export function Work() {
  const { t } = useTranslation()
  const projects = t('projects.items', { returnObjects: true }) as ProjectData[]

  return (
    <section id="work" aria-label={t('work.label')} className="flex flex-col gap-16 px-4 pb-16 md:gap-24 md:px-6 md:pb-24">
      {projects.map((p) => (
        <Project key={p.id} project={p} media={MEDIA[p.id] ?? []} />
      ))}
    </section>
  )
}
