import { Minus, Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ICON } from '@/components/icon'
import { Reveal } from '@/components/ui'

type Group = { name: string; items: string[] }
type Job = { role: string; period: string; desc: string }
type Study = { title: string; place: string }
type Qa = { q: string; a: string }

export function About() {
  const { t } = useTranslation()
  const groups = t('about.stack.groups', { returnObjects: true }) as Group[]
  const jobs = t('about.experience.items', { returnObjects: true }) as Job[]
  const studies = t('about.education.items', { returnObjects: true }) as Study[]
  const faq = t('faq.items', { returnObjects: true }) as Qa[]

  return (
    <section id="about" aria-label={t('about.label')} className="px-4 pb-16 md:px-6">
      <Reveal>
        <div className="row">
          <h2 className="label m-0">{t('about.label')}</h2>
          <p className="m-0 max-w-[40ch] text-[1.25rem] leading-snug md:text-[1.5rem]">{t('about.bio')}</p>
        </div>
      </Reveal>

      <Reveal>
        <div className="row">
          <h2 className="label m-0">{t('about.stack.label')}</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-3">
            {groups.map((g) => (
              <div key={g.name}>
                <h3 className="label m-0 mb-2 text-fg/60">{g.name}</h3>
                <ul className="m-0 list-none p-0">
                  {g.items.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="row">
          <h2 className="label m-0">{t('about.experience.label')}</h2>
          <ul className="m-0 list-none p-0">
            {jobs.map((j) => (
              <li key={j.role} className="mb-4 grid grid-cols-1 gap-x-6 sm:grid-cols-[8rem_1fr]">
                <span className="label text-fg/60">{j.period}</span>
                <span>
                  <span className="block font-semibold">{j.role}</span>
                  <span className="text-fg/70">{j.desc}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal>
        <div className="row">
          <h2 className="label m-0">{t('about.education.label')}</h2>
          <ul className="m-0 list-none p-0">
            {studies.map((s) => (
              <li key={s.title}>
                <span className="block font-semibold">{s.title}</span>
                <span className="text-fg/70">{s.place}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal>
        <div className="row">
          <h2 className="label m-0">{t('faq.label')}</h2>
          <div>
            {faq.map((item, i) => (
              <details key={item.q} className={`group ${i > 0 ? 'border-t border-fg/15' : ''}`}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 marker:hidden [&::-webkit-details-marker]:hidden">
                  <span className="font-semibold">{item.q}</span>
                  <Plus {...ICON} className="shrink-0 group-open:hidden" />
                  <Minus {...ICON} className="hidden shrink-0 group-open:block" />
                </summary>
                <p className="m-0 max-w-[52ch] pb-4 text-fg/70">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
