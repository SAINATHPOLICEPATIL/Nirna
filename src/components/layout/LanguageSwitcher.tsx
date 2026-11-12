'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  localeLabels,
  locales,
  localeTags,
  switchLocaleInPathname,
  type Locale,
} from '@/i18n/config'

type Props = {
  current: Locale
  label: string
}

/** ಕನ್ನಡ / English pills. Links to the same page in the other language. */
export function LanguageSwitcher({ current, label }: Props) {
  const pathname = usePathname() || `/${current}`

  return (
    <nav aria-label={label}>
      <ul className="flex items-center gap-1.5">
        {locales.map((locale) => {
          const isCurrent = locale === current
          return (
            <li key={locale}>
              <Link
                href={switchLocaleInPathname(pathname, locale)}
                hrefLang={localeTags[locale]}
                lang={localeTags[locale]}
                aria-current={isCurrent ? 'page' : undefined}
                className={`inline-flex h-8 items-center rounded-full border px-2.5 text-xs font-semibold whitespace-nowrap transition-colors sm:h-9 sm:px-4 sm:text-sm ${
                  isCurrent
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-surface text-ink hover:border-primary hover:text-primary'
                }`}
              >
                {localeLabels[locale]}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
