import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Logo } from '@/components/ui'

type Theme = 'light' | 'dark'
const LANGS = ['en', 'es'] as const
const SECTIONS = ['work', 'about', 'contact'] as const

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  )
  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* storage can be unavailable; the theme still applies for this visit */
    }
    setTheme(next)
  }
  return [theme, toggle] as const
}

function Settings({ theme, onTheme }: { theme: Theme; onTheme: () => void }) {
  const { t, i18n } = useTranslation()
  const current = i18n.resolvedLanguage ?? 'en'
  return (
    <>
      <button type="button" onClick={onTheme} aria-pressed={theme === 'dark'} className="py-2 opacity-60 hover:opacity-100">
        {t('nav.theme')}
      </button>
      <div role="group" aria-label={t('nav.lang')} className="flex">
        {LANGS.map((lng) => (
          <button
            key={lng}
            type="button"
            aria-pressed={current.startsWith(lng)}
            onClick={() => void i18n.changeLanguage(lng)}
            className={`px-1.5 py-2 ${current.startsWith(lng) ? 'link' : 'opacity-60 hover:opacity-100'}`}
          >
            {lng}
          </button>
        ))}
      </div>
    </>
  )
}

/** Top bar: mq_ on the left; links on desktop, a Menu button and a full-height sheet on phones. */
export function Nav() {
  const { t } = useTranslation()
  const [theme, toggleTheme] = useTheme()
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const opener = menuButton.current
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    closeButton.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKey)
      // preventScroll: closing from a section link must not undo its jump.
      opener?.focus({ preventScroll: true })
    }
  }, [open])

  // A desktop-sized window never needs the sheet.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <header className="px-5 pb-6 pt-[max(1.5rem,env(safe-area-inset-top))] md:px-6">
      <nav aria-label="Primary" className="mono flex items-center justify-between">
        <a href="#top" aria-label="Miguel Quiroz" className="py-1">
          <Logo className="text-[1.625rem]" />
        </a>

        <ul className="m-0 hidden list-none items-center gap-7 p-0 md:flex">
          {SECTIONS.map((s) => (
            <li key={s}>
              <a href={`#${s}`} className="py-2 underline-offset-4 hover:underline hover:decoration-signal">
                {t(`nav.${s}`)}
              </a>
            </li>
          ))}
          <li className="flex items-center gap-5">
            <Settings theme={theme} onTheme={toggleTheme} />
          </li>
        </ul>

        <button
          ref={menuButton}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
          className="link -my-2 py-3 md:hidden"
        >
          {t('nav.menu')}
        </button>
      </nav>

      {open && (
        // dvh tracks the browser's collapsing toolbar, so the sheet always covers the visible screen.
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label={t('nav.menu')} className="fixed inset-x-0 top-0 z-50 h-dvh md:hidden">
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => setOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-ink/40"
          />
          <div className="relative flex flex-col gap-8 rounded-b-card bg-ink px-5 pb-8 pt-[max(1.5rem,env(safe-area-inset-top))] text-paper">
            <div className="mono flex items-center justify-between">
              <Logo className="text-[1.625rem]" />
              <button ref={closeButton} type="button" onClick={() => setOpen(false)} className="-my-2 py-3">
                {t('nav.close')} <span aria-hidden="true">✕</span>
              </button>
            </div>
            <ul className="m-0 flex list-none flex-col gap-1 p-0">
              {SECTIONS.map((s) => (
                <li key={s}>
                  <a
                    href={`#${s}`}
                    onClick={() => setOpen(false)}
                    className="wordmark block py-1 text-[3rem] leading-[1.15] hover:text-signal"
                  >
                    {t(`nav.${s}`)}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mono flex items-center justify-between border-t border-paper/20 pt-4 text-paper">
              <Settings theme={theme} onTheme={toggleTheme} />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
