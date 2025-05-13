import { z } from "zod";
import { optionalStringSchema } from "./common";

export const workExperienceSchema = z.object({
  workExperiences: z
    .array(
      z.object({
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
      }),
      // .refine(
      //   ({ startDate, endDate }) =>
      //     !!startDate && !!endDate && endDate > startDate,
      //   {
      //     message: "End date must be after start date",
      //     path: ["endDate"],
      //   },
      // ),
    )
    .optional(),
});

export type WorkExperienceSchema = z.infer<typeof workExperienceSchema>;

export const workExperienceDefaultValues = {
  workExperiences: [],
};
