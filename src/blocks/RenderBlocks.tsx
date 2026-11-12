import type { ReactNode } from 'react'

import { Container } from '@/components/shared/Container'
import type { Page } from '@/payload-types'

import { AboutBlockComponent } from './About/Component'
import { DevelopmentPreviewBlockComponent } from './DevelopmentPreview/Component'
import { EducationHealthBlockComponent } from './EducationHealth/Component'
import { ExplorePlacesBlockComponent } from './ExplorePlaces/Component'
import { HeroBlockComponent } from './Hero/Component'
import { LatestNewsBlockComponent } from './LatestNews/Component'
import { LocationCardBlockComponent } from './LocationCard/Component'
import { MapPreviewBlockComponent } from './MapPreview/Component'
import { MediaTextBlockComponent } from './MediaText/Component'
import { PageHeroBlockComponent } from './PageHero/Component'
import { RichContentBlockComponent } from './RichContent/Component'
import type { BlockContext } from './shared'
import { VillageIntroBlockComponent } from './VillageIntro/Component'
import { VillageMapBlockComponent } from './VillageMap/Component'
import { VillageStatsBlockComponent } from './VillageStats/Component'

type LayoutBlock = NonNullable<Page['layout']>[number]
type BlockType = LayoutBlock['blockType']

/**
 * Card blocks sit side by side in a 12-column grid (as in the approved design).
 * Consecutive card blocks are grouped into one grid; the values are their column spans.
 */
const CARD_SPANS: Partial<Record<BlockType, string>> = {
  explorePlaces: 'lg:col-span-8',
  mapPreview: 'lg:col-span-4',
  educationHealth: 'md:col-span-6 lg:col-span-4',
  latestNews: 'md:col-span-6 lg:col-span-4',
  developmentPreview: 'md:col-span-6 lg:col-span-4',
}

function renderBlock(block: LayoutBlock, ctx: BlockContext): ReactNode {
  switch (block.blockType) {
    case 'hero':
      return <HeroBlockComponent block={block} {...ctx} />
    case 'villageStats':
      return <VillageStatsBlockComponent block={block} {...ctx} />
    case 'about':
      return <AboutBlockComponent block={block} {...ctx} />
    case 'explorePlaces':
      return <ExplorePlacesBlockComponent block={block} {...ctx} />
    case 'mapPreview':
      return <MapPreviewBlockComponent block={block} {...ctx} />
    case 'educationHealth':
      return <EducationHealthBlockComponent block={block} {...ctx} />
    case 'latestNews':
      return <LatestNewsBlockComponent block={block} {...ctx} />
    case 'developmentPreview':
      return <DevelopmentPreviewBlockComponent block={block} {...ctx} />
    case 'richContent':
      return <RichContentBlockComponent block={block} {...ctx} />
    case 'pageHero':
      return <PageHeroBlockComponent block={block} {...ctx} />
    case 'villageIntro':
      return <VillageIntroBlockComponent block={block} {...ctx} />
    case 'mediaText':
      return <MediaTextBlockComponent block={block} {...ctx} />
    case 'locationCard':
      return <LocationCardBlockComponent block={block} {...ctx} />
    case 'villageMap':
      return <VillageMapBlockComponent block={block} {...ctx} />
    default: {
      const unknown: never = block
      return unknown
    }
  }
}

type Group = { kind: 'single'; block: LayoutBlock } | { kind: 'cards'; blocks: LayoutBlock[] }

function groupBlocks(blocks: LayoutBlock[]): Group[] {
  const groups: Group[] = []
  for (const block of blocks) {
    const last = groups[groups.length - 1]
    if (CARD_SPANS[block.blockType]) {
      if (last?.kind === 'cards') last.blocks.push(block)
      else groups.push({ kind: 'cards', blocks: [block] })
    } else {
      groups.push({ kind: 'single', block })
    }
  }
  return groups
}

export function RenderBlocks({ blocks, ...ctx }: { blocks: Page['layout'] } & BlockContext) {
  if (!blocks?.length) return null

  return groupBlocks(blocks).map((group, i) => {
    if (group.kind === 'single') {
      return <div key={group.block.id ?? i}>{renderBlock(group.block, ctx)}</div>
    }
    return (
      <Container
        key={group.blocks[0]?.id ?? i}
        className="my-6 grid grid-cols-1 gap-6 md:grid-cols-12"
      >
        {group.blocks.map((block, j) => (
          <div
            key={block.id ?? j}
            // Last card on an odd tablet row spans the full width (as the Development card did).
            className={`col-span-1 md:col-span-12 ${CARD_SPANS[block.blockType]} ${
              block.blockType === 'developmentPreview' ? 'md:max-lg:col-span-12' : ''
            }`}
          >
            {renderBlock(block, ctx)}
          </div>
        ))}
      </Container>
    )
  })
}
