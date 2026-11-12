import type { GlobalConfig } from 'payload'

import { anyone, superAdminOnly } from '@/access'
import { revalidateGlobalAfterChange } from '@/hooks/revalidateSite'

/** Site-wide identity: name, description (SEO default) and logo. */
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: { group: 'Website' },
  access: { read: anyone, update: superAdminOnly },
  hooks: { afterChange: [revalidateGlobalAfterChange] },
  fields: [
    { name: 'siteName', type: 'text', required: true, localized: true },
    {
      name: 'siteDescription',
      type: 'textarea',
      localized: true,
      maxLength: 170,
      admin: { description: 'Default search-engine description for pages without their own.' },
    },
    {
      type: 'collapsible',
      label: 'Logo',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description:
              'Official logo image. While empty, a temporary emblem is shown with the text below.',
          },
        },
        {
          type: 'row',
          fields: [
            { name: 'logoTitle', type: 'text', admin: { width: '50%' } },
            { name: 'logoSubtitle', type: 'text', localized: true, admin: { width: '50%' } },
          ],
        },
      ],
    },
  ],
}
