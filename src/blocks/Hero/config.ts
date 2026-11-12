import type { Block } from 'payload'

import { link } from '@/fields/link'

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'kannadaHeadline',
          type: 'text',
          admin: {
            width: '50%',
            description:
              'First line, shown in Kannada on both language versions (as in the design).',
          },
        },
        {
          name: 'englishHeadline',
          type: 'text',
          admin: { width: '50%', description: 'Second line, shown in English on both versions.' },
        },
      ],
    },
    { name: 'subtitle', type: 'textarea', localized: true },
    link({ appearances: false, optional: true, overrides: { name: 'cta', label: 'Button' } }),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Background photo. Use a genuine Nirna photo; other images are labelled "Illustrative".',
      },
    },
  ],
}
