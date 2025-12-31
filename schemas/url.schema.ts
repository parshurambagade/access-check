import { z } from "zod";

export const urlSchema = z.object({
  url: z.url("URL is not a valid URL"),
});
