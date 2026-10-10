import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type RevealProps = { children: ReactNode; delay?: number; className?: string }

/** Fades content in once as it enters the viewport. Static under reduced motion. */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

type ExtProps = { href: string; children: ReactNode; className?: string }

export function Ext({ href, children, className }: ExtProps) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

type Fact = { k: string; v: string }

/** Key/value list with hairline rows. */
export function Facts({ items }: { items: Fact[] }) {
  return (
    <dl className="m-0 border-t border-fg/15 text-[0.8125rem]">
      {items.map((f) => (
        <div key={f.k} className="grid grid-cols-[5rem_1fr] gap-4 border-b border-fg/15 py-2.5">
          <dt className="label text-fg/60">{f.k}</dt>
          <dd className="m-0">{f.v}</dd>
        </div>
      ))}
    </dl>
  )
}
