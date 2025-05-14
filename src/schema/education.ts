import { z } from "zod";
import { optionalStringSchema } from "./common";

export const educationSchema = z.object({
  educations: z
    .array(
      z
        .object({
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
        })
        .refine(
          ({ startDate, endDate }) => {
            if (!startDate || !endDate) return true;
            return endDate > startDate;
          },
          {
            message: "End date must be after start date",
            path: ["endDate"],
          },
        ),
    )
    .optional(),
});

export type EducationSchema = z.infer<typeof educationSchema>;

export const educationDefaultValues = {
  educations: [],
};
