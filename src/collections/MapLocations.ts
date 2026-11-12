import type { CollectionConfig } from 'payload'

import { publishedOrSuperAdmin, superAdminOnly } from '@/access'
import { coordinateFields } from '@/fields'
import { revalidateHooks } from '@/hooks/revalidateSite'

/**
 * Map markers (requirements §11.6). Coordinates are required, and must be marked verified
 * before a location can be published — so the public map never shows guessed positions.
 */
export const MapLocations: CollectionConfig = {
  slug: 'map-locations',
  admin: {
    group: 'Village',
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'coordinatesVerified', '_status'],
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
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'School', value: 'school' },
        { label: 'College', value: 'college' },
        { label: 'Hospital / clinic', value: 'hospital' },
        { label: 'Temple', value: 'temple' },
        { label: 'Bank', value: 'bank' },
        { label: 'Bus stop', value: 'bus-stop' },
        { label: 'Public facility', value: 'public-facility' },
        { label: 'Landmark', value: 'landmark' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'place',
      type: 'relationship',
      relationTo: 'places',
      admin: { position: 'sidebar', description: 'Link to a Place page (optional).' },
    },
    {
      name: 'facility',
      type: 'relationship',
      relationTo: 'facilities',
      admin: { position: 'sidebar', description: 'Link to a Facility page (optional).' },
    },
    { name: 'description', type: 'textarea', localized: true, maxLength: 300 },
    coordinateFields({ required: true, requireVerifiedToPublish: true }),
  ],
}
