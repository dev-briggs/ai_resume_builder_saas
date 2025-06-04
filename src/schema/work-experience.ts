import { z } from "zod";
import { optionalStringSchema } from "./common";
import { isBefore } from "date-fns";

export const workExperienceSchema = z.object({
  workExperiences: z
    .array(
      z
        .object({
          position: optionalStringSchema,
          company: optionalStringSchema,
          startDate: z
            .date({
              invalid_type_error: "startDate must be a date",
            })
            .optional(),
          endDate: z
            .date({
              invalid_type_error: "endDate must be a date",
            })
            .optional(),
          description: optionalStringSchema,
        })
        .refine(
          ({ startDate, endDate }) => {
            if (!startDate || !endDate) return true;
            return !isBefore(endDate, startDate);
          },
          {
            message: "End date cannot be earlier than start date",
            path: ["endDate"],
          },
        ),
    )
    .optional(),
});

export type WorkExperienceSchema = z.infer<typeof workExperienceSchema>;

export type WorkExperienceItem = NonNullable<
  z.infer<typeof workExperienceSchema>["workExperiences"]
>[number];

export const workExperienceDefaultValues = {
  workExperiences: [],
};

export const generateWorkExperienceSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Required")
    .min(20, "Must be at least 20 characters"),
});

export type GenerateWorkExperienceSchema = z.infer<
  typeof generateWorkExperienceSchema
>;
