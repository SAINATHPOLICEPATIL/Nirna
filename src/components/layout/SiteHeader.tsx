import { Icon } from '@/components/shared/Icon'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries/en'

import { LanguageSwitcher } from './LanguageSwitcher'
import { Logo, type LogoData } from './Logo'
import { MainNav } from './MainNav'
import { MobileNav } from './MobileNav'
import type { NavItem } from './navItems'

export function SiteHeader({
  locale,
  t,
  logo,
  items,
}: {
  locale: Locale
  t: Dictionary
  logo: LogoData
  /** Menu items from the Header global, already resolved to localized hrefs. */
  items: NavItem[]
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/85">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:h-[4.5rem] sm:px-6 lg:px-8">
        <Logo href={`/${locale}`} data={logo} />

        {items.length > 0 && <MainNav items={items} label={t.nav.label} homeHref={`/${locale}`} />}

        <div className="flex items-center gap-1 sm:gap-2">
          <LanguageSwitcher current={locale} label={t.languageSwitcherLabel} />
          {/* Search arrives in Phase 3. Visible as the design's entry point, but not yet active. */}
          <button
            type="button"
            disabled
            title={t.search.comingSoon}
            aria-label={t.search.comingSoon}
            className="hidden size-10 cursor-not-allowed items-center justify-center rounded-full text-ink opacity-60 sm:inline-flex"
          >
            <Icon name="search" className="size-5" />
          </button>
          {items.length > 0 && (
            <MobileNav
              items={items}
              homeHref={`/${locale}`}
              label={t.nav.label}
              openLabel={t.nav.openMenu}
              closeLabel={t.nav.closeMenu}
            />
          )}
        </div>
      </div>
    </header>
  )
}
