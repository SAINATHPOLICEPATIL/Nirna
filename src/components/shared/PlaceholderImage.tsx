import Image from 'next/image'

/**
 * Shows an uploaded image when one is provided, otherwise a neutral illustrated placeholder.
 * Uploads not marked "genuine Nirna photo" carry a visible "Illustrative image" label, so a stock
 * or generated picture is never presented as a real Nirna landmark.
 */
type Props = {
  image?: { src: string; alt: string; isIllustrative?: boolean }
  /** Visible label on uploaded images that are not genuine Nirna photos */
  illustrativeLabel?: string
  /** Accessible description used for the placeholder */
  placeholderAlt: string
  /** Visible caption on the placeholder, e.g. "Photo coming soon" */
  label: string
  /** Position of the caption chip (default bottom-left) */
  labelClassName?: string
  className?: string
  sizes?: string
  priority?: boolean
  tone?: 'light' | 'dark'
}

export function PlaceholderImage({
  image,
  illustrativeLabel,
  placeholderAlt,
  label,
  labelClassName = 'bottom-2 left-2',
  className = '',
  sizes = '(min-width: 1024px) 25vw, 50vw',
  priority = false,
  tone = 'light',
}: Props) {
  if (image) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
        {image.isIllustrative && illustrativeLabel && (
          <span
            className={`absolute ${labelClassName} rounded-full bg-black/45 px-2.5 py-0.5 text-xs font-medium text-white`}
          >
            {illustrativeLabel}
          </span>
        )}
      </div>
    )
  }

  const dark = tone === 'dark'
  return (
    <div
      role="img"
      aria-label={placeholderAlt}
      data-placeholder-image
      className={`relative overflow-hidden ${dark ? 'bg-primary' : 'bg-primary-soft'} ${className}`}
    >
      <svg
        aria-hidden
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 size-full"
      >
        <circle cx="300" cy="80" r="34" className={dark ? 'fill-accent/40' : 'fill-accent/50'} />
        <path
          d="M0 220 C80 170 140 190 210 165 S330 150 400 175 V300 H0z"
          className={dark ? 'fill-white/10' : 'fill-leaf/40'}
        />
        <path
          d="M0 250 C90 215 170 240 250 220 S360 215 400 230 V300 H0z"
          className={dark ? 'fill-white/15' : 'fill-leaf/60'}
        />
        {/* stylised temple-tower silhouette: decorative, not a depiction of a real building */}
        <path
          d="M120 230 V180 h10 l6-30 h8 l6 30 h10 v50z"
          className={dark ? 'fill-white/15' : 'fill-primary/25'}
        />
      </svg>
      <span
        className={`absolute ${labelClassName} rounded-full px-2.5 py-0.5 text-xs font-medium ${
          dark ? 'bg-black/30 text-white' : 'bg-white/85 text-ink-muted'
        }`}
      >
        {label}
      </span>
    </div>
  )
}
