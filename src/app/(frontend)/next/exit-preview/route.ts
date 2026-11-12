import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

/** Turns draft mode off, then returns to `?path=` (a site path) or the homepage. */
export async function GET(request: NextRequest): Promise<Response> {
  ;(await draftMode()).disable()
  const path = request.nextUrl.searchParams.get('path')
  redirect(path && path.startsWith('/') && !path.startsWith('//') ? path : '/')
}
