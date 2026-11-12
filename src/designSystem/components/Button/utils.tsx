import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

// Helper function to render icon
export function renderIcon(iconNode: React.ReactNode, size: string, position?: 'left' | 'right') {
  if (!iconNode) return null

  return (
    <span className={cn('btn-icon-wrapper', `btn-icon-${size}`)} data-position={position}>
      {iconNode}
    </span>
  )
}

// Helper function to render button content
type RenderContentProps = {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  children?: React.ReactNode
  size?: string
}

export function renderContent({ leftIcon, rightIcon, children, size = 'md' }: RenderContentProps) {
  return (
    <>
      {leftIcon && renderIcon(leftIcon, size, 'left')}

      {children && <span className="btn-text-content">{children}</span>}

      {rightIcon && renderIcon(rightIcon, size, 'right')}
    </>
  )
}

// Helper function to render link elements
type RenderLinkProps = {
  isInternal: boolean
  linkProps: Record<string, unknown>
  content: React.ReactNode
  ref: React.ForwardedRef<HTMLAnchorElement>
}

export function renderLink({
  isInternal,
  linkProps,
  content,
  ref,
}: RenderLinkProps): React.ReactElement {
  if (isInternal) {
    const { href: linkHref, ...restProps } = linkProps as {
      href?: string
      [key: string]: unknown
    }

    return (
      <Link ref={ref} href={linkHref || '#'} {...restProps}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          {content}
        </span>
      </Link>
    )
  }

  return (
    <a ref={ref} {...(linkProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
      {content}
    </a>
  )
}

// Helper function to render button element
type RenderButtonProps = {
  disabled: boolean
  commonProps: Record<string, unknown>
  buttonProps: Record<string, unknown>
  content: React.ReactNode
  ref: React.ForwardedRef<HTMLButtonElement>
}

export function renderButton({
  disabled,
  commonProps,
  buttonProps,
  content,
  ref,
}: RenderButtonProps): React.ReactElement {
  return (
    <button
      ref={ref}
      disabled={disabled}
      {...commonProps}
      {...(buttonProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  )
}
