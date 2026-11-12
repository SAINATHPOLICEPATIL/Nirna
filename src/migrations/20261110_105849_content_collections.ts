import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_places_category" AS ENUM('temple', 'historical', 'landmark', 'public');
  CREATE TYPE "public"."enum_places_verification_status" AS ENUM('unverified', 'verified');
  CREATE TYPE "public"."enum_places_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__places_v_version_category" AS ENUM('temple', 'historical', 'landmark', 'public');
  CREATE TYPE "public"."enum__places_v_version_verification_status" AS ENUM('unverified', 'verified');
  CREATE TYPE "public"."enum__places_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__places_v_published_locale" AS ENUM('kn', 'en');
  CREATE TYPE "public"."enum_facilities_category" AS ENUM('government-school', 'private-school', 'college', 'government-hospital', 'private-hospital', 'clinic', 'bank', 'bus-stop', 'public-facility');
  CREATE TYPE "public"."enum_facilities_verification_status" AS ENUM('unverified', 'verified');
  CREATE TYPE "public"."enum_facilities_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__facilities_v_version_category" AS ENUM('government-school', 'private-school', 'college', 'government-hospital', 'private-hospital', 'clinic', 'bank', 'bus-stop', 'public-facility');
  CREATE TYPE "public"."enum__facilities_v_version_verification_status" AS ENUM('unverified', 'verified');
  CREATE TYPE "public"."enum__facilities_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__facilities_v_published_locale" AS ENUM('kn', 'en');
  CREATE TYPE "public"."enum_map_locations_category" AS ENUM('school', 'college', 'hospital', 'temple', 'bank', 'bus-stop', 'public-facility', 'landmark');
  CREATE TYPE "public"."enum_map_locations_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__map_locations_v_version_category" AS ENUM('school', 'college', 'hospital', 'temple', 'bank', 'bus-stop', 'public-facility', 'landmark');
  CREATE TYPE "public"."enum__map_locations_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__map_locations_v_published_locale" AS ENUM('kn', 'en');
  CREATE TYPE "public"."enum_departments_type" AS ENUM('panchayat', 'education', 'healthcare', 'temple', 'public-works', 'other');
  CREATE TYPE "public"."enum_departments_status" AS ENUM('active', 'inactive');
  CREATE TYPE "public"."enum_news_type" AS ENUM('news', 'announcement');
  CREATE TYPE "public"."enum_news_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_v_version_type" AS ENUM('news', 'announcement');
  CREATE TYPE "public"."enum__news_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_v_published_locale" AS ENUM('kn', 'en');
  CREATE TYPE "public"."enum_events_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__events_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__events_v_published_locale" AS ENUM('kn', 'en');
  CREATE TYPE "public"."enum_complaint_categories_status" AS ENUM('active', 'inactive');
  CREATE TYPE "public"."enum_users_role" AS ENUM('super-admin', 'resident');
  CREATE TYPE "public"."enum_users_account_status" AS ENUM('active', 'suspended');
  CREATE TABLE "places" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"category" "enum_places_category",
  	"featured" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 100,
  	"latitude" numeric,
  	"longitude" numeric,
  	"coordinates_verified" boolean DEFAULT false,
  	"coordinates_source" varchar,
  	"verification_status" "enum_places_verification_status" DEFAULT 'unverified',
  	"source" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_places_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "places_locales" (
  	"name" varchar,
  	"summary" varchar,
  	"description" jsonb,
  	"address" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "places_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_places_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_category" "enum__places_v_version_category",
  	"version_featured" boolean DEFAULT false,
  	"version_sort_order" numeric DEFAULT 100,
  	"version_latitude" numeric,
  	"version_longitude" numeric,
  	"version_coordinates_verified" boolean DEFAULT false,
  	"version_coordinates_source" varchar,
  	"version_verification_status" "enum__places_v_version_verification_status" DEFAULT 'unverified',
  	"version_source" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__places_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__places_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_places_v_locales" (
  	"version_name" varchar,
  	"version_summary" varchar,
  	"version_description" jsonb,
  	"version_address" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_places_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "facilities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"category" "enum_facilities_category",
  	"department_id" integer,
  	"phone" varchar,
  	"email" varchar,
  	"latitude" numeric,
  	"longitude" numeric,
  	"coordinates_verified" boolean DEFAULT false,
  	"coordinates_source" varchar,
  	"verification_status" "enum_facilities_verification_status" DEFAULT 'unverified',
  	"source" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_facilities_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "facilities_locales" (
  	"name" varchar,
  	"summary" varchar,
  	"description" jsonb,
  	"services" varchar,
  	"address" varchar,
  	"opening_hours" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "facilities_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_facilities_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_category" "enum__facilities_v_version_category",
  	"version_department_id" integer,
  	"version_phone" varchar,
  	"version_email" varchar,
  	"version_latitude" numeric,
  	"version_longitude" numeric,
  	"version_coordinates_verified" boolean DEFAULT false,
  	"version_coordinates_source" varchar,
  	"version_verification_status" "enum__facilities_v_version_verification_status" DEFAULT 'unverified',
  	"version_source" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__facilities_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__facilities_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_facilities_v_locales" (
  	"version_name" varchar,
  	"version_summary" varchar,
  	"version_description" jsonb,
  	"version_services" varchar,
  	"version_address" varchar,
  	"version_opening_hours" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_facilities_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "map_locations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"category" "enum_map_locations_category",
  	"place_id" integer,
  	"facility_id" integer,
  	"latitude" numeric,
  	"longitude" numeric,
  	"coordinates_verified" boolean DEFAULT false,
  	"coordinates_source" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_map_locations_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "map_locations_locales" (
  	"name" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_map_locations_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_category" "enum__map_locations_v_version_category",
  	"version_place_id" integer,
  	"version_facility_id" integer,
  	"version_latitude" numeric,
  	"version_longitude" numeric,
  	"version_coordinates_verified" boolean DEFAULT false,
  	"version_coordinates_source" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__map_locations_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__map_locations_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_map_locations_v_locales" (
  	"version_name" varchar,
  	"version_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "departments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum_departments_type" NOT NULL,
  	"contact_phone" varchar,
  	"contact_email" varchar,
  	"contact_verified" boolean DEFAULT false,
  	"status" "enum_departments_status" DEFAULT 'active' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "departments_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "news" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"type" "enum_news_type" DEFAULT 'news',
  	"published_date" timestamp(3) with time zone,
  	"author_id" integer,
  	"cover_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_news_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "news_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"content" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_news_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_type" "enum__news_v_version_type" DEFAULT 'news',
  	"version_published_date" timestamp(3) with time zone,
  	"version_author_id" integer,
  	"version_cover_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__news_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__news_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_news_v_locales" (
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_content" jsonb,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"place_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_events_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "events_locales" (
  	"name" varchar,
  	"description" jsonb,
  	"location" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "events_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_events_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_start_date" timestamp(3) with time zone,
  	"version_end_date" timestamp(3) with time zone,
  	"version_place_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__events_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__events_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_events_v_locales" (
  	"version_name" varchar,
  	"version_description" jsonb,
  	"version_location" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_events_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "media_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "complaint_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"department_id" integer,
  	"status" "enum_complaint_categories_status" DEFAULT 'active' NOT NULL,
  	"sort_order" numeric DEFAULT 100,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "complaint_categories_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "village_profile" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"population" numeric,
  	"male_population" numeric,
  	"female_population" numeric,
  	"households" numeric,
  	"figures_source" varchar,
  	"figures_year" numeric,
  	"government_schools" numeric,
  	"private_schools" numeric,
  	"colleges" numeric,
  	"government_hospitals" numeric,
  	"private_hospitals_and_clinics" numeric,
  	"counts_are_approximate" boolean DEFAULT true,
  	"cover_image_id" integer,
  	"contact_phone" varchar,
  	"contact_email" varchar,
  	"contact_verified" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "village_profile_locales" (
  	"name" varchar NOT NULL,
  	"short_description" varchar,
  	"description" jsonb,
  	"district" varchar,
  	"state" varchar,
  	"country" varchar,
  	"contact_address" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "village_profile_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  -- Hand-edited: keep existing accounts working. Before roles existed every account had full
  -- admin access, so existing accounts become Super Admin; new accounts default to resident.
  ALTER TABLE "users" ADD COLUMN "name" varchar;
  UPDATE "users" SET "name" = split_part("email", '@', 1) WHERE "name" IS NULL;
  ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "users" ADD COLUMN "role" "enum_users_role" DEFAULT 'resident' NOT NULL;
  UPDATE "users" SET "role" = 'super-admin';
  ALTER TABLE "users" ADD COLUMN "account_status" "enum_users_account_status" DEFAULT 'active' NOT NULL;
  ALTER TABLE "users" ADD COLUMN "department_id" integer;
  ALTER TABLE "users" ADD COLUMN "facility_id" integer;
  ALTER TABLE "media" ADD COLUMN "is_genuine_nirna_photo" boolean DEFAULT false;
  ALTER TABLE "media" ADD COLUMN "credit" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_card_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_card_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_card_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_card_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_card_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_card_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_filename" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "places_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "facilities_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "map_locations_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "departments_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "news_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "events_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "complaint_categories_id" integer;
  ALTER TABLE "places_locales" ADD CONSTRAINT "places_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_rels" ADD CONSTRAINT "places_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_rels" ADD CONSTRAINT "places_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v" ADD CONSTRAINT "_places_v_parent_id_places_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."places"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_places_v_locales" ADD CONSTRAINT "_places_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_rels" ADD CONSTRAINT "_places_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_rels" ADD CONSTRAINT "_places_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "facilities" ADD CONSTRAINT "facilities_department_id_departments_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "facilities_locales" ADD CONSTRAINT "facilities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."facilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "facilities_rels" ADD CONSTRAINT "facilities_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."facilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "facilities_rels" ADD CONSTRAINT "facilities_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_facilities_v" ADD CONSTRAINT "_facilities_v_parent_id_facilities_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."facilities"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_facilities_v" ADD CONSTRAINT "_facilities_v_version_department_id_departments_id_fk" FOREIGN KEY ("version_department_id") REFERENCES "public"."departments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_facilities_v_locales" ADD CONSTRAINT "_facilities_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_facilities_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_facilities_v_rels" ADD CONSTRAINT "_facilities_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_facilities_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_facilities_v_rels" ADD CONSTRAINT "_facilities_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "map_locations" ADD CONSTRAINT "map_locations_place_id_places_id_fk" FOREIGN KEY ("place_id") REFERENCES "public"."places"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "map_locations" ADD CONSTRAINT "map_locations_facility_id_facilities_id_fk" FOREIGN KEY ("facility_id") REFERENCES "public"."facilities"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "map_locations_locales" ADD CONSTRAINT "map_locations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."map_locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_map_locations_v" ADD CONSTRAINT "_map_locations_v_parent_id_map_locations_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."map_locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_map_locations_v" ADD CONSTRAINT "_map_locations_v_version_place_id_places_id_fk" FOREIGN KEY ("version_place_id") REFERENCES "public"."places"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_map_locations_v" ADD CONSTRAINT "_map_locations_v_version_facility_id_facilities_id_fk" FOREIGN KEY ("version_facility_id") REFERENCES "public"."facilities"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_map_locations_v_locales" ADD CONSTRAINT "_map_locations_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_map_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "departments_locales" ADD CONSTRAINT "departments_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_locales" ADD CONSTRAINT "news_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_parent_id_news_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_author_id_users_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v_locales" ADD CONSTRAINT "_news_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_place_id_places_id_fk" FOREIGN KEY ("place_id") REFERENCES "public"."places"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_locales" ADD CONSTRAINT "events_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_parent_id_events_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_place_id_places_id_fk" FOREIGN KEY ("version_place_id") REFERENCES "public"."places"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_locales" ADD CONSTRAINT "_events_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "complaint_categories" ADD CONSTRAINT "complaint_categories_department_id_departments_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "complaint_categories_locales" ADD CONSTRAINT "complaint_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."complaint_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "village_profile" ADD CONSTRAINT "village_profile_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "village_profile_locales" ADD CONSTRAINT "village_profile_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."village_profile"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "village_profile_rels" ADD CONSTRAINT "village_profile_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."village_profile"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "village_profile_rels" ADD CONSTRAINT "village_profile_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "places_slug_idx" ON "places" USING btree ("slug");
  CREATE INDEX "places_updated_at_idx" ON "places" USING btree ("updated_at");
  CREATE INDEX "places_created_at_idx" ON "places" USING btree ("created_at");
  CREATE INDEX "places__status_idx" ON "places" USING btree ("_status");
  CREATE UNIQUE INDEX "places_locales_locale_parent_id_unique" ON "places_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "places_locales_parent_id_idx" ON "places_locales" USING btree ("_parent_id");
  CREATE INDEX "places_rels_order_idx" ON "places_rels" USING btree ("order");
  CREATE INDEX "places_rels_parent_idx" ON "places_rels" USING btree ("parent_id");
  CREATE INDEX "places_rels_path_idx" ON "places_rels" USING btree ("path");
  CREATE INDEX "places_rels_media_id_idx" ON "places_rels" USING btree ("media_id");
  CREATE INDEX "_places_v_parent_idx" ON "_places_v" USING btree ("parent_id");
  CREATE INDEX "_places_v_version_version_slug_idx" ON "_places_v" USING btree ("version_slug");
  CREATE INDEX "_places_v_version_version_updated_at_idx" ON "_places_v" USING btree ("version_updated_at");
  CREATE INDEX "_places_v_version_version_created_at_idx" ON "_places_v" USING btree ("version_created_at");
  CREATE INDEX "_places_v_version_version__status_idx" ON "_places_v" USING btree ("version__status");
  CREATE INDEX "_places_v_created_at_idx" ON "_places_v" USING btree ("created_at");
  CREATE INDEX "_places_v_updated_at_idx" ON "_places_v" USING btree ("updated_at");
  CREATE INDEX "_places_v_snapshot_idx" ON "_places_v" USING btree ("snapshot");
  CREATE INDEX "_places_v_published_locale_idx" ON "_places_v" USING btree ("published_locale");
  CREATE INDEX "_places_v_latest_idx" ON "_places_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_places_v_locales_locale_parent_id_unique" ON "_places_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_places_v_locales_parent_id_idx" ON "_places_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_places_v_rels_order_idx" ON "_places_v_rels" USING btree ("order");
  CREATE INDEX "_places_v_rels_parent_idx" ON "_places_v_rels" USING btree ("parent_id");
  CREATE INDEX "_places_v_rels_path_idx" ON "_places_v_rels" USING btree ("path");
  CREATE INDEX "_places_v_rels_media_id_idx" ON "_places_v_rels" USING btree ("media_id");
  CREATE UNIQUE INDEX "facilities_slug_idx" ON "facilities" USING btree ("slug");
  CREATE INDEX "facilities_department_idx" ON "facilities" USING btree ("department_id");
  CREATE INDEX "facilities_updated_at_idx" ON "facilities" USING btree ("updated_at");
  CREATE INDEX "facilities_created_at_idx" ON "facilities" USING btree ("created_at");
  CREATE INDEX "facilities__status_idx" ON "facilities" USING btree ("_status");
  CREATE UNIQUE INDEX "facilities_locales_locale_parent_id_unique" ON "facilities_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "facilities_locales_parent_id_idx" ON "facilities_locales" USING btree ("_parent_id");
  CREATE INDEX "facilities_rels_order_idx" ON "facilities_rels" USING btree ("order");
  CREATE INDEX "facilities_rels_parent_idx" ON "facilities_rels" USING btree ("parent_id");
  CREATE INDEX "facilities_rels_path_idx" ON "facilities_rels" USING btree ("path");
  CREATE INDEX "facilities_rels_media_id_idx" ON "facilities_rels" USING btree ("media_id");
  CREATE INDEX "_facilities_v_parent_idx" ON "_facilities_v" USING btree ("parent_id");
  CREATE INDEX "_facilities_v_version_version_slug_idx" ON "_facilities_v" USING btree ("version_slug");
  CREATE INDEX "_facilities_v_version_version_department_idx" ON "_facilities_v" USING btree ("version_department_id");
  CREATE INDEX "_facilities_v_version_version_updated_at_idx" ON "_facilities_v" USING btree ("version_updated_at");
  CREATE INDEX "_facilities_v_version_version_created_at_idx" ON "_facilities_v" USING btree ("version_created_at");
  CREATE INDEX "_facilities_v_version_version__status_idx" ON "_facilities_v" USING btree ("version__status");
  CREATE INDEX "_facilities_v_created_at_idx" ON "_facilities_v" USING btree ("created_at");
  CREATE INDEX "_facilities_v_updated_at_idx" ON "_facilities_v" USING btree ("updated_at");
  CREATE INDEX "_facilities_v_snapshot_idx" ON "_facilities_v" USING btree ("snapshot");
  CREATE INDEX "_facilities_v_published_locale_idx" ON "_facilities_v" USING btree ("published_locale");
  CREATE INDEX "_facilities_v_latest_idx" ON "_facilities_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_facilities_v_locales_locale_parent_id_unique" ON "_facilities_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_facilities_v_locales_parent_id_idx" ON "_facilities_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_facilities_v_rels_order_idx" ON "_facilities_v_rels" USING btree ("order");
  CREATE INDEX "_facilities_v_rels_parent_idx" ON "_facilities_v_rels" USING btree ("parent_id");
  CREATE INDEX "_facilities_v_rels_path_idx" ON "_facilities_v_rels" USING btree ("path");
  CREATE INDEX "_facilities_v_rels_media_id_idx" ON "_facilities_v_rels" USING btree ("media_id");
  CREATE INDEX "map_locations_place_idx" ON "map_locations" USING btree ("place_id");
  CREATE INDEX "map_locations_facility_idx" ON "map_locations" USING btree ("facility_id");
  CREATE INDEX "map_locations_updated_at_idx" ON "map_locations" USING btree ("updated_at");
  CREATE INDEX "map_locations_created_at_idx" ON "map_locations" USING btree ("created_at");
  CREATE INDEX "map_locations__status_idx" ON "map_locations" USING btree ("_status");
  CREATE UNIQUE INDEX "map_locations_locales_locale_parent_id_unique" ON "map_locations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "map_locations_locales_parent_id_idx" ON "map_locations_locales" USING btree ("_parent_id");
  CREATE INDEX "_map_locations_v_parent_idx" ON "_map_locations_v" USING btree ("parent_id");
  CREATE INDEX "_map_locations_v_version_version_place_idx" ON "_map_locations_v" USING btree ("version_place_id");
  CREATE INDEX "_map_locations_v_version_version_facility_idx" ON "_map_locations_v" USING btree ("version_facility_id");
  CREATE INDEX "_map_locations_v_version_version_updated_at_idx" ON "_map_locations_v" USING btree ("version_updated_at");
  CREATE INDEX "_map_locations_v_version_version_created_at_idx" ON "_map_locations_v" USING btree ("version_created_at");
  CREATE INDEX "_map_locations_v_version_version__status_idx" ON "_map_locations_v" USING btree ("version__status");
  CREATE INDEX "_map_locations_v_created_at_idx" ON "_map_locations_v" USING btree ("created_at");
  CREATE INDEX "_map_locations_v_updated_at_idx" ON "_map_locations_v" USING btree ("updated_at");
  CREATE INDEX "_map_locations_v_snapshot_idx" ON "_map_locations_v" USING btree ("snapshot");
  CREATE INDEX "_map_locations_v_published_locale_idx" ON "_map_locations_v" USING btree ("published_locale");
  CREATE INDEX "_map_locations_v_latest_idx" ON "_map_locations_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_map_locations_v_locales_locale_parent_id_unique" ON "_map_locations_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_map_locations_v_locales_parent_id_idx" ON "_map_locations_v_locales" USING btree ("_parent_id");
  CREATE INDEX "departments_updated_at_idx" ON "departments" USING btree ("updated_at");
  CREATE INDEX "departments_created_at_idx" ON "departments" USING btree ("created_at");
  CREATE UNIQUE INDEX "departments_locales_locale_parent_id_unique" ON "departments_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "departments_locales_parent_id_idx" ON "departments_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "news_slug_idx" ON "news" USING btree ("slug");
  CREATE INDEX "news_author_idx" ON "news" USING btree ("author_id");
  CREATE INDEX "news_cover_image_idx" ON "news" USING btree ("cover_image_id");
  CREATE INDEX "news_updated_at_idx" ON "news" USING btree ("updated_at");
  CREATE INDEX "news_created_at_idx" ON "news" USING btree ("created_at");
  CREATE INDEX "news__status_idx" ON "news" USING btree ("_status");
  CREATE UNIQUE INDEX "news_locales_locale_parent_id_unique" ON "news_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "news_locales_parent_id_idx" ON "news_locales" USING btree ("_parent_id");
  CREATE INDEX "_news_v_parent_idx" ON "_news_v" USING btree ("parent_id");
  CREATE INDEX "_news_v_version_version_slug_idx" ON "_news_v" USING btree ("version_slug");
  CREATE INDEX "_news_v_version_version_author_idx" ON "_news_v" USING btree ("version_author_id");
  CREATE INDEX "_news_v_version_version_cover_image_idx" ON "_news_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_news_v_version_version_updated_at_idx" ON "_news_v" USING btree ("version_updated_at");
  CREATE INDEX "_news_v_version_version_created_at_idx" ON "_news_v" USING btree ("version_created_at");
  CREATE INDEX "_news_v_version_version__status_idx" ON "_news_v" USING btree ("version__status");
  CREATE INDEX "_news_v_created_at_idx" ON "_news_v" USING btree ("created_at");
  CREATE INDEX "_news_v_updated_at_idx" ON "_news_v" USING btree ("updated_at");
  CREATE INDEX "_news_v_snapshot_idx" ON "_news_v" USING btree ("snapshot");
  CREATE INDEX "_news_v_published_locale_idx" ON "_news_v" USING btree ("published_locale");
  CREATE INDEX "_news_v_latest_idx" ON "_news_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_news_v_locales_locale_parent_id_unique" ON "_news_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_news_v_locales_parent_id_idx" ON "_news_v_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "events_slug_idx" ON "events" USING btree ("slug");
  CREATE INDEX "events_place_idx" ON "events" USING btree ("place_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "events__status_idx" ON "events" USING btree ("_status");
  CREATE UNIQUE INDEX "events_locales_locale_parent_id_unique" ON "events_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "events_locales_parent_id_idx" ON "events_locales" USING btree ("_parent_id");
  CREATE INDEX "events_rels_order_idx" ON "events_rels" USING btree ("order");
  CREATE INDEX "events_rels_parent_idx" ON "events_rels" USING btree ("parent_id");
  CREATE INDEX "events_rels_path_idx" ON "events_rels" USING btree ("path");
  CREATE INDEX "events_rels_media_id_idx" ON "events_rels" USING btree ("media_id");
  CREATE INDEX "_events_v_parent_idx" ON "_events_v" USING btree ("parent_id");
  CREATE INDEX "_events_v_version_version_slug_idx" ON "_events_v" USING btree ("version_slug");
  CREATE INDEX "_events_v_version_version_place_idx" ON "_events_v" USING btree ("version_place_id");
  CREATE INDEX "_events_v_version_version_updated_at_idx" ON "_events_v" USING btree ("version_updated_at");
  CREATE INDEX "_events_v_version_version_created_at_idx" ON "_events_v" USING btree ("version_created_at");
  CREATE INDEX "_events_v_version_version__status_idx" ON "_events_v" USING btree ("version__status");
  CREATE INDEX "_events_v_created_at_idx" ON "_events_v" USING btree ("created_at");
  CREATE INDEX "_events_v_updated_at_idx" ON "_events_v" USING btree ("updated_at");
  CREATE INDEX "_events_v_snapshot_idx" ON "_events_v" USING btree ("snapshot");
  CREATE INDEX "_events_v_published_locale_idx" ON "_events_v" USING btree ("published_locale");
  CREATE INDEX "_events_v_latest_idx" ON "_events_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_events_v_locales_locale_parent_id_unique" ON "_events_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_events_v_locales_parent_id_idx" ON "_events_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_events_v_rels_order_idx" ON "_events_v_rels" USING btree ("order");
  CREATE INDEX "_events_v_rels_parent_idx" ON "_events_v_rels" USING btree ("parent_id");
  CREATE INDEX "_events_v_rels_path_idx" ON "_events_v_rels" USING btree ("path");
  CREATE INDEX "_events_v_rels_media_id_idx" ON "_events_v_rels" USING btree ("media_id");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_locales_parent_id_idx" ON "media_locales" USING btree ("_parent_id");
  CREATE INDEX "complaint_categories_department_idx" ON "complaint_categories" USING btree ("department_id");
  CREATE INDEX "complaint_categories_updated_at_idx" ON "complaint_categories" USING btree ("updated_at");
  CREATE INDEX "complaint_categories_created_at_idx" ON "complaint_categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "complaint_categories_locales_locale_parent_id_unique" ON "complaint_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "complaint_categories_locales_parent_id_idx" ON "complaint_categories_locales" USING btree ("_parent_id");
  CREATE INDEX "village_profile_cover_image_idx" ON "village_profile" USING btree ("cover_image_id");
  CREATE UNIQUE INDEX "village_profile_locales_locale_parent_id_unique" ON "village_profile_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "village_profile_locales_parent_id_idx" ON "village_profile_locales" USING btree ("_parent_id");
  CREATE INDEX "village_profile_rels_order_idx" ON "village_profile_rels" USING btree ("order");
  CREATE INDEX "village_profile_rels_parent_idx" ON "village_profile_rels" USING btree ("parent_id");
  CREATE INDEX "village_profile_rels_path_idx" ON "village_profile_rels" USING btree ("path");
  CREATE INDEX "village_profile_rels_media_id_idx" ON "village_profile_rels" USING btree ("media_id");
  ALTER TABLE "users" ADD CONSTRAINT "users_department_id_departments_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_facility_id_facilities_id_fk" FOREIGN KEY ("facility_id") REFERENCES "public"."facilities"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_places_fk" FOREIGN KEY ("places_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_facilities_fk" FOREIGN KEY ("facilities_id") REFERENCES "public"."facilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_map_locations_fk" FOREIGN KEY ("map_locations_id") REFERENCES "public"."map_locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_departments_fk" FOREIGN KEY ("departments_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_complaint_categories_fk" FOREIGN KEY ("complaint_categories_id") REFERENCES "public"."complaint_categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_department_idx" ON "users" USING btree ("department_id");
  CREATE INDEX "users_facility_idx" ON "users" USING btree ("facility_id");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "payload_locked_documents_rels_places_id_idx" ON "payload_locked_documents_rels" USING btree ("places_id");
  CREATE INDEX "payload_locked_documents_rels_facilities_id_idx" ON "payload_locked_documents_rels" USING btree ("facilities_id");
  CREATE INDEX "payload_locked_documents_rels_map_locations_id_idx" ON "payload_locked_documents_rels" USING btree ("map_locations_id");
  CREATE INDEX "payload_locked_documents_rels_departments_id_idx" ON "payload_locked_documents_rels" USING btree ("departments_id");
  CREATE INDEX "payload_locked_documents_rels_news_id_idx" ON "payload_locked_documents_rels" USING btree ("news_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_complaint_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("complaint_categories_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "places" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "facilities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "facilities_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "facilities_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_facilities_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_facilities_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_facilities_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "map_locations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "map_locations_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_map_locations_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_map_locations_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "departments" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "departments_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "news" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "news_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "media_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "complaint_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "complaint_categories_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "village_profile" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "village_profile_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "village_profile_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "places" CASCADE;
  DROP TABLE "places_locales" CASCADE;
  DROP TABLE "places_rels" CASCADE;
  DROP TABLE "_places_v" CASCADE;
  DROP TABLE "_places_v_locales" CASCADE;
  DROP TABLE "_places_v_rels" CASCADE;
  DROP TABLE "facilities" CASCADE;
  DROP TABLE "facilities_locales" CASCADE;
  DROP TABLE "facilities_rels" CASCADE;
  DROP TABLE "_facilities_v" CASCADE;
  DROP TABLE "_facilities_v_locales" CASCADE;
  DROP TABLE "_facilities_v_rels" CASCADE;
  DROP TABLE "map_locations" CASCADE;
  DROP TABLE "map_locations_locales" CASCADE;
  DROP TABLE "_map_locations_v" CASCADE;
  DROP TABLE "_map_locations_v_locales" CASCADE;
  DROP TABLE "departments" CASCADE;
  DROP TABLE "departments_locales" CASCADE;
  DROP TABLE "news" CASCADE;
  DROP TABLE "news_locales" CASCADE;
  DROP TABLE "_news_v" CASCADE;
  DROP TABLE "_news_v_locales" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "events_locales" CASCADE;
  DROP TABLE "events_rels" CASCADE;
  DROP TABLE "_events_v" CASCADE;
  DROP TABLE "_events_v_locales" CASCADE;
  DROP TABLE "_events_v_rels" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "complaint_categories" CASCADE;
  DROP TABLE "complaint_categories_locales" CASCADE;
  DROP TABLE "village_profile" CASCADE;
  DROP TABLE "village_profile_locales" CASCADE;
  DROP TABLE "village_profile_rels" CASCADE;
  ALTER TABLE "users" DROP CONSTRAINT "users_department_id_departments_id_fk";
  
  ALTER TABLE "users" DROP CONSTRAINT "users_facility_id_facilities_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_places_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_facilities_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_map_locations_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_departments_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_news_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_events_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_complaint_categories_fk";
  
  DROP INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx";
  DROP INDEX "media_sizes_card_sizes_card_filename_idx";
  DROP INDEX "media_sizes_hero_sizes_hero_filename_idx";
  DROP INDEX "users_department_idx";
  DROP INDEX "users_facility_idx";
  DROP INDEX "payload_locked_documents_rels_places_id_idx";
  DROP INDEX "payload_locked_documents_rels_facilities_id_idx";
  DROP INDEX "payload_locked_documents_rels_map_locations_id_idx";
  DROP INDEX "payload_locked_documents_rels_departments_id_idx";
  DROP INDEX "payload_locked_documents_rels_news_id_idx";
  DROP INDEX "payload_locked_documents_rels_events_id_idx";
  DROP INDEX "payload_locked_documents_rels_complaint_categories_id_idx";
  ALTER TABLE "media" DROP COLUMN "is_genuine_nirna_photo";
  ALTER TABLE "media" DROP COLUMN "credit";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_url";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_width";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_height";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_filename";
  ALTER TABLE "media" DROP COLUMN "sizes_card_url";
  ALTER TABLE "media" DROP COLUMN "sizes_card_width";
  ALTER TABLE "media" DROP COLUMN "sizes_card_height";
  ALTER TABLE "media" DROP COLUMN "sizes_card_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_card_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_card_filename";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_url";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_width";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_height";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_filename";
  ALTER TABLE "users" DROP COLUMN "name";
  ALTER TABLE "users" DROP COLUMN "role";
  ALTER TABLE "users" DROP COLUMN "account_status";
  ALTER TABLE "users" DROP COLUMN "department_id";
  ALTER TABLE "users" DROP COLUMN "facility_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "places_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "facilities_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "map_locations_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "departments_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "news_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "events_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "complaint_categories_id";
  DROP TYPE "public"."enum_places_category";
  DROP TYPE "public"."enum_places_verification_status";
  DROP TYPE "public"."enum_places_status";
  DROP TYPE "public"."enum__places_v_version_category";
  DROP TYPE "public"."enum__places_v_version_verification_status";
  DROP TYPE "public"."enum__places_v_version_status";
  DROP TYPE "public"."enum__places_v_published_locale";
  DROP TYPE "public"."enum_facilities_category";
  DROP TYPE "public"."enum_facilities_verification_status";
  DROP TYPE "public"."enum_facilities_status";
  DROP TYPE "public"."enum__facilities_v_version_category";
  DROP TYPE "public"."enum__facilities_v_version_verification_status";
  DROP TYPE "public"."enum__facilities_v_version_status";
  DROP TYPE "public"."enum__facilities_v_published_locale";
  DROP TYPE "public"."enum_map_locations_category";
  DROP TYPE "public"."enum_map_locations_status";
  DROP TYPE "public"."enum__map_locations_v_version_category";
  DROP TYPE "public"."enum__map_locations_v_version_status";
  DROP TYPE "public"."enum__map_locations_v_published_locale";
  DROP TYPE "public"."enum_departments_type";
  DROP TYPE "public"."enum_departments_status";
  DROP TYPE "public"."enum_news_type";
  DROP TYPE "public"."enum_news_status";
  DROP TYPE "public"."enum__news_v_version_type";
  DROP TYPE "public"."enum__news_v_version_status";
  DROP TYPE "public"."enum__news_v_published_locale";
  DROP TYPE "public"."enum_events_status";
  DROP TYPE "public"."enum__events_v_version_status";
  DROP TYPE "public"."enum__events_v_published_locale";
  DROP TYPE "public"."enum_complaint_categories_status";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_users_account_status";`)
}
