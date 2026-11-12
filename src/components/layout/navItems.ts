export type NavItem = { href: string; label: string; newTab?: boolean }

/** A nav item is active on its own page and its sub-pages; Home only on the exact home path. */
export function isActive(href: string, pathname: string, homeHref: string): boolean {
  if (href === homeHref) return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`)
}
