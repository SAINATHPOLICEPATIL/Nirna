import type { GlobalConfig } from 'payload'

import { anyone, superAdminOnly } from '@/access'
import { link } from '@/fields/link'
import { revalidateGlobalAfterChange } from '@/hooks/revalidateSite'

/** Main navigation (requirements §5.1). Keep it to the main sections. */
export const Header: GlobalConfig = {
  slug: 'header',
  admin: { group: 'Website' },
  access: { read: anyone, update: superAdminOnly },
  hooks: { afterChange: [revalidateGlobalAfterChange] },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: 'Menu items',
      maxRows: 8,
      admin: {
        initCollapsed: true,
        description:
          'Custom URLs are site paths without the language, e.g. /about — /kn or /en is added automatically.',
      },
      fields: [link({ appearances: false })],
    },
  ],
}
