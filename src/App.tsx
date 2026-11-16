import { useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { Earlier } from '@/components/Earlier'
import { Hero } from '@/components/Hero'
import { ICON } from '@/components/icon'
import { Nav } from '@/components/Nav'
import { Logo } from '@/components/ui'
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
      {/* First screen: nav + hero fill the small viewport (toolbar shown), never more. */}
      <div className="flex min-h-svh flex-col">
        <Nav />
        <Hero />
      </div>
      <main>
        <Work />
        <Earlier />
        <About />
        <Contact />
      </main>
      <footer className="px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:px-6">
        <div className="flex items-center justify-between gap-4 pt-6">
          <p className="label m-0 flex items-center gap-3 text-fg/60">
            <Logo className="text-base normal-case tracking-[-0.05em] text-fg" />
            &copy; {t('footer.rights')}
          </p>
          <a href="#top" className="mono link inline-flex items-center gap-1.5 py-2 text-xs">
            <ArrowUp {...ICON} /> {t('footer.top')}
          </a>
        </div>
      </footer>
    </>
  )
}
