import type { Block } from 'payload'

import { link } from '@/fields/link'

export const MapPreviewBlock: Block = {
  slug: 'mapPreview',
  interfaceName: 'MapPreviewBlock',
  labels: { singular: 'Map preview', plural: 'Map previews' },
  fields: [
    { name: 'heading', type: 'text', localized: true },
    { name: 'subheading', type: 'text', localized: true },
    {
      name: 'pendingText',
      type: 'text',
      localized: true,
      admin: { description: 'Shown while no verified map locations are published.' },
    },
    {
      name: 'availableText',
      type: 'text',
      localized: true,
      admin: {
        description:
          'Shown once verified locations exist. Use {count} for the number of locations.',
      },
    },
    link({ appearances: false, optional: true, overrides: { name: 'cta', label: 'Button' } }),
  ],
}
