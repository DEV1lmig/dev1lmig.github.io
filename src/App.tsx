import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { Data2Bids } from '@/components/Data2Bids'
import { Earlier } from '@/components/Earlier'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Playchive } from '@/components/Playchive'
import { ArrowUp } from 'lucide-react'
import { ICON } from '@/components/icon'
import { SectionTitle } from '@/components/ui'

export default function App() {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage ?? 'en'
    document.title = t('meta.title')
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.description'))
  }, [i18n.resolvedLanguage, t])

  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-hazard focus:px-4 focus:py-2 focus:text-ink"
      >
        {t('skip')}
      </a>
      <Header />
      <main>
        <Hero />
        <section id="work" aria-labelledby="work-title" className="border-t border-line">
          <div className="mx-auto flex max-w-[1400px] flex-col gap-20 px-4 py-20 md:gap-28 md:px-8 md:py-28">
            <SectionTitle id="work-title">{t('work.title')}</SectionTitle>
            <Data2Bids />
            <Playchive />
            <Earlier />
          </div>
        </section>
        <About />
        <Contact />
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-6 md:px-8">
          <p className="micro m-0 text-mute">&copy; {t('footer.rights')}</p>
          <a href="#top" className="micro inline-flex items-center gap-1.5 hover:text-hazard">
            <ArrowUp {...ICON} /> Top
          </a>
        </div>
      </footer>
      <div className="overlay" aria-hidden="true" />
    </>
  )
}
