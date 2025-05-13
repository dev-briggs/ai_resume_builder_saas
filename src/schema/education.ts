import { z } from "zod";
import { optionalStringSchema } from "./common";

export const educationSchema = z.object({
  educations: z
    .array(
      z.object({
        degree: optionalStringSchema,
        school: optionalStringSchema,
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
      }),
    )
    .optional(),
});

export type EducationSchema = z.infer<typeof educationSchema>;

export const educationDefaultValues = {
  educations: [],
};
