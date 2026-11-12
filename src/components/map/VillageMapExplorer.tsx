'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { Icon } from '@/components/shared/Icon'

import { MAP_GROUP_KEYS, type MapGroup, type MapPoint } from './config'
import { GroupIcon } from './GroupIcon'

// Leaflet touches `window`, so the map itself is client-only.
const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => <div className="size-full animate-pulse bg-primary-soft" />,
})

export type VillageMapLabels = {
  all: string
  groups: Record<MapGroup, string>
  searchPlaceholder: string
  emptyText: string
  noResultsText: string
  viewDetails: string
  mapAriaLabel: string
  districtNote?: string
  fullMap: string
  closeFullMap: string
  info: {
    villageTitle: string
    villageSubtitle: string
    coordinates?: string
    coordinatesPending: string
    exploreTitle?: string
    exploreText?: string
  }
}

type Props = {
  points: MapPoint[]
  view: { center: [number, number]; zoom: number; verified: boolean }
  labels: VillageMapLabels
}

export function VillageMapExplorer({ points, view, labels }: Props) {
  const [group, setGroup] = useState<MapGroup | 'all'>('all')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [fullMap, setFullMap] = useState(false)

  const visible = useMemo(() => {
    const q = query.trim().toLocaleLowerCase()
    return points.filter(
      (p) =>
        (group === 'all' || p.group === group) &&
        (!q || `${p.name} ${p.description ?? ''}`.toLocaleLowerCase().includes(q)),
    )
  }, [points, group, query])

  // Groups that actually have locations (others are still shown in filters, but dimmed).
  const counts = useMemo(() => {
    const c = Object.fromEntries(MAP_GROUP_KEYS.map((g) => [g, 0])) as Record<MapGroup, number>
    for (const p of points) c[p.group] += 1
    return c
  }, [points])

  const closeFullMap = useCallback(() => setFullMap(false), [])
  useEffect(() => {
    if (!fullMap) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeFullMap()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [fullMap, closeFullMap])

  const filterButton = (key: MapGroup | 'all', label: string) => {
    const active = group === key
    return (
      <button
        key={key}
        type="button"
        aria-pressed={active}
        onClick={() => {
          setGroup(key)
          setSelectedId(null)
        }}
        className={`inline-flex h-11 shrink-0 items-center gap-2 rounded-full border px-3 text-sm font-semibold transition-colors ${
          active
            ? 'border-primary bg-primary text-primary-foreground shadow-sm'
            : 'border-border bg-surface text-ink hover:border-primary/50'
        } ${key !== 'all' && counts[key] === 0 ? 'opacity-70' : ''}`}
      >
        {key === 'all' ? (
          <svg viewBox="0 0 24 24" aria-hidden className="size-5" fill="currentColor">
            <path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z" />
          </svg>
        ) : (
          <GroupIcon group={key} colored={!active} />
        )}
        {label}
      </button>
    )
  }

  const mapPanel = (
    <div
      className={
        fullMap
          ? 'fixed inset-0 z-50 bg-surface'
          : 'relative h-[26rem] overflow-hidden rounded-2xl border border-border shadow-(--shadow-card) sm:h-[32rem] lg:h-[34rem]'
      }
      role={fullMap ? 'dialog' : undefined}
      aria-modal={fullMap || undefined}
      aria-label={fullMap ? labels.mapAriaLabel : undefined}
    >
      <LeafletMap
        points={visible}
        view={view}
        selectedId={selectedId}
        onSelect={setSelectedId}
        viewDetailsLabel={labels.viewDetails}
        ariaLabel={labels.mapAriaLabel}
        sizeKey={fullMap ? 'full' : 'inline'}
      />

      {/* Legend */}
      <ul className="pointer-events-none absolute top-3 right-3 z-[500] hidden space-y-1.5 rounded-xl bg-white/95 px-4 py-3 text-sm shadow-md md:block">
        {MAP_GROUP_KEYS.map((g) => (
          <li key={g} className="flex items-center gap-2">
            <GroupIcon group={g} className="size-4" />
            {labels.groups[g]}
          </li>
        ))}
      </ul>

      {points.length === 0 && (
        <p className="pointer-events-none absolute inset-x-4 top-1/2 z-[500] mx-auto max-w-sm -translate-y-1/2 rounded-xl bg-white/95 px-4 py-3 text-center text-sm text-ink-muted shadow-md">
          {labels.emptyText}
          {labels.districtNote && !view.verified && (
            <span className="mt-1 block text-xs">{labels.districtNote}</span>
          )}
        </p>
      )}

      {fullMap && (
        <button
          type="button"
          onClick={closeFullMap}
          autoFocus
          className="absolute top-3 left-1/2 z-[600] inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg"
        >
          <Icon name="close" className="size-4" />
          {labels.closeFullMap}
        </button>
      )}
    </div>
  )

  return (
    <div>
      {/* Filters + search */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
        <div className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 lg:pb-0">
          {filterButton('all', labels.all)}
          {MAP_GROUP_KEYS.map((g) => filterButton(g, labels.groups[g]))}
        </div>
        <label className="relative block lg:w-52 lg:shrink-0 xl:w-56">
          <span className="sr-only">{labels.searchPlaceholder}</span>
          <Icon
            name="search"
            className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-muted"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.searchPlaceholder}
            className="h-11 w-full rounded-full border border-border bg-surface pr-4 pl-11 text-sm shadow-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
        {/* Location list: also the accessible, text alternative to the map (§17.2) */}
        <div className="order-2 lg:order-1">
          {visible.length === 0 ? (
            <p className="rounded-2xl border border-border bg-surface px-5 py-8 text-center text-sm text-ink-muted shadow-sm">
              {points.length === 0 ? labels.emptyText : labels.noResultsText}
            </p>
          ) : (
            <ul className="space-y-3 lg:max-h-[34rem] lg:overflow-y-auto lg:pr-1">
              {visible.map((p) => (
                <li key={p.id}>
                  <div
                    className={`flex items-center gap-3 rounded-2xl border bg-surface p-3 shadow-sm transition-colors ${
                      selectedId === p.id
                        ? 'border-primary ring-2 ring-primary/15'
                        : 'border-border'
                    }`}
                  >
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-primary-soft">
                      {p.image ? (
                        <Image
                          src={p.image.src}
                          alt={p.image.alt}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      ) : (
                        <span className="flex size-full items-center justify-center">
                          <GroupIcon group={p.group} className="size-8" />
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedId(p.id)}
                      className="min-w-0 flex-1 text-left"
                    >
                      <span className="block font-heading text-base leading-snug font-bold text-ink">
                        {p.name}
                      </span>
                      <span className="mt-1 inline-flex items-center gap-1 rounded-md bg-surface-muted px-2 py-0.5 text-xs font-medium text-ink">
                        <GroupIcon group={p.group} className="size-3.5" />
                        {labels.groups[p.group]}
                      </span>
                      {p.description && (
                        <span className="mt-1 line-clamp-2 block text-sm text-ink-muted">
                          {p.description}
                        </span>
                      )}
                    </button>
                    {p.href && (
                      <Link
                        href={p.href}
                        aria-label={`${labels.viewDetails}: ${p.name}`}
                        className="rounded-full p-2 text-ink hover:bg-primary-soft hover:text-primary"
                      >
                        <Icon name="arrowRight" className="size-5" />
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="order-1 lg:order-2">{mapPanel}</div>
      </div>

      {/* Info strip */}
      <div className="mt-6 grid items-center gap-4 rounded-2xl bg-primary-soft px-5 py-5 sm:px-8 md:grid-cols-[1fr_1fr_1.3fr_auto] md:gap-0 md:divide-x md:divide-primary/15">
        <InfoItem icon="pin" title={labels.info.villageTitle} text={labels.info.villageSubtitle} />
        <InfoItem
          icon="navigation"
          title={labels.info.coordinates ?? labels.info.coordinatesPending}
          text={labels.info.coordinates ? undefined : undefined}
          muted={!labels.info.coordinates}
        />
        {labels.info.exploreTitle ? (
          <InfoItem icon="trees" title={labels.info.exploreTitle} text={labels.info.exploreText} />
        ) : (
          <span />
        )}
        <div className="md:pl-6">
          <button
            type="button"
            onClick={() => setFullMap(true)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-sm hover:bg-primary-hover md:w-auto"
          >
            <Icon name="map" className="size-5" />
            {labels.fullMap}
            <Icon name="arrowRight" className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

function InfoItem({
  icon,
  title,
  text,
  muted = false,
}: {
  icon: 'pin' | 'navigation' | 'trees'
  title: string
  text?: string
  muted?: boolean
}) {
  return (
    <div className="flex items-center gap-3 md:px-6 md:first:pl-0">
      <Icon name={icon} className="size-8 shrink-0 text-primary" />
      <div className="min-w-0">
        <p
          className={`text-sm leading-snug ${muted ? 'text-ink-muted' : 'font-semibold text-ink'}`}
        >
          {title}
        </p>
        {text && <p className="text-sm text-ink-muted">{text}</p>}
      </div>
    </div>
  )
}
