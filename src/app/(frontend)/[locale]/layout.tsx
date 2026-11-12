import type { Metadata } from 'next'
import { Inter, Noto_Sans_Kannada, Noto_Serif, Noto_Serif_Kannada } from 'next/font/google'
import { notFound } from 'next/navigation'

import { LivePreviewListener } from '@/components/LivePreviewListener'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { isLocale, locales, localeTags } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { isPreview } from '@/utilities/preview'
import { getSiteChrome } from '@/utilities/siteChrome'

import '../globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const notoKannada = Noto_Sans_Kannada({
  subsets: ['kannada'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-kannada',
  display: 'swap',
})
// Serif headings (mockup: "About Nirna", "Explore Nirna"). Only the weights in use are loaded.
const notoSerif = Noto_Serif({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-noto-serif',
  display: 'swap',
})
const notoSerifKannada = Noto_Serif_Kannada({
  subsets: ['kannada'],
  weight: ['700'],
  variable: '--font-noto-serif-kannada',
  display: 'swap',
})

const fontVariables = [inter, notoKannada, notoSerif, notoSerifKannada]
  .map((f) => f.variable)
  .join(' ')

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const { siteName, siteDescription } = await getSiteChrome(locale)

  // Site-wide defaults from Site Settings; each page sets its own canonical + hreflang.
  return {
    metadataBase: new URL(siteUrl),
    title: { default: siteName, template: `%s | ${siteName}` },
    description: siteDescription,
  }
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const t = getDictionary(locale)
  const chrome = await getSiteChrome(locale)
  const preview = await isPreview()

  return (
    <html lang={localeTags[locale]} className={fontVariables}>
      <body className="min-h-screen bg-page font-sans text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
        >
          {t.skipToContent}
        </a>

        {process.env.NODE_ENV !== 'production' && (
          <p className="bg-warning-bg px-4 py-1 text-center text-sm text-warning-ink" role="note">
            {t.devNotice}
          </p>
        )}

        {preview && (
          <>
            {/* Admin-only: shows drafts and refreshes on each save in live preview. */}
            <LivePreviewListener />
            <p
              className="bg-primary px-4 py-1 text-center text-sm text-primary-foreground"
              role="note"
            >
              Preview: showing the latest draft.{' '}
              <a href={`/next/exit-preview?path=/${locale}`} className="underline">
                Exit preview
              </a>
            </p>
          </>
        )}

        <SiteHeader locale={locale} t={t} logo={chrome.logo} items={chrome.navItems} />

        <main id="main">{children}</main>

        <SiteFooter
          locale={locale}
          logo={chrome.logo}
          columns={chrome.footer.columns}
          disclaimer={chrome.footer.disclaimer}
          copyright={chrome.footer.copyright}
        />
      </body>
    </html>
  )
}
