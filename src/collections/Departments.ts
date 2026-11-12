import type { CollectionConfig } from 'payload'

import { activeOrSuperAdmin, superAdminOnly } from '@/access'
import { revalidateHooks } from '@/hooks/revalidateSite'

/** Departments (requirements §11.2): Panchayat, schools, hospitals, temples… */
export const Departments: CollectionConfig = {
  slug: 'departments',
  admin: {
    group: 'Village',
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'status'],
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
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Panchayat', value: 'panchayat' },
        { label: 'Education', value: 'education' },
        { label: 'Healthcare', value: 'healthcare' },
        { label: 'Temple', value: 'temple' },
        { label: 'Public works', value: 'public-works' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'contact',
      type: 'group',
      admin: { description: 'Only verified contact details.' },
      fields: [
        { name: 'phone', type: 'text' },
        { name: 'email', type: 'email' },
        { name: 'verified', type: 'checkbox', defaultValue: false },
      ],
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
    {
      name: 'facilities',
      type: 'join',
      collection: 'facilities',
      on: 'department',
      admin: { description: 'Facilities linked to this department.' },
    },
  ],
}
