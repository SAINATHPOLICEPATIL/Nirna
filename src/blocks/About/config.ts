import type { Block } from 'payload'

import { link } from '@/fields/link'

export const AboutBlock: Block = {
  slug: 'about',
  interfaceName: 'AboutBlock',
  labels: { singular: 'About (image + text)', plural: 'About sections' },
  fields: [
    { name: 'heading', type: 'text', localized: true },
    {
      name: 'text',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Leave empty to use the short description from Village Profile.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Leave empty to use the Village Profile cover image.' },
    },
    link({ appearances: false, optional: true, overrides: { name: 'cta', label: 'Button' } }),
  ],
}
