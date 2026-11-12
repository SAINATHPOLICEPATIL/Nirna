// Button Types
export type ButtonType = 'filled' | 'outlined' | 'text' | 'tonal'

export type ButtonColor = 'primary' | 'ghost-white' | 'error' | 'ghost-black'

export type ButtonSize = 'xl' | 'lg' | 'md' | 'sm'

// Base props that work for both button and anchor
type BaseButtonProps = {
  /**
   * Required unique identifier for the button
   */
  id: string

  /**
   * Button variant type
   * @default 'filled'
   */
  variant?: ButtonType

  /**
   * Color variant
   * @default 'primary'
   */
  color?: ButtonColor

  /**
   * Button size
   * @default 'md'
   */
  size?: ButtonSize

  /**
   * Left icon (from lucide-react or custom ReactNode)
   */
  leftIcon?: React.ReactNode

  /**
   * Right icon (from lucide-react or custom ReactNode)
   */
  rightIcon?: React.ReactNode

  /**
   * Disabled state (for buttons) or aria-disabled (for links)
   * @default false
   */
  disabled?: boolean

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Button content
   */
  children?: React.ReactNode
}

// Button-specific props (when href is not provided)
export type ButtonAsButtonProps = BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'id' | keyof BaseButtonProps> & {
    href?: never
  }

// Link-specific props (when href is provided)
export type ButtonAsLinkProps = BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'id' | keyof BaseButtonProps> & {
    href: string
    onClick?: React.MouseEventHandler<HTMLAnchorElement>
    target?: '_blank' | 'self' | '_parent' | '_top'
    rel?: string
    /** Internal links only: pass `false` for links in dense card grids and rails. */
    prefetch?: boolean
  }

// Union type - either button or link
export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps
