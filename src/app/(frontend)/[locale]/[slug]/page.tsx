import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { isLocale, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { pageMetadata } from '@/utilities/pageMetadata'
import { getPageBySlug, getPublishedPageSlugs } from '@/utilities/queries'
import { HOME_SLUG } from '@/utilities/routes'

/** Any other CMS page, e.g. /kn/about, built from blocks. */
export async function generateStaticParams() {
  const slugs = (await getPublishedPageSlugs()).filter((slug) => slug !== HOME_SLUG)
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  return pageMetadata(await getPageBySlug(slug, locale), locale, `/${slug}`)
}

export default async function CmsPage({ params }: PageProps<'/[locale]/[slug]'>) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  if (slug === HOME_SLUG) permanentRedirect(`/${locale}`)

  const page = await getPageBySlug(slug, locale)
  if (!page) notFound()

  return <RenderBlocks blocks={page.layout} locale={locale} t={getDictionary(locale)} />
}
