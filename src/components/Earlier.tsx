import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ICON } from '@/components/icon'
import { Ext } from '@/components/ui'

type Item = { title: string; kind: string; url: string; link: string }

export function Earlier() {
  const { t } = useTranslation()
  const items = t('earlier.items', { returnObjects: true }) as Item[]

  return (
    <section aria-label={t('earlier.label')} className="px-4 md:px-6">
      <div className="row">
        <h2 className="label m-0">{t('earlier.label')}</h2>
        <ul className="m-0 list-none p-0">
          {items.map((item) => (
            <li key={item.title} className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-2">
              <span className="font-semibold">{item.title}</span>
              <span className="flex flex-wrap items-center gap-x-4">
                <span className="text-fg/70">{item.kind}</span>
                <Ext href={item.url} className="link label inline-flex items-center gap-1.5 py-1">
                  {item.link} <ArrowUpRight {...ICON} />
                </Ext>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
