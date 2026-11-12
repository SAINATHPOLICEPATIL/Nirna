import { ButtonLink } from '@/components/shared/ButtonLink'
import { PlaceholderImage } from '@/components/shared/PlaceholderImage'
import type { ResolvedImage } from '@/utilities/media'

export type CTA = { href: string; label: string; newTab?: boolean } | null | undefined

type Props = {
  /** Language tag of the page, for the subtitle */
  lang: string
  primaryHeadline?: string | null
  primaryLang?: string
  secondaryHeadline?: string | null
  secondaryLang?: string
  subtitle?: string | null
  cta?: CTA
  image?: ResolvedImage
  placeholderAlt: string
  placeholderLabel: string
  illustrativeLabel: string
}

/**
 * Large heritage hero: two-line bilingual welcome over an image with a readability overlay.
 * Single static hero (no carousel) until several genuine Nirna photographs exist.
 */
export function HeroSection({
  lang,
  primaryHeadline,
  primaryLang,
  secondaryHeadline,
  secondaryLang,
  subtitle,
  cta,
  image,
  placeholderAlt,
  placeholderLabel,
  illustrativeLabel,
}: Props) {
  return (
    <section aria-labelledby="hero-title" className="relative isolate">
      <div className="absolute inset-0 -z-10">
        <PlaceholderImage
          image={image}
          illustrativeLabel={illustrativeLabel}
          placeholderAlt={placeholderAlt}
          label={placeholderLabel}
          labelClassName="top-3 right-3"
          tone="dark"
          priority
          sizes="100vw"
          className="size-full"
        />
      </div>
      {/* Overlay: dark green on the text side so white text stays readable on any photo. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/90 via-primary/60 to-primary/10"
      />

      <div className="mx-auto flex min-h-[26rem] max-w-6xl flex-col justify-center px-4 pt-14 pb-24 sm:min-h-[30rem] sm:px-6 lg:min-h-[34rem] lg:px-8 lg:pb-28">
        <h1 id="hero-title" className="max-w-2xl text-white drop-shadow-sm">
          {primaryHeadline && (
            <span
              lang={primaryLang}
              className="block font-heading text-3xl leading-snug font-bold sm:text-4xl lg:text-5xl"
            >
              {primaryHeadline}
            </span>
          )}
          {secondaryHeadline && (
            <span
              lang={secondaryLang}
              className="mt-1 block font-heading text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl"
            >
              {secondaryHeadline}
            </span>
          )}
        </h1>
        {subtitle && (
          <p lang={lang} className="mt-5 max-w-xl text-lg text-white/95 sm:text-xl">
            {subtitle}
          </p>
        )}
        {cta && (
          <div className="mt-8">
            <ButtonLink href={cta.href} newTab={cta.newTab} variant="accent">
              {cta.label}
            </ButtonLink>
          </div>
        )}
      </div>
    </section>
  )
}
