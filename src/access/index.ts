import type { Access, FieldAccess } from 'payload'

import { isSuperAdmin } from './roles'

/**
 * Server-side access rules (requirements §10). Hiding UI is never relied on:
 * Payload runs these for the REST/GraphQL APIs and the Local API with overrideAccess: false.
 */

export const superAdminOnly: Access = ({ req }) => isSuperAdmin(req.user)

export const superAdminFieldOnly: FieldAccess = ({ req }) => isSuperAdmin(req.user)

export const anyone: Access = () => true

/** Public sees only published documents; Super Admin also sees drafts. */
export const publishedOrSuperAdmin: Access = ({ req }) => {
  if (isSuperAdmin(req.user)) return true
  return { _status: { equals: 'published' } }
}

/** Collections with a simple `status` field (active/inactive) instead of drafts. */
export const activeOrSuperAdmin: Access = ({ req }) => {
  if (isSuperAdmin(req.user)) return true
  return { status: { equals: 'active' } }
}

/** Users: Super Admin sees everyone, a signed-in user only themself, the public no one. */
export const superAdminOrSelf: Access = ({ req }) => {
  if (isSuperAdmin(req.user)) return true
  if (req.user) return { id: { equals: req.user.id } }
  return false
}
