import { describe, expect, it } from 'vitest'

import { resolveDatabase } from '@/db/connection'

// Fake placeholder URLs only — no real credentials.
const NEON_POOLED = 'postgres://u:p@ep-x-pooler.example/db'
const NEON_DIRECT = 'postgres://u:p@ep-x.example/db'
const LOCAL = 'postgres://nirna:p@localhost:5433/nirna'

describe('resolveDatabase', () => {
  it('uses the pooled Neon URL for app traffic, with schema push disabled', () => {
    const db = resolveDatabase({
      DATABASE_URL: NEON_POOLED,
      DATABASE_URL_UNPOOLED: NEON_DIRECT,
      DATABASE_URI: LOCAL,
    })
    expect(db).toEqual({ connectionString: NEON_POOLED, kind: 'neon', push: false })
  })

  it('uses the direct Neon URL for migrations', () => {
    const db = resolveDatabase({
      DATABASE_URL: NEON_POOLED,
      DATABASE_URL_UNPOOLED: NEON_DIRECT,
      NIRNA_DB_DIRECT: '1',
    })
    expect(db.connectionString).toBe(NEON_DIRECT)
    expect(db.push).toBe(false)
  })

  it('refuses to run migrations over the pooler when the direct URL is missing', () => {
    expect(() => resolveDatabase({ DATABASE_URL: NEON_POOLED, NIRNA_DB_DIRECT: '1' })).toThrow(
      /UNPOOLED/,
    )
  })

  it('NIRNA_DB_TARGET=local forces the local DB even when Neon is configured', () => {
    const db = resolveDatabase({
      DATABASE_URL: NEON_POOLED,
      DATABASE_URI: LOCAL,
      NIRNA_DB_TARGET: 'local',
      NODE_ENV: 'development',
    })
    expect(db).toEqual({ connectionString: LOCAL, kind: 'local', push: true })
  })

  it('falls back to local Docker when no Neon URL is set', () => {
    expect(resolveDatabase({ DATABASE_URI: LOCAL, NODE_ENV: 'development' }).kind).toBe('local')
  })

  it('never pushes schema in production, even locally', () => {
    expect(resolveDatabase({ DATABASE_URI: LOCAL, NODE_ENV: 'production' }).push).toBe(false)
  })

  it('throws when nothing is configured', () => {
    expect(() => resolveDatabase({})).toThrow(/No database configured/)
  })
})
