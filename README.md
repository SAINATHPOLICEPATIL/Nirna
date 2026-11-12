# NIRNA Digital Village

A bilingual (Kannada / English) information platform for Nirna village, Bidar district, Karnataka.

> NIRNA Digital Village is an **independently operated** village information platform. It is not an
> official Gram Panchayat or government website.

**Current status: Phase 2 (CMS-driven site).** All visible content (homepage blocks, menu,
footer, site name, village figures, places, news) is authored in Payload. Code holds only
accessibility and system text (`src/i18n/dictionaries`).

## Stack

| Layer     | Technology                                                             |
| --------- | ---------------------------------------------------------------------- |
| Frontend  | Next.js 16 (App Router), React 19                                      |
| CMS / API | Payload CMS 3.93 (installed inside the same Next.js app)               |
| Database  | PostgreSQL 17 (`@payloadcms/db-postgres`, Drizzle under the hood)      |
| Styling   | Tailwind CSS 4, with design tokens in `src/app/(frontend)/globals.css` |
| Testing   | Vitest (unit and integration) and Playwright (e2e, desktop and mobile) |
| Tooling   | TypeScript (strict), ESLint 9 (flat config), Prettier                  |
| Runtime   | Node.js `^22.23.4` or `>=24.22.1`, pnpm 9 to 11                        |

The app is a modular monolith: one Next.js app serves the public site (`/kn`, `/en`), the admin
panel (`/admin`) and the REST/GraphQL API (`/api`).

## Getting started

Prerequisites: Node.js, pnpm, and Docker (used only for the local Postgres).

```bash
cp .env.example .env          # then fill in the values (see below)
pnpm install
pnpm db:up                    # starts Postgres 17 on 127.0.0.1:5433
pnpm dev                      # http://localhost:3000
```

- Public site: http://localhost:3000. It redirects to `/kn`.
- Admin: http://localhost:3000/admin. On first visit you create the first admin user.

### Environment variables

| Variable                 | Purpose                                                            |
| ------------------------ | ------------------------------------------------------------------ |
| `DATABASE_URL`           | Neon pooled URL (app traffic). In `.env.local`, written by Neon    |
| `DATABASE_URL_UNPOOLED`  | Neon direct URL (migrations). In `.env.local`, written by Neon     |
| `DATABASE_URI`           | Local Docker Postgres URL (tests, `pnpm dev:local`)                |
| `POSTGRES_PASSWORD`      | Password for the local Docker Postgres. Must match `DATABASE_URI`  |
| `POSTGRES_PORT`          | Host port for the local Postgres (default `5433`)                  |
| `PAYLOAD_SECRET`         | Long random string that signs auth tokens (`openssl rand -hex 32`) |
| `NEXT_PUBLIC_SERVER_URL` | Base URL of the app (production: `https://nirna.in`)               |
| `NEXT_PUBLIC_SITE_URL`   | Canonical public URL, used for SEO metadata                        |

Storage and email variables will be added once those providers are chosen. `.env` is gitignored.
Never commit secrets.

## Scripts

| Command                                           | What it does                                                         |
| ------------------------------------------------- | -------------------------------------------------------------------- |
| `pnpm dev` / `pnpm build` / `pnpm start`          | Next.js dev server / production build / serve build                  |
| `pnpm dev:local`                                  | Dev server forced onto the local Docker DB (ignores Neon)            |
| `pnpm db:up` / `pnpm db:down`                     | Start / stop the local Postgres container                            |
| `pnpm typecheck`                                  | Generate Next route types, then run `tsc --noEmit`                   |
| `pnpm lint` / `pnpm format` / `pnpm format:check` | ESLint / Prettier                                                    |
| `pnpm test:unit`                                  | Unit tests (no database needed)                                      |
| `pnpm test:int`                                   | Integration tests against the local Postgres                         |
| `pnpm test:e2e`                                   | Playwright tests (starts `pnpm dev:local`)                           |
| `pnpm generate:types`                             | Regenerate `src/payload-types.ts` after schema changes               |
| `pnpm generate:importmap`                         | Regenerate the admin import map after adding custom admin components |
| `pnpm migrate:create` / `pnpm migrate`            | Create / run database migrations                                     |

First-time e2e setup: `pnpm exec playwright install chromium`.

### Database: Neon and local Docker

The project is linked to Neon (`.neon`, `neon.ts`) on the **`production`** branch.
`neon env pull --file .env.local` writes `DATABASE_URL` (pooled) and `DATABASE_URL_UNPOOLED`
(direct) to `.env.local`, which is gitignored. Database selection lives in `src/db/connection.ts`:

| Situation                                            | Database used | Automatic schema push |
| ---------------------------------------------------- | ------------- | --------------------- |
| `pnpm dev`, `pnpm build`, when `DATABASE_URL` is set | Neon (pooled) | **Off**               |
| `pnpm migrate*`                                      | Neon (direct) | n/a                   |
| `pnpm dev:local`, all tests                          | Local Docker  | On (dev only)         |
| No `DATABASE_URL`                                    | Local Docker  | On (dev only)         |

Because Neon is the production branch, schema changes reach it **only through migrations**:

1. Change collections and try them out with `pnpm dev:local`.
2. Run `pnpm migrate:create` and commit the file in `src/migrations/`.
3. Run `pnpm migrate` to apply it to Neon (it uses the direct URL).

