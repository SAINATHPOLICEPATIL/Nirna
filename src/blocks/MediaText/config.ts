import type { Block } from 'payload'

import { link } from '@/fields/link'

/** Image beside text (alternating left/right), e.g. "History & Heritage" on the About page. */
export const MediaTextBlock: Block = {
  slug: 'mediaText',
  interfaceName: 'MediaTextBlock',
  labels: { singular: 'Image + text', plural: 'Image + text sections' },
  fields: [
    { name: 'heading', type: 'text', localized: true },
    { name: 'text', type: 'textarea', localized: true },
    link({ appearances: false, optional: true, overrides: { name: 'cta', label: 'Button' } }),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Use a genuine Nirna photo; other images are labelled "Illustrative".',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'imagePosition',
          type: 'radio',
          defaultValue: 'left',
          options: [
            { label: 'Image left', value: 'left' },
            { label: 'Image right', value: 'right' },
          ],
          admin: { layout: 'horizontal', width: '50%' },
        },
        {
          name: 'leafDecoration',
          type: 'checkbox',
          defaultValue: true,
          label: 'Faint leaf decoration',
          admin: { width: '50%' },
        },
      ],
    },
  ],
}
