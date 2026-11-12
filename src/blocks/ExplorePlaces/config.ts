import type { Block } from 'payload'

import { link } from '@/fields/link'

export const ExplorePlacesBlock: Block = {
  slug: 'explorePlaces',
  interfaceName: 'ExplorePlacesBlock',
  labels: { singular: 'Explore places', plural: 'Explore places' },
  fields: [
    { name: 'heading', type: 'text', localized: true },
    { name: 'subheading', type: 'text', localized: true },
    link({
      appearances: false,
      optional: true,
      overrides: { name: 'viewAll', label: '"View all" link' },
    }),
    {
      name: 'populateBy',
      type: 'radio',
      defaultValue: 'featured',
      options: [
        { label: 'Places marked "Show on homepage"', value: 'featured' },
        { label: 'Choose places', value: 'selection' },
      ],
      admin: { layout: 'horizontal' },
    },
    {
      name: 'places',
      type: 'relationship',
      relationTo: 'places',
      hasMany: true,
      admin: { condition: (_, sibling) => sibling?.populateBy === 'selection' },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 4,
      min: 1,
      max: 8,
      admin: { condition: (_, sibling) => sibling?.populateBy !== 'selection' },
    },
    {
      name: 'showOtherLanguageName',
      type: 'checkbox',
      defaultValue: true,
      label: 'Also show each name in the other language',
    },
    {
      name: 'emptyText',
      type: 'text',
      localized: true,
      admin: { description: 'Shown when no places are published yet.' },
    },
  ],
}
