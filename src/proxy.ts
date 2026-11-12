import { NextResponse, type NextRequest } from 'next/server'

import { defaultLocale, getLocaleFromPathname } from './i18n/config'

/**
 * Next.js 16 proxy (formerly "middleware").
 * Ensures every public page lives under a locale prefix (/kn or /en).
 * Payload admin (/admin), API routes (/api), preview routes (/next/…) and static assets are
 * excluded via `config.matcher`.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (getLocaleFromPathname(pathname)) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    // Everything except admin, api, preview routes (next/preview, next/exit-preview), Next internals,
    // and files with an extension (favicon.ico, images, etc.)
    '/((?!admin|api|next/|_next|.*\\..*).*)',
  ],
}
