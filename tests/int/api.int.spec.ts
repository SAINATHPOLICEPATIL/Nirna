import { getPayload, type Payload } from 'payload'
import { beforeAll, describe, expect, it } from 'vitest'

import config from '@/payload.config'

let payload: Payload

describe('Payload (local API, real Postgres)', () => {
  beforeAll(async () => {
    payload = await getPayload({ config: await config })
  })

  it('connects to the database and queries users', async () => {
    const users = await payload.find({ collection: 'users', limit: 1 })
    expect(users).toHaveProperty('docs')
  })

  it('is configured for Kannada and English localization', () => {
    const localization = payload.config.localization
    expect(localization).toBeTruthy()
    if (!localization) return
    expect(localization.localeCodes).toEqual(['kn', 'en'])
    expect(localization.defaultLocale).toBe('kn')
    expect(localization.fallback).toBe(false)
  })

  it('denies unauthenticated user listing through access control', async () => {
    await expect(
      payload.find({ collection: 'users', overrideAccess: false, user: null }),
    ).rejects.toThrow()
  })
})
