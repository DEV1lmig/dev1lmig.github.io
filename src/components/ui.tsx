import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/** The mq_ mark. Size it with a font-size class; the underscore is the Signal cursor. */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`wordmark font-sans ${className}`}>
      mq<span className="cursor">_</span>
    </span>
  )
}

/** Status dot in Signal, for "live" / "in production" / "open" states. */
export function Dot() {
  return <span aria-hidden="true" className="inline-block size-2 shrink-0 rounded-full bg-signal" />
}

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

/** Key/value list with hairline rows. The last row is the project's status and gets the Signal dot. */
export function Facts({ items }: { items: Fact[] }) {
  return (
    <dl className="m-0 border-t border-fg/15 text-[0.875rem]">
      {items.map((f, i) => (
        <div key={f.k} className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-fg/15 py-2.5">
          <dt className="label pt-0.5 text-fg/60">{f.k}</dt>
          <dd className="m-0 flex items-center gap-2">
            {i === items.length - 1 && <Dot />}
            {f.v}
          </dd>
        </div>
      ))}
    </dl>
  )
}

type AutoVideoProps = { src: string; poster: string; label: string; width: number; height: number }

/** Muted looping clip: plays only while visible; shows native controls under reduced motion or blocked autoplay. */
export function AutoVideo({ src, poster, label, width, height }: AutoVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const reduce = useReducedMotion()
  const [blocked, setBlocked] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v || reduce) return
    v.muted = true
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => setBlocked(true))
        else v.pause()
      },
      { threshold: 0.35 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [reduce])

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      controls={Boolean(reduce) || blocked}
      aria-label={label}
      width={width}
      height={height}
      className="block h-auto w-full rounded-media"
    >
      <source src={`${src}.mp4`} type="video/mp4" />
      <source src={`${src}.webm`} type="video/webm" />
    </video>
  )
}
