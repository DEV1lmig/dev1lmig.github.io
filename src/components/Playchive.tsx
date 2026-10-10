import { useTranslation } from 'react-i18next'
import board from '@/assets/work/playchive-brand.webp'
import { ArrowUpRight } from 'lucide-react'
import { ICON } from '@/components/icon'
import { Ext, Facts, Reveal } from '@/components/ui'

type Fact = { k: string; v: string }

export function Playchive() {
  const { t } = useTranslation()
  const facts = t('pc.facts', { returnObjects: true }) as Fact[]

  return (
    <article aria-labelledby="pc-title" className="border-t border-hazard pt-8">
      <Reveal>
        <h3 id="pc-title" className="macro text-[clamp(2.75rem,10vw,9rem)]">
          {t('pc.name')}
        </h3>
      </Reveal>

      <Reveal delay={0.05} className="mt-8">
        <Ext href="https://playchive.vercel.app" className="halftone block aspect-[4/3] border border-line md:aspect-[16/9]">
          <img src={board} alt={t('pc.imageAlt')} width={1448} height={1086} loading="lazy" className="object-top" />
        </Ext>
      </Reveal>

      <Reveal className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <p className="m-0 max-w-[60ch] text-phosphor/85">{t('pc.summary')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Ext href="https://playchive.vercel.app" className="btn btn-primary">
              {t('pc.live')} <ArrowUpRight {...ICON} />
            </Ext>
            <Ext href="https://github.com/DEV1lmig/Binnacle" className="btn btn-ghost">
              {t('pc.repo')} <ArrowUpRight {...ICON} />
            </Ext>
          </div>
        </div>
        <div className="md:col-span-7">
          <Facts items={facts} />
        </div>
      </Reveal>
    </article>
  )
}
