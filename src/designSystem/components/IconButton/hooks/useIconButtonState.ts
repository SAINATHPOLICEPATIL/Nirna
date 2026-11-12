import { cn } from '@/utilities/ui'
import { useMemo } from 'react'
import { iconButtonSize } from '../icon-button.styles'
import type { IconButtonProps } from '../types'

export const useIconButtonState = ({
  id,
  icon,
  color = 'primary',
  className,
  ...props
}: IconButtonProps) => {
  const classes = useMemo(
    () =>
      cn(
        'icon-btn',
        `icon-btn-${color}`,
        iconButtonSize,
        'hover:shadow-200',
        'active:shadow-100',
        className,
      ),
    [color, className],
  )

  const commonProps = {
    id,
    className: classes,
    ...props,
  }

  return {
    commonProps,
    icon,
  }
}
