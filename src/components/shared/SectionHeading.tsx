/** Large serif section heading with the short green underline from the mockup. */
export function SectionHeading({
  id,
  title,
  subtitle,
  underline = false,
}: {
  id: string
  title: string
  subtitle?: string
  underline?: boolean
}) {
  return (
    <div>
      <h2 id={id} className="font-heading text-3xl font-bold text-primary sm:text-4xl">
        {title}
      </h2>
      {underline && <span aria-hidden className="mt-3 block h-1 w-14 rounded-full bg-primary" />}
      {subtitle && <p className="mt-1 text-base text-ink-muted sm:text-lg">{subtitle}</p>}
    </div>
  )
}
