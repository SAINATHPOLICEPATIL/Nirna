/**
 * Text colours offered by the rich-text colour picker (fields/fontColorFeature).
 *
 * The picker stores `color: <oklchValue>` in the text's style; RichText matches that value back to
 * an entry here and renders its Tailwind class. Keep each value identical to the token it names
 * (NIRNA's own tokens in app/(frontend)/globals.css, the scales in styles/tokens.css). Changing a
 * value later does not update text already saved with the old one: it then renders as an inline
 * colour with a console warning. The field is called `oklchValue` but any CSS colour works.
 */

export type ColorOption = {
  label: string // Shown in the picker
  textClass: string // Tailwind text colour class
  oklchValue: string // Exact CSS colour value of that token
}

export const defaultColors: ColorOption[] = [
  // NIRNA text colours
  { label: 'ink', textClass: 'text-ink', oklchValue: '#1d2a20' },
  { label: 'ink-muted', textClass: 'text-ink-muted', oklchValue: '#4b5a50' },
  { label: 'green', textClass: 'text-primary', oklchValue: '#1f5130' },
  { label: 'green-dark', textClass: 'text-primary-hover', oklchValue: '#173e25' },
  { label: 'leaf', textClass: 'text-leaf', oklchValue: '#8fb07a' },

  // Gold (brand scale; 400 is NIRNA accent, low contrast on white, so use 700/800 for body text)
  { label: 'gold', textClass: 'text-accent', oklchValue: '#e0a526' },
  { label: 'gold-dark', textClass: 'text-brand-700', oklchValue: 'oklch(0.53 0.105 78.51)' },
  { label: 'gold-deep', textClass: 'text-brand-800', oklchValue: 'oklch(0.43 0.082 78.51)' },

  // Status
  { label: 'error', textClass: 'text-error-600', oklchValue: 'oklch(0.5151 0.1175 22.05)' },
  { label: 'warning', textClass: 'text-warning-ink', oklchValue: '#6b4a00' },

  // On dark backgrounds
  { label: 'white', textClass: 'text-primary-foreground', oklchValue: '#ffffff' },
  { label: 'cream', textClass: 'text-cream', oklchValue: '#f8f3e6' },
]

/**
 * Get color option by label
 */
export const getColorByLabel = (label: string): ColorOption | undefined =>
  defaultColors.find((color) => color.label === label)

/**
 * Get text class by label
 */
export const getTextClassByLabel = (label: string): string | undefined =>
  defaultColors.find((color) => color.label === label)?.textClass
