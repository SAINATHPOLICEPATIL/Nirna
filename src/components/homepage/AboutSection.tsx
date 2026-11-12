import { ButtonLink } from '@/components/shared/ButtonLink'
import { Container } from '@/components/shared/Container'
import { PlaceholderImage } from '@/components/shared/PlaceholderImage'
import { SectionHeading } from '@/components/shared/SectionHeading'
import type { ResolvedImage } from '@/utilities/media'

import type { CTA } from './HeroSection'

type Props = {
  heading?: string | null
  text?: string | null
  cta?: CTA
  image?: ResolvedImage
  placeholderAlt: string
  placeholderLabel: string
  illustrativeLabel: string
}

export function AboutSection({
  heading,
  text,
  cta,
  image,
  placeholderAlt,
  placeholderLabel,
  illustrativeLabel,
}: Props) {
  return (
    <section aria-labelledby="about-title" className="relative overflow-hidden py-12 sm:py-16">
      <LeafDecoration />
      <Container className="relative grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-10">
        <PlaceholderImage
          image={image}
          illustrativeLabel={illustrativeLabel}
          placeholderAlt={placeholderAlt}
          label={placeholderLabel}
          sizes="(min-width: 768px) 35vw, 100vw"
          className="aspect-[4/3] rounded-2xl shadow-(--shadow-card)"
        />
        <div>
          {heading && <SectionHeading id="about-title" title={heading} underline />}
          {text && (
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink sm:text-xl">{text}</p>
          )}
          {cta && (
            <div className="mt-7">
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

/** Faint leaf sprig on the right, as in the mockup. Purely decorative. */
function LeafDecoration() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 260"
      className="pointer-events-none absolute top-4 -right-6 hidden h-64 w-auto text-leaf opacity-25 md:block"
    >
      <path d="M100 255 C98 180 104 110 140 20" fill="none" stroke="currentColor" strokeWidth="3" />
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
  )
}
