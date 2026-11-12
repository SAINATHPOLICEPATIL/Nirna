import { useCallback, useMemo } from 'react'
import type { ButtonColor, ButtonSize, ButtonType } from '../types'
import { cn } from '@/utilities/ui'
import { renderContent } from '../utils'
import { buttonSizes } from '../button.styles'

type ClickHandler = React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>

type UseButtonStateProps = {
  id: string
  variant: ButtonType
  color: ButtonColor
  size: ButtonSize
  disabled: boolean
  className?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  children?: React.ReactNode
  onClick?: ClickHandler
  props: Record<string, unknown>
}

export function useButtonState({
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
}: UseButtonStateProps) {
  const href = 'href' in props ? (props.href as string) : undefined
  const isLink = !!href
  const isInternalLink = isLink && href.startsWith('/')

  const handleClick = useCallback<ClickHandler>(
    (event) => {
      if (disabled) {
        event.preventDefault()
        return
      }
      if (onClick) {
        onClick(event as React.MouseEvent<HTMLButtonElement> & React.MouseEvent<HTMLAnchorElement>)
      }
    },
    [disabled, onClick],
  )
  const sizeClasses = buttonSizes[size]

  const classes = useMemo(
    () =>
      cn(
        'btn',
        `btn-${variant}`,
        `btn-${variant}-${color}`,
        sizeClasses,
        disabled && 'btn-disabled',
        className,
      ),
    [variant, color, sizeClasses, disabled, className],
  )

  const commonProps = useMemo(
    () => ({
      id,
      className: classes,
      onClick: handleClick,
      'aria-disabled': disabled,
    }),
    [id, classes, handleClick, disabled],
  )

  const content = useMemo(
    () => renderContent({ leftIcon, rightIcon, children, size }),
    [leftIcon, rightIcon, children, size],
  )

  return {
    href,
    isLink,
    isInternalLink,
    commonProps,
    content,
  }
}
