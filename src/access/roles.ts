/**
 * Roles. Only `super-admin` and `resident` are active in the first release.
 * The other roles from requirements §8.2 are reserved here so the select field and
 * access helpers already know about them; no accounts are created for them.
 */
export const roles = [
  { label: 'Super Admin', value: 'super-admin' },
  { label: 'Registered Villager', value: 'resident' },
] as const

export type Role = (typeof roles)[number]['value']

export const DEFAULT_ROLE: Role = 'resident'

type MaybeUser = { role?: string | null } | null | undefined

export const isSuperAdmin = (user: MaybeUser): boolean => user?.role === 'super-admin'
