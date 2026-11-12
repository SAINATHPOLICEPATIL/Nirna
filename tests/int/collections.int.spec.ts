import { getPayload, type Payload } from 'payload'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import type { User } from '@/payload-types'
import config from '@/payload.config'

/**
 * Server-side access control and data-integrity rules for the content collections
 * (requirements §10, §14, §21.3). Runs against the LOCAL Docker database only.
 */
let payload: Payload
let admin: User
let resident: User
const run = Date.now().toString(36)
const created: { collection: Parameters<Payload['delete']>[0]['collection']; id: number }[] = []

const track = <T extends { id: number }>(
  collection: (typeof created)[number]['collection'],
  doc: T,
) => {
  created.push({ collection, id: doc.id })
  return doc
}

beforeAll(async () => {
  payload = await getPayload({ config: await config })
  admin = track(
    'users',
    await payload.create({
      collection: 'users',
      data: {
        email: `admin-${run}@test.local`,
        password: `pw-${run}-A!`,
        name: 'Test Super Admin',
        role: 'super-admin',
        accountStatus: 'active',
      },
    }),
  )
  resident = track(
    'users',
    await payload.create({
      collection: 'users',
      data: {
        email: `resident-${run}@test.local`,
        password: `pw-${run}-R!`,
        name: 'Test Resident',
        role: 'resident',
        accountStatus: 'active',
      },
    }),
  )
})

afterAll(async () => {
  for (const { collection, id } of created.reverse()) {
    await payload.delete({ collection, id }).catch(() => undefined)
  }
})

const asUser = (user: User | null) => ({ overrideAccess: false, user })

/** Payload's ValidationError keeps each field's own message in `data.errors`. */
async function validationMessages(promise: Promise<unknown>): Promise<string> {
  try {
    await promise
  } catch (err) {
    const errors = (err as { data?: { errors?: { message: string }[] } }).data?.errors ?? []
    return errors.map((e) => e.message).join(' | ')
  }
  throw new Error('Expected the operation to be rejected')
}

describe('Places: drafts, publication and access', () => {
  it('blocks anonymous visitors and residents from creating content', async () => {
    const data = {
      name: `Blocked ${run}`,
      slug: `blocked-${run}`,
      category: 'temple' as const,
      verificationStatus: 'unverified' as const,
    }
    await expect(
      payload.create({ collection: 'places', data, locale: 'en', ...asUser(null) }),
    ).rejects.toThrow()
    await expect(
      payload.create({ collection: 'places', data, locale: 'en', ...asUser(resident) }),
    ).rejects.toThrow()
  })

  it('generates the slug from the English name and hides drafts from the public', async () => {
    const draft = track(
      'places',
      await payload.create({
        collection: 'places',
        locale: 'en',
        draft: true,
        data: { name: `Test Temple ${run}`, category: 'temple' },
        ...asUser(admin),
      }),
    )
    expect(draft.slug).toBe(`test-temple-${run}`)

    const publicFind = await payload.find({
      collection: 'places',
      where: { id: { equals: draft.id } },
      ...asUser(null),
    })
    expect(publicFind.docs).toHaveLength(0)

    await payload.update({
      collection: 'places',
      id: draft.id,
      locale: 'en',
      data: { _status: 'published' },
      ...asUser(admin),
    })
    const afterPublish = await payload.find({
      collection: 'places',
      where: { id: { equals: draft.id } },
      ...asUser(null),
    })
    expect(afterPublish.docs).toHaveLength(1)
  })

  it('stores Kannada and English names separately (no silent fallback)', async () => {
    const place = track(
      'places',
      await payload.create({
        collection: 'places',
        locale: 'en',
        data: {
          name: `Bilingual ${run}`,
          slug: `bilingual-${run}`,
          verificationStatus: 'unverified',
          category: 'landmark',
          _status: 'published',
        },
        ...asUser(admin),
      }),
    )
    const kn = await payload.findByID({ collection: 'places', id: place.id, locale: 'kn' })
    expect(kn.name ?? null).toBeNull()
    await payload.update({
      collection: 'places',
      id: place.id,
      locale: 'kn',
      data: { name: 'ಪರೀಕ್ಷಾ ಸ್ಥಳ' },
      ...asUser(admin),
    })
    const both = await payload.findByID({ collection: 'places', id: place.id, locale: 'all' })
    expect(both.name).toEqual({ en: `Bilingual ${run}`, kn: 'ಪರೀಕ್ಷಾ ಸ್ಥಳ' })
  })

  it('rejects "verified" coordinates when no coordinates were entered', async () => {
    expect(
      await validationMessages(
        payload.create({
          collection: 'places',
          locale: 'en',
          data: {
            name: `NoCoords ${run}`,
            slug: `nocoords-${run}`,
            verificationStatus: 'unverified',
            category: 'temple',
            coordinatesVerified: true,
            _status: 'published',
          },
          ...asUser(admin),
        }),
      ),
    ).toMatch(/latitude and longitude/i)
  })

  it('rejects out-of-range coordinates', async () => {
    await expect(
      payload.create({
        collection: 'places',
        locale: 'en',
        data: {
          name: `BadLat ${run}`,
          slug: `badlat-${run}`,
          verificationStatus: 'unverified',
          category: 'temple',
          latitude: 123,
          longitude: 77,
          _status: 'published',
        },
        ...asUser(admin),
      }),
    ).rejects.toThrow()
  })
})

