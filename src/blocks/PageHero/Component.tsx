import Link from 'next/link'

import { Icon } from '@/components/shared/Icon'
import { PlaceholderImage } from '@/components/shared/PlaceholderImage'
import type { PageHeroBlock as PageHeroBlockProps } from '@/payload-types'
import { resolveImage } from '@/utilities/media'

import type { BlockContext } from '../shared'

export function PageHeroBlockComponent({
  block,
  locale,
  t,
}: { block: PageHeroBlockProps } & BlockContext) {
  return (
    <section aria-labelledby="page-hero-title" className="relative isolate">
      <div className="absolute inset-0 -z-10">
        <PlaceholderImage
          image={resolveImage(block.image, 'hero')}
          illustrativeLabel={t.placeholder.illustrative}
          placeholderAlt={t.placeholder.photoAlt(block.title)}
          label={t.placeholder.photo}
          labelClassName="top-3 right-3"
          tone="dark"
          priority
          sizes="100vw"
          className="size-full"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/90 via-primary/55 to-primary/5"
      />

      <div className="mx-auto flex min-h-60 max-w-6xl flex-col justify-center px-4 py-12 sm:min-h-72 sm:px-6 lg:px-8">
        <h1
          id="page-hero-title"
          className="max-w-2xl font-heading text-4xl leading-tight font-bold text-white drop-shadow-sm sm:text-5xl"
        >
          {block.title}
        </h1>
        {block.subtitle && (
          <p className="mt-3 max-w-xl text-lg text-white/95 sm:text-xl">{block.subtitle}</p>
        )}
        {block.accentLine && (
          <span aria-hidden className="mt-5 block h-1 w-20 rounded-full bg-accent" />
        )}

        {block.showBreadcrumb !== false && (
          <nav aria-label={t.breadcrumb.label} className="mt-6">
            <ol className="flex items-center gap-2 text-sm text-white/90">
              <li>
                <Link href={`/${locale}`} className="inline-flex hover:text-white">
                  <Icon name="home" className="size-5" title={t.breadcrumb.home} />
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page">{block.breadcrumbLabel || block.title}</li>
            </ol>
          </nav>
        )}
      </div>
    </section>
  )
}
