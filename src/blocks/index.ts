import { AboutBlock } from './About/config'
import { DevelopmentPreviewBlock } from './DevelopmentPreview/config'
import { EducationHealthBlock } from './EducationHealth/config'
import { ExplorePlacesBlock } from './ExplorePlaces/config'
import { HeroBlock } from './Hero/config'
import { LatestNewsBlock } from './LatestNews/config'
import { LocationCardBlock } from './LocationCard/config'
import { MapPreviewBlock } from './MapPreview/config'
import { MediaTextBlock } from './MediaText/config'
import { PageHeroBlock } from './PageHero/config'
import { RichContentBlock } from './RichContent/config'
import { VillageIntroBlock } from './VillageIntro/config'
import { VillageMapBlock } from './VillageMap/config'
import { VillageStatsBlock } from './VillageStats/config'

/** Every block available in a Page's layout, in the order shown in the block picker. */
export const pageBlocks = [
  HeroBlock,
  VillageStatsBlock,
  AboutBlock,
  ExplorePlacesBlock,
  MapPreviewBlock,
  EducationHealthBlock,
  LatestNewsBlock,
  DevelopmentPreviewBlock,
  // Inner pages
  PageHeroBlock,
  VillageIntroBlock,
  MediaTextBlock,
  LocationCardBlock,
  VillageMapBlock,
  RichContentBlock,
]
