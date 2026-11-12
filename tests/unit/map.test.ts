import { describe, expect, it } from 'vitest'

import { baseMap, DISTRICT_OVERVIEW, groupForCategory, MAP_GROUPS } from '@/components/map/config'

describe('village map config', () => {
  it('maps every Map Location category to a filter group', () => {
    expect(groupForCategory('temple')).toBe('temples')
    expect(groupForCategory('school')).toBe('education')
    expect(groupForCategory('college')).toBe('education')
    expect(groupForCategory('hospital')).toBe('healthcare')
    expect(groupForCategory('bank')).toBe('public')
    expect(groupForCategory('bus-stop')).toBe('public')
    expect(groupForCategory('public-facility')).toBe('public')
    expect(groupForCategory('landmark')).toBe('other')
    expect(groupForCategory('unknown-new-category')).toBe('other')
  })

  it('covers each category exactly once', () => {
    const all = Object.values(MAP_GROUPS).flatMap((g) => g.categories)
    expect(new Set(all).size).toBe(all.length)
  })

  it('uses a free, key-less base map and credits OpenStreetMap', () => {
    expect(baseMap.styleUrl).toMatch(/^https:\/\/tiles\.openfreemap\.org\//)
    expect(baseMap.attribution).toContain('OpenStreetMap')
    expect(baseMap.rasterFallback.attribution).toContain('OpenStreetMap')
    expect(baseMap.styleUrl).not.toMatch(/key=|token=/i)
  })

  it('falls back to a district-level view, not a street-level point', () => {
    expect(DISTRICT_OVERVIEW.zoom).toBeLessThanOrEqual(11)
  })
})
