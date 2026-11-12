/**
 * Shared map settings (server + client).
 *
 * BASE MAP — free, no API key, no usage limits: OpenFreeMap vector tiles (OpenStreetMap data),
 * drawn inside Leaflet with MapLibre (`@maplibre/maplibre-gl-leaflet`).
 * Without WebGL the map falls back to OpenStreetMap's standard raster tiles, which are fine for
 * a small community site's traffic but not for heavy use (OSM tile usage policy).
 * Both can be swapped via env vars without code changes (requirements §14).
 */
export const baseMap = {
  styleUrl: process.env.NEXT_PUBLIC_MAP_STYLE_URL || 'https://tiles.openfreemap.org/styles/liberty',
  attribution:
    '<a href="https://openfreemap.org" target="_blank" rel="noopener">OpenFreeMap</a> ' +
    '<a href="https://www.openmaptiles.org/" target="_blank" rel="noopener">&copy; OpenMapTiles</a> ' +
    'Data from <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>',
  rasterFallback: {
    url: process.env.NEXT_PUBLIC_MAP_TILE_URL || 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      process.env.NEXT_PUBLIC_MAP_TILE_ATTRIBUTION ||
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  maxZoom: 19,
}

/**
 * Shown ONLY while the village centre is not verified: an overview of Bidar district, centred on
 * the district headquarters (Bidar city). It is a district view, not a claim about where Nirna is —
 * no marker or coordinates are displayed for it.
 */
export const DISTRICT_OVERVIEW = { center: [17.9104, 77.5199] as [number, number], zoom: 10 }

/** Filter groups shown on the map page, and the Map Location categories each one covers. */
export const MAP_GROUPS = {
  temples: { color: '#e08a1e', categories: ['temple'] },
  education: { color: '#1f6fc4', categories: ['school', 'college'] },
  healthcare: { color: '#d93a3a', categories: ['hospital'] },
  public: { color: '#1f7a4d', categories: ['bank', 'bus-stop', 'public-facility'] },
  other: { color: '#7b4fd0', categories: ['landmark'] },
} as const

export type MapGroup = keyof typeof MAP_GROUPS
export const MAP_GROUP_KEYS = Object.keys(MAP_GROUPS) as MapGroup[]

export const groupForCategory = (category: string): MapGroup =>
  (MAP_GROUP_KEYS.find((g) => (MAP_GROUPS[g].categories as readonly string[]).includes(category)) ??
    'other') as MapGroup

/** 24×24 SVG path data for each group's icon (used in markers, filters, legend and list). */
export const MAP_GROUP_ICONS: Record<MapGroup, string> = {
  // stylised temple tower (gopura)
  temples:
    'M12 2l1.6 3.2h-3.2zM9.5 6.2h5l1.3 3.6H8.2zM7.6 10.8h8.8l1.4 4H6.2zM5 15.8h14v5.7h-4.3v-3.4h-5.4v3.4H5z',
  // graduation cap
  education:
    'M12 3 1 8.5l11 5.5 9-4.5V16h2V8.5zM5.5 12.6V16c0 1.9 2.9 3.5 6.5 3.5s6.5-1.6 6.5-3.5v-3.4L12 15.9z',
  // medical cross in circle
  healthcare: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.5 11.5h-3v3h-3v-3h-3v-3h3v-3h3v3h3z',
  // classical building (bank / public office)
  public: 'M12 2 2 7v2h20V7zM4 10h3v8H4zm6.5 0h3v8h-3zM17 10h3v8h-3zM2 19h20v3H2z',
  // star
  other: 'M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z',
}

/** One marker as the map receives it from the server. */
export type MapPoint = {
  id: number
  name: string
  group: MapGroup
  description?: string
  lat: number
  lng: number
  href?: string
  image?: { src: string; alt: string }
}
