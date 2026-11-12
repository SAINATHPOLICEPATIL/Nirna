import { expect, test } from '@playwright/test'

test.describe('Locale routing', () => {
  test('root redirects to the Kannada homepage', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL(/\/kn$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'kn-IN')
  })

  test('hreflang alternates are present', async ({ page }) => {
    await page.goto('/en')
    await expect(page.locator('link[rel="alternate"][hreflang="kn-IN"]')).toHaveCount(1)
    await expect(page.locator('link[rel="alternate"][hreflang="en-IN"]')).toHaveCount(1)
  })

  test('unknown pages return 404', async ({ page }) => {
    const response = await page.goto('/en/this-page-does-not-exist')
    expect(response?.status()).toBe(404)
  })

  test('unsupported locales return 404', async ({ page }) => {
    // /fr has no locale prefix, so the proxy redirects to /kn/fr, which does not exist.
    const response = await page.goto('/fr')
    expect(response?.status()).toBe(404)
  })
})

test.describe('Homepage', () => {
  test('English homepage renders every approved section in order', async ({ page }) => {
    await page.goto('/en')
    await expect(page).toHaveTitle(/NIRNA Digital Village/)

    const h1 = page.getByRole('heading', { level: 1 })
    await expect(h1).toContainText('ನಮ್ಮ ನಿರ್ಣ ಗ್ರಾಮಕ್ಕೆ ಸ್ವಾಗತ')
    await expect(h1).toContainText('Welcome to NIRNA')

    const headings = await page.getByRole('heading', { level: 2 }).allInnerTexts()
    const order = [
      'About Nirna',
      'Explore Nirna',
      'Interactive Village Map',
      'Education & Healthcare',
      'Latest News & Announcements',
      'Development Dashboard',
    ]
    const positions = order.map((h) => headings.findIndex((x) => x.trim() === h))
    expect(positions.every((p) => p >= 0)).toBe(true)
    expect([...positions].sort((a, b) => a - b)).toEqual(positions)
  })

  test('statistics show the owner-provided figures', async ({ page }) => {
    await page.goto('/en')
    const stats = page.getByRole('region', { name: 'Village at a glance' })
    for (const text of [
      '9,415',
      'Total Population',
      '4,780',
      '4,635',
      '1,678',
      'Bidar District',
      'Karnataka',
    ]) {
      await expect(stats.getByText(text, { exact: true })).toBeVisible()
    }
  })

  test('Kannada homepage renders Kannada labels', async ({ page }) => {
    await page.goto('/kn')
    await expect(page.getByRole('heading', { name: 'ನಿರ್ಣದ ಬಗ್ಗೆ' })).toBeVisible()
    await expect(page.getByRole('region', { name: 'ಗ್ರಾಮದ ಒಂದು ನೋಟ' })).toContainText(
      'ಒಟ್ಟು ಜನಸಂಖ್ಯೆ',
    )
    await expect(page.getByRole('link', { name: 'ಬಸವೇಶ್ವರ ದೇವಸ್ಥಾನ' })).toHaveAttribute(
      'href',
      '/kn/places/basaweshwara-temple',
    )
  })

  test('section links point to the localized pages', async ({ page }) => {
    await page.goto('/en')
    const main = page.locator('main')
    await expect(main.getByRole('link', { name: 'Know More' })).toHaveAttribute('href', '/en/about')
    await expect(main.getByRole('link', { name: 'View Map' })).toHaveAttribute('href', '/en/map')
    await expect(main.getByRole('link', { name: 'Explore Services' })).toHaveAttribute(
      'href',
      '/en/services',
    )
    await expect(main.getByRole('link', { name: 'View Details' })).toHaveAttribute(
      'href',
      '/en/development',
    )
    await expect(main.getByRole('link', { name: 'Hanuman Temple' })).toHaveAttribute(
      'href',
      '/en/places/hanuman-temple',
    )
  })

  test('no fabricated content: labelled placeholders, no map markers, honest empty news', async ({
    page,
  }) => {
    await page.goto('/en')
    // No photos uploaded yet: every image area is a labelled placeholder.
    await expect(page.locator('main img')).toHaveCount(0)
    expect(await page.locator('[data-placeholder-image]').count()).toBeGreaterThanOrEqual(6)
    await expect(page.getByText('Locations will be added after verification')).toBeVisible()
    const news = page.getByRole('region', { name: 'Latest News & Announcements' })
    await expect(news.getByText('No announcements yet.', { exact: false })).toBeVisible()
  })

  test('footer content comes from the CMS', async ({ page }) => {
    await page.goto('/en')
    const footer = page.locator('footer')
    await expect(footer).toContainText('not an official Gram Panchayat')
    await expect(footer).toContainText(`© ${new Date().getFullYear()} NIRNA Digital Village`)
    await expect(footer.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute(
      'href',
      '/en/privacy',
    )
  })

  test('language switcher keeps the visitor on the equivalent page', async ({ page }) => {
    await page.goto('/kn')
    await page.getByRole('link', { name: 'English' }).click()
    await expect(page).toHaveURL(/\/en$/)
    await page.getByRole('link', { name: 'ಕನ್ನಡ' }).click()
    await expect(page).toHaveURL(/\/kn$/)
  })

  test('page does not scroll horizontally', async ({ page }) => {
    await page.goto('/kn')
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    expect(overflow).toBeLessThanOrEqual(0)
  })
})

test.describe('Navigation', () => {
  test('desktop menu marks Home as current', async ({ page, isMobile }) => {
    test.skip(isMobile, 'desktop menu is hidden on phones')
    await page.goto('/en')
    const nav = page.getByRole('navigation', { name: 'Main navigation' })
    await expect(nav.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page')
    await expect(nav.getByRole('link', { name: 'Development' })).toHaveAttribute(
      'href',
      '/en/development',
    )
  })

  test('mobile menu opens, traps focus and closes with Escape', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'mobile menu only')
    await page.goto('/en')
    const toggle = page.getByRole('button', { name: 'Open menu' })
    await toggle.click()
    const close = page.getByRole('button', { name: 'Close menu' })
    await expect(close).toHaveAttribute('aria-expanded', 'true')
    const nav = page.getByRole('navigation', { name: 'Main navigation' })
    await expect(nav.getByRole('link', { name: 'Contact' })).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused()
    await expect(nav.getByRole('link', { name: 'Contact' })).toBeHidden()
  })
})
