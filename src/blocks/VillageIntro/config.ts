import type { Block } from 'payload'

import { link } from '@/fields/link'

/** "Our Village" text beside a "Village at a Glance" card. Figures come from Village Profile. */
export const VillageIntroBlock: Block = {
  slug: 'villageIntro',
  interfaceName: 'VillageIntroBlock',
  labels: { singular: 'Village intro + glance', plural: 'Village intros' },
  fields: [
    { name: 'heading', type: 'text', localized: true },
    {
      name: 'text',
      type: 'textarea',
      localized: true,
      admin: { description: 'Leave empty to use the short description from Village Profile.' },
    },
    link({ appearances: false, optional: true, overrides: { name: 'cta', label: 'Button' } }),
    {
      type: 'collapsible',
      label: '"Village at a Glance" card',
      fields: [
        { name: 'glanceHeading', type: 'text', localized: true },
        {
          type: 'row',
          fields: [
            { name: 'populationLabel', type: 'text', localized: true, admin: { width: '25%' } },
            { name: 'maleLabel', type: 'text', localized: true, admin: { width: '25%' } },
            { name: 'femaleLabel', type: 'text', localized: true, admin: { width: '25%' } },
            { name: 'householdsLabel', type: 'text', localized: true, admin: { width: '25%' } },
          ],
        },
      ],
    },
  ],
}
