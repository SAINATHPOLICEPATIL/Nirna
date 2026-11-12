import config from '@payload-config'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'
import { getPayload } from 'payload'

import { isSuperAdmin } from '@/access/roles'

/**
 * Admin preview entry point (see `utilities/generatePreviewPath.ts`): checks the preview secret
 * and that a Super Admin is signed in, turns on draft mode, then opens the page.
 */
export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = request.nextUrl
  const path = searchParams.get('path')
  const previewSecret = searchParams.get('previewSecret')

  if (!process.env.PREVIEW_SECRET || previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  // Site paths only: no other hosts, no protocol-relative "//host" URLs.
  if (!path || !path.startsWith('/') || path.startsWith('//')) {
    return new Response('Invalid preview path', { status: 400 })
  }

  const payload = await getPayload({ config })
  const draft = await draftMode()

  let user = null
  try {
    ;({ user } = await payload.auth({ headers: request.headers }))
  } catch (error) {
    payload.logger.error({ err: error }, 'Could not verify the user for preview')
  }

  if (!isSuperAdmin(user)) {
    draft.disable()
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  draft.enable()
  redirect(path)
}
