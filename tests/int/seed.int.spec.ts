import { getPayload, type Payload } from 'payload'
import { beforeAll, describe, expect, it } from 'vitest'

import config from '@/payload.config'
import { seedInitialContent } from '@/seed'

/**
 * The seed fills an empty CMS with the approved content. These tests check what visitors will
 * see is complete in BOTH languages and contains only owner-provided facts. Local DB only.
 */
let payload: Payload

const isKannada = (s: unknown) => typeof s === 'string' && /[ಀ-೿]/.test(s)

/** Collect every { kn, en } pair inside a `locale: 'all'` document. */
function localizedPairs(value: unknown, path = ''): [string, { kn?: unknown; en?: unknown }][] {
  if (Array.isArray(value)) return value.flatMap((v, i) => localizedPairs(v, `${path}[${i}]`))
  if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>
    if ('kn' in obj && 'en' in obj && Object.keys(obj).length === 2) return [[path, obj]]
    return Object.entries(obj).flatMap(([k, v]) => localizedPairs(v, path ? `${path}.${k}` : k))
  }
  return []
}

beforeAll(async () => {
  payload = await getPayload({ config: await config })
  await seedInitialContent(payload, { log: () => undefined })
})

describe('Seeded homepage', () => {
  it('is a published page with the 8 approved blocks in order', async () => {
    const { docs } = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
      overrideAccess: false,
    })
    expect(docs).toHaveLength(1)
    expect(docs[0]!.layout?.map((b) => b.blockType)).toEqual([
      'hero',
      'villageStats',
      'about',
      'explorePlaces',
      'mapPreview',
      'educationHealth',
      'latestNews',
      'developmentPreview',
    ])
  })

  it('has every text in both Kannada and English', async () => {
    const { docs } = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
      locale: 'all',
    })
    const pairs = localizedPairs(docs[0]!.layout)
    expect(pairs.length).toBeGreaterThan(30)
    for (const [path, pair] of pairs) {
      // Fields left empty on purpose (e.g. About text → falls back to Village Profile) are skipped,
      // but a field filled in one language must be filled in the other.
      if (pair.kn == null && pair.en == null) continue
      expect(pair.en, `${path}.en`).toBeTruthy()
      expect(pair.kn, `${path}.kn`).toBeTruthy()
      // Numbers-only labels like "{count}…" still contain Kannada words.
      expect(isKannada(pair.kn), `${path}.kn should be Kannada`).toBe(true)
    }
  })

  it('is idempotent: running the seed again does not duplicate anything', async () => {
    await seedInitialContent(payload, { log: () => undefined })
    expect(
      (await payload.count({ collection: 'pages', where: { slug: { equals: 'home' } } })).totalDocs,
    ).toBe(1)
    expect((await payload.count({ collection: 'complaint-categories' })).totalDocs).toBe(6)
  })
})

describe('Seeded inner pages', () => {
  it('publishes the About and Village Map pages with their blocks', async () => {
    const { docs } = await payload.find({
      collection: 'pages',
      where: { slug: { in: ['about', 'map'] } },
      overrideAccess: false,
      sort: 'slug',
    })
    const bySlug = Object.fromEntries(docs.map((d) => [d.slug, d.layout?.map((b) => b.blockType)]))
    expect(bySlug.about).toEqual([
      'pageHero',
      'villageIntro',
      'mediaText',
      'mediaText',
      'mediaText',
      'locationCard',
    ])
    expect(bySlug.map).toEqual(['pageHero', 'villageMap'])
  })

  it('leaves the village map centre unset (no invented coordinates)', async () => {
    const profile = await payload.findGlobal({ slug: 'village-profile' })
    expect(profile.mapCenterLatitude ?? null).toBeNull()
    expect(profile.mapCenterVerified).toBeFalsy()
  })
})

describe('Seeded village data', () => {
  it('uses only the owner-provided figures, labelled with their source', async () => {
    const profile = await payload.findGlobal({ slug: 'village-profile', locale: 'en' })
    expect(profile).toMatchObject({
      name: 'Nirna',
      population: 9415,
      malePopulation: 4780,
      femalePopulation: 4635,
      households: 1678,
      district: 'Bidar District',
      state: 'Karnataka',
    })
    expect(profile.figuresSource).toMatch(/not verified census/i)
    // No invented contact details.
    expect(profile.contactPhone ?? null).toBeNull()
    expect(profile.contactEmail ?? null).toBeNull()
  })

  it('creates the four named temples as unverified, without photos or coordinates', async () => {
    const { docs } = await payload.find({
      collection: 'places',
      where: { featured: { equals: true } },
      sort: 'sortOrder',
      locale: 'en',
      overrideAccess: false,
    })
    const seeded = docs.filter((d) => d.source?.includes('project owner'))
    expect(seeded.map((d) => d.name)).toEqual([
      'Basaweshwara Temple',
      'Hanuman Temple',
      'Bhuvaneshwari Devi Temple',
      'Hemareddy Mallamma Temple',
    ])
    for (const place of seeded) {
      expect(place.verificationStatus).toBe('unverified')
      expect(place.latitude ?? null).toBeNull()
      expect(place.images ?? []).toHaveLength(0)
    }
  })

  it('adds no news and no map locations', async () => {
    // Tests elsewhere may create their own items; the seed itself never does.
    const seededNews = await payload.count({
      collection: 'news',
      where: { title: { like: 'Sample' } },
    })
    expect(seededNews.totalDocs).toBe(0)
  })

  it('fills the header menu and footer in both languages', async () => {
    const header = await payload.findGlobal({ slug: 'header', locale: 'all' })
    expect(header.navItems).toHaveLength(7)
    for (const [path, pair] of localizedPairs(header.navItems)) {
      expect(pair.en, path).toBeTruthy()
      expect(isKannada(pair.kn), path).toBe(true)
    }
    const footer = await payload.findGlobal({ slug: 'footer', locale: 'en' })
    expect(footer.disclaimer).toMatch(/not an official Gram Panchayat/i)
  })
})
