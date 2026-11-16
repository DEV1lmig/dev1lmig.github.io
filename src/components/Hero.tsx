import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Ext } from '@/components/ui'

type NamedLink = { name: string; url: string }

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Fills what's left of the first screen under the nav (the parent is min-h-svh): the name and
 * statement sit on top and the info row on the bottom edge, so a phone shows all of it even with
 * the browser toolbar expanded (svh = the smallest viewport, toolbar visible).
 */
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
    <section id="top" aria-label="Miguel Quiroz" className="flex flex-1 flex-col justify-between gap-12 px-5 pb-12 pt-6 md:px-6 md:pb-20 md:pt-16">
      <div>
        {/* Sized against this container (cqw), not the window: 100vw includes the scrollbar. */}
        <div className="[container-type:inline-size]">
          <h1 className="wordmark m-0 text-[25cqw] md:whitespace-nowrap md:text-[14cqw]" aria-label="Miguel Quiroz">
            {/* The mask clips the rise animation; padding keeps the g's descender inside it. */}
            <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em] md:mr-[0.25em] md:inline-block" aria-hidden="true">
              <motion.span className="block" {...rise(0)}>
                Miguel
              </motion.span>
            </span>
            <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em] md:inline-block" aria-hidden="true">
              <motion.span className="block" {...rise(1)}>
                Quiroz<span className="cursor">_</span>
              </motion.span>
            </span>
          </h1>
        </div>
        <p className="statement mb-0 mt-6 max-w-[34ch] text-[1.375rem] md:ml-[42%] md:mt-8 md:max-w-[30ch] md:text-[2rem]">
          {t('hero.statement')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-5 border-t border-fg/15 pt-4 md:grid-cols-12">
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
