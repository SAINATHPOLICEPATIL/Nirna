import type { CollectionConfig } from 'payload'

import { publishedOrSuperAdmin, superAdminOnly } from '@/access'
import { coordinateFields, seoFields, slugField, verificationFields } from '@/fields'
import { revalidateHooks } from '@/hooks/revalidateSite'
import { previewAdmin } from '@/utilities/generatePreviewPath'

/** Temples, historical places and landmarks (requirements §11.5). */
export const Places: CollectionConfig = {
  slug: 'places',
  admin: {
    ...previewAdmin('places'),
    group: 'Village',
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'featured', 'verificationStatus', '_status'],
  },
  versions: { drafts: true, maxPerDoc: 20 },
  hooks: revalidateHooks,
  access: {
    read: publishedOrSuperAdmin,
    create: superAdminOnly,
    update: superAdminOnly,
    delete: superAdminOnly,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      admin: { description: 'Confirm the official spelling in each language before publishing.' },
    },
    slugField('name'),
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Temple', value: 'temple' },
        { label: 'Historical place', value: 'historical' },
        { label: 'Landmark', value: 'landmark' },
        { label: 'Public place', value: 'public' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Show on homepage (Explore Nirna)',
      admin: { position: 'sidebar' },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 100,
      admin: { position: 'sidebar', description: 'Lower numbers appear first.' },
    },
    {
      name: 'summary',
      type: 'textarea',
      localized: true,
      maxLength: 240,
      admin: { description: 'Short description for cards.' },
    },
    { name: 'description', type: 'richText', localized: true },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      admin: { description: 'Use genuine Nirna photographs only.' },
    },
    { name: 'address', type: 'textarea', localized: true },
    coordinateFields(),
    verificationFields,
    seoFields,
  ],
}
