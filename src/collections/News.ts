import type { CollectionConfig } from 'payload'

import { publishedOrSuperAdmin, superAdminOnly } from '@/access'
import { seoFields, slugField } from '@/fields'
import { revalidateHooks } from '@/hooks/revalidateSite'
import { previewAdmin } from '@/utilities/generatePreviewPath'

/**
 * News and announcements (requirements §11.7). Only published items are public.
 * Drafts let the Super Admin prepare both languages before publishing (§7.4).
 */
export const News: CollectionConfig = {
  slug: 'news',
  labels: { singular: 'News item', plural: 'News' },
  admin: {
    ...previewAdmin('news'),
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'publishedDate', '_status'],
  },
  versions: { drafts: true, maxPerDoc: 30 },
  defaultSort: '-publishedDate',
  access: {
    read: publishedOrSuperAdmin,
    create: superAdminOnly,
    update: superAdminOnly,
    delete: superAdminOnly,
  },
  hooks: {
    ...revalidateHooks,
    beforeChange: [
      ({ data, req, operation }) => {
        // Record who wrote it; set the date the first time it is published.
        if (operation === 'create' && req.user && !data.author) data.author = req.user.id
        if (data._status === 'published' && !data.publishedDate) {
          data.publishedDate = new Date().toISOString()
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    slugField('title'),
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'news',
      options: [
        { label: 'News', value: 'news' },
        { label: 'Announcement', value: 'announcement' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly' },
        description: 'Filled in automatically when first published.',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      admin: { position: 'sidebar', readOnly: true },
    },
    { name: 'excerpt', type: 'textarea', localized: true, maxLength: 240 },
    { name: 'content', type: 'richText', localized: true },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    seoFields,
  ],
}
