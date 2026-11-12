'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { isActive, type NavItem } from './navItems'

/** Desktop menu (lg and up). Highlights the current section with the green underline. */
export function MainNav({
  items,
  label,
  homeHref,
}: {
  items: NavItem[]
  label: string
  homeHref: string
}) {
  const pathname = usePathname() || ''

  return (
    <nav aria-label={label} className="hidden lg:block">
      <ul className="flex items-center gap-1 xl:gap-2">
        {items.map((item) => {
          const active = isActive(item.href, pathname, homeHref)
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                {...(item.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                aria-current={active ? 'page' : undefined}
                className={`relative block px-2.5 py-2 text-[0.95rem] transition-colors after:absolute after:inset-x-2.5 after:-bottom-0.5 after:h-0.5 after:rounded-full after:transition-colors ${
                  active
                    ? 'font-semibold text-primary after:bg-primary'
                    : 'text-ink after:bg-transparent hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
