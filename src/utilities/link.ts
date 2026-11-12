import type { PayloadLinkType } from '@/components/Link'
import { getLocaleFromPathname, type Locale } from '@/i18n/config'
import { docPath } from '@/utilities/routes'

type ResolvableLink = Pick<PayloadLinkType, 'reference' | 'type' | 'url'>

/** Internal route (with the locale prefix) for a referenced document, or the custom URL. */
export const resolveLink = (
  link: ResolvableLink | null | undefined,
  locale: Locale,
): string | undefined => {
  if (!link) return undefined

  const value = link.reference?.value

  if (link.type === 'reference' && link.reference && typeof value === 'object' && value?.slug) {
    // An unpublished target would 404.
    if ('_status' in value && value._status === 'draft') return undefined
    return docPath(link.reference.relationTo, value.slug, locale)
  }

  return localizeUrl(link.url, locale)
}

/**
 * Site paths are stored without a language ("/about") so one link serves both languages;
 * add the page's locale. Full URLs, anchors, mailto/tel and already-prefixed paths pass through.
 */
export const localizeUrl = (url: string | null | undefined, locale: Locale): string | undefined => {
  if (!url) return undefined
  if (!url.startsWith('/') || url.startsWith('//')) return url
  if (getLocaleFromPathname(url)) return url
  return url === '/' ? `/${locale}` : `/${locale}${url}`
}
