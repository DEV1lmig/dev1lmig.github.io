import { ArrowUpRight } from 'lucide-react'
import { ICON } from '@/components/icon'
import { Ext, Facts, Reveal } from '@/components/ui'

export type ProjectData = {
  id: string
  name: string
  summary: string
  facts: { k: string; v: string }[]
  links: { label: string; url: string }[]
  highlightsLabel?: string
  highlights?: { title: string; body: string }[]
  images: string[]
}

export type Media = { src: string; w: number; h: number; span: 'full' | 'half' }

/** Sticky info panel on the left, scrolling media column on the right. */
export function Project({ project, media }: { project: ProjectData; media: Media[] }) {
  const titleId = `${project.id}-title`
  return (
    <article aria-labelledby={titleId} className="border-t border-fg/15 pt-4">
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-12">
        <div className="min-w-0 [container-type:inline-size] lg:sticky lg:top-6 lg:col-span-5 lg:self-start">
          <h3 id={titleId} className="wordmark m-0 [font-size:min(14cqw,5rem)]">
            {project.name}
          </h3>
          <p className="mb-7 mt-6 max-w-[44ch]">{project.summary}</p>
          <Facts items={project.facts} />
          <ul className="label m-0 mt-5 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
            {project.links.map((l) => (
              <li key={l.url}>
                <Ext href={l.url} className="link inline-flex items-center gap-1.5 py-1">
                  {l.label} <ArrowUpRight {...ICON} />
                </Ext>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid min-w-0 grid-cols-2 gap-2 md:gap-3 lg:col-span-7">
          {media.map((m, i) => (
            <Reveal key={m.src} className={m.span === 'full' ? 'col-span-2' : 'col-span-1'}>
              <img
                src={m.src}
                alt={project.images[i] ?? ''}
                width={m.w}
                height={m.h}
                loading="lazy"
                className="block h-auto w-full"
              />
            </Reveal>
          ))}
        </div>
      </div>

      {project.highlights && (
        <HighlightsRow label={project.highlightsLabel ?? ''} items={project.highlights} />
      )}
    </article>
  )
}

function HighlightsRow({ label, items }: { label: string; items: { title: string; body: string }[] }) {
  return (
    <div className="row mt-16">
      <p className="label m-0">{label}</p>
      <dl className="m-0 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
        {items.map((h) => (
          <div key={h.title}>
            <dt className="font-semibold">{h.title}</dt>
            <dd className="m-0 mt-1 max-w-[40ch] text-[0.8125rem] text-fg/70">{h.body}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
