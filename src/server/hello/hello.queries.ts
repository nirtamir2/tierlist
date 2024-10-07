import { z } from "zod";
import { helloBuilder } from "../prpc";
import { mockTiers } from "./mockTiers";

export const helloQuery = helloBuilder
  .input(
    z.object({
      hello: z.string(),
    }),
  )
  .query$(() => {
    return mockTiers;
  }, "myNewQuery");
