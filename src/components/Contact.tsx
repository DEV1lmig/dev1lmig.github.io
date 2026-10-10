import { useTranslation } from 'react-i18next'
import { ArrowUpRight } from 'lucide-react'
import { ICON } from '@/components/icon'
import { Ext, Reveal, SectionTitle } from '@/components/ui'

type Link = { name: string; url: string }

export function Contact() {
  const { t } = useTranslation()
  const links = t('contact.links', { returnObjects: true }) as Link[]
  const email = t('contact.email')

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-hazard bg-hazard text-ink">
      <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
        <SectionTitle id="contact-title">{t('contact.title')}</SectionTitle>
        <Reveal>
          <a
            href={`mailto:${email}`}
            className="mt-10 block break-all font-display text-[clamp(1.5rem,4.2vw,3.75rem)] uppercase leading-none tracking-tight underline decoration-2 underline-offset-8 hover:bg-ink hover:text-phosphor"
            aria-label={`${t('contact.cta')}: ${email}`}
          >
            {email}
          </a>
          <ul className="m-0 mt-10 flex list-none flex-wrap gap-x-8 gap-y-3 p-0">
            {links.map((l) => (
              <li key={l.name}>
                <Ext href={l.url} className="micro inline-flex items-center gap-1.5 border-b border-ink font-medium hover:bg-ink hover:text-phosphor">
                  {l.name} <ArrowUpRight {...ICON} />
                </Ext>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
