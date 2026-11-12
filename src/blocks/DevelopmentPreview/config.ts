import type { Block } from 'payload'

import { link } from '@/fields/link'

/** Link card to the Development Dashboard. Shows no figures until verified records exist (§13). */
export const DevelopmentPreviewBlock: Block = {
  slug: 'developmentPreview',
  interfaceName: 'DevelopmentPreviewBlock',
  labels: { singular: 'Development preview', plural: 'Development previews' },
  fields: [
    { name: 'heading', type: 'text', localized: true },
    { name: 'subheading', type: 'text', localized: true },
    link({ appearances: false, optional: true, overrides: { name: 'cta', label: 'Button' } }),
  ],
}
