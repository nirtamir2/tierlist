import { z } from "zod";
import { helloBuilder } from "../prpc";

export const updateTierMutation = helloBuilder
  .input(
    z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        color: z.string(),
        items: z.array(
          z.object({
            id: z.string(),
            text: z.string(),
            imageSrc: z.union([z.string(), z.undefined()]),
          }),
        ),
      }),
    ),
  )
  .mutation$((updatedTierList) => {
    return updatedTierList;
  }, "myNewQuery");
