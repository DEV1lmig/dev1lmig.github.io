import { ArrowUpRight } from 'lucide-react'
import { ICON } from '@/components/icon'
import { AutoVideo, Ext, Facts, Reveal } from '@/components/ui'

export type ProjectData = {
  id: string
  name: string
  summary: string
  facts: { k: string; v: string }[]
  links: { label: string; url: string }[]
  highlightsLabel?: string
  highlights?: { title: string; body: string }[]
  /** Accessible description for each media item, in order. */
  images: string[]
}

export type Media =
  | { kind: 'image'; src: string; w: number; h: number }
  | { kind: 'video'; src: string; poster: string; w: number; h: number }

/** Sticky info panel on the left, scrolling media column on the right. */
export function Project({ project, media }: { project: ProjectData; media: Media[] }) {
  const titleId = `${project.id}-title`
  return (
    <article aria-labelledby={titleId} className="border-t border-fg/15 pt-4">
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-12">
        <div className="stick min-w-0 [container-type:inline-size] lg:col-span-5">
          <h3 id={titleId} className="wordmark m-0 [font-size:min(14cqw,5rem)]">
            {project.name}
          </h3>
          <p className="mb-6 mt-5 max-w-[44ch]">{project.summary}</p>
          <Facts items={project.facts} />
          <ul className="label m-0 mt-4 flex list-none flex-wrap gap-x-6 p-0">
            {project.links.map((l) => (
              <li key={l.url}>
                <Ext href={l.url} className="link inline-flex items-center gap-1.5 py-1">
                  {l.label} <ArrowUpRight {...ICON} />
                </Ext>
              </li>
            ))}
          </ul>
          {project.highlights && (
            <div className="mt-7">
              <h4 className="label m-0 mb-3 text-fg/60">{project.highlightsLabel}</h4>
              <dl className="m-0 grid gap-3.5 border-t border-fg/15 pt-4">
                {project.highlights.map((h) => (
                  <div key={h.title}>
                    <dt className="text-[0.8125rem] font-semibold">{h.title}</dt>
                    <dd className="m-0 max-w-[46ch] text-[0.8125rem] leading-snug text-fg/70">{h.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-2 md:gap-3 lg:col-span-7">
          {media.map((m, i) => (
            <Reveal key={m.src}>
              {m.kind === 'video' ? (
                <AutoVideo src={m.src} poster={m.poster} label={project.images[i] ?? ''} width={m.w} height={m.h} />
              ) : (
                <img
                  src={m.src}
                  alt={project.images[i] ?? ''}
                  width={m.w}
                  height={m.h}
                  loading="lazy"
                  className="block h-auto w-full"
                />
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </article>
  )
}
