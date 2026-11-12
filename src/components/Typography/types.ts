import type { HTMLAttributes, ReactNode } from 'react'

export type DisplayVariant = 'd1' | 'd2' | 'd3' | 'd4' | 'd5'

export type HeadingVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5'

export type SubHeadingVariant = 's1' | 's2' | 's3'

export type LabelVariant = 'l1' | 'l2' | 'l3' | 'l4' | 'l5' | 'l6' | 'l7' | 'l8'

export type ParagraphVariant = 'p1'

export type TypographyVariant =
  DisplayVariant | HeadingVariant | SubHeadingVariant | LabelVariant | ParagraphVariant

export type TypographyFontWeight = 'regular' | 'medium' | 'semibold' | 'bold'

export type TypographyElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'span' | 'label'

export interface TypographyToken {
  element: TypographyElement
  classes: string
}

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant: TypographyVariant
  weight?: TypographyFontWeight
  as?: TypographyElement
  children: ReactNode
}
