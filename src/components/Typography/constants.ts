import type { TypographyFontWeight, TypographyToken, TypographyVariant } from './types'

export const FONT_WEIGHT_CLASSES: Record<TypographyFontWeight, string> = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}

export const TYPOGRAPHY_TOKENS: Record<TypographyVariant, TypographyToken> = {
  /** Displays */
  d1: {
    element: 'h1',
    classes: 'font-heading text-d1',
  },
  d2: {
    element: 'h1',
    classes: 'font-heading text-d2',
  },
  d3: {
    element: 'h1',
    classes: 'font-heading text-d3',
  },
  d4: {
    element: 'h1',
    classes: 'font-heading text-d4',
  },
  d5: {
    element: 'h1',
    classes: 'font-heading text-d5',
  },

  /** Headings */
  h1: {
    element: 'h1',
    classes: 'font-heading text-h1',
  },
  h2: {
    element: 'h2',
    classes: 'font-heading text-h2',
  },
  h3: {
    element: 'h3',
    classes: 'font-heading text-h3',
  },
  h4: {
    element: 'h4',
    classes: 'font-heading text-h4',
  },
  h5: {
    element: 'h5',
    classes: 'font-heading text-h5',
  },

  /** Sub-headings */
  s1: {
    element: 'p',
    classes: 'font-heading text-s1',
  },
  s2: {
    element: 'p',
    classes: 'font-heading text-s2',
  },
  s3: {
    element: 'p',
    classes: 'font-heading text-s3',
  },

  /** Labels */
  l1: {
    element: 'p',
    classes: 'font-body text-l1',
  },
  l2: {
    element: 'p',
    classes: 'font-body text-l2',
  },
  l3: {
    element: 'p',
    classes: 'font-body text-l3',
  },
  l4: {
    element: 'p',
    classes: 'font-body text-l4',
  },
  l5: {
    element: 'p',
    classes: 'font-body text-l5',
  },
  l6: {
    element: 'p',
    classes: 'font-body text-l6',
  },
  l7: {
    element: 'p',
    classes: 'font-body text-l7',
  },
  l8: {
    element: 'p',
    classes: 'font-body text-l8',
  },

  /** Paragraph */
  p1: {
    element: 'p',
    classes: 'font-body text-p1',
  },
} as const
