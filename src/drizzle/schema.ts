import { relations } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";

// Define the Tiers table
export const tiers = pgTable("tiers", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }),
  color: varchar("color", { length: 7 }), // Color in hex format (#XXXXXX)
});

// Define the Items table
export const items = pgTable("items", {
  id: varchar("id", { length: 255 }).primaryKey(),
  text: varchar("text", { length: 255 }),
  imageSrc: text("image_src"), // Some items may not have an image
  tierId: varchar("tier_id", { length: 255 }).references(() => tiers.id), // Foreign key to the Tiers table
});

// Define relations
export const tierRelations = relations(tiers, ({ many }) => ({
  items: many(items),
}));

export const itemRelations = relations(items, ({ one }) => ({
  tier: one(tiers, {
    fields: [items.tierId],
    references: [tiers.id],
  }),
}));
