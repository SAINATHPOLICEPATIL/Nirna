import 'server-only'

import { DISTRICT_OVERVIEW, groupForCategory, type MapPoint } from '@/components/map/config'
import type { Locale } from '@/i18n/config'
import type { Facility, Place, VillageProfile } from '@/payload-types'
import { resolveImage } from '@/utilities/media'
import { getMapLocations } from '@/utilities/queries'
import { docPath } from '@/utilities/routes'

/** Map view: the verified village centre, otherwise the Bidar district overview. */
export function mapView(profile: VillageProfile) {
  const lat = profile.mapCenterLatitude
  const lng = profile.mapCenterLongitude
  if (profile.mapCenterVerified && lat != null && lng != null) {
    return { center: [lat, lng] as [number, number], zoom: profile.mapZoom ?? 15, verified: true }
  }
  return { ...DISTRICT_OVERVIEW, verified: false }
}

/** Published (therefore verified) map locations → markers, linked to their Place/Facility page. */
export async function getMapPoints(locale: Locale): Promise<MapPoint[]> {
  const docs = await getMapLocations(locale)
  return docs.flatMap((doc) => {
    // Never show unverified coordinates, even if validation were ever bypassed.
    if (!doc.coordinatesVerified || doc.latitude == null || doc.longitude == null || !doc.name) {
      return []
    }
    const place = typeof doc.place === 'object' ? (doc.place as Place | null) : null
    const facility = typeof doc.facility === 'object' ? (doc.facility as Facility | null) : null
    const linked = place ?? facility
    const href =
      place?._status === 'published' && place.slug
        ? docPath('places', place.slug, locale)
        : facility?._status === 'published' && facility.slug
          ? docPath('facilities', facility.slug, locale)
          : undefined
    const photo = resolveImage(linked?.images?.[0], 'thumbnail')
    return [
      {
        id: doc.id,
        name: doc.name,
        group: groupForCategory(doc.category),
        description: doc.description ?? linked?.summary ?? undefined,
        lat: doc.latitude,
        lng: doc.longitude,
        href,
        image: photo ? { src: photo.src, alt: photo.alt } : undefined,
      },
    ]
  })
}

/** "17.4375° N, 77.4986° E" style text, only for a verified centre. */
export function formatCoordinates(
  view: ReturnType<typeof mapView>,
  latLabel: string,
  lngLabel: string,
) {
  if (!view.verified) return undefined
  const [lat, lng] = view.center
  const fmt = (v: number, pos: string, neg: string) =>
    `${Math.abs(v).toFixed(4)}° ${v >= 0 ? pos : neg}`
  return `${latLabel}: ${fmt(lat, 'N', 'S')}  ·  ${lngLabel}: ${fmt(lng, 'E', 'W')}`
}
