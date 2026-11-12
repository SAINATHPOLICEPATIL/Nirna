import { notFound } from 'next/navigation'

/** Catch-all so unknown paths under /kn or /en render the localized 404 page. */
export default function CatchAll() {
  notFound()
}
