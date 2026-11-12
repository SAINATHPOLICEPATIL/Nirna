import type { Media } from '@/payload-types'

export type ResolvedImage = {
  src: string
  alt: string
  /** True when the editor did NOT mark it as a genuine Nirna photo → shown with an "illustrative" label. */
  isIllustrative: boolean
}

type ImageSize = 'thumbnail' | 'card' | 'hero'

/**
 * Turn a populated upload field into what the frontend renders.
 * Returns undefined for missing / unpopulated media so callers fall back to the placeholder.
 */
export function resolveImage(
  media: number | Media | null | undefined,
  size: ImageSize = 'card',
): ResolvedImage | undefined {
  if (!media || typeof media !== 'object') return undefined
  const src = media.sizes?.[size]?.url || media.url
  if (!src) return undefined
  return {
    src,
    alt: media.alt ?? '',
    isIllustrative: !media.isGenuineNirnaPhoto,
  }
}
