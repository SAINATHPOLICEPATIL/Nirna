import type { CollectionSlug } from 'payload'

import type { Locale } from '@/i18n/config'

/**
 * Collections an editor can link to (CMS `link` field and rich-text internal links). Each needs a
 * `slug` field and a public detail page. Keep the rich-text `LinkFeature` lists in
 * `fields/defaultLexical.ts` and `fields/enhancedLexical.ts` in step (they read this list).
 */
export const LINKABLE_COLLECTIONS = [
  'pages',
  'news',
  'events',
  'places',
  'facilities',
] as const satisfies CollectionSlug[]

export type LinkableCollection = (typeof LINKABLE_COLLECTIONS)[number]

/** URL segment of each collection's detail pages, after the locale. */
const PATH_PREFIX: Record<LinkableCollection, string> = {
  pages: '', // Pages live at /<locale>/<slug>
  news: '/news',
  events: '/events',
  places: '/places',
  facilities: '/facilities',
}

/** Public path of a document, e.g. `docPath('news', 'gram-sabha', 'en')` → `/en/news/gram-sabha`. */
export const docPath = (collection: LinkableCollection, slug: string, locale: Locale): string =>
  collection === 'pages' && slug === HOME_SLUG
    ? `/${locale}`
    : `/${locale}${PATH_PREFIX[collection]}/${slug}`

/** Slug of the Pages document rendered at /kn and /en. */
export const HOME_SLUG = 'home'

export const isLinkableCollection = (value: string): value is LinkableCollection =>
  (LINKABLE_COLLECTIONS as readonly string[]).includes(value)
