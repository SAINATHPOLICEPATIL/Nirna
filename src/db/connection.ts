/**
 * Chooses which Postgres the app talks to.
 *
 * - Neon (hosted): `DATABASE_URL` (pooled, via PgBouncer) and `DATABASE_URL_UNPOOLED` (direct).
 *   Written to `.env.local` by `neon env pull`. App traffic uses the pooled URL; schema
 *   migrations use the direct URL, because PgBouncer's transaction mode does not keep
 *   session state (see Neon's pooled-vs-direct guidance).
 * - Local Docker: `DATABASE_URI` in `.env`. Used when no Neon URL is set (and always by tests).
 *
 * Automatic schema push is ONLY allowed against the local database. The linked Neon branch
 * is `production`, so its schema changes must go through `pnpm migrate`.
 */
export type DatabaseTarget = {
  connectionString: string
  kind: 'neon' | 'local'
  /** Let Payload push schema changes automatically (dev only, local DB only). */
  push: boolean
}

type Env = Record<string, string | undefined>

export function resolveDatabase(env: Env = process.env): DatabaseTarget {
  const pooled = env.DATABASE_URL
  const direct = env.DATABASE_URL_UNPOOLED
  const local = env.DATABASE_URI

  // Tests (and `pnpm dev:local`) set NIRNA_DB_TARGET=local so they never touch Neon.
  if (env.NIRNA_DB_TARGET === 'local') {
    if (!local)
      throw new Error('NIRNA_DB_TARGET=local but DATABASE_URI is not set (see .env.example).')
    return { connectionString: local, kind: 'local', push: env.NODE_ENV !== 'production' }
  }

  if (pooled) {
    // `pnpm migrate*` sets NIRNA_DB_DIRECT=1 so migrations bypass the pooler.
    const useDirect = env.NIRNA_DB_DIRECT === '1'
    if (useDirect && !direct) {
      throw new Error(
        'NIRNA_DB_DIRECT=1 but DATABASE_URL_UNPOOLED is not set. Run `neon env pull --file .env.local`.',
      )
    }
    return { connectionString: useDirect ? direct! : pooled, kind: 'neon', push: false }
  }

  if (local) {
    return { connectionString: local, kind: 'local', push: env.NODE_ENV !== 'production' }
  }

  throw new Error(
    'No database configured. Set DATABASE_URL (Neon, via `neon env pull --file .env.local`) or DATABASE_URI (local Docker, see .env.example).',
  )
}
