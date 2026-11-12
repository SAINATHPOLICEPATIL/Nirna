/**
 * Rendered inside the locale layout. Next.js does not pass params to not-found,
 * so the message is shown in both languages.
 */
export default function NotFound() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <h1 className="text-3xl font-bold text-primary">404</h1>
      <p className="mt-4 text-lg">ಈ ಪುಟ ಲಭ್ಯವಿಲ್ಲ.</p>
      <p lang="en" className="mt-1 text-ink-muted">
        This page could not be found.
      </p>
    </section>
  )
}
