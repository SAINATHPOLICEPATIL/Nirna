'use client'

import dynamic from 'next/dynamic'

const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => <div className="size-full animate-pulse bg-primary-soft" />,
})

/** Small, non-interactive map centred on the VERIFIED village centre with a labelled pin. */
export function MiniMap({
  center,
  zoom,
  label,
  ariaLabel,
}: {
  center: [number, number]
  zoom: number
  label: string
  ariaLabel: string
}) {
  return (
    <LeafletMap
      points={[]}
      view={{ center, zoom: Math.min(zoom, 14), verified: true }}
      selectedId={null}
      onSelect={() => undefined}
      viewDetailsLabel=""
      ariaLabel={ariaLabel}
      interactive={false}
      centerPinLabel={label}
    />
  )
}
