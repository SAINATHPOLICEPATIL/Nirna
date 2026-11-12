import { defineConfig, devices } from '@playwright/test'
import 'dotenv/config'

// E2E tests seed and delete users: force the local Docker DB, never Neon.
// Set before anything imports the Payload config (the admin test's seed helper does).
process.env.NIRNA_DB_TARGET = 'local'

// Own port so tests never reuse a dev server you started yourself (which may be on Neon).
const port = Number(process.env.E2E_PORT || 3100)
const baseURL = `http://localhost:${port}`
process.env.E2E_BASE_URL = baseURL

/** See https://playwright.dev/docs/test-configuration */
export default defineConfig({
  testDir: './tests/e2e',
  globalSetup: './tests/e2e/global-setup.ts',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel: 'chromium' },
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 7'] },
      testIgnore: /admin\.e2e/,
    },
  ],
  webServer: {
    command: `pnpm dev:local --port ${port}`,
    // Never reuse a server that might be connected to Neon.
    reuseExistingServer: false,
    env: {
      NIRNA_DB_TARGET: 'local',
      NEXT_DIST_DIR: '.next-e2e',
      NEXT_PUBLIC_SERVER_URL: baseURL,
      NEXT_PUBLIC_SITE_URL: baseURL,
    },
    url: baseURL,
    timeout: 180_000,
  },
})
