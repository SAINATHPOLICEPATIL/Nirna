import type { ButtonHTMLAttributes, ReactNode } from 'react'

/**
 * Supported color variants for the IconButton component.
 */
export type IconButtonColor = 'primary' | 'secondary' | 'primary-inverse' | 'secondary-inverse'

/**
 * Props for the reusable IconButton component.
 */
export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Unique identifier for the button.
   */
  id: string

  /**
   * SVG icon to render inside the button.
   */
  icon: ReactNode

  /**
   * Visual color variant of the IconButton.
   *
   * @default 'primary'
   */
  color?: IconButtonColor
}
