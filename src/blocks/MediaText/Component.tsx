import { ButtonLink } from '@/components/shared/ButtonLink'
import { Container } from '@/components/shared/Container'
import { PlaceholderImage } from '@/components/shared/PlaceholderImage'
import type { MediaTextBlock as MediaTextBlockProps } from '@/payload-types'
import { resolveImage } from '@/utilities/media'

import { type BlockContext, toCTA } from '../shared'

export function MediaTextBlockComponent({
  block,
  locale,
  t,
}: { block: MediaTextBlockProps } & BlockContext) {
  const cta = toCTA(block.cta, locale)
  const imageRight = block.imagePosition === 'right'
  const headingId = `media-text-${block.id ?? 'x'}`

  return (
    <section
      aria-labelledby={block.heading ? headingId : undefined}
      className="relative overflow-hidden py-6 sm:py-8"
    >
      {block.leafDecoration !== false && (
        <svg
          aria-hidden
          viewBox="0 0 200 260"
          className={`pointer-events-none absolute top-6 hidden h-56 w-auto text-leaf opacity-20 md:block ${
            imageRight ? '-left-8 -scale-x-100' : '-right-8'
          }`}
        >
          <path
            d="M100 255 C98 180 104 110 140 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          {[
            [118, 70, -35],
            [108, 120, 30],
            [103, 170, -30],
            [101, 215, 28],
            [130, 40, 20],
          ].map(([x, y, r]) => (
            <ellipse
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              rx="32"
              ry="13"
              fill="currentColor"
              transform={`rotate(${r} ${x} ${y})`}
            />
          ))}
        </svg>
      )}
      <Container className="relative grid items-center gap-6 md:grid-cols-2 md:gap-10">
        <PlaceholderImage
          image={resolveImage(block.image)}
          illustrativeLabel={t.placeholder.illustrative}
          placeholderAlt={t.placeholder.photoAlt(block.heading ?? '')}
          label={t.placeholder.photo}
          sizes="(min-width: 768px) 45vw, 100vw"
          className={`aspect-[16/9] rounded-2xl shadow-(--shadow-card) ${imageRight ? 'md:order-2' : ''}`}
        />
        <div className={imageRight ? 'md:order-1' : ''}>
          {block.heading && (
            <h2 id={headingId} className="font-heading text-3xl font-bold text-primary">
              {block.heading}
            </h2>
          )}
          {block.text && (
            <p className="mt-3 max-w-xl text-base leading-relaxed text-ink sm:text-lg">
              {block.text}
            </p>
          )}
          {cta && (
            <div className="mt-5">
              <ButtonLink href={cta.href} newTab={cta.newTab}>
                {cta.label}
              </ButtonLink>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
