import type { CollectionConfig } from 'payload'

import { anyone, superAdminOnly } from '@/access'
import { revalidateHooks } from '@/hooks/revalidateSite'

/**
 * PUBLIC media (photos and documents for public pages).
 * Private complaint evidence will live in a separate, access-restricted collection (Phase 4).
 */
export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Content',
    defaultColumns: ['filename', 'alt', 'isGenuineNirnaPhoto', 'updatedAt'],
  },
  hooks: revalidateHooks,
  access: {
    read: anyone,
    create: superAdminOnly,
    update: superAdminOnly,
    delete: superAdminOnly,
  },
  upload: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'application/pdf'],
    imageSizes: [
      { name: 'thumbnail', width: 400 },
      { name: 'card', width: 800 },
      { name: 'hero', width: 1920 },
    ],
    adminThumbnail: 'thumbnail',
    focalPoint: true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
      admin: { description: 'Describe the image for screen-reader users, in each language.' },
    },
    { name: 'caption', type: 'text', localized: true },
    {
      name: 'isGenuineNirnaPhoto',
      type: 'checkbox',
      defaultValue: false,
      label: 'This is a genuine photograph taken in Nirna',
      admin: {
        description:
          'Leave unticked for illustrations, stock or generated images. The website never presents those as Nirna landmarks.',
      },
    },
    {
      name: 'credit',
      type: 'text',
      admin: { description: 'Photographer or source, and permission to use it.' },
    },
  ],
}
