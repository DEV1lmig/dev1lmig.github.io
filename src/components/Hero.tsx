import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { ICON } from '@/components/icon'
import { Ext } from '@/components/ui'

type NowItem = { name: string; meta: string; url: string }

const EASE = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  const now = t('hero.now.items', { returnObjects: true }) as NowItem[]

  const line = (i: number) => ({
    initial: reduce ? false : { y: '105%' },
    animate: { y: 0 },
    transition: { duration: 0.8, delay: 0.08 * i, ease: EASE },
  })

  return (
    <section
      id="top"
      className="mx-auto grid min-h-[calc(100dvh-3.5rem)] max-w-[1400px] grid-cols-1 content-center gap-12 px-4 py-14 md:px-8 lg:grid-cols-12 lg:gap-8"
    >
      <div className="lg:col-span-8">
        <p className="micro mb-6 text-hazard">[ {t('hero.role')} ]</p>
        <h1 className="macro text-[clamp(3.5rem,11.5vw,10rem)]">
          <span className="block overflow-hidden pb-[0.04em]">
            <motion.span className="block" {...line(0)}>
              Miguel
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.04em]">
            <motion.span className="block" {...line(1)}>
              Quiroz
            </motion.span>
          </span>
        </h1>
        <p className="mt-8 max-w-[52ch] text-base text-phosphor/80 md:text-lg">{t('hero.sub')}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#work" className="btn btn-primary">
            {t('hero.cta')} <ArrowDown {...ICON} />
          </a>
          <Ext href="https://github.com/DEV1lmig" className="btn btn-ghost">
            {t('hero.github')} <ArrowUpRight {...ICON} />
          </Ext>
        </div>
      </div>

      <aside className="self-end lg:col-span-4" aria-labelledby="now-title">
        <h2 id="now-title" className="micro border-b border-hazard pb-2 text-hazard">
          {t('hero.now.title')}
        </h2>
        <ul className="m-0 list-none p-0">
          {now.map((item) => (
            <li key={item.name} className="border-b border-line">
              <Ext href={item.url} className="group flex items-baseline justify-between gap-4 py-4 hover:text-hazard">
                <span>
                  <span className="block font-display text-2xl uppercase tracking-tight">{item.name}</span>
                  <span className="micro text-mute group-hover:text-phosphor">{item.meta}</span>
                </span>
                <ArrowUpRight {...ICON} className="shrink-0" />
              </Ext>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  )
}
