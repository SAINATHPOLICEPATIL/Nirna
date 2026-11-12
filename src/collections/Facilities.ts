import type { CollectionConfig } from 'payload'

import { publishedOrSuperAdmin, superAdminOnly } from '@/access'
import { coordinateFields, seoFields, slugField, verificationFields } from '@/fields'
import { revalidateHooks } from '@/hooks/revalidateSite'
import { previewAdmin } from '@/utilities/generatePreviewPath'

export const facilityCategories = [
  { label: 'Government school', value: 'government-school' },
  { label: 'Private school', value: 'private-school' },
  { label: 'College', value: 'college' },
  { label: 'Government hospital', value: 'government-hospital' },
  { label: 'Private hospital', value: 'private-hospital' },
  { label: 'Clinic', value: 'clinic' },
  { label: 'Bank', value: 'bank' },
  { label: 'Bus stop', value: 'bus-stop' },
  { label: 'Public facility', value: 'public-facility' },
]

/** Schools, hospitals, banks, bus stop and other public facilities (requirements §11.4). */
export const Facilities: CollectionConfig = {
  slug: 'facilities',
  admin: {
    ...previewAdmin('facilities'),
    group: 'Village',
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'verificationStatus', '_status'],
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
    { name: 'name', type: 'text', required: true, localized: true },
    slugField('name'),
    {
      name: 'category',
      type: 'select',
      required: true,
      options: facilityCategories,
      admin: { position: 'sidebar' },
    },
    {
      name: 'department',
      type: 'relationship',
      relationTo: 'departments',
      admin: { position: 'sidebar' },
    },
    { name: 'summary', type: 'textarea', localized: true, maxLength: 240 },
    { name: 'description', type: 'richText', localized: true },
    {
      name: 'services',
      type: 'textarea',
      localized: true,
      admin: { description: 'Verified services only (e.g. classes offered, OPD, emergency).' },
    },
    { name: 'address', type: 'textarea', localized: true },
    {
      type: 'collapsible',
      label: 'Contact (verified only)',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'phone', type: 'text', admin: { width: '50%' } },
            { name: 'email', type: 'email', admin: { width: '50%' } },
          ],
        },
        { name: 'openingHours', type: 'text', localized: true },
      ],
    },
    { name: 'images', type: 'upload', relationTo: 'media', hasMany: true },
    coordinateFields(),
    verificationFields,
    seoFields,
  ],
}
