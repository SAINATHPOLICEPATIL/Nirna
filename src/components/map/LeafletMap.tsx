'use client'

import 'leaflet/dist/leaflet.css'
import 'maplibre-gl/dist/maplibre-gl.css'

import L from 'leaflet'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, Marker, Popup, ScaleControl, TileLayer, useMap } from 'react-leaflet'

import { MAP_GROUP_ICONS, MAP_GROUPS, type MapGroup, type MapPoint, baseMap } from './config'

export type LeafletMapProps = {
  points: MapPoint[]
  /** Verified village centre, or the district overview when not verified. */
  view: { center: [number, number]; zoom: number; verified: boolean }
  selectedId: number | null
  onSelect: (id: number | null) => void
  viewDetailsLabel: string
  ariaLabel: string
  /** Changes when the container is resized (e.g. full-map mode) so Leaflet re-measures. */
  sizeKey?: string
  interactive?: boolean
  /** A single labelled pin at the centre (About page location card). */
  centerPinLabel?: string
}

const iconCache = new Map<string, L.DivIcon>()

/** Teardrop pin in the category colour with a white icon (pure CSS/SVG, no image files). */
function pinIcon(group: MapGroup, active: boolean): L.DivIcon {
  const key = `${group}-${active}`
  const cached = iconCache.get(key)
  if (cached) return cached
  const icon = L.divIcon({
    className: 'nirna-pin-wrapper',
    html: `<span class="nirna-pin${active ? ' is-active' : ''}" style="--pin:${MAP_GROUPS[group].color}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${MAP_GROUP_ICONS[group]}"/></svg></span>`,
    iconSize: [36, 44],
    iconAnchor: [18, 42],
    popupAnchor: [0, -40],
  })
  iconCache.set(key, icon)
  return icon
}

const centerIcon = (label: string) =>
  L.divIcon({
    className: 'nirna-pin-wrapper',
    html: `<span class="nirna-pin" style="--pin:#1f5130"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="5"/></svg></span><span class="nirna-pin-label">${label.replace(/[<>&"]/g, '')}</span>`,
    iconSize: [36, 44],
    iconAnchor: [18, 42],
  })

const hasWebGL = () => {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

/**
 * OpenFreeMap vector base map rendered by MapLibre inside Leaflet. Falls back to OpenStreetMap
 * raster tiles when WebGL is unavailable (old phones, some privacy settings) or MapLibre fails.
 */
function BaseMap() {
  const map = useMap()
  // This component only renders in the browser (the map is loaded with ssr: false).
  const [fallback, setFallback] = useState(() => !hasWebGL())

  useEffect(() => {
    if (fallback) return
    let layer: L.Layer | undefined
    let cancelled = false
    ;(async () => {
      try {
        await import('@maplibre/maplibre-gl-leaflet')
        if (cancelled) return
        layer = L.maplibreGL({ style: baseMap.styleUrl })
        layer.addTo(map)
        // Required credit (OpenStreetMap ODbL / OpenFreeMap); removed again in cleanup.
        map.attributionControl?.addAttribution(baseMap.attribution)
      } catch {
        if (!cancelled) setFallback(true)
      }
    })()
    return () => {
      cancelled = true
      if (layer) {
        map.removeLayer(layer)
        map.attributionControl?.removeAttribution(baseMap.attribution)
      }
    }
  }, [map, fallback])

  if (!fallback) return null
  return (
    <TileLayer
      url={baseMap.rasterFallback.url}
      attribution={baseMap.rasterFallback.attribution}
      maxZoom={baseMap.maxZoom}
    />
  )
}

/** Fly to and open the selected marker; fit all markers when there is no verified centre. */
function MapController({
  points,
  selectedId,
  view,
  markers,
  sizeKey,
}: {
  points: MapPoint[]
  selectedId: number | null
  view: LeafletMapProps['view']
  markers: React.RefObject<Map<number, L.Marker>>
  sizeKey?: string
}) {
  const map = useMap()
  const fitted = useRef(false)

  useEffect(() => {
    if (fitted.current || view.verified || points.length === 0) return
    fitted.current = true
    map.fitBounds(L.latLngBounds(points.map((p) => [p.lat, p.lng])), {
      padding: [48, 48],
      maxZoom: 16,
    })
  }, [map, points, view.verified])

  useEffect(() => {
    if (selectedId == null) return
    const point = points.find((p) => p.id === selectedId)
    if (!point) return
    map.flyTo([point.lat, point.lng], Math.max(map.getZoom(), 16), { duration: 0.6 })
    markers.current?.get(selectedId)?.openPopup()
  }, [map, points, selectedId, markers])

  useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 150)
    return () => clearTimeout(t)
  }, [map, sizeKey])

  return null
}

export default function LeafletMap({
  points,
  view,
  selectedId,
  onSelect,
  viewDetailsLabel,
  ariaLabel,
  sizeKey,
  interactive = true,
  centerPinLabel,
}: LeafletMapProps) {
  const markers = useRef(new Map<number, L.Marker>())
  const center = useMemo(() => view.center, [view.center])

  return (
    <MapContainer
      center={center}
      zoom={view.zoom}
      scrollWheelZoom={false}
      zoomControl={interactive}
      dragging={interactive}
      doubleClickZoom={interactive}
      touchZoom={interactive}
      keyboard={interactive}
      attributionControl
      className="nirna-map size-full"
      aria-label={ariaLabel}
    >
      <BaseMap />
      {interactive && <ScaleControl position="bottomleft" />}
      <MapController
        points={points}
        selectedId={selectedId}
        view={view}
        markers={markers}
        sizeKey={sizeKey}
      />

      {centerPinLabel && view.verified && (
        <Marker position={view.center} icon={centerIcon(centerPinLabel)} interactive={false} />
      )}

      {points.map((point) => (
        <Marker
          key={point.id}
          position={[point.lat, point.lng]}
          icon={pinIcon(point.group, point.id === selectedId)}
          title={point.name}
          alt={point.name}
          ref={(marker) => {
            if (marker) markers.current.set(point.id, marker)
            else markers.current.delete(point.id)
          }}
          eventHandlers={{ click: () => onSelect(point.id), popupclose: () => onSelect(null) }}
        >
          <Popup className="nirna-popup" closeButton>
            <div className="flex gap-3">
              {point.image && (
                // eslint-disable-next-line @next/next/no-img-element -- Leaflet popups render outside React's image pipeline
                <img
                  src={point.image.src}
                  alt={point.image.alt}
                  className="size-20 shrink-0 rounded-lg object-cover"
                  loading="lazy"
                />
              )}
              <div className="min-w-0">
                <p className="font-heading text-base leading-snug font-bold text-ink">
                  {point.name}
                </p>
                {point.description && (
                  <p className="mt-1 text-sm text-ink-muted">{point.description}</p>
                )}
                {point.href && (
                  <Link
                    href={point.href}
                    className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  >
                    {viewDetailsLabel} <span aria-hidden>→</span>
                  </Link>
                )}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
