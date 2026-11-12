import { useMemo } from 'react'

import { resolveLink } from '@/utilities/link'
import { cn } from '@/utilities/ui'

import type { LinkButtonProps } from '../types'

export const useLinkButtonState = ({
  id,
  link,
  locale,
  color = 'light',
  disabled = false,
  className,
  children,
  ...props
}: LinkButtonProps) => {
  const href = resolveLink(link, locale)

  const isLink = !!href
  const isInternalLink = isLink && href.startsWith('/')

  const classes = useMemo(
    () => cn('link-button', `link-button-${color}`, disabled && 'link-button-disabled', className),
    [color, disabled, className],
  )

  const commonProps = useMemo(
    () => ({
      id,
      className: classes,
      'aria-disabled': disabled,
      ...props,
    }),
    [id, classes, disabled, props],
  )

  return {
    commonProps,
    href,
    isLink,
    isInternalLink,
    newTab: link?.newTab ?? false,
    disabled,
    children,
  }
}
