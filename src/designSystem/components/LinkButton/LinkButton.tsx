'use client'

import Link from 'next/link'
import { forwardRef, memo } from 'react'

import { Typography } from '@/components/Typography'

import type { LinkButtonProps } from './types'
import { useLinkButtonState } from './hooks'

const LinkButtonComponent = forwardRef<HTMLAnchorElement, LinkButtonProps>((props, ref) => {
  const { commonProps, href, isLink, isInternalLink, newTab, disabled, children } =
    useLinkButtonState(props)

  if (!isLink || disabled) {
    return (
      <span id={commonProps.id} className={commonProps.className} aria-disabled="true">
        <Typography variant="l3">{children}</Typography>
      </span>
    )
  }

  if (isInternalLink) {
    return (
      <Link ref={ref} href={href!} {...commonProps} target={newTab ? '_blank' : undefined}>
        <Typography variant="l3">{children}</Typography>
      </Link>
    )
  }

  return (
    <a
      ref={ref}
      href={href}
      {...(commonProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener noreferrer' : undefined}
    >
      <Typography variant="l3">{children}</Typography>
    </a>
  )
})

LinkButtonComponent.displayName = 'LinkButton'

export const LinkButton = memo(LinkButtonComponent)
