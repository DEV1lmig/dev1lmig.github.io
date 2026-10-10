import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Ext } from '@/components/ui'

type NamedLink = { name: string; url: string }

const EASE = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  const now = t('hero.now.items', { returnObjects: true }) as NamedLink[]
  const elsewhere = t('hero.elsewhere.items', { returnObjects: true }) as NamedLink[]

  const rise = (i: number) => ({
    initial: reduce ? false : { y: '110%' },
    animate: { y: 0 },
    transition: { duration: 0.9, delay: 0.08 * i, ease: EASE },
  })

  return (
    <section id="top" className="px-4 pb-16 pt-24 md:px-6 md:pb-20 md:pt-4">
      <div>
        {/* Sized against this container (cqw), not the window: 100vw includes the scrollbar. */}
        <div className="[container-type:inline-size] md:mr-[6.5rem]">
          <h1 className="wordmark m-0 text-[20cqw] md:text-[9.9cqw]" aria-label="Miguel Quiroz">
            <span className="block overflow-hidden pb-[0.06em] md:mr-[0.22em] md:inline-block" aria-hidden="true">
              <motion.span className="block" {...rise(0)}>
                Miguel
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.06em] md:inline-block" aria-hidden="true">
              <motion.span className="block" {...rise(1)}>
                Quiroz
              </motion.span>
            </span>
          </h1>
        </div>
        <p className="statement mb-0 mt-6 max-w-[32ch] text-[1.125rem] md:ml-[22%] md:max-w-[48ch] md:text-[1.5rem]">
          {t('hero.statement')}
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 md:mt-20 gap-x-6 gap-y-6 border-t border-fg/15 pt-4 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="label m-0 mb-1 text-fg/60">{t('hero.role.label')}</p>
          <p className="m-0">{t('hero.role.value')}</p>
        </div>
        <div className="md:col-span-4">
          <p className="label m-0 mb-1 text-fg/60">{t('hero.now.label')}</p>
          <ul className="m-0 list-none p-0">
            {now.map((i) => (
              <li key={i.name}>
                <Ext href={i.url} className="link inline-block py-1">
                  {i.name}
                </Ext>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="label m-0 mb-1 text-fg/60">{t('hero.elsewhere.label')}</p>
          <ul className="m-0 list-none p-0">
            {elsewhere.map((i) => (
              <li key={i.name}>
                <Ext href={i.url} className="link inline-block py-1">
                  {i.name}
                </Ext>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
