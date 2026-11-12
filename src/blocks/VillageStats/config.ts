import type { Block } from 'payload'

/**
 * Five compact statistics. The FIGURES come from Village → Village Profile (population, male,
 * female, households, district, state); only the labels are set here. Missing figures are hidden.
 */
export const VillageStatsBlock: Block = {
  slug: 'villageStats',
  interfaceName: 'VillageStatsBlock',
  labels: { singular: 'Village statistics', plural: 'Village statistics' },
  fields: [
    {
      name: 'regionLabel',
      type: 'text',
      localized: true,
      admin: {
        description:
          'Read by screen readers, e.g. "Village at a glance". The figures themselves are edited in Village Profile.',
      },
    },
    {
      type: 'row',
      fields: [
        { name: 'populationLabel', type: 'text', localized: true, admin: { width: '25%' } },
        { name: 'maleLabel', type: 'text', localized: true, admin: { width: '25%' } },
        { name: 'femaleLabel', type: 'text', localized: true, admin: { width: '25%' } },
        { name: 'householdsLabel', type: 'text', localized: true, admin: { width: '25%' } },
      ],
    },
  ],
}
