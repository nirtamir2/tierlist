import { cache } from "@solidjs/router";
import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { tierlistCatrogries } from "../../drizzle/schema";

// Adjust this import based on your setup

export async function fetchAllTierlists() {
  return await db.query.tierlists.findMany({
    with: {
      category: true,
      tierRows: {
        with: {
          items: true,
        },
      },
    },
  });
}

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
