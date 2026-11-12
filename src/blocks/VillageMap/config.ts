import type { Block } from 'payload'

/**
 * Full interactive village map (Leaflet, free tiles). Markers come from PUBLISHED Map Locations
 * (publishing requires verified coordinates); the centre comes from Village Profile → Map.
 * Only the labels are set here.
 */
export const VillageMapBlock: Block = {
  slug: 'villageMap',
  interfaceName: 'VillageMapBlock',
  labels: { singular: 'Village map', plural: 'Village maps' },
  fields: [
    {
      type: 'collapsible',
      label: 'Filters and search',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'allLabel', type: 'text', localized: true, admin: { width: '33%' } },
            { name: 'templesLabel', type: 'text', localized: true, admin: { width: '33%' } },
            { name: 'educationLabel', type: 'text', localized: true, admin: { width: '33%' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'healthcareLabel', type: 'text', localized: true, admin: { width: '33%' } },
            { name: 'publicLabel', type: 'text', localized: true, admin: { width: '33%' } },
            { name: 'otherLabel', type: 'text', localized: true, admin: { width: '33%' } },
          ],
        },
        { name: 'searchPlaceholder', type: 'text', localized: true },
      ],
    },
    {
      type: 'collapsible',
      label: 'Messages',
      fields: [
        {
          name: 'emptyText',
          type: 'text',
          localized: true,
          admin: { description: 'Shown while no verified locations are published.' },
        },
        { name: 'noResultsText', type: 'text', localized: true },
        {
          name: 'districtNote',
          type: 'text',
          localized: true,
          admin: { description: 'Shown while the village centre is not yet verified.' },
        },
        { name: 'viewDetailsLabel', type: 'text', localized: true },
      ],
    },
    {
      type: 'collapsible',
      label: 'Information strip',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'villageTitle',
              type: 'text',
              localized: true,
              admin: {
                width: '50%',
                description: 'e.g. "Nirna Village". Defaults to the village name.',
              },
            },
            {
              name: 'coordinatesPendingText',
              type: 'text',
              localized: true,
              admin: { width: '50%', description: 'Shown until the village centre is verified.' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'latitudeLabel', type: 'text', localized: true, admin: { width: '50%' } },
            { name: 'longitudeLabel', type: 'text', localized: true, admin: { width: '50%' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'exploreTitle', type: 'text', localized: true, admin: { width: '50%' } },
            { name: 'exploreText', type: 'text', localized: true, admin: { width: '50%' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'fullMapLabel', type: 'text', localized: true, admin: { width: '50%' } },
            { name: 'closeFullMapLabel', type: 'text', localized: true, admin: { width: '50%' } },
          ],
        },
      ],
    },
  ],
}
