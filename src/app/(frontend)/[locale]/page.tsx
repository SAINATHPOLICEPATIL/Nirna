import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { pageMetadata } from '@/utilities/pageMetadata'
import { getPageBySlug } from '@/utilities/queries'
import { HOME_SLUG } from '@/utilities/routes'

/** Homepage: the published Pages document with slug "home", built from blocks in the CMS. */
export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const page = await getPageBySlug(HOME_SLUG, locale)
  // The homepage title is the site name (layout default) unless SEO title is set.
  const { title: _ignored, ...meta } = pageMetadata(page, locale, '/')
  return page?.seo?.title ? { ...meta, title: { absolute: page.seo.title } } : meta
}

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const page = await getPageBySlug(HOME_SLUG, locale)
  if (!page) notFound()

  return <RenderBlocks blocks={page.layout} locale={locale} t={getDictionary(locale)} />
}
