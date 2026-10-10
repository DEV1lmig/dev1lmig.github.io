import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ICON } from '@/components/icon'
import { Ext, Reveal } from '@/components/ui'

type Link = { name: string; url: string }

export function Contact() {
  const { t } = useTranslation()
  const links = t('contact.links', { returnObjects: true }) as Link[]
  const email = t('contact.email')

  return (
    <section id="contact" aria-label={t('contact.label')} className="px-4 pb-6 md:px-6">
      <Reveal>
        <div className="row">
          <h2 className="label m-0">{t('contact.label')}</h2>
          <a
            href={`mailto:${email}`}
            aria-label={`${t('contact.cta')}: ${email}`}
            className="wordmark block break-all text-[clamp(1.5rem,4.1vw,4.5rem)] leading-[0.95] hover:underline hover:decoration-2 hover:underline-offset-8"
          >
            {email}
          </a>
        </div>
        <div className="row">
          <h2 className="label m-0">{t('contact.links.label')}</h2>
          <ul className="m-0 list-none p-0">
            {links.map((l) => (
              <li key={l.name}>
                <Ext href={l.url} className="link inline-flex items-center gap-1.5 py-1">
                  {l.name} <ArrowUpRight {...ICON} />
                </Ext>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  )
}
