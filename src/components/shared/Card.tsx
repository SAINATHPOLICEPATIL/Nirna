import type { ReactNode } from 'react'

import { Icon, type IconName } from './Icon'

/** Rounded white card used by the homepage feature blocks. */
export function Card({
  children,
  className = '',
  labelledBy,
}: {
  children: ReactNode
  className?: string
  labelledBy?: string
}) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={`relative flex flex-col overflow-hidden rounded-(--radius-card) border border-border bg-surface p-5 shadow-(--shadow-card) sm:p-6 ${className}`}
    >
      {children}
    </section>
  )
}

/** Card heading with an optional leading icon and a muted subheading, as in the mockup. */
export function CardHeading({
  id,
  icon,
  title,
  subtitle,
}: {
  id: string
  icon?: IconName
  title: string
  subtitle?: string
}) {
  return (
    <div className="flex items-start gap-2.5">
      {icon && <Icon name={icon} className="mt-0.5 size-6 shrink-0 text-primary" />}
      <div className="min-w-0">
        <h2 id={id} className="font-heading text-lg leading-snug font-bold text-primary xl:text-xl">
          {title}
        </h2>
        {subtitle && <p className="mt-0.5 text-sm text-ink-muted">{subtitle}</p>}
      </div>
    </div>
  )
}
