import { useTranslation } from 'react-i18next'
import { ArrowUpRight } from 'lucide-react'
import { ICON } from '@/components/icon'
import { Ext, Reveal } from '@/components/ui'

type Item = { title: string; kind: string; url: string; link: string }

export function Earlier() {
  const { t } = useTranslation()
  const items = t('earlier.items', { returnObjects: true }) as Item[]

  return (
    <section aria-labelledby="earlier-title" className="border-t border-line pt-8">
      <h3 id="earlier-title" className="macro text-[clamp(1.75rem,4vw,3rem)] text-mute">
        {t('earlier.title')}
      </h3>
      <Reveal>
        <ul className="m-0 mt-6 list-none p-0">
          {items.map((item) => (
            <li key={item.title} className="border-t border-line last:border-b">
              <Ext
                href={item.url}
                className="group grid grid-cols-1 items-baseline gap-1 py-5 transition-colors hover:bg-phosphor hover:text-ink md:grid-cols-[1.2fr_1.6fr_auto] md:gap-8 md:px-4"
              >
                <span className="font-display text-xl uppercase tracking-tight md:text-2xl">{item.title}</span>
                <span className="text-sm text-phosphor/70 group-hover:text-ink/80">{item.kind}</span>
                <span className="micro inline-flex items-center gap-2">
                  {item.link} <ArrowUpRight {...ICON} />
                </span>
              </Ext>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
