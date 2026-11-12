import 'server-only'

import config from '@payload-config'
import { draftMode, headers } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'

import { isSuperAdmin } from '@/access/roles'

/**
 * The signed-in Super Admin when this request is a preview (draft mode on), otherwise null.
 * Headers are only read in draft mode, so normal visits stay statically rendered. The admin
 * session is checked on every preview request: a leftover draft-mode cookie alone shows nothing.
 */
export const getPreviewUser = cache(async () => {
  try {
    if (!(await draftMode()).isEnabled) return null
  } catch {
    return null // outside a request (seed, scripts)
  }
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })
  return isSuperAdmin(user) ? user : null
})

/** Whether this request is an editor's preview. */
export const isPreview = async (): Promise<boolean> => Boolean(await getPreviewUser())
