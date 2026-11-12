import 'server-only'

import type { Locale } from './config'
import { en, type Dictionary } from './dictionaries/en'
import { kn } from './dictionaries/kn'

const dictionaries: Record<Locale, Dictionary> = { en, kn }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
