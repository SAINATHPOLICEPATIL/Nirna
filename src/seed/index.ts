import type { Payload, PayloadRequest } from 'payload'

import type { Locale } from '../i18n/config'

import * as content from './content'

type Link = { url: string; label: content.L }

/** A `link()` field value for one locale. */
const linkValue = (link: Link, locale: Locale) => ({
  type: 'custom' as const,
  url: link.url,
  newTab: false,
  label: link.label[locale],
})

/** `{ heading: { kn, en } }` → `{ heading: '…' }` for one locale. */
const pick = (obj: Partial<Record<string, content.L>> | undefined, locale: Locale) =>
  Object.fromEntries(
    Object.entries(obj ?? {}).flatMap(([k, v]) => (v ? [[k, v[locale]]] : [])),
  ) as Record<string, string>

/**
 * Copy array/block row ids from the Kannada result onto the English data, by position, so
 * the English update fills in the same rows instead of replacing them.
 */
function withIds<T>(data: T, saved: unknown): T {
  if (Array.isArray(data) && Array.isArray(saved)) {
    return data.map((item, i) => withIds(item, saved[i])) as T
  }
  if (data && typeof data === 'object' && saved && typeof saved === 'object') {
    const out: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(data)) {
      out[key] = withIds(value, (saved as Record<string, unknown>)[key])
    }
    const id = (saved as { id?: unknown }).id
    if (id !== undefined && !Array.isArray(data) && 'blockType' in data) out.id = id
    if (id !== undefined && !('blockType' in data) && typeof id === 'string') out.id = id
    return out as T
  }
  return data
}

type Options = {
  /** Overwrite existing site settings, header, footer and homepage. Never touches other data. */
  force?: boolean
  log?: (message: string) => void
  req?: Partial<PayloadRequest>
}

/**
 * Fill an EMPTY database with the approved initial content. Safe to run repeatedly:
 * anything that already exists is left untouched (unless `force` for the website globals/home).
 */
