import type { CollectionConfig } from 'payload'

import { publishedOrSuperAdmin, superAdminOnly } from '@/access'
import { pageBlocks } from '@/blocks'
import { seoFields, slugField } from '@/fields'
import { revalidateHooks } from '@/hooks/revalidateSite'
import { previewAdmin } from '@/utilities/generatePreviewPath'

/**
 * Website pages built from blocks. The page with slug "home" is the homepage (/kn, /en);
 * every other page is served at /<locale>/<slug>.
 */
export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    ...previewAdmin('pages'),
    group: 'Website',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
  },
  versions: { drafts: true, maxPerDoc: 30 },
  access: {
    read: publishedOrSuperAdmin,
    create: superAdminOnly,
    update: superAdminOnly,
    delete: superAdminOnly,
  },
  hooks: revalidateHooks,
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    slugField('title'),
    {
      name: 'layout',
      type: 'blocks',
      blocks: pageBlocks,
      admin: { initCollapsed: true },
    },
    seoFields,
  ],
}
