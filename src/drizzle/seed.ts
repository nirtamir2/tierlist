/* eslint-disable no-console */
import { mockTiers } from "../server/hello/mockTiers";
import { db } from "./db";
import { tierItems, tierRows, tierlistCatrogries, tierlists } from "./schema";

async function seed() {
  const category = await db
    .insert(tierlistCatrogries)
    .values({
      title: "Web development",
      description: "Tech stuff of web development",
    })
    .returning({ id: tierlistCatrogries.id });

  const categoryId = category.at(0)?.id;

  if (categoryId == null) {
    throw new Error("categoryId should be a string");
  }

  const tierlist = await db
    .insert(tierlists)
    .values({
      title: "Frameworks",
      description: "Javascript Frameworks",
      categoryId,
    })
    .returning({ id: tierlists.id });
  const tierlistId = tierlist.at(0)?.id;

  if (tierlistId == null) {
    throw new Error("tierlistId should be a string");
  }
  // Loop over the mockTiers array and insert data into the database
  for (const tierData of mockTiers) {
    // Insert each tier
    const tierRow = await db
      .insert(tierRows)
      .values({
        name: tierData.name,
        color: tierData.color,
        tierlistId,
      })
      .returning({ id: tierRows.id });

    const tierRowId = tierRow.at(0)?.id;
    if (tierRowId == null) {
      throw new Error("tierRowId should be a string");
    }

    // Insert the related tierItems
    for (const itemData of tierData.items) {
      await db.insert(tierItems).values({
        text: itemData.text,
        imageSrc: itemData.imageSrc ?? null,
        tierRowId,
      });
    }
  }

  console.log("Seeding complete!");
}

// Run the seed script
try {
  // eslint-disable-next-line antfu/no-top-level-await
  await seed();
} catch (error) {
  console.error("Seeding failed:", error);
}
/* eslint-enable no-console */
