import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type RevealProps = { children: ReactNode; delay?: number; className?: string }

/** Fades content in once as it enters the viewport. Static under reduced motion. */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
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

/** Key/value spec list rendered as a semantic description list with hairline rows. */
export function Facts({ items }: { items: Fact[] }) {
  return (
    <dl className="border-t border-line">
      {items.map((f) => (
        <div key={f.k} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-line py-3">
          <dt className="micro text-mute">{f.k}</dt>
          <dd className="m-0">{f.v}</dd>
        </div>
      ))}
    </dl>
  )
}

export function SectionTitle({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2 id={id} className="macro text-[clamp(3rem,9vw,8rem)]">
      {children}
    </h2>
  )
}
