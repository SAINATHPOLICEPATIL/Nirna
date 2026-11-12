/**
 * System / accessibility strings only (screen-reader labels, placeholders, dev notices).
 * ALL visible content — headings, menu items, button text, village facts — is authored in
 * Payload CMS (Pages blocks, Header, Footer, Site Settings, collections).
 */
export const en = {
  skipToContent: 'Skip to main content',
  languageSwitcherLabel: 'Change language',
  nav: {
    label: 'Main navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  search: {
    comingSoon: 'Search (coming soon)',
  },
  placeholder: {
    photo: 'Photo coming soon',
    illustrative: 'Illustrative image',
    photoAlt: (subject: string) =>
      `Placeholder image — a real photograph of ${subject} will be added`,
  },
  breadcrumb: { label: 'Breadcrumb', home: 'Home' },
  map: { ariaLabel: 'Interactive village map' },
  devNotice: 'Development build — not for public use.',
}

/** Widen literal types so other languages can supply different text. */
type Widen<T> = {
  [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends (...args: infer A) => infer R
      ? (...args: A) => R
      : Widen<T[K]>
}
export type Dictionary = Widen<typeof en>
