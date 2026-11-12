import { Container } from '@/components/shared/Container'
import { VillageMapExplorer } from '@/components/map/VillageMapExplorer'
import type { VillageMapBlock as VillageMapBlockProps } from '@/payload-types'
import { getVillageProfile } from '@/utilities/queries'

import type { BlockContext } from '../shared'

import { formatCoordinates, getMapPoints, mapView } from './mapData'

export async function VillageMapBlockComponent({
  block,
  locale,
  t,
}: { block: VillageMapBlockProps } & BlockContext) {
  const [profile, points] = await Promise.all([getVillageProfile(locale), getMapPoints(locale)])
  const view = mapView(profile)
  const place = [profile.district, profile.state].filter(Boolean).join(', ')

  return (
    <Container className="py-8 sm:py-10">
      <VillageMapExplorer
        points={points}
        view={view}
        labels={{
          all: block.allLabel ?? '',
          groups: {
            temples: block.templesLabel ?? '',
            education: block.educationLabel ?? '',
            healthcare: block.healthcareLabel ?? '',
            public: block.publicLabel ?? '',
            other: block.otherLabel ?? '',
          },
          searchPlaceholder: block.searchPlaceholder ?? '',
          emptyText: block.emptyText ?? '',
          noResultsText: block.noResultsText ?? '',
          viewDetails: block.viewDetailsLabel ?? '',
          mapAriaLabel: t.map.ariaLabel,
          districtNote: block.districtNote ?? undefined,
          fullMap: block.fullMapLabel ?? '',
          closeFullMap: block.closeFullMapLabel ?? '',
          info: {
            villageTitle: block.villageTitle || profile.name || '',
            villageSubtitle: place,
            coordinates: formatCoordinates(
              view,
              block.latitudeLabel ?? '',
              block.longitudeLabel ?? '',
            ),
            coordinatesPending: block.coordinatesPendingText ?? '',
            exploreTitle: block.exploreTitle ?? undefined,
            exploreText: block.exploreText ?? undefined,
          },
        }}
      />
    </Container>
  )
}
