import type { Block } from 'payload'

import { link } from '@/fields/link'

/** Overview card. The COUNTS come from Village Profile → Facility summary; only labels are set here. */
export const EducationHealthBlock: Block = {
  slug: 'educationHealth',
  interfaceName: 'EducationHealthBlock',
  labels: { singular: 'Education & healthcare', plural: 'Education & healthcare' },
  fields: [
    { name: 'heading', type: 'text', localized: true },
    { name: 'subheading', type: 'text', localized: true },
    {
      type: 'row',
      fields: [
        { name: 'schoolsLabel', type: 'text', localized: true, admin: { width: '33%' } },
        { name: 'collegeLabel', type: 'text', localized: true, admin: { width: '33%' } },
        { name: 'hospitalsLabel', type: 'text', localized: true, admin: { width: '33%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'governmentLabel',
          type: 'text',
          localized: true,
          admin: { width: '50%', description: 'e.g. "Govt"' },
        },
        {
          name: 'privateLabel',
          type: 'text',
          localized: true,
          admin: { width: '50%', description: 'e.g. "Pvt" / "Private"' },
        },
      ],
    },
    link({ appearances: false, optional: true, overrides: { name: 'cta', label: 'Button' } }),
  ],
}
