/**
 * Utility functions for UI components automatically added by ShadCN and used in a few of our frontend components and blocks.
 *
 * Other functions may be exported from here in the future or by installing other shadcn components.
 */

import clsx, { type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-d1',
        'text-d2',
        'text-d3',
        'text-d4',
        'text-d5',
        'text-h1',
        'text-h2',
        'text-h3',
        'text-h4',
        'text-h5',
        'text-s1',
        'text-s2',
        'text-s3',
        'text-l1',
        'text-l2',
        'text-l3',
        'text-l4',
        'text-l5',
        'text-l6',
        'text-l7',
        'text-l8',
        'text-p1',
        'text-form',
        'text-form-sm',
        'text-form-label',
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
