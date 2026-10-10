import { useTranslation } from 'react-i18next'

const LANGS = ['en', 'es'] as const

export function Header() {
  const { t, i18n } = useTranslation()
  const current = i18n.resolvedLanguage ?? 'en'

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 md:px-8">
        <a href="#top" className="micro font-medium" aria-label="Miguel Quiroz">
          [ MQ ]
        </a>
        <nav aria-label="Primary" className="flex items-center gap-5 md:gap-8">
          <a href="#work" className="micro hover:text-hazard">
            {t('nav.work')}
          </a>
          <a href="#about" className="micro hover:text-hazard">
            {t('nav.about')}
          </a>
          <a href="#contact" className="micro hover:text-hazard">
            {t('nav.contact')}
          </a>
          <div role="group" aria-label={t('nav.lang')} className="flex border border-line">
            {LANGS.map((lng) => (
              <button
                key={lng}
                type="button"
                aria-pressed={current.startsWith(lng)}
                onClick={() => void i18n.changeLanguage(lng)}
                className={`micro px-2.5 py-1 ${
                  current.startsWith(lng) ? 'bg-phosphor text-ink' : 'text-mute hover:text-phosphor'
                }`}
              >
                {lng}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
