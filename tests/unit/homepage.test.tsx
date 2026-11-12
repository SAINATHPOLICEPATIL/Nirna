import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { toCTA } from '@/blocks/shared'
import { NewsCard } from '@/components/homepage/NewsCard'
import { StatsBar } from '@/components/homepage/StatsBar'
import { localizeUrl } from '@/utilities/link'
import { docPath } from '@/utilities/routes'

afterEach(() => cleanup())

describe('CMS links', () => {
  it('adds the page language to site paths, leaves other URLs alone', () => {
    expect(localizeUrl('/about', 'en')).toBe('/en/about')
    expect(localizeUrl('/', 'kn')).toBe('/kn')
    expect(localizeUrl('/kn/places', 'en')).toBe('/kn/places')
    expect(localizeUrl('https://example.org/x', 'en')).toBe('https://example.org/x')
    expect(localizeUrl('#map', 'en')).toBe('#map')
    expect(localizeUrl('mailto:a@b.c', 'en')).toBe('mailto:a@b.c')
    expect(localizeUrl('//cdn.example.org/x', 'en')).toBe('//cdn.example.org/x')
    expect(localizeUrl(null, 'en')).toBeUndefined()
  })

  it('maps the "home" page to the language root and other pages to /<locale>/<slug>', () => {
    expect(docPath('pages', 'home', 'kn')).toBe('/kn')
    expect(docPath('pages', 'about', 'en')).toBe('/en/about')
    expect(docPath('places', 'hanuman-temple', 'kn')).toBe('/kn/places/hanuman-temple')
  })

  it('turns a link field into a button, or nothing when empty / unpublished', () => {
    expect(toCTA({ type: 'custom', url: '/map', label: 'View Map' }, 'en')).toEqual({
      href: '/en/map',
      label: 'View Map',
      newTab: false,
    })
    expect(toCTA({ type: 'custom', url: '/map', label: '' }, 'en')).toBeNull()
    expect(toCTA(null, 'en')).toBeNull()
    expect(
      toCTA(
        {
          type: 'reference',
          label: 'Draft page',
          reference: { relationTo: 'pages', value: { slug: 'x', _status: 'draft' } },
        },
        'en',
      ),
    ).toBeNull()
  })
})

const newsProps = {
  heading: 'Latest News & Announcements',
  subheading: 'Stay updated',
  emptyLabel: 'No announcements yet.',
  cta: { href: '/en/news', label: 'View All' },
}

describe('NewsCard', () => {
  it('shows the CMS empty text when there is no published news', () => {
    render(<NewsCard {...newsProps} items={[]} />)
    expect(screen.getByText('No announcements yet.')).toBeTruthy()
    expect(screen.queryByRole('list')).toBeNull()
  })

  it('lists published items with their dates', () => {
    render(
      <NewsCard
        {...newsProps}
        items={[
          { href: '/en/news/a', title: 'Gram Sabha', date: '1 Jan 2026', dateTime: '2026-01-01' },
        ]}
      />,
    )
    expect(screen.getByRole('link', { name: 'Gram Sabha' })).toBeTruthy()
    expect(screen.getByText('1 Jan 2026').getAttribute('datetime')).toBe('2026-01-01')
  })

  it('hides the button when the editor left it empty', () => {
    render(<NewsCard {...newsProps} cta={null} items={[]} />)
    expect(screen.queryByRole('link', { name: 'View All' })).toBeNull()
  })
})

describe('StatsBar', () => {
  it('renders each value with its label', () => {
    render(
      <StatsBar
        label="Village at a glance"
        items={[
          { icon: 'users', value: '9,415', label: 'Total Population' },
          { icon: 'home', value: '1,678', label: 'Households' },
        ]}
      />,
    )
    expect(screen.getByRole('region', { name: 'Village at a glance' })).toBeTruthy()
    expect(screen.getByText('9,415')).toBeTruthy()
    expect(screen.getByText('Households')).toBeTruthy()
  })
})
