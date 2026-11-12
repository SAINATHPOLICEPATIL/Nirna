import Image from 'next/image'
import Link from 'next/link'

export type LogoData = {
  /** Uploaded official logo (Site Settings → Logo). */
  image?: { src: string; alt: string }
  title?: string | null
  subtitle?: string | null
  /** Accessible name of the home link, e.g. the site name. */
  homeLabel: string
}

/**
 * Site logo from Site Settings. Until an official logo is uploaded, a TEMPORARY emblem
 * (an abstract tower-and-field motif, not a drawing of a real Nirna temple) is shown with the
 * title/subtitle text.
 */
export function Logo({
  href,
  data,
  className = '',
  inverted = false,
}: {
  href: string
  data: LogoData
  className?: string
  /** Light text for dark backgrounds (footer). */
  inverted?: boolean
}) {
  return (
    <Link
      href={href}
      aria-label={data.homeLabel}
      className={`flex items-center gap-2.5 ${className}`}
    >
      {data.image ? (
        <Image
          src={data.image.src}
          alt=""
          width={160}
          height={48}
          className="h-9 w-auto shrink-0 sm:h-12"
          priority
        />
      ) : (
        <svg aria-hidden viewBox="0 0 56 48" className="h-9 w-auto shrink-0 sm:h-12">
          <path d="M28 4 31 14h-6z" className="fill-accent" />
          <path d="M22 14h12l3 10H19z" className="fill-accent" />
          <path d="M17 24h22l3 10H14z" className="fill-accent-hover" />
          <path
            d="M2 40c10-8 24-10 38-6 6 2 10 2 14 0-6 8-20 12-34 10C12 43 6 42 2 40z"
            className={inverted ? 'fill-white' : 'fill-primary'}
          />
          <path d="M6 44c12-5 26-5 40-1-12 5-28 5-40 1z" className="fill-leaf" />
        </svg>
      )}
      {(data.title || data.subtitle) && (
        <span className="flex flex-col leading-none">
          {data.title && (
            <span
              className={`font-heading text-xl font-bold tracking-wide sm:text-[1.7rem] ${inverted ? 'text-white' : 'text-primary'}`}
            >
              {data.title}
            </span>
          )}
          {data.subtitle && (
            <span
              className={`mt-0.5 text-xs font-medium whitespace-nowrap sm:text-sm ${inverted ? 'text-white/85' : 'text-primary/90'}`}
            >
              {data.subtitle}
            </span>
          )}
        </span>
      )}
    </Link>
  )
}
