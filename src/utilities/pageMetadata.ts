import type { Metadata } from 'next'

import { locales, localeTags, type Locale } from '@/i18n/config'
import type { Page } from '@/payload-types'

/** Per-page title/description (from the page's SEO fields) + canonical and hreflang links. */
export function pageMetadata(page: Page | null, locale: Locale, path: string): Metadata {
  const suffix = path === '/' ? '' : path
  return {
    ...(page?.seo?.title ? { title: page.seo.title } : page?.title ? { title: page.title } : {}),
    ...(page?.seo?.description ? { description: page.seo.description } : {}),
    alternates: {
      canonical: `/${locale}${suffix}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [localeTags[l], `/${l}${suffix}`])),
        'x-default': `/kn${suffix}`,
      },
    },
  }
}
