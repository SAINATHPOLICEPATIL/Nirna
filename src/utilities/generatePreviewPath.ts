import type { CollectionConfig } from 'payload'

import { defaultLocale, isLocale, type Locale } from '@/i18n/config'
import { docPath, type LinkableCollection } from '@/utilities/routes'

/**
 * The preview URL for a site path: `/next/preview` checks the editor, turns on draft mode and
 * then opens the path. Going straight to the page would show the published version and never
 * mount the live-preview listener.
 */
export const previewUrl = (path: string): string => {
  const params = new URLSearchParams({
    path,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })
  return `/next/preview?${params.toString()}`
}

/** Preview URL of a document in one language; null (no preview button) until it has a slug. */
export const generatePreviewPath = ({
  collection,
  slug,
  locale,
}: {
  collection: LinkableCollection
  slug: unknown
  locale: unknown
}): string | null => {
  if (typeof slug !== 'string' || !slug) return null
  const language: Locale = isLocale(locale) ? locale : defaultLocale
  return previewUrl(docPath(collection, slug, language))
}

/**
 * Admin `preview` (the Preview button) and `livePreview` (side-by-side iframe) for a collection,
 * opening the page in the language the editor is currently editing.
 *
 * Usage: `admin: { ...previewAdmin('news'), useAsTitle: 'title' }`
 */
export const previewAdmin = (
  collection: LinkableCollection,
): Pick<NonNullable<CollectionConfig['admin']>, 'livePreview' | 'preview'> => ({
  livePreview: {
    // Device sizes in the live preview toolbar ("Responsive" is always there too).
    breakpoints: [
      { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
      { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
      { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
    ],
    url: ({ data, locale, req }) =>
      generatePreviewPath({ collection, slug: data?.slug, locale: locale?.code ?? req.locale }),
  },
  preview: (data, { locale, req }) =>
    generatePreviewPath({ collection, slug: data?.slug, locale: locale || req.locale }),
})
