import { test, expect, Page } from '@playwright/test'
import { login } from '../helpers/login'
import { seedTestUser, cleanupTestUser, testUser } from '../helpers/seedUser'

const base = process.env.E2E_BASE_URL || 'http://localhost:3100'

test.describe('Admin Panel', () => {
  // The admin bundle compiles on first visit in dev; allow for that cold start.
  test.describe.configure({ timeout: 120_000 })

  let page: Page

  test.beforeAll(async ({ browser }) => {
    // Cold-compiling /admin in dev can exceed the default 30 s hook timeout.
    test.setTimeout(150_000)
    await seedTestUser()

    const context = await browser.newContext()
    page = await context.newPage()

    await login({ page, user: testUser })
  })

  test.afterAll(async () => {
    await cleanupTestUser()
  })

  test('can navigate to dashboard', async () => {
    await page.goto(`${base}/admin`)
    await expect(page).toHaveURL(`${base}/admin`)
    const dashboardArtifact = page.locator('span[title="Dashboard"]').first()
    await expect(dashboardArtifact).toBeVisible()
  })

  test('can navigate to list view', async () => {
    await page.goto(`${base}/admin/collections/users`)
    await expect(page).toHaveURL(`${base}/admin/collections/users`)
    const listViewArtifact = page.locator('h1', { hasText: 'Users' }).first()
    await expect(listViewArtifact).toBeVisible()
  })

  test('can navigate to edit view', async () => {
    await page.goto(`${base}/admin/collections/users/create`)
    await expect(page).toHaveURL(/\/admin\/collections\/users\/[a-zA-Z0-9-_]+/)
    const editViewArtifact = page.locator('input[name="email"]')
    await expect(editViewArtifact).toBeVisible()
  })
})
