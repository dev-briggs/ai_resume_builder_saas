import { z } from "zod";
import { optionalStringSchema } from "./common";
import { workExperienceSchema } from "./work-experience";
import { educationSchema } from "./education";
import { skillSchema } from "./skill";

export const summarySchema = z.object({
  summary: optionalStringSchema,
});

export type SummarySchema = z.infer<typeof summarySchema>;

export const summaryDefaultValues = {
  summary: "",
};

export const generateSummarySchema = z.object({
  jobTitle: optionalStringSchema,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillSchema.shape,
});

export type GenerateSummarySchema = z.infer<typeof generateSummarySchema>;
