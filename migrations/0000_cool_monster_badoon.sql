CREATE TABLE IF NOT EXISTS "items" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"text" varchar(255),
	"image_src" text,
	"tier_id" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tiers" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"color" varchar(7)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "items" ADD CONSTRAINT "items_tier_id_tiers_id_fk" FOREIGN KEY ("tier_id") REFERENCES "public"."tiers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
