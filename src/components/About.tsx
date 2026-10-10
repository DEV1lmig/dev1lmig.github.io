import { useTranslation } from 'react-i18next'
import { Minus, Plus } from 'lucide-react'
import { ICON } from '@/components/icon'
import { Reveal, SectionTitle } from '@/components/ui'

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
    <section id="about" aria-labelledby="about-title" className="border-t border-line">
      <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
        <SectionTitle id="about-title">{t('about.title')}</SectionTitle>
        <Reveal>
          <p className="mt-8 max-w-[62ch] text-lg text-phosphor/85">{t('about.bio')}</p>
        </Reveal>

        <Reveal className="mt-12">
          <h3 className="micro mb-3 text-hazard">{t('about.stack.title')}</h3>
          <div className="cells grid-cols-1 md:grid-cols-3">
            {groups.map((g) => (
              <div key={g.name} className="p-5 md:p-6">
                <h4 className="micro mb-4 text-mute">{g.name}</h4>
                <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                  {g.items.map((s) => (
                    <li key={s} className="border border-line px-2.5 py-1 text-sm">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h3 className="micro mb-3 text-hazard">{t('about.experience.title')}</h3>
            <ul className="m-0 list-none border-t border-line p-0">
              {jobs.map((j) => (
                <li key={j.role} className="grid grid-cols-1 gap-1 border-b border-line py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <span className="micro text-mute">{j.period}</span>
                  <span>
                    <span className="block font-medium">{j.role}</span>
                    <span className="text-sm text-phosphor/75">{j.desc}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <h3 className="micro mb-3 text-hazard">{t('about.education.title')}</h3>
            <ul className="m-0 list-none border-t border-line p-0">
              {studies.map((s) => (
                <li key={s.title} className="border-b border-line py-4">
                  <span className="block font-medium">{s.title}</span>
                  <span className="text-sm text-phosphor/75">{s.place}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal className="mt-12 max-w-3xl">
          <h3 className="micro mb-3 text-hazard">{t('faq.title')}</h3>
          <div className="border-t border-line">
            {faq.map((item) => (
              <details key={item.q} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 marker:hidden hover:text-hazard [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <Plus {...ICON} className="shrink-0 text-mute group-open:hidden" />
                  <Minus {...ICON} className="hidden shrink-0 text-hazard group-open:block" />
                </summary>
                <p className="m-0 pb-5 pr-10 text-sm text-phosphor/75">{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
