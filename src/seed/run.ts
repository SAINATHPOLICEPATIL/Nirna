/**
 * Seed the initial content: `pnpm seed:local` (local Docker DB) or `pnpm seed` (whatever the app
 * is connected to — Neon when .env.local is present). Add `--force` to overwrite Site Settings,
 * Header, Footer and the homepage with the defaults. Other data is never overwritten.
 */
import config from '@payload-config'
import { getPayload } from 'payload'

import { seedInitialContent } from './index'

const payload = await getPayload({ config })
await seedInitialContent(payload, { force: process.argv.includes('--force') })
process.exit(0)
