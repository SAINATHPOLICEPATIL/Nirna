import { describe, expect, it } from 'vitest'

import {
  defaultLocale,
  getLocaleFromPathname,
  isLocale,
  locales,
  switchLocaleInPathname,
} from '@/i18n/config'
import { en } from '@/i18n/dictionaries/en'
import { kn } from '@/i18n/dictionaries/kn'

describe('i18n config', () => {
  it('supports exactly Kannada and English, with Kannada as default', () => {
    expect([...locales]).toEqual(['kn', 'en'])
    expect(defaultLocale).toBe('kn')
  })

  it('recognises valid locales only', () => {
    expect(isLocale('kn')).toBe(true)
    expect(isLocale('en')).toBe(true)
    expect(isLocale('fr')).toBe(false)
    expect(isLocale(undefined)).toBe(false)
  })

  it('reads the locale from a pathname', () => {
    expect(getLocaleFromPathname('/en/about')).toBe('en')
    expect(getLocaleFromPathname('/kn')).toBe('kn')
    expect(getLocaleFromPathname('/about')).toBeNull()
    expect(getLocaleFromPathname('/')).toBeNull()
  })

  it('switches language while keeping the same page', () => {
    expect(switchLocaleInPathname('/kn/about', 'en')).toBe('/en/about')
    expect(switchLocaleInPathname('/en/news/some-slug', 'kn')).toBe('/kn/news/some-slug')
    expect(switchLocaleInPathname('/kn', 'en')).toBe('/en')
    expect(switchLocaleInPathname('/', 'en')).toBe('/en')
    expect(switchLocaleInPathname('/about', 'kn')).toBe('/kn/about')
  })
})

describe('UI dictionaries', () => {
  const keysOf = (obj: object, prefix = ''): string[] =>
    Object.entries(obj).flatMap(([k, v]) =>
      typeof v === 'object' && v !== null ? keysOf(v, `${prefix}${k}.`) : [`${prefix}${k}`],
    )

  it('Kannada and English have the same keys', () => {
    expect(keysOf(kn).sort()).toEqual(keysOf(en).sort())
  })

  it('Kannada strings contain Kannada script', () => {
    expect(kn.skipToContent).toMatch(/[ಀ-೿]/)
    expect(kn.nav.openMenu).toMatch(/[ಀ-೿]/)
  })
})
