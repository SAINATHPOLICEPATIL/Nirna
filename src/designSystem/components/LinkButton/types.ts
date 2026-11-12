import type { AnchorHTMLAttributes, ReactNode } from 'react'
import type { PayloadLinkType } from '@/components/Link'
import type { Locale } from '@/i18n/config'

export type LinkButtonColor = 'dark' | 'light'

export interface LinkButtonProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'children' | 'href'
> {
  /**
   * Unique identifier.
   */
  id: string

  /**
   * Link text.
   */
  children: ReactNode

  /**
   * Payload CMS link object.
   */
  link: PayloadLinkType

  /**
   * Language of the page: internal links get this prefix.
   */
  locale: Locale

  /**
   * Color variant.
   *
   * @default 'dark'
   */
  color?: LinkButtonColor

  /**
   * Disabled state.
   *
   * @default false
   */
  disabled?: boolean
}
