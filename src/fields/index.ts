import type { Field, TextFieldSingleValidation } from 'payload'

/**
 * Reusable field groups so every collection handles slugs, coordinates and
 * verification the same way.
 */

export const toSlug = (input: string): string =>
  input
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

/**
 * URL slug (one per document, not per language). Auto-filled from the English name/title
 * when left empty; must be lowercase Latin letters, digits and hyphens.
 */
export const slugField = (from: string): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    description: `Used in the page address. Leave empty to generate it from the English ${from}.`,
  },
  hooks: {
    beforeValidate: [
      ({ value, data, req }) => {
        if (typeof value === 'string' && value.trim()) return toSlug(value)
        // Only derive from English text: a Kannada title would produce an empty slug.
        const source = data?.[from]
        const english =
          typeof source === 'string' ? (req.locale === 'en' ? source : '') : source?.en
        return english ? toSlug(english) : value
      },
    ],
  },
  validate: ((value) =>
    !value
      ? 'Enter a slug (or save the English version first so it can be generated).'
      : slugPattern.test(value)
        ? true
        : 'Use lowercase letters, numbers and hyphens only.') as TextFieldSingleValidation,
})

const latitude: Field = {
  name: 'latitude',
  type: 'number',
  min: -90,
  max: 90,
  admin: { width: '50%', step: 0.000001 },
}
const longitude: Field = {
  name: 'longitude',
  type: 'number',
  min: -180,
  max: 180,
  admin: { width: '50%', step: 0.000001 },
}

/**
 * Optional coordinates + verification flag. Unverified coordinates are never shown on the map
 * (requirements §5.6, §14). `requireVerifiedToPublish` makes verification mandatory for publishing.
 * `prefix` namespaces the field names (e.g. "mapCenter" → mapCenterLatitude, mapCenterVerified…);
 * without it the names are latitude / longitude / coordinatesVerified / coordinatesSource.
 */
export const coordinateFields = ({
  required = false,
  requireVerifiedToPublish = false,
  prefix,
}: { required?: boolean; requireVerifiedToPublish?: boolean; prefix?: string } = {}): Field => {
  const n = {
    lat: prefix ? `${prefix}Latitude` : 'latitude',
    lng: prefix ? `${prefix}Longitude` : 'longitude',
    verified: prefix ? `${prefix}Verified` : 'coordinatesVerified',
    source: prefix ? `${prefix}Source` : 'coordinatesSource',
  }
  return {
    type: 'collapsible',
    label: 'Location coordinates',
    admin: { initCollapsed: !required && !prefix },
    fields: [
      {
        type: 'row',
        fields: [
          { ...latitude, name: n.lat, required },
          { ...longitude, name: n.lng, required },
        ],
      },
      {
        name: n.verified,
        type: 'checkbox',
        defaultValue: false,
        label: 'Coordinates verified on the ground or from an official source',
        validate: (
          value: boolean | null | undefined,
          { data }: { data: Record<string, unknown> },
        ) => {
          const hasCoords = data?.[n.lat] != null && data?.[n.lng] != null
          if (value && !hasCoords) return 'Add latitude and longitude before marking them verified.'
          if (requireVerifiedToPublish && data?._status === 'published' && !value) {
            return 'Coordinates must be verified before this location can be published.'
          }
          return true
        },
      },
      {
        name: n.source,
        type: 'text',
        admin: {
          description: 'How the coordinates were verified (e.g. "GPS on site, 2026-11-10").',
        },
      },
    ],
  }
}

/** Verification of the information itself (names, contacts, descriptions). */
export const verificationFields: Field = {
  type: 'collapsible',
  label: 'Verification',
  admin: { position: 'sidebar' },
  fields: [
    {
      name: 'verificationStatus',
      type: 'select',
      required: true,
      defaultValue: 'unverified',
      options: [
        { label: 'Unverified', value: 'unverified' },
        { label: 'Verified by NIRNA administrator', value: 'verified' },
      ],
    },
    {
      name: 'source',
      type: 'textarea',
      admin: { description: 'Where this information came from (person, document, website).' },
    },
  ],
}

/** Per-language SEO title/description (requirements §7.3, §16). */
export const seoFields: Field = {
  name: 'seo',
  type: 'group',
  label: 'SEO',
  admin: { position: 'sidebar' },
  fields: [
    { name: 'title', type: 'text', localized: true, maxLength: 70 },
    { name: 'description', type: 'textarea', localized: true, maxLength: 170 },
  ],
}

/** Positive whole number. */
export const wholeNumber = (value: number | null | undefined): true | string =>
  value == null || (Number.isInteger(value) && value >= 0)
    ? true
    : 'Enter a whole number (0 or more).'