export async function seedInitialContent(
  payload: Payload,
  { force = false, log = console.log }: Options = {},
) {
  const context = { disableRevalidate: true }
  const locales: Locale[] = ['kn', 'en']

  // --- Site Settings ---------------------------------------------------------------------
  const settings = await payload.findGlobal({ slug: 'site-settings', locale: 'kn' })
  if (force || !settings.siteName) {
    for (const locale of locales) {
      await payload.updateGlobal({
        slug: 'site-settings',
        locale,
        context,
        data: {
          siteName: content.siteSettings.siteName[locale],
          siteDescription: content.siteSettings.siteDescription[locale],
          logoTitle: content.siteSettings.logoTitle,
          logoSubtitle: content.siteSettings.logoSubtitle[locale],
        },
      })
    }
    log('✓ Site Settings')
  } else log('• Site Settings already filled — skipped')

  // --- Header ----------------------------------------------------------------------------
  const header = await payload.findGlobal({ slug: 'header', locale: 'kn' })
  if (force || !header.navItems?.length) {
    const rows = (locale: Locale) =>
      content.navItems.map((link) => ({ link: linkValue(link, locale) }))
    const kn = await payload.updateGlobal({
      slug: 'header',
      locale: 'kn',
      context,
      data: { navItems: rows('kn') },
    })
    await payload.updateGlobal({
      slug: 'header',
      locale: 'en',
      context,
      data: { navItems: withIds(rows('en'), kn.navItems) },
    })
    log('✓ Header menu')
  } else log('• Header menu already filled — skipped')

  // --- Footer ----------------------------------------------------------------------------
  const footer = await payload.findGlobal({ slug: 'footer', locale: 'kn' })
  if (force || !footer.columns?.length) {
    const data = (locale: Locale) => ({
      columns: content.footer.columns.map((col) => ({
        title: col.title[locale],
        links: col.links.map((link) => ({ link: linkValue(link, locale) })),
      })),
      disclaimer: content.footer.disclaimer[locale],
      copyright: content.footer.copyright[locale],
    })
    const kn = await payload.updateGlobal({
      slug: 'footer',
      locale: 'kn',
      context,
      data: data('kn'),
    })
    const en = data('en')
    await payload.updateGlobal({
      slug: 'footer',
      locale: 'en',
      context,
      data: { ...en, columns: withIds(en.columns, kn.columns) },
    })
    log('✓ Footer')
  } else log('• Footer already filled — skipped')

  // --- Village Profile (owner-provided figures) -----------------------------------------
  const profile = await payload.findGlobal({ slug: 'village-profile', locale: 'kn' })
  if (!profile.name) {
    for (const locale of locales) {
      await payload.updateGlobal({
        slug: 'village-profile',
        locale,
        context,
        data: {
          ...pick(content.villageProfile.localized, locale),
          ...content.villageProfile.shared,
        },
      })
    }
    log('✓ Village Profile (owner-provided figures, marked as not verified census data)')
  } else log('• Village Profile already filled — skipped')

  // --- Places (names only; unverified) ----------------------------------------------------
  for (const place of content.places) {
    const existing = await payload.find({
      collection: 'places',
      where: { slug: { equals: place.slug } },
      limit: 1,
      draft: true,
    })
    if (existing.docs.length) continue
    const { name, ...rest } = place
    const created = await payload.create({
      collection: 'places',
      locale: 'kn',
      context,
      data: { ...rest, name: name.kn, _status: 'published' },
    })
    await payload.update({
      collection: 'places',
      id: created.id,
      locale: 'en',
      context,
      data: { name: name.en },
    })
    log(`✓ Place: ${name.en}`)
  }

  // --- Complaint categories ---------------------------------------------------------------
  const categories = await payload.count({ collection: 'complaint-categories' })
  if (categories.totalDocs === 0) {
    for (const [i, name] of content.complaintCategories.entries()) {
      const created = await payload.create({
        collection: 'complaint-categories',
        locale: 'kn',
        context,
        data: { name: name.kn, status: 'active', sortOrder: (i + 1) * 10 },
      })
      await payload.update({
        collection: 'complaint-categories',
        id: created.id,
        locale: 'en',
        context,
        data: { name: name.en },
      })
    }
    log(`✓ ${content.complaintCategories.length} complaint categories`)
  } else log('• Complaint categories already exist — skipped')

  // --- Pages (homepage, About, Village Map) ------------------------------------------------
  for (const page of [content.homePage, content.aboutPage, content.mapPage]) {
    await seedPage(payload, page, { force: force && page.slug === 'home', context, log })
  }
}

type SeedPage = {
  slug: string
  title: content.L
  blocks: readonly {
    blockType: string
    shared?: Record<string, unknown>
    localized?: Partial<Record<string, content.L>>
    cta?: Link
    viewAll?: Link
  }[]
}

/** Create a published page in Kannada, then fill the same blocks in English. */
async function seedPage(
  payload: Payload,
  page: SeedPage,
  {
    force,
    context,
    log,
  }: { force: boolean; context: Record<string, unknown>; log: (m: string) => void },
) {
  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: page.slug } },
    limit: 1,
    draft: true,
  })
  if (existing.docs.length && !force) {
    log(`• Page "${page.title.en}" already exists — skipped`)
    return
  }

  const layout = (locale: Locale) =>
    page.blocks.map((block) => {
      const out: Record<string, unknown> = {
        blockType: block.blockType,
        ...(block.shared ?? {}),
        ...pick(block.localized, locale),
      }
      if (block.cta) out.cta = linkValue(block.cta, locale)
      if (block.viewAll) out.viewAll = linkValue(block.viewAll, locale)
      return out
    })

  const knData = {
    title: page.title.kn,
    slug: page.slug,
    _status: 'published' as const,
    layout: layout('kn'),
  }

  // The layout union is wide; the seed data matches it block by block.
  const saved = existing.docs[0]
    ? await payload.update({
        collection: 'pages',
        id: existing.docs[0].id,
        locale: 'kn',
        context,
        data: knData as never,
      })
    : await payload.create({ collection: 'pages', locale: 'kn', context, data: knData as never })

  await payload.update({
    collection: 'pages',
    id: saved.id,
    locale: 'en',
    context,
    data: { title: page.title.en, layout: withIds(layout('en'), saved.layout) } as never,
  })
  log(`✓ Page "${page.title.en}" (${page.blocks.length} blocks)`)
}
