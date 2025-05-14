import { z } from "zod";
import { generalInfoSchema } from "./general-info";
import { personalInfoSchema } from "./personal-info";
import { workExperienceSchema } from "./work-experience";
import { educationSchema } from "./education";
import { skillSchema } from "./skill";
import { summarySchema } from "./summary";
import { optionalStringSchema } from "./common";

export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillSchema.shape,
  ...summarySchema.shape,
  colorHex: optionalStringSchema,
  borderStyle: optionalStringSchema,
});

export type ResumeSchema = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: File | string | null;
};
