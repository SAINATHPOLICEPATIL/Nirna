import Link from 'next/link'

import { PlaceholderImage } from '@/components/shared/PlaceholderImage'
import type { ResolvedImage } from '@/utilities/media'

type Props = {
  href: string
  name: string
  /** Name in the other language, shown smaller for bilingual visitors. */
  altName?: string | null
  altNameLang?: string
  image?: ResolvedImage
  placeholderAlt: string
  placeholderLabel: string
  illustrativeLabel: string
  /** Optional short description — only when verified (§5.5). */
  description?: string | null
}

export function PlaceCard({
  href,
  name,
  altName,
  altNameLang,
  image,
  placeholderAlt,
  placeholderLabel,
  illustrativeLabel,
  description,
}: Props) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-(--shadow-card)">
      <PlaceholderImage
        image={image}
        illustrativeLabel={illustrativeLabel}
        placeholderAlt={placeholderAlt}
        label={placeholderLabel}
        sizes="(min-width: 1024px) 15vw, (min-width: 640px) 25vw, 50vw"
        className="aspect-[4/3.6]"
      />
      <div className="flex flex-1 flex-col items-center justify-center px-3 py-3 text-center">
        <h3 className="text-[0.95rem] leading-snug font-semibold text-ink">
          {/* Whole card is clickable via the stretched link. */}
          <Link
            href={href}
            className="group-focus-within:underline after:absolute after:inset-0 focus-visible:outline-none"
          >
            {name}
          </Link>
        </h3>
        {altName && altName !== name && (
          <p lang={altNameLang} className="mt-0.5 text-xs text-ink-muted">
            {altName}
          </p>
        )}
        {description && <p className="mt-1 text-sm text-ink-muted">{description}</p>}
      </div>
    </article>
  )
}
