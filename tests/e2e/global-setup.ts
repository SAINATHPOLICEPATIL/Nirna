/**
 * Seed the LOCAL test database with the initial CMS content before the browser tests run.
 * playwright.config.ts sets NIRNA_DB_TARGET=local, so this never touches Neon.
 */
export default async function globalSetup() {
  if (process.env.NIRNA_DB_TARGET !== 'local') {
    throw new Error('E2E tests must run against the local database (NIRNA_DB_TARGET=local).')
  }
  const { getPayload } = await import('payload')
  const { default: config } = await import('../../src/payload.config')
  const { seedInitialContent } = await import('../../src/seed')
  const payload = await getPayload({ config })
  await seedInitialContent(payload, { log: () => undefined })
}
