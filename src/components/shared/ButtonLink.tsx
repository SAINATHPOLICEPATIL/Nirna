import Link from 'next/link'
import type { ReactNode } from 'react'

import { Icon } from './Icon'

type Variant = 'primary' | 'accent' | 'text'

const styles: Record<Variant, string> = {
  primary:
    'rounded-full bg-primary px-6 py-2.5 text-primary-foreground shadow-sm hover:bg-primary-hover',
  accent: 'rounded-full bg-accent px-6 py-3 text-accent-foreground shadow-md hover:bg-accent-hover',
  text: 'text-primary hover:underline underline-offset-4',
}

type Props = {
  href: string
  children: ReactNode
  variant?: Variant
  withArrow?: boolean
  newTab?: boolean
  className?: string
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  withArrow = true,
  newTab = false,
  className = '',
}: Props) {
  return (
    <Link
      href={href}
      {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`inline-flex items-center gap-2 font-semibold transition-colors ${styles[variant]} ${className}`}
    >
      {children}
      {withArrow && <Icon name="arrowRight" className="size-4 shrink-0" />}
    </Link>
  )
}
