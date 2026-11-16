import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ICON } from '@/components/icon'
import { Dot, Ext, Reveal } from '@/components/ui'

type Link = { name: string; url: string }

/** Ink card in both themes (in dark mode a hairline keeps its edge visible). */
export function Contact() {
  const { t } = useTranslation()
  const links = t('contact.links', { returnObjects: true }) as Link[]
  const email = t('contact.email')
  const [user, domain] = email.split('@')

  return (
    <section id="contact" aria-label={t('contact.label')} className="px-5 pb-2 md:px-6">
      <Reveal>
        <div className="flex flex-col gap-8 rounded-card border border-transparent bg-ink p-6 text-paper [[data-theme=dark]_&]:border-paper/15 md:gap-12 md:p-14">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="label m-0 text-paper/60">{t('contact.label')}</h2>
            <p className="mono m-0 inline-flex items-center gap-2.5 rounded-full border border-paper/80 px-4 py-2 text-[0.8125rem]">
              <Dot /> {t('contact.status')}
            </p>
          </div>

          <div>
            <p className="m-0 mb-3 text-[1.0625rem] text-paper/75 md:text-[1.375rem]">{t('contact.lead')}</p>
            <a
              href={`mailto:${email}`}
              aria-label={`${t('contact.cta')}: ${email}`}
              className="wordmark block text-[clamp(1.75rem,5vw,4.5rem)] leading-[1.05] decoration-signal decoration-2 underline-offset-8 hover:underline"
            >
              {/* Breaks before the @ on narrow screens instead of mid-word. */}
              {user}
              <wbr />@{domain}
              <span className="cursor">_</span>
            </a>
          </div>

          <ul className="mono m-0 flex list-none flex-wrap gap-x-6 gap-y-1 p-0 md:gap-x-8">
            {links.map((l) => (
              <li key={l.name}>
                <Ext href={l.url} className="link inline-flex items-center gap-1.5 py-2">
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
