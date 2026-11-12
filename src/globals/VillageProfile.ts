import type { GlobalConfig } from 'payload'

import { anyone, superAdminOnly } from '@/access'
import { coordinateFields, wholeNumber } from '@/fields'
import { revalidateGlobalAfterChange } from '@/hooks/revalidateSite'

/**
 * Village Profile (requirements §11.3) — a single editable record.
 * Figures must carry their source and year; they are not presented as census data unless the
 * source says so.
 */
export const VillageProfile: GlobalConfig = {
  slug: 'village-profile',
  label: 'Village Profile',
  admin: { group: 'Village' },
  access: { read: anyone, update: superAdminOnly },
  hooks: { afterChange: [revalidateGlobalAfterChange] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            { name: 'name', type: 'text', required: true, localized: true },
            {
              name: 'shortDescription',
              type: 'textarea',
              localized: true,
              maxLength: 300,
              admin: { description: 'One or two sentences, used on the homepage About section.' },
            },
            { name: 'description', type: 'richText', localized: true },
            {
              type: 'row',
              fields: [
                { name: 'district', type: 'text', localized: true, admin: { width: '33%' } },
                { name: 'state', type: 'text', localized: true, admin: { width: '33%' } },
                { name: 'country', type: 'text', localized: true, admin: { width: '33%' } },
              ],
            },
          ],
        },
        {
          label: 'Population',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'population',
                  type: 'number',
                  validate: wholeNumber,
                  admin: { width: '25%' },
                },
                {
                  name: 'malePopulation',
                  type: 'number',
                  validate: wholeNumber,
                  admin: { width: '25%' },
                },
                {
                  name: 'femalePopulation',
                  type: 'number',
                  validate: wholeNumber,
                  admin: { width: '25%' },
                },
                {
                  name: 'households',
                  type: 'number',
                  validate: wholeNumber,
                  admin: { width: '25%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'figuresSource',
                  type: 'text',
                  admin: {
                    width: '70%',
                    description: 'e.g. "Census of India 2011" or "Owner-provided estimate".',
                  },
                },
                {
                  name: 'figuresYear',
                  type: 'number',
                  min: 1900,
                  max: 2100,
                  admin: { width: '30%' },
                },
              ],
            },
          ],
        },
        {
          label: 'Facility summary',
          description:
            'Headline counts for the homepage. Individual schools and hospitals go in Facilities.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'governmentSchools',
                  type: 'number',
                  validate: wholeNumber,
                  admin: { width: '33%' },
                },
                {
                  name: 'privateSchools',
                  type: 'number',
                  validate: wholeNumber,
                  admin: { width: '33%' },
                },
                {
                  name: 'colleges',
                  type: 'number',
                  validate: wholeNumber,
                  admin: { width: '33%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'governmentHospitals',
                  type: 'number',
                  validate: wholeNumber,
                  admin: { width: '33%' },
                },
                {
                  name: 'privateHospitalsAndClinics',
                  type: 'number',
                  validate: wholeNumber,
                  admin: { width: '33%' },
                },
                {
                  name: 'countsAreApproximate',
                  type: 'checkbox',
                  defaultValue: true,
                  label: 'Counts are approximate (shown with ≈ / >)',
                  admin: { width: '33%' },
                },
              ],
            },
          ],
        },
        {
          label: 'Images',
          fields: [
            { name: 'coverImage', type: 'upload', relationTo: 'media' },
            { name: 'gallery', type: 'upload', relationTo: 'media', hasMany: true },
          ],
        },
        {
          label: 'Contact',
          description: 'Only verified contact details. Leave empty until confirmed.',
          fields: [
            { name: 'contactPhone', type: 'text' },
            { name: 'contactEmail', type: 'email' },
            { name: 'contactAddress', type: 'textarea', localized: true },
            {
              name: 'contactVerified',
              type: 'checkbox',
              defaultValue: false,
              label: 'Contact details verified',
            },
          ],
        },
        {
          label: 'Map',
          description:
            'Centre of the village map. It is used (and the coordinates shown) only once marked verified; until then the map shows a Bidar district overview. Markers are added in Village → Map Locations.',
          fields: [
            coordinateFields({ prefix: 'mapCenter' }),
            {
              name: 'mapZoom',
              type: 'number',
              defaultValue: 15,
              min: 10,
              max: 18,
              admin: {
                description: 'Zoom level when centred on the village (10 = district, 18 = street).',
              },
            },
          ],
        },
      ],
    },
  ],
}
