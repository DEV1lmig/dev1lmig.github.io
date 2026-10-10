import { useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { Earlier } from '@/components/Earlier'
import { Hero } from '@/components/Hero'
import { ICON } from '@/components/icon'
import { Nav } from '@/components/Nav'
import { Work } from '@/components/Work'

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
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-fg focus:px-3 focus:py-2 focus:text-bg"
      >
        {t('skip')}
      </a>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Earlier />
        <About />
        <Contact />
      </main>
      <footer className="px-4 pb-6 md:px-6">
        <div className="flex items-center justify-between border-t border-fg/15 pt-4">
          <p className="label m-0 text-fg/60">&copy; {t('footer.rights')}</p>
          <a href="#top" className="label link inline-flex items-center gap-1.5 py-1">
            <ArrowUp {...ICON} /> {t('footer.top')}
          </a>
        </div>
      </footer>
    </>
  )
}
