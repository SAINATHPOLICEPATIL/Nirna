import type { Block } from 'payload'

import { link } from '@/fields/link'

/** Lists the most recent PUBLISHED News items automatically. */
export const LatestNewsBlock: Block = {
  slug: 'latestNews',
  interfaceName: 'LatestNewsBlock',
  labels: { singular: 'Latest news', plural: 'Latest news' },
  fields: [
    { name: 'heading', type: 'text', localized: true },
    { name: 'subheading', type: 'text', localized: true },
    { name: 'limit', type: 'number', defaultValue: 3, min: 1, max: 6 },
    {
      name: 'emptyText',
      type: 'text',
      localized: true,
      admin: { description: 'Shown until news is published.' },
    },
    link({ appearances: false, optional: true, overrides: { name: 'cta', label: 'Button' } }),
  ],
}
