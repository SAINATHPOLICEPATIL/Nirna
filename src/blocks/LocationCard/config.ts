import type { Block } from 'payload'

import { link } from '@/fields/link'

/**
 * "Our Location" card with a small map. The map shows the real village centre only once it is
 * verified in Village Profile → Map; until then an abstract illustration is shown.
 */
export const LocationCardBlock: Block = {
  slug: 'locationCard',
  interfaceName: 'LocationCardBlock',
  labels: { singular: 'Location card', plural: 'Location cards' },
  fields: [
    { name: 'heading', type: 'text', localized: true },
    { name: 'text', type: 'textarea', localized: true },
    {
      name: 'badgeText',
      type: 'text',
      localized: true,
      admin: {
        description: 'Small label on the map. Defaults to "District, State" from Village Profile.',
      },
    },
    link({ appearances: false, optional: true, overrides: { name: 'cta', label: 'Button' } }),
  ],
}
