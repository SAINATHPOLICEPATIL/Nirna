import Link from 'next/link'
import { Fragment } from 'react'

import type { Locale } from '@/i18n/config'

import { Logo, type LogoData } from './Logo'
import type { NavItem } from './navItems'

export type FooterColumn = { title: string; links: NavItem[] }

const newTab = (item: NavItem) =>
  item.newTab ? { target: '_blank' as const, rel: 'noopener noreferrer' } : {}

/**
 * Dark-green footer (About design). All text and links come from the Footer global; contact
 * details and social links are not shown until verified ones are added in the CMS.
 */
export function SiteFooter({
  locale,
  logo,
  columns,
  disclaimer,
  copyright,
}: {
  locale: Locale
  logo: LogoData
  columns: FooterColumn[]
  disclaimer?: string | null
  copyright?: string | null
}) {
  return (
    <footer className="relative mt-16 overflow-hidden bg-[#143a22] text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 pt-10 pb-8 sm:px-6 md:grid-cols-[auto_1fr] md:gap-12 lg:px-8">
        <div className="md:border-r md:border-white/15 md:pr-12">
          <Logo href={`/${locale}`} data={logo} inverted />
          {disclaimer && <p className="mt-4 max-w-xs text-sm text-white/75">{disclaimer}</p>}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {columns.map((col, i) => {
            const id = `footer-col-${i}`
            return (
              <nav key={id} aria-labelledby={id}>
                <h2 id={id} className="text-base font-semibold text-white">
                  {col.title}
                </h2>
                <ul className="mt-2 flex flex-wrap items-center gap-y-1 text-sm text-white/80">
                  {col.links.map((link, j) => (
                    <Fragment key={`${link.href}-${link.label}`}>
                      {j > 0 && (
                        <li aria-hidden className="px-2 text-white/40">
                          |
                        </li>
                      )}
                      <li>
                        <Link
                          href={link.href}
                          {...newTab(link)}
                          className="hover:text-white hover:underline"
                        >
                          {link.label}
                        </Link>
                      </li>
                    </Fragment>
                  ))}
                </ul>
              </nav>
            )
          })}
        </div>
      </div>

      {/* Decorative village skyline (trees and a temple tower), as in the design. */}
      <svg
        aria-hidden
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="block h-10 w-full text-white/[0.06]"
        fill="currentColor"
      >
        <path d="M0 60V44c40-10 70-8 100 0 20-14 36-16 52-4 14-10 30-10 44 2 28-8 60-6 90 4 18-20 36-22 54-6 10-8 24-8 34 0l12-26 12 26c16-8 34-6 48 4 30-12 62-10 92 0 24-14 46-14 66 0 40-10 80-8 118 2 20-12 40-12 58 0 36-8 74-8 110 0 22-16 44-16 64 0 30-8 62-6 92 4 20-12 40-10 56 2V60z" />
      </svg>

      {copyright && (
        <div className="border-t border-white/10">
          <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-white/70 sm:px-6 lg:px-8">
            {copyright}
          </p>
        </div>
      )}
    </footer>
  )
}
