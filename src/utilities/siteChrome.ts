import 'server-only'

import type { FooterColumn } from '@/components/layout/SiteFooter'
import type { LogoData } from '@/components/layout/Logo'
import type { NavItem } from '@/components/layout/navItems'
import type { PayloadLinkType } from '@/components/Link'
import type { Locale } from '@/i18n/config'
import { resolveLink } from '@/utilities/link'
import { resolveImage } from '@/utilities/media'
import { getFooter, getHeader, getSiteSettings } from '@/utilities/queries'

type LinkRow = { link?: Partial<PayloadLinkType> | null }

/** Links that can't be resolved (empty, or pointing at a draft) are dropped. */
const toNavItems = (rows: LinkRow[] | null | undefined, locale: Locale): NavItem[] =>
  (rows ?? []).flatMap(({ link }) => {
    if (!link?.label) return []
    const href = resolveLink(link as PayloadLinkType, locale)
    return href ? [{ href, label: link.label, newTab: Boolean(link.newTab) }] : []
  })

/** Header, footer and logo for one language, all from the CMS. */
export async function getSiteChrome(locale: Locale) {
  const [settings, header, footer] = await Promise.all([
    getSiteSettings(locale),
    getHeader(locale),
    getFooter(locale),
  ])

  const logoImage = resolveImage(settings.logo, 'thumbnail')
  const logo: LogoData = {
    image: logoImage ? { src: logoImage.src, alt: logoImage.alt } : undefined,
    title: settings.logoTitle,
    subtitle: settings.logoSubtitle,
    homeLabel: settings.siteName ?? '',
  }

  const columns: FooterColumn[] = (footer.columns ?? []).flatMap((col) =>
    col.title ? [{ title: col.title, links: toNavItems(col.links, locale) }] : [],
  )

  return {
    siteName: settings.siteName ?? '',
    siteDescription: settings.siteDescription ?? undefined,
    logo,
    navItems: toNavItems(header.navItems, locale),
    footer: {
      columns,
      disclaimer: footer.disclaimer,
      copyright: footer.copyright?.replace('{year}', String(new Date().getFullYear())),
    },
  }
}