Tests always use the local database, because they create and delete records.

## Project layout

```text
src/
  app/
    (frontend)/[locale]/   Public site, one template set for both /kn and /en
    (payload)/             Payload admin + API routes (generated, do not edit by hand)
  collections/             Payload collections (Users, Media for now)
  components/              React components (layout/, and later homepage/, cards/, map/…)
  i18n/                    Locale config + static UI strings (kn.ts, en.ts)
  migrations/              Payload/Postgres migrations
  proxy.ts                 Next.js 16 proxy: adds the locale prefix to public URLs
  payload.config.ts        Payload configuration (DB, localization, collections)
tests/
  unit/  int/  e2e/
```

## CMS collections (Payload admin at `/admin`)

| Admin group | Collection                   | Notes                                                                                                             |
| ----------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Village     | **Village Profile** (global) | Name, description, population figures with their source and year, facility counts, cover image, verified contacts |
| Village     | Places                       | Temples, historical places, landmarks. `featured` puts a place on the homepage                                    |
| Village     | Facilities                   | Schools, college, hospitals, clinics, bank, bus stop, public facilities                                           |
| Village     | Map Locations                | Coordinates required. Only **verified** coordinates can be published                                              |
| Village     | Departments                  | For future department administrators                                                                              |
| Content     | News, Events                 | Drafts until published. News records its author and publication date                                              |
| Content     | Media                        | Per-language alt text, "genuine Nirna photo" flag, photo credit                                                   |
| Complaints  | Complaint Categories         | Categories only. The complaint workflow arrives in Phase 4                                                        |
| Settings    | Users                        | Roles: Super Admin, Registered Villager                                                                           |

- **Languages:** every text field has Kannada and English versions; switch languages at the top of
  the edit screen. Missing translations stay empty, with no automatic fallback.
- **Drafts:** Places, Facilities, Map Locations, News and Events are drafts until published. Only
  published items are visible through the public API.
- **Access:** only the Super Admin can open `/admin` or create and edit content and accounts. The
  first account becomes Super Admin, and users can never change their own role. All of this is
  enforced on the server and covered by `tests/int/collections.int.spec.ts`.
- **Still to come:** Complaints, Projects, Project Transactions, Content Submissions and Audit Logs
  (Phases 4–5).

## Pages and blocks

- Website → **Pages**: each page is a list of blocks. The page with slug `home` is the homepage
  (`/kn`, `/en`). Any other published page is served at `/<locale>/<slug>`.
- Each block lives in `src/blocks/<Name>/` with `config.ts` (Payload fields) and `Component.tsx`
  (server component). `src/blocks/RenderBlocks.tsx` renders a layout. Consecutive card blocks
  (Explore, Map, Education & Health, News, Development) share the responsive card grid.
- Blocks that show village data read it live: Village Statistics and Education & Healthcare read
  Village Profile, Explore Places reads Places, Latest News reads published News, and Map Preview
  counts published (verified) Map Locations.
- Website → **Site Settings / Header / Footer** hold the site name, logo, menu and footer. In custom
  link URLs, write site paths without the language (`/about`); `/kn` or `/en` is added automatically.
- **Images:** uploads not marked "genuine Nirna photo" are shown with an "Illustrative image" label.
  Empty image fields show a "Photo coming soon" placeholder.
- **Caching:** public pages are cached and refreshed automatically whenever content is saved
  (`src/hooks/revalidateSite.ts`).

### Village map

- `/kn/map`, `/en/map`: a Pages document (`map`) with a Page Hero and a **Village Map** block.
  It uses Leaflet with free OpenFreeMap vector tiles (OpenStreetMap data, no API key), falls back to
  OpenStreetMap raster tiles without WebGL, and always shows the attribution.
- **Markers** are published Map Locations. Publishing requires verified coordinates, so unverified
  positions never appear. The location list beside the map is the accessible text alternative.
- **Centre** comes from Village → Village Profile → Map. Until it is marked verified, the map shows a
  Bidar district overview and no coordinates are displayed.
- **Tiles** can be changed with `NEXT_PUBLIC_MAP_STYLE_URL` / `NEXT_PUBLIC_MAP_TILE_URL`
  (see `.env.example`).

### Initial content (seed)

`pnpm seed:local` (local DB) or `pnpm seed` (the connected DB, e.g. Neon) fills an empty CMS with
the approved homepage, About and Village Map pages, menu, footer, the owner's initial village figures (marked as not
verified census data), the four named temples (unverified, no photos or coordinates) and the 6
complaint categories. It adds no news, contacts, coordinates or financial data. Existing content is
never overwritten; `--force` resets only Site Settings, Header, Footer and the homepage.

## Localization

- Locales are `kn` (default) and `en`, defined once in `src/i18n/config.ts`. The same list is used
  by routing, `<html lang>`, hreflang tags and Payload content localization.
- Static UI strings (navigation, buttons) live in `src/i18n/dictionaries/`. Village content lives in
  Payload.
- Payload localization uses `fallback: false`. A missing Kannada translation shows up as missing
  instead of silently falling back to English.
- **The Kannada UI strings need review by a native speaker before launch.**

## Data policy

Do not add invented village data, such as coordinates, contacts, news, financial figures or
photographs presented as Nirna landmarks. Sample content used during development must be clearly
marked. Non-production builds show a "development build" banner on every page.
