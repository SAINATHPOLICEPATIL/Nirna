/**
 * Text Transform Mapping for Lexical Editor
 *
 * This file contains all available text transform options.
 *
 * Tailwind classes are applied to span tags instead of inline styles.
 */

export interface TransformOption {
  label: string // Display label (e.g., "Uppercase")
  class: string // Tailwind class (e.g., "uppercase")
  description: string // Example text showing the transform
}

/**
 * All available text transforms
 * Total: 4 options
 */
export const textTransforms: TransformOption[] = [
  {
    label: 'Uppercase',
    class: 'uppercase',
    description: 'ALL CAPS TEXT',
  },
  {
    label: 'Lowercase',
    class: 'lowercase',
    description: 'all lowercase text',
  },
  {
    label: 'Capitalize',
    class: 'capitalize',
    description: 'Title Case Text',
  },
  {
    label: 'Normal',
    class: 'normal-case',
    description: 'Remove transform',
  },
]

/**
 * Get transform option by Tailwind class
 */
export const getTransformByClass = (className: string): TransformOption | undefined =>
  textTransforms.find((transform) => transform.class === className)
