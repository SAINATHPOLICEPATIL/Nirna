import Link from 'next/link'
import React from 'react'

import type { ButtonColor, ButtonSize, ButtonType } from '@/designSystem/components/Button'
import { Button } from '@/designSystem/components/Button'
import type { LinkButtonColor } from '@/designSystem/components/LinkButton'
import { LinkButton } from '@/designSystem/components/LinkButton'
import type { LinkAppearances } from '@/fields/link'
import type { Locale } from '@/i18n/config'
import { resolveLink } from '@/utilities/link'
import type { LinkableCollection } from '@/utilities/routes'
import { cn } from '@/utilities/ui'

/** The value of a `link()` field as Payload returns it (populate `reference` with depth ≥ 1). */
export type PayloadLinkType = {
  type?: 'custom' | 'reference' | null
  newTab?: boolean | null
  reference?: {
    relationTo: LinkableCollection
    value: string | number | { slug?: string | null; _status?: string | null }
  } | null
  url?: string | null
  label: string
  appearance?: LinkAppearances | null
}

type CMSLinkType = Omit<PayloadLinkType, 'appearance'> & {
  /** Language of the page the link is on: internal links get this prefix (`/kn/…`, `/en/…`). */
  locale: Locale
  /**
   * 'inline'      → plain Next.js <Link> (no Button wrapper)
   * 'filled' | 'outlined' | 'text' | 'tonal' → Button with that variant
   * 'link-button' → LinkButton (text link that underlines on hover)
   */
  appearance?: 'inline' | ButtonType | 'link-button' | null
  color?: ButtonColor
  /** Colour for the 'link-button' appearance: 'light' = dark text for light backgrounds. */
  linkButtonColor?: LinkButtonColor
  size?: ButtonSize
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  className?: string
  children?: React.ReactNode
  ariaLabel?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    locale,
    newTab,
    reference,
    size = 'md',
    url,
    color = 'primary',
    linkButtonColor = 'light',
    leftIcon,
    rightIcon,
    ariaLabel,
    onClick,
  } = props

  const href = resolveLink({ type, reference, url }, locale)

  if (!href) return null

  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' as const } : {}

  const target = reference?.value
  const elementId = `cms-link-${type ?? 'custom'}-${
    target && typeof target === 'object' ? (target.slug ?? '') : (target ?? url ?? '')
  }`.replace(/[^a-zA-Z0-9-]/g, '-')

  if (appearance === 'inline') {
    return (
      <Link
        className={cn(className)}
        href={href}
        aria-label={ariaLabel}
        onClick={onClick}
        {...newTabProps}
      >
        {label}
        {children}
      </Link>
    )
  }

  if (appearance === 'link-button') {
    return (
      <LinkButton
        id={elementId}
        link={{ type, reference, url, label, newTab }}
        locale={locale}
        color={linkButtonColor}
        className={className}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {label ?? children}
      </LinkButton>
    )
  }

  return (
    <Button
      id={elementId}
      variant={appearance ?? 'filled'}
      color={color}
      size={size}
      href={href}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      className={className}
      aria-label={ariaLabel}
      onClick={onClick}
      {...newTabProps}
    >
      {label ?? children}
    </Button>
  )
}
