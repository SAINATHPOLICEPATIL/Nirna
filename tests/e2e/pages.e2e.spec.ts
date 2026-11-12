import { expect, test } from '@playwright/test'

test.describe('About page (CMS blocks)', () => {
  test('renders the approved sections with figures from Village Profile', async ({ page }) => {
    await page.goto('/en/about')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Discover Nirna')
    for (const heading of [
      'Our Village',
      'Village at a Glance',
      'History & Heritage',
      'Culture & Community',
      'Education & Development',
      'Our Location',
    ]) {
      await expect(page.getByRole('heading', { name: heading })).toBeVisible()
    }
    await expect(page.getByText('9,415', { exact: true })).toBeVisible()
    await expect(page.getByRole('navigation', { name: 'Breadcrumb' })).toContainText('About Nirna')
    await expect(page.getByRole('link', { name: 'View on Map' })).toHaveAttribute('href', '/en/map')
  })

  test('Kannada version uses Kannada content', async ({ page }) => {
    await page.goto('/kn/about')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('ನಿರ್ಣವನ್ನು ಅನ್ವೇಷಿಸಿ')
    await expect(page.getByRole('heading', { name: 'ಇತಿಹಾಸ ಮತ್ತು ಪರಂಪರೆ' })).toBeVisible()
  })
})

test.describe('Village map page', () => {
  test('shows filters, the map with OpenStreetMap attribution, and an honest empty state', async ({
    page,
  }) => {
    await page.goto('/en/map')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Nirna Village Map')
    for (const label of [
      'All Locations',
      'Temples',
      'Education',
      'Healthcare',
      'Public Facilities',
      'Other Places',
    ]) {
      await expect(page.getByRole('button', { name: label, exact: true })).toBeVisible()
    }
    await expect(page.getByRole('button', { name: 'All Locations' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )

    const map = page.locator('.leaflet-container')
    await expect(map).toBeVisible({ timeout: 20_000 })
    await expect(page.locator('.leaflet-control-attribution')).toContainText('OpenStreetMap', {
      timeout: 20_000,
    })

    // No verified locations or village centre yet: no markers, no coordinates.
    await expect(page.locator('.nirna-pin')).toHaveCount(0)
    await expect(
      page.getByText('Verified locations will appear on the map soon.').first(),
    ).toBeVisible()
    await expect(page.getByText('Coordinates will be shown after verification')).toBeVisible()
  })

  test('filter buttons toggle and the full map opens and closes with Escape', async ({ page }) => {
    await page.goto('/en/map')
    await page.getByRole('button', { name: 'Temples', exact: true }).click()
    await expect(page.getByRole('button', { name: 'Temples', exact: true })).toHaveAttribute(
      'aria-pressed',
      'true',
    )

    await page.getByRole('button', { name: 'View Full Map' }).click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
  })

  test('Kannada map labels', async ({ page }) => {
    await page.goto('/kn/map')
    await expect(page.getByRole('button', { name: 'ಎಲ್ಲಾ ಸ್ಥಳಗಳು' })).toBeVisible()
    await expect(page.getByPlaceholder('ಸ್ಥಳಗಳನ್ನು ಹುಡುಕಿ…')).toBeVisible()
  })
})
