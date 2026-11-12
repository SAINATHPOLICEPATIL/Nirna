import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_village_intro_cta_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_media_text_cta_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_media_text_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_location_card_cta_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_village_intro_cta_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_media_text_cta_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_media_text_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_location_card_cta_type" AS ENUM('reference', 'custom');
  CREATE TABLE "pages_blocks_page_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"show_breadcrumb" boolean DEFAULT true,
  	"accent_line" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_page_hero_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"breadcrumb_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_village_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_type" "enum_pages_blocks_village_intro_cta_type" DEFAULT 'reference',
  	"cta_new_tab" boolean,
  	"cta_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_village_intro_locales" (
  	"heading" varchar,
  	"text" varchar,
  	"cta_label" varchar,
  	"glance_heading" varchar,
  	"population_label" varchar,
  	"male_label" varchar,
  	"female_label" varchar,
  	"households_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_media_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_type" "enum_pages_blocks_media_text_cta_type" DEFAULT 'reference',
  	"cta_new_tab" boolean,
  	"cta_url" varchar,
  	"image_id" integer,
  	"image_position" "enum_pages_blocks_media_text_image_position" DEFAULT 'left',
  	"leaf_decoration" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_media_text_locales" (
  	"heading" varchar,
  	"text" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_location_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_type" "enum_pages_blocks_location_card_cta_type" DEFAULT 'reference',
  	"cta_new_tab" boolean,
  	"cta_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_location_card_locales" (
  	"heading" varchar,
  	"text" varchar,
  	"badge_text" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_village_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_village_map_locales" (
  	"all_label" varchar,
  	"temples_label" varchar,
  	"education_label" varchar,
  	"healthcare_label" varchar,
  	"public_label" varchar,
  	"other_label" varchar,
  	"search_placeholder" varchar,
  	"empty_text" varchar,
  	"no_results_text" varchar,
  	"district_note" varchar,
  	"view_details_label" varchar,
  	"village_title" varchar,
  	"coordinates_pending_text" varchar,
  	"latitude_label" varchar,
  	"longitude_label" varchar,
  	"explore_title" varchar,
  	"explore_text" varchar,
  	"full_map_label" varchar,
  	"close_full_map_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_page_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"show_breadcrumb" boolean DEFAULT true,
  	"accent_line" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_page_hero_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"breadcrumb_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_village_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_type" "enum__pages_v_blocks_village_intro_cta_type" DEFAULT 'reference',
  	"cta_new_tab" boolean,
  	"cta_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_village_intro_locales" (
  	"heading" varchar,
  	"text" varchar,
  	"cta_label" varchar,
  	"glance_heading" varchar,
  	"population_label" varchar,
  	"male_label" varchar,
  	"female_label" varchar,
  	"households_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_media_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_type" "enum__pages_v_blocks_media_text_cta_type" DEFAULT 'reference',
  	"cta_new_tab" boolean,
  	"cta_url" varchar,
  	"image_id" integer,
  	"image_position" "enum__pages_v_blocks_media_text_image_position" DEFAULT 'left',
  	"leaf_decoration" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_text_locales" (
  	"heading" varchar,
  	"text" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_location_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_type" "enum__pages_v_blocks_location_card_cta_type" DEFAULT 'reference',
  	"cta_new_tab" boolean,
  	"cta_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_location_card_locales" (
  	"heading" varchar,
  	"text" varchar,
  	"badge_text" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_village_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_village_map_locales" (
  	"all_label" varchar,
  	"temples_label" varchar,
  	"education_label" varchar,
  	"healthcare_label" varchar,
  	"public_label" varchar,
  	"other_label" varchar,
  	"search_placeholder" varchar,
  	"empty_text" varchar,
  	"no_results_text" varchar,
  	"district_note" varchar,
  	"view_details_label" varchar,
  	"village_title" varchar,
  	"coordinates_pending_text" varchar,
  	"latitude_label" varchar,
  	"longitude_label" varchar,
  	"explore_title" varchar,
  	"explore_text" varchar,
  	"full_map_label" varchar,
  	"close_full_map_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "village_profile" ADD COLUMN "map_center_latitude" numeric;
  ALTER TABLE "village_profile" ADD COLUMN "map_center_longitude" numeric;
  ALTER TABLE "village_profile" ADD COLUMN "map_center_verified" boolean DEFAULT false;
  ALTER TABLE "village_profile" ADD COLUMN "map_center_source" varchar;
  ALTER TABLE "village_profile" ADD COLUMN "map_zoom" numeric DEFAULT 15;
  ALTER TABLE "pages_blocks_page_hero" ADD CONSTRAINT "pages_blocks_page_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_page_hero" ADD CONSTRAINT "pages_blocks_page_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_page_hero_locales" ADD CONSTRAINT "pages_blocks_page_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_village_intro" ADD CONSTRAINT "pages_blocks_village_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_village_intro_locales" ADD CONSTRAINT "pages_blocks_village_intro_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_village_intro"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_text" ADD CONSTRAINT "pages_blocks_media_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_text" ADD CONSTRAINT "pages_blocks_media_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_text_locales" ADD CONSTRAINT "pages_blocks_media_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_media_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_location_card" ADD CONSTRAINT "pages_blocks_location_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_location_card_locales" ADD CONSTRAINT "pages_blocks_location_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_location_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_village_map" ADD CONSTRAINT "pages_blocks_village_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_village_map_locales" ADD CONSTRAINT "pages_blocks_village_map_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_village_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_page_hero" ADD CONSTRAINT "_pages_v_blocks_page_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_page_hero" ADD CONSTRAINT "_pages_v_blocks_page_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_page_hero_locales" ADD CONSTRAINT "_pages_v_blocks_page_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_village_intro" ADD CONSTRAINT "_pages_v_blocks_village_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_village_intro_locales" ADD CONSTRAINT "_pages_v_blocks_village_intro_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_village_intro"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_text" ADD CONSTRAINT "_pages_v_blocks_media_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_text" ADD CONSTRAINT "_pages_v_blocks_media_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_text_locales" ADD CONSTRAINT "_pages_v_blocks_media_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_media_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_location_card" ADD CONSTRAINT "_pages_v_blocks_location_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_location_card_locales" ADD CONSTRAINT "_pages_v_blocks_location_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_location_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_village_map" ADD CONSTRAINT "_pages_v_blocks_village_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_village_map_locales" ADD CONSTRAINT "_pages_v_blocks_village_map_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_village_map"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_page_hero_order_idx" ON "pages_blocks_page_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_page_hero_parent_id_idx" ON "pages_blocks_page_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_page_hero_path_idx" ON "pages_blocks_page_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_page_hero_image_idx" ON "pages_blocks_page_hero" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_page_hero_locales_locale_parent_id_unique" ON "pages_blocks_page_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_page_hero_locales_parent_id_idx" ON "pages_blocks_page_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_village_intro_order_idx" ON "pages_blocks_village_intro" USING btree ("_order");
  CREATE INDEX "pages_blocks_village_intro_parent_id_idx" ON "pages_blocks_village_intro" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_village_intro_path_idx" ON "pages_blocks_village_intro" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_village_intro_locales_locale_parent_id_unique" ON "pages_blocks_village_intro_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_village_intro_locales_parent_id_idx" ON "pages_blocks_village_intro_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_text_order_idx" ON "pages_blocks_media_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_text_parent_id_idx" ON "pages_blocks_media_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_text_path_idx" ON "pages_blocks_media_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_text_image_idx" ON "pages_blocks_media_text" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_media_text_locales_locale_parent_id_unique" ON "pages_blocks_media_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_media_text_locales_parent_id_idx" ON "pages_blocks_media_text_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_location_card_order_idx" ON "pages_blocks_location_card" USING btree ("_order");
  CREATE INDEX "pages_blocks_location_card_parent_id_idx" ON "pages_blocks_location_card" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_location_card_path_idx" ON "pages_blocks_location_card" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_location_card_locales_locale_parent_id_unique" ON "pages_blocks_location_card_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_location_card_locales_parent_id_idx" ON "pages_blocks_location_card_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_village_map_order_idx" ON "pages_blocks_village_map" USING btree ("_order");
  CREATE INDEX "pages_blocks_village_map_parent_id_idx" ON "pages_blocks_village_map" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_village_map_path_idx" ON "pages_blocks_village_map" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_village_map_locales_locale_parent_id_unique" ON "pages_blocks_village_map_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_village_map_locales_parent_id_idx" ON "pages_blocks_village_map_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_page_hero_order_idx" ON "_pages_v_blocks_page_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_page_hero_parent_id_idx" ON "_pages_v_blocks_page_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_page_hero_path_idx" ON "_pages_v_blocks_page_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_page_hero_image_idx" ON "_pages_v_blocks_page_hero" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_page_hero_locales_locale_parent_id_unique" ON "_pages_v_blocks_page_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_page_hero_locales_parent_id_idx" ON "_pages_v_blocks_page_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_village_intro_order_idx" ON "_pages_v_blocks_village_intro" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_village_intro_parent_id_idx" ON "_pages_v_blocks_village_intro" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_village_intro_path_idx" ON "_pages_v_blocks_village_intro" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_village_intro_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_village_intro_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_village_intro_locales_parent_id_idx" ON "_pages_v_blocks_village_intro_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_text_order_idx" ON "_pages_v_blocks_media_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_text_parent_id_idx" ON "_pages_v_blocks_media_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_text_path_idx" ON "_pages_v_blocks_media_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_text_image_idx" ON "_pages_v_blocks_media_text" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_media_text_locales_locale_parent_id_unique" ON "_pages_v_blocks_media_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_media_text_locales_parent_id_idx" ON "_pages_v_blocks_media_text_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_location_card_order_idx" ON "_pages_v_blocks_location_card" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_location_card_parent_id_idx" ON "_pages_v_blocks_location_card" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_location_card_path_idx" ON "_pages_v_blocks_location_card" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_location_card_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_location_card_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_location_card_locales_parent_id_idx" ON "_pages_v_blocks_location_card_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_village_map_order_idx" ON "_pages_v_blocks_village_map" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_village_map_parent_id_idx" ON "_pages_v_blocks_village_map" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_village_map_path_idx" ON "_pages_v_blocks_village_map" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_village_map_locales_locale_parent_id_unique" ON "_pages_v_blocks_village_map_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_village_map_locales_parent_id_idx" ON "_pages_v_blocks_village_map_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_page_hero" CASCADE;
  DROP TABLE "pages_blocks_page_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_village_intro" CASCADE;
  DROP TABLE "pages_blocks_village_intro_locales" CASCADE;
  DROP TABLE "pages_blocks_media_text" CASCADE;
  DROP TABLE "pages_blocks_media_text_locales" CASCADE;
  DROP TABLE "pages_blocks_location_card" CASCADE;
  DROP TABLE "pages_blocks_location_card_locales" CASCADE;
  DROP TABLE "pages_blocks_village_map" CASCADE;
  DROP TABLE "pages_blocks_village_map_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_page_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_page_hero_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_village_intro" CASCADE;
  DROP TABLE "_pages_v_blocks_village_intro_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_media_text" CASCADE;
  DROP TABLE "_pages_v_blocks_media_text_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_location_card" CASCADE;
  DROP TABLE "_pages_v_blocks_location_card_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_village_map" CASCADE;
  DROP TABLE "_pages_v_blocks_village_map_locales" CASCADE;
  ALTER TABLE "village_profile" DROP COLUMN "map_center_latitude";
  ALTER TABLE "village_profile" DROP COLUMN "map_center_longitude";
  ALTER TABLE "village_profile" DROP COLUMN "map_center_verified";
  ALTER TABLE "village_profile" DROP COLUMN "map_center_source";
  ALTER TABLE "village_profile" DROP COLUMN "map_zoom";
  DROP TYPE "public"."enum_pages_blocks_village_intro_cta_type";
  DROP TYPE "public"."enum_pages_blocks_media_text_cta_type";
  DROP TYPE "public"."enum_pages_blocks_media_text_image_position";
  DROP TYPE "public"."enum_pages_blocks_location_card_cta_type";
  DROP TYPE "public"."enum__pages_v_blocks_village_intro_cta_type";
  DROP TYPE "public"."enum__pages_v_blocks_media_text_cta_type";
  DROP TYPE "public"."enum__pages_v_blocks_media_text_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_location_card_cta_type";`)
}
