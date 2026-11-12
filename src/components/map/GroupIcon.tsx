import { MAP_GROUP_ICONS, MAP_GROUPS, type MapGroup } from './config'

/** Small category icon in the group's colour (filters, legend, list badges). */
export function GroupIcon({
  group,
  className = 'size-5',
  colored = true,
}: {
  group: MapGroup
  className?: string
  colored?: boolean
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
      className={className}
      style={colored ? { color: MAP_GROUPS[group].color } : undefined}
      fill="currentColor"
    >
      <path d={MAP_GROUP_ICONS[group]} />
    </svg>
  )
}
