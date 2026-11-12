import { postgresAdapter } from '@payloadcms/db-postgres'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { ComplaintCategories } from './collections/ComplaintCategories'
import { Departments } from './collections/Departments'
import { Events } from './collections/Events'
import { Facilities } from './collections/Facilities'
import { MapLocations } from './collections/MapLocations'
import { Media } from './collections/Media'
import { News } from './collections/News'
import { Pages } from './collections/Pages'
import { Places } from './collections/Places'
import { Users } from './collections/Users'
import { resolveDatabase } from './db/connection'
import { defaultLexical } from './fields/defaultLexical'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { SiteSettings } from './globals/SiteSettings'
import { VillageProfile } from './globals/VillageProfile'
import { defaultLocale, localeLabels, locales } from './i18n/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

if (!process.env.PAYLOAD_SECRET) {
  throw new Error('PAYLOAD_SECRET is not set. Copy .env.example to .env and fill it in.')
}
const database = resolveDatabase()

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' – NIRNA Admin',
    },
  },
  collections: [
    // Website
    Pages,
    // Village
    Places,
    Facilities,
    MapLocations,
    Departments,
    // Content
    News,
    Events,
    Media,
    // Complaints (categories only; workflow in Phase 4)
    ComplaintCategories,
    // Settings
    Users,
  ],
  globals: [SiteSettings, Header, Footer, VillageProfile],
  editor: defaultLexical,
  // Content localization (Kannada + English) — see requirements §7.
  // fallback: false so missing Kannada text is visible as missing, not silently replaced (§7.4).
  localization: {
    locales: locales.map((code) => ({ code, label: localeLabels[code] })),
    defaultLocale,
    fallback: false,
  },
  secret: process.env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: database.connectionString,
    },
    // Schema push only against the local Docker DB. Neon (production branch) uses migrations.
    push: database.push,
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  sharp,
  plugins: [],
})
