import { APIError, type CollectionConfig } from 'payload'

import { superAdminFieldOnly, superAdminOnly, superAdminOrSelf } from '@/access'
import { DEFAULT_ROLE, isSuperAdmin, roles } from '@/access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    group: 'Settings',
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role', 'accountStatus'],
  },
  auth: {
    // Brute-force protection (requirements §18): lock the account after repeated failures.
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
  },
  access: {
    // Only Super Admin can open /admin. Residents use the public site (Phase 4).
    admin: ({ req }) => isSuperAdmin(req.user),
    read: superAdminOrSelf,
    // Only Super Admin creates accounts (§8.1). The very first account is created through
    // Payload's first-user screen, which the hook below makes the Super Admin.
    create: superAdminOnly,
    update: superAdminOrSelf,
    delete: superAdminOnly,
  },
  hooks: {
    beforeLogin: [
      ({ user }) => {
        if (user?.accountStatus === 'suspended') {
          throw new APIError('This account is suspended.', 403, undefined, true)
        }
        return user
      },
    ],
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation !== 'create') return data
        const { totalDocs } = await req.payload.count({ collection: 'users', req })
        if (totalDocs === 0) return { ...data, role: 'super-admin' }
        return data
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true, maxLength: 120 },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: DEFAULT_ROLE,
      options: [...roles],
      saveToJWT: true,
      // Users can never set or change their own role (§9, §10).
      access: { create: superAdminFieldOnly, update: superAdminFieldOnly },
      admin: { position: 'sidebar' },
    },
    {
      name: 'accountStatus',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Suspended', value: 'suspended' },
      ],
      access: { create: superAdminFieldOnly, update: superAdminFieldOnly },
      admin: { position: 'sidebar' },
    },
    {
      name: 'department',
      type: 'relationship',
      relationTo: 'departments',
      admin: {
        position: 'sidebar',
        description: 'For future department administrators. Not used for residents.',
      },
      access: { create: superAdminFieldOnly, update: superAdminFieldOnly },
    },
    {
      name: 'facility',
      type: 'relationship',
      relationTo: 'facilities',
      admin: {
        position: 'sidebar',
        description: 'For future facility administrators (a specific school, hospital, temple).',
      },
      access: { create: superAdminFieldOnly, update: superAdminFieldOnly },
    },
  ],
}
