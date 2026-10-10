import { useTranslation } from 'react-i18next'
import shot from '@/assets/work/data2bids-home.webp'
import { ArrowUpRight } from 'lucide-react'
import { ICON } from '@/components/icon'
import { Ext, Facts, Reveal } from '@/components/ui'

type Part = { title: string; body: string }
type Fact = { k: string; v: string }

export function Data2Bids() {
  const { t } = useTranslation()
  const facts = t('d2b.facts', { returnObjects: true }) as Fact[]
  const parts = t('d2b.parts', { returnObjects: true }) as Part[]

  return (
    <article aria-labelledby="d2b-title" className="border-t border-hazard pt-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <h3 id="d2b-title" className="macro text-[clamp(2.75rem,6.5vw,5.5rem)]">
            {t('d2b.name')}
          </h3>
          <p className="mt-6 max-w-[60ch] text-phosphor/85">{t('d2b.summary')}</p>
          <div className="mt-8">
            <Facts items={facts} />
          </div>
          <Ext href="https://www.data2bids.com" className="btn btn-primary mt-8">
            {t('d2b.cta')} <ArrowUpRight {...ICON} />
          </Ext>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <Ext href="https://www.data2bids.com" className="halftone block aspect-[16/10] border border-line">
            <img src={shot} alt={t('d2b.imageAlt')} width={1264} height={790} loading="lazy" />
          </Ext>
        </Reveal>
      </div>

      <Reveal className="mt-10">
        <ul className="cells m-0 list-none grid-cols-1 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {parts.map((p) => (
            <li key={p.title} className="p-5 md:p-6">
              <h4 className="micro mb-3 text-hazard">{p.title}</h4>
              <p className="m-0 text-sm text-phosphor/80">{p.body}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </article>
  )
}
