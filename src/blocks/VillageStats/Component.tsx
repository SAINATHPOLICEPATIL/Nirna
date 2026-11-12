import { type StatItem, StatsBar } from '@/components/homepage/StatsBar'
import type { VillageStatsBlock as VillageStatsBlockProps } from '@/payload-types'
import { getVillageProfile } from '@/utilities/queries'

import { type BlockContext, numberFormat } from '../shared'

export async function VillageStatsBlockComponent({
  block,
  locale,
}: { block: VillageStatsBlockProps } & BlockContext) {
  const profile = await getVillageProfile(locale)

  const figures: [StatItem['icon'], number | null | undefined, string | null | undefined][] = [
    ['users', profile.population, block.populationLabel],
    ['user', profile.malePopulation, block.maleLabel],
    ['user', profile.femalePopulation, block.femaleLabel],
    ['home', profile.households, block.householdsLabel],
  ]

  const items: StatItem[] = figures
    .filter(([, value]) => value != null)
    .map(([icon, value, label]) => ({
      icon,
      value: numberFormat.format(value!),
      label: label ?? '',
    }))

  if (profile.district) {
    items.push({ icon: 'pin', value: profile.district, label: profile.state ?? '' })
  }

  if (items.length === 0) return null
  return <StatsBar items={items} label={block.regionLabel ?? ''} />
}
