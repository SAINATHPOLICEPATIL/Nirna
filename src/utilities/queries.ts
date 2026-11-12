import 'server-only'

import config from '@payload-config'
import { getPayload, type Where } from 'payload'
import { cache } from 'react'

import type { Locale } from '@/i18n/config'
import { getPreviewUser } from '@/utilities/preview'

/**
 * Public data access for the website. Every query runs with `overrideAccess: false` and no
 * user, so Payload applies the PUBLIC access rules — only published content is returned.
 * `cache()` de-duplicates identical calls within one render (layout + page + blocks).
 */
const getPayloadClient = cache(async () => getPayload({ config }))

const publicQuery = { overrideAccess: false, fallbackLocale: false } as const

/**
 * Public rules, except in an editor's preview (draft mode, Super Admin signed in): then the
 * latest draft, read with that editor's access. See `utilities/preview.ts`.
 */
const previewableQuery = async () => {
  const user = await getPreviewUser()
  return user ? { ...publicQuery, draft: true, user } : publicQuery
}

export const getSiteSettings = cache(async (locale: Locale) =>
  (await getPayloadClient()).findGlobal({
    slug: 'site-settings',
    locale,
    depth: 1,
    ...publicQuery,
  }),
)

export const getHeader = cache(async (locale: Locale) =>
  (await getPayloadClient()).findGlobal({ slug: 'header', locale, depth: 1, ...publicQuery }),
)

export const getFooter = cache(async (locale: Locale) =>
  (await getPayloadClient()).findGlobal({ slug: 'footer', locale, depth: 1, ...publicQuery }),
)

export const getVillageProfile = cache(async (locale: Locale) =>
  (await getPayloadClient()).findGlobal({
    slug: 'village-profile',
    locale,
    depth: 1,
    ...publicQuery,
  }),
)

export const getPageBySlug = cache(async (slug: string, locale: Locale) => {
  const result = await (
    await getPayloadClient()
  ).find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    locale,
    depth: 2,
    limit: 1,
    pagination: false,
    ...(await previewableQuery()),
  })
  return result.docs[0] ?? null
})

export const getPublishedPageSlugs = cache(async () => {
  const result = await (
    await getPayloadClient()
  ).find({
    collection: 'pages',
    depth: 0,
    limit: 200,
    pagination: false,
    select: { slug: true },
    ...publicQuery,
  })
  return result.docs.map((doc) => doc.slug)
})

export const getPlaces = cache(
  async (locale: Locale, options: { featuredOnly?: boolean; ids?: number[]; limit: number }) => {
    const where: Where = options.ids?.length
      ? { id: { in: options.ids } }
      : options.featuredOnly
        ? { featured: { equals: true } }
        : {}
    const result = await (
      await getPayloadClient()
    ).find({
      collection: 'places',
      where,
      locale,
      depth: 1,
      limit: options.limit,
      sort: ['sortOrder', 'createdAt'],
      ...publicQuery,
    })
    if (!options.ids?.length) return result.docs
    // Keep the editor's chosen order.
    const byId = new Map(result.docs.map((doc) => [doc.id, doc]))
    return options.ids.map((id) => byId.get(id)).filter((doc) => doc !== undefined)
  },
)

/** The other language's names, for the small second line on place cards. */
export const getPlaceNames = cache(async (locale: Locale, ids: number[]) => {
  if (!ids.length) return new Map<number, string>()
  const result = await (
    await getPayloadClient()
  ).find({
    collection: 'places',
    where: { id: { in: ids } },
    locale,
    depth: 0,
    limit: ids.length,
    select: { name: true },
    ...publicQuery,
  })
  return new Map(result.docs.map((doc) => [doc.id, doc.name]))
})

export const getLatestNews = cache(async (locale: Locale, limit: number) => {
  const result = await (
    await getPayloadClient()
  ).find({
    collection: 'news',
    locale,
    depth: 0,
    limit,
    sort: '-publishedDate',
    select: { title: true, slug: true, publishedDate: true },
    ...publicQuery,
  })
  return result.docs
})

/** Published map markers are verified by validation, so a count is all the preview needs. */
export const countMapLocations = cache(async () => {
  const result = await (
    await getPayloadClient()
  ).count({ collection: 'map-locations', ...publicQuery })
  return result.totalDocs
})

/**
 * Markers for the village map: PUBLISHED map locations only (publishing requires verified
 * coordinates), with the linked Place/Facility populated for its slug and first photo.
 */
export const getMapLocations = cache(async (locale: Locale) => {
  const result = await (
    await getPayloadClient()
  ).find({
    collection: 'map-locations',
    locale,
    depth: 2,
    limit: 500,
    pagination: false,
    sort: 'name',
    ...publicQuery,
  })
  return result.docs
})
