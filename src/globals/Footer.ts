import type { GlobalConfig } from 'payload'

import { anyone, superAdminOnly } from '@/access'
import { link } from '@/fields/link'
import { revalidateGlobalAfterChange } from '@/hooks/revalidateSite'

/** Footer (requirements §5.10). Add contact details only once verified. */
export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: { group: 'Website' },
  access: { read: anyone, update: superAdminOnly },
  hooks: { afterChange: [revalidateGlobalAfterChange] },
  fields: [
    {
      name: 'columns',
      type: 'array',
      label: 'Link columns',
      maxRows: 4,
      admin: { initCollapsed: true },
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        {
          name: 'links',
          type: 'array',
          maxRows: 8,
          admin: { initCollapsed: true },
          fields: [link({ appearances: false })],
        },
      ],
    },
    {
      name: 'disclaimer',
      type: 'textarea',
      localized: true,
      admin: {
        description:
          'Shown under the logo. Keep the statement that this is not an official Panchayat website (§2).',
      },
    },
    {
      name: 'copyright',
      type: 'text',
      localized: true,
      admin: {
        description: 'Use {year} for the current year, e.g. "© {year} NIRNA Digital Village".',
      },
    },
  ],
}
