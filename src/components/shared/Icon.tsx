import type { SVGProps } from 'react'

/** Small inline SVG icon set (no icon library → no extra JS). Decorative by default. */
const paths = {
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <circle cx="17" cy="9" r="2.6" />
      <path d="M2.5 19c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6z" />
      <path d="M15.2 13.4c3.4-.4 6.3 1.6 6.3 5.6h-4.6c0-2.3-.6-4.1-1.7-5.6z" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="7.5" r="3.8" />
      <path d="M4.5 20.5c0-4.4 3.4-7.3 7.5-7.3s7.5 2.9 7.5 7.3z" />
    </>
  ),
  home: <path d="M12 3 2 11.5h3V21h5.5v-5.5h3V21H19v-9.5h3z" />,
  pin: (
    <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.6A2.6 2.6 0 1 1 12 6.4a2.6 2.6 0 0 1 0 5.2z" />
  ),
  graduation: (
    <>
      <path d="M12 3 1 8.5l11 5.5 9-4.5V16h2V8.5z" />
      <path d="M5.5 12.6V16c0 1.9 2.9 3.5 6.5 3.5s6.5-1.6 6.5-3.5v-3.4L12 15.9z" />
    </>
  ),
  medical: (
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.5 11.5h-3v3h-3v-3h-3v-3h3v-3h3v3h3z" />
  ),
  megaphone: (
    <>
      <path d="M3 9.5v5h3l7 4.5v-14L6 9.5z" />
      <path
        d="M15.5 8.5a4.5 4.5 0 0 1 0 7M18 6a8 8 0 0 1 0 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M6.5 15.5 8 21h2.5l-1-5.5z" />
    </>
  ),
  chart: (
    <>
      <path d="M3 21h18v-2H3z" />
      <path d="M4 17h3v-5H4zm5 0h3V9H9zm5 0h3v-7h-3zm5 0h2V5h-2z" />
    </>
  ),
  search: (
    <path
      d="m20 20-4.6-4.6M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  ),
  menu: (
    <path
      d="M3 6h18M3 12h18M3 18h18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  ),
  close: (
    <path
      d="M5 5l14 14M19 5 5 19"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  ),
  navigation: <path d="M21 3 3 10.5l7.5 2.9L13.4 21z" />,
  trees: (
    <>
      <path d="M7 2 2.5 10H5l-3 5h4.2v4h1.6v-4H12l-3-5h2.5z" />
      <path d="M17 6l-4 7h2l-2.6 4.5h3.8V22h1.6v-4.5h3.8L19 13h2z" />
    </>
  ),
  map: <path d="M9 4 3 6.5v13.5l6-2.5 6 2.5 6-2.5V4l-6 2.5zm0 2.2 6 2.5v11.1l-6-2.5z" />,
  arrowRight: (
    <path
      d="M4 12h15m-6-6 6 6-6 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
} as const

export type IconName = keyof typeof paths

type Props = SVGProps<SVGSVGElement> & { name: IconName; title?: string }

export function Icon({ name, title, className = 'size-5', ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
      {...rest}
    >
      {title && <title>{title}</title>}
      {paths[name]}
    </svg>
  )
}
