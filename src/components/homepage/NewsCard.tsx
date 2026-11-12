import Link from 'next/link'

import { ButtonLink } from '@/components/shared/ButtonLink'
import { Card, CardHeading } from '@/components/shared/Card'

import type { CTA } from './HeroSection'

export type NewsListItem = {
  href: string
  title: string
  date?: string
  /** Machine-readable ISO date for <time> */
  dateTime?: string
}

type Props = {
  heading?: string | null
  subheading?: string | null
  items: NewsListItem[]
  emptyLabel?: string | null
  cta?: CTA
}

/** Latest published news. Shows an honest empty state until real news exists (§5.8). */
export function NewsCard({ heading, subheading, items, emptyLabel, cta }: Props) {
  return (
    <Card labelledBy="news-title" className="h-full">
      {heading && (
        <CardHeading
          id="news-title"
          icon="megaphone"
          title={heading}
          subtitle={subheading ?? undefined}
        />
      )}

      <div className="mt-5 flex-1">
        {items.length === 0 ? (
          emptyLabel && (
            <p className="rounded-lg bg-surface-muted px-4 py-6 text-center text-sm text-ink-muted">
              {emptyLabel}
            </p>
          )
        ) : (
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item.href} className="flex items-baseline gap-3 text-sm">
                <span
                  aria-hidden
                  className="size-2 shrink-0 translate-y-[-1px] rounded-full bg-primary"
                />
                <Link
                  href={item.href}
                  className="min-w-0 flex-1 font-medium text-ink hover:text-primary hover:underline"
                >
                  {item.title}
                </Link>
                {item.date && (
                  <time dateTime={item.dateTime} className="shrink-0 text-xs text-ink-muted">
                    {item.date}
                  </time>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {cta && (
        <div className="mt-6 flex justify-center">
          <ButtonLink href={cta.href} newTab={cta.newTab}>
            {cta.label}
          </ButtonLink>
        </div>
      )}
    </Card>
  )
}
