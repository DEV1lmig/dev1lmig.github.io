import { useState } from 'react'
import { useTranslation } from 'react-i18next'

type Theme = 'light' | 'dark'
const LANGS = ['en', 'es'] as const

/** Fixed stacked nav. mix-blend-difference keeps it readable over any background or image. */
export function Nav() {
  const { t, i18n } = useTranslation()
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  )
  const current = i18n.resolvedLanguage ?? 'en'

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* storage can be unavailable; the theme still applies for this visit */
    }
    setTheme(next)
  }

  const item = 'inline-block py-1.5 hover:underline underline-offset-4'

  return (
    <header className="pointer-events-none fixed left-4 right-4 top-4 z-40 text-white mix-blend-difference md:left-auto md:right-6">
      <nav aria-label="Primary" className="pointer-events-auto">
        <ul className="label m-0 flex list-none flex-row flex-wrap justify-end gap-x-4 gap-y-0 p-0 md:flex-col md:items-end md:gap-x-0">
          <li>
            <a href="#top" className={item}>
              {t('nav.home')}
            </a>
          </li>
          <li>
            <a href="#work" className={item}>
              {t('nav.work')}
            </a>
          </li>
          <li>
            <a href="#about" className={item}>
              {t('nav.about')}
            </a>
          </li>
          <li>
            <a href="#contact" className={item}>
              {t('nav.contact')}
            </a>
          </li>
          <li>
            <button type="button" onClick={toggleTheme} aria-pressed={theme === 'dark'} className={item}>
              {t('nav.theme')}
            </button>
          </li>
          <li>
            <div role="group" aria-label={t('nav.lang')} className="flex gap-1">
              {LANGS.map((lng) => (
                <button
                  key={lng}
                  type="button"
                  aria-pressed={current.startsWith(lng)}
                  onClick={() => void i18n.changeLanguage(lng)}
                  className={`px-1 py-1.5 ${current.startsWith(lng) ? 'underline underline-offset-4' : 'opacity-60 hover:opacity-100'}`}
                >
                  {lng}
                </button>
              ))}
            </div>
          </li>
        </ul>
      </nav>
    </header>
  )
}
