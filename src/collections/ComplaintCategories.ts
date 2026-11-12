import type { CollectionConfig } from 'payload'

import { activeOrSuperAdmin, superAdminOnly } from '@/access'
import { revalidateHooks } from '@/hooks/revalidateSite'

/**
 * Complaint categories (requirements §11.11). Created now so they can be filled in;
 * the complaint workflow itself arrives in Phase 4.
 */
export const ComplaintCategories: CollectionConfig = {
  slug: 'complaint-categories',
  admin: {
    group: 'Complaints',
    useAsTitle: 'name',
    defaultColumns: ['name', 'department', 'status'],
  },
  hooks: revalidateHooks,
  access: {
    read: activeOrSuperAdmin,
    create: superAdminOnly,
    update: superAdminOnly,
    delete: superAdminOnly,
  },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'department',
      type: 'relationship',
      relationTo: 'departments',
      admin: { description: 'Default department for complaints in this category.' },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'sortOrder', type: 'number', defaultValue: 100, admin: { position: 'sidebar' } },
  ],
}
