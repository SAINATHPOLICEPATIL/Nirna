import type { CollectionConfig } from 'payload'

import { publishedOrSuperAdmin, superAdminOnly } from '@/access'
import { slugField } from '@/fields'
import { revalidateHooks } from '@/hooks/revalidateSite'
import { previewAdmin } from '@/utilities/generatePreviewPath'

/** Village events and festivals (requirements §11.8). */
export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    ...previewAdmin('events'),
    group: 'Content',
    useAsTitle: 'name',
    defaultColumns: ['name', 'startDate', 'endDate', '_status'],
  },
  versions: { drafts: true, maxPerDoc: 20 },
  defaultSort: '-startDate',
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
      type: 'row',
      fields: [
        {
          name: 'startDate',
          type: 'date',
          required: true,
          admin: { width: '50%', date: { pickerAppearance: 'dayAndTime' } },
        },
        {
          name: 'endDate',
          type: 'date',
          admin: { width: '50%', date: { pickerAppearance: 'dayAndTime' } },
          validate: (value: unknown, { data }: { data: Record<string, unknown> }) => {
            if (!value || !data?.startDate) return true
            return new Date(value as string) >= new Date(data.startDate as string)
              ? true
              : 'End date must be on or after the start date.'
          },
        },
      ],
    },
    { name: 'description', type: 'richText', localized: true },
    { name: 'location', type: 'text', localized: true },
    {
      name: 'place',
      type: 'relationship',
      relationTo: 'places',
      admin: { description: 'Optional: the Place where it happens.' },
    },
    { name: 'images', type: 'upload', relationTo: 'media', hasMany: true },
  ],
}
