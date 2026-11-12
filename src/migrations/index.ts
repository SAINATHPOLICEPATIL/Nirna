import * as migration_20261110_101935_initial from './20261110_101935_initial';
import * as migration_20261110_105849_content_collections from './20261110_105849_content_collections';
import * as migration_20261110_105901_localize_media_alt from './20261110_105901_localize_media_alt';
import * as migration_20261110_115137_pages_and_website_globals from './20261110_115137_pages_and_website_globals';
import * as migration_20261110_125047_about_and_map_pages from './20261110_125047_about_and_map_pages';

export const migrations = [
  {
    up: migration_20261110_101935_initial.up,
    down: migration_20261110_101935_initial.down,
    name: '20261110_101935_initial',
  },
  {
    up: migration_20261110_105849_content_collections.up,
    down: migration_20261110_105849_content_collections.down,
    name: '20261110_105849_content_collections',
  },
  {
    up: migration_20261110_105901_localize_media_alt.up,
    down: migration_20261110_105901_localize_media_alt.down,
    name: '20261110_105901_localize_media_alt',
  },
  {
    up: migration_20261110_115137_pages_and_website_globals.up,
    down: migration_20261110_115137_pages_and_website_globals.down,
    name: '20261110_115137_pages_and_website_globals',
  },
  {
    up: migration_20261110_125047_about_and_map_pages.up,
    down: migration_20261110_125047_about_and_map_pages.down,
    name: '20261110_125047_about_and_map_pages'
  },
];
