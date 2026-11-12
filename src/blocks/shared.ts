import type { CTA } from '@/components/homepage/HeroSection'
import type { PayloadLinkType } from '@/components/Link'
import { localeTags, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries/en'
import { resolveLink } from '@/utilities/link'

/** Everything a block Component receives besides its own fields. */
export type BlockContext = {
  locale: Locale
  t: Dictionary
}

/** Shape of any `link()` field value as Payload generates it (all parts optional / nullable). */
type MaybeLink = {
  type?: 'custom' | 'reference' | null
  newTab?: boolean | null
  reference?: unknown
  url?: string | null
  label?: string | null
}

/** CMS `link()` value → button props, or null when the editor left it empty or it can't resolve. */
export function toCTA(link: MaybeLink | null | undefined, locale: Locale): CTA {
  if (!link?.label) return null
  const href = resolveLink(link as PayloadLinkType, locale)
  if (!href) return null
  return { href, label: link.label, newTab: Boolean(link.newTab) }
}

export const otherLocale = (locale: Locale): Locale => (locale === 'kn' ? 'en' : 'kn')

export const numberFormat = new Intl.NumberFormat('en-IN')

export const formatDate = (iso: string, locale: Locale) =>
  new Intl.DateTimeFormat(localeTags[locale], {
    dateStyle: 'medium',
    timeZone: 'Asia/Kolkata',
  }).format(new Date(iso))
