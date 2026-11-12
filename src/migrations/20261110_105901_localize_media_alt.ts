import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Hand-edited: move media.alt into the per-language table WITHOUT losing existing text.
// The old single-language alt text is copied into both Kannada and English rows.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "media_locales" ADD COLUMN "alt" varchar;
  INSERT INTO "media_locales" ("alt", "_locale", "_parent_id")
    SELECT m."alt", l."locale"::"_locales", m."id"
    FROM "media" m CROSS JOIN (VALUES ('kn'), ('en')) AS l("locale")
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "alt" = EXCLUDED."alt";
  UPDATE "media_locales" ml SET "alt" = m."alt"
    FROM "media" m WHERE ml."_parent_id" = m."id" AND ml."alt" IS NULL;
  ALTER TABLE "media_locales" ALTER COLUMN "alt" SET NOT NULL;
  ALTER TABLE "media" DROP COLUMN "alt";`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "media" ADD COLUMN "alt" varchar;
  UPDATE "media" m SET "alt" = ml."alt"
    FROM "media_locales" ml WHERE ml."_parent_id" = m."id" AND ml."_locale" = 'kn';
  UPDATE "media" SET "alt" = '' WHERE "alt" IS NULL;
  ALTER TABLE "media" ALTER COLUMN "alt" SET NOT NULL;
  ALTER TABLE "media_locales" DROP COLUMN "alt";`)
}