describe('Map locations', () => {
  const base = { category: 'temple' as const, latitude: 17.9, longitude: 77.5 }

  it('cannot be published with unverified coordinates', async () => {
    expect(
      await validationMessages(
        payload.create({
          collection: 'map-locations',
          locale: 'en',
          data: {
            ...base,
            name: `Unverified ${run}`,
            coordinatesVerified: false,
            _status: 'published',
          },
          ...asUser(admin),
        }),
      ),
    ).toMatch(/verified before/i)
  })

  it('can be saved as a draft while unverified, and published once verified', async () => {
    const draft = track(
      'map-locations',
      await payload.create({
        collection: 'map-locations',
        locale: 'en',
        draft: true,
        data: { ...base, name: `Pending ${run}` },
        ...asUser(admin),
      }),
    )
    const published = await payload.update({
      collection: 'map-locations',
      id: draft.id,
      locale: 'en',
      data: { coordinatesVerified: true, coordinatesSource: 'Test', _status: 'published' },
      ...asUser(admin),
    })
    expect(published._status).toBe('published')
  })
})

describe('Events', () => {
  it('rejects an end date before the start date', async () => {
    expect(
      await validationMessages(
        payload.create({
          collection: 'events',
          locale: 'en',
          data: {
            name: `Backwards ${run}`,
            slug: `backwards-${run}`,
            startDate: '2026-12-10T10:00:00.000Z',
            endDate: '2026-12-09T10:00:00.000Z',
            _status: 'published',
          },
          ...asUser(admin),
        }),
      ),
    ).toMatch(/end date must be on or after/i)
  })
})

describe('News', () => {
  it('records the author and sets the publication date on first publish', async () => {
    const item = track(
      'news',
      await payload.create({
        collection: 'news',
        locale: 'en',
        data: {
          title: `Test news ${run}`,
          slug: `test-news-${run}`,
          type: 'announcement',
          _status: 'published',
        },
        ...asUser(admin),
      }),
    )
    const author = typeof item.author === 'object' ? item.author?.id : item.author
    expect(author).toBe(admin.id)
    expect(item.publishedDate).toBeTruthy()
  })
})

describe('Users and roles', () => {
  it('a resident cannot promote themself', async () => {
    const updated = await payload.update({
      collection: 'users',
      id: resident.id,
      data: { role: 'super-admin' },
      ...asUser(resident),
    })
    expect(updated.role).toBe('resident')
  })

  it("a resident cannot read other users' accounts", async () => {
    const result = await payload.find({ collection: 'users', ...asUser(resident) })
    expect(result.docs.map((u) => u.id)).toEqual([resident.id])
  })

  it('a resident cannot create accounts', async () => {
    await expect(
      payload.create({
        collection: 'users',
        data: {
          email: `x-${run}@test.local`,
          password: 'x-Passw0rd!',
          name: 'X',
          role: 'resident',
          accountStatus: 'active',
        },
        ...asUser(resident),
      }),
    ).rejects.toThrow()
  })

  it('a suspended account cannot sign in', async () => {
    const email = `suspended-${run}@test.local`
    const password = `pw-${run}-S!`
    track(
      'users',
      await payload.create({
        collection: 'users',
        data: { email, password, name: 'Suspended', role: 'resident', accountStatus: 'suspended' },
      }),
    )
    await expect(payload.login({ collection: 'users', data: { email, password } })).rejects.toThrow(
      /suspended/i,
    )
  })
})

describe('Village Profile', () => {
  it('is publicly readable but only the Super Admin can edit it', async () => {
    await expect(
      payload.findGlobal({ slug: 'village-profile', ...asUser(null) }),
    ).resolves.toBeTruthy()
    await expect(
      payload.updateGlobal({
        slug: 'village-profile',
        locale: 'en',
        data: { name: 'Hacked' },
        ...asUser(resident),
      }),
    ).rejects.toThrow()
  })
})
