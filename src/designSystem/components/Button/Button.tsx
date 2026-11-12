'use client'

import { forwardRef, memo } from 'react'
import type { ButtonAsButtonProps, ButtonAsLinkProps, ButtonProps } from './types'
import { useButtonState } from './hooks/useButtonState'
import Link from 'next/link'

const ButtonComponent = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      id,
      variant = 'filled',
      color = 'primary',
      size = 'md',
      leftIcon,
      rightIcon,
      disabled = false,
      className,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    const { href, isLink, isInternalLink, commonProps, content } = useButtonState({
      id,
      variant,
      color,
      size,
      disabled,
      className,
      leftIcon,
      rightIcon,
      children,
      onClick,
      props,
    })
    // If it's a link
    if (isLink) {
      const linkSpecificProps = props as ButtonAsLinkProps
      const { href: _, ...propsWithoutHref } = linkSpecificProps

      const linkProps = {
        ...commonProps,
        ...propsWithoutHref,
        href: disabled ? undefined : href,
        onClick: commonProps.onClick,
        tabIndex: disabled ? -1 : undefined,
      }

      if (isInternalLink) {
        const { href: linkHref, ...restProps } = linkProps

        return (
          <Link
            ref={ref as React.ForwardedRef<HTMLAnchorElement>}
            href={(linkHref as string) || '#'}
            {...restProps}
          >
            {content}
          </Link>
        )
      }

      // `prefetch` is a next/link prop; a plain anchor must not get it.
      const { prefetch: _prefetch, ...anchorProps } = linkProps

      return (
        <a
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          {...(anchorProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      )
    }

    // Regular button
    const buttonProps = props as ButtonAsButtonProps

    return (
      <button
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        disabled={disabled}
        {...commonProps}
        {...(buttonProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    )
  },
)
ButtonComponent.displayName = 'Button'

export const Button = memo(ButtonComponent)
