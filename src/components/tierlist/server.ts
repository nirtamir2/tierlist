import { cache } from "@solidjs/router";
import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { tierlistCatrogries, tierlists } from "../../drizzle/schema";

// Adjust this import based on your setup

export const getTierlistWithRelations = cache(async (tierlistId: string) => {
  "use server";
  const tierlist = await db.query.tierlists.findFirst({
    where: eq(tierlists.id, tierlistId),
    with: {
      category: true,
      tierRows: {
        with: {
          items: true,
        },
      },
    },
  });

  return tierlist;
}, "tierlist");

// Function to get all tierlists with relations
export const getAllTierlistsWithRelations = cache(async () => {
  "use server";
  const allTierlists = await db.query.tierlists.findMany({
    with: {
      category: true,
      tierRows: {
        with: {
          items: true,
        },
      },
    },
  });

  return allTierlists;
}, "tierlists");

export const getCategoriesWithTierlists = cache(async () => {
  const categories = await db.query.tierlistCatrogries.findMany({
    with: {
      tierlists: true,
    },
  });

  return categories;
}, "categories");

export const getCategoryWithTierlists = cache(async (categoryId: string) => {
  const category = await db.query.tierlistCatrogries.findFirst({
    where: eq(tierlistCatrogries.id, categoryId),
    with: {
      tierlists: true,
    },
  });

  return category;
}, "category");
