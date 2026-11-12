import { cn } from '@/utilities/ui'
import React from 'react'
import { FONT_WEIGHT_CLASSES, TYPOGRAPHY_TOKENS } from './constants'
import type { TypographyProps } from './types'

const TypographyComponent = React.forwardRef<HTMLElement, TypographyProps>(
  ({ variant, weight = 'regular', as, className, children, ...props }, ref) => {
    const token = TYPOGRAPHY_TOKENS[variant]

    const Component = as ?? token.element

    return (
      <Component
        ref={ref as never}
        data-variant={variant}
        className={cn(token.classes, FONT_WEIGHT_CLASSES[weight], className)}
        {...props}
      >
        {children}
      </Component>
    )
  },
)

TypographyComponent.displayName = 'Typography'

export const Typography = React.memo(TypographyComponent)
