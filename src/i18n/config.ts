/**
 * Single source of truth for supported locales.
 * Used by the Next.js proxy (routing), the frontend layouts, and Payload localization.
 */
export const locales = ['kn', 'en'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'kn'

export const localeLabels: Record<Locale, string> = {
  kn: 'ಕನ್ನಡ',
  en: 'English',
}

/** BCP 47 tags for <html lang> and hreflang. */
export const localeTags: Record<Locale, string> = {
  kn: 'kn-IN',
  en: 'en-IN',
}

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value)
}

/** Returns the locale prefix of a pathname, e.g. `/en/about` → `en`. */
export function getLocaleFromPathname(pathname: string): Locale | null {
  const segment = pathname.split('/')[1]
  return isLocale(segment) ? segment : null
}

/**
 * Swaps (or adds) the locale prefix of a pathname so the language switcher
 * keeps visitors on the equivalent page, e.g. `/kn/about` → `/en/about`.
 */
export function switchLocaleInPathname(pathname: string, target: Locale): string {
  const segments = pathname.split('/')
  if (isLocale(segments[1])) {
    segments[1] = target
    return segments.join('/') || `/${target}`
  }
  const rest = pathname === '/' ? '' : pathname
  return `/${target}${rest}`
}
