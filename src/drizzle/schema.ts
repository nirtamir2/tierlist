import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

const createAndUpdateTimestamp = {
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
};

const id = text("id")
  .primaryKey()
  .$defaultFn(() => crypto.randomUUID());

export const tierlistCatrogries = pgTable("tierlist_catrogries", {
  id,
  title: varchar("name", { length: 256 }).notNull(),
  description: text("description").notNull(),
  imageSrc: text("image_src"),
  ...createAndUpdateTimestamp,
});

export const tierlists = pgTable("tierlists", {
  id,
  title: varchar("name", { length: 256 }).notNull(),
  description: text("description").notNull(),
  categoryId: text("category_id").references(() => tierlistCatrogries.id),
  ownerUserId: text("owner_user_id"),
  imageSrc: text("image_src"),
  ...createAndUpdateTimestamp,
});

export const tierRows = pgTable("tier_rows", {
  id,
  tierlistId: text("tierlids_id")
    .references(() => tierlists.id)
    .notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  color: varchar("color", { length: 7 }).notNull(), // Color in hex format (#XXXXXX)
  ...createAndUpdateTimestamp,
});

export const tierItems = pgTable("tier_item", {
  id,
  text: varchar("text", { length: 256 }).notNull(),
  imageSrc: text("image_src"),
  tierRowId: text("tier_row_id")
    .references(() => tierRows.id)
    .notNull(),
  ...createAndUpdateTimestamp,
});

export const tierlistCatrogriesRelations = relations(
  tierlistCatrogries,
  ({ many }) => ({
    tierlists: many(tierlists),
  }),
);

export const tierlistsRelations = relations(tierlists, ({ one, many }) => ({
  category: one(tierlistCatrogries, {
    fields: [tierlists.categoryId],
    references: [tierlistCatrogries.id],
  }),
  tierRows: many(tierRows),
}));

export const tierRowsRelations = relations(tierRows, ({ one, many }) => ({
  tierlist: one(tierlists, {
    fields: [tierRows.tierlistId],
    references: [tierlists.id],
  }),
  items: many(tierItems),
}));

export const tierItemRelations = relations(tierItems, ({ one }) => ({
  tierRow: one(tierRows, {
    fields: [tierItems.tierRowId],
    references: [tierRows.id],
  }),
}));
