import { z } from "zod";
import { optionalStringSchema } from "./common";

export const summarySchema = z.object({
  summary: optionalStringSchema,
});

export type SummarySchema = z.infer<typeof summarySchema>;

export const summaryDefaultValues = {
  summary: "",
};
