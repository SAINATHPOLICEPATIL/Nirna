import { NewsCard } from '@/components/homepage/NewsCard'
import type { LatestNewsBlock as LatestNewsBlockProps } from '@/payload-types'
import { getLatestNews } from '@/utilities/queries'
import { docPath } from '@/utilities/routes'

import { type BlockContext, formatDate, toCTA } from '../shared'

export async function LatestNewsBlockComponent({
  block,
  locale,
}: { block: LatestNewsBlockProps } & BlockContext) {
  const news = await getLatestNews(locale, block.limit ?? 3)
  // An item without a title in this language is not shown (no silent fallback).
  const items = news
    .filter((item) => item.title)
    .map((item) => ({
      href: docPath('news', item.slug, locale),
      title: item.title,
      date: item.publishedDate ? formatDate(item.publishedDate, locale) : undefined,
      dateTime: item.publishedDate ?? undefined,
    }))

  return (
    <NewsCard
      heading={block.heading}
      subheading={block.subheading}
      items={items}
      emptyLabel={block.emptyText}
      cta={toCTA(block.cta, locale)}
    />
  )
}
