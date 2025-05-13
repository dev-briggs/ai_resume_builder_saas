import { z } from "zod";
import { generalInfoSchema } from "./general-info";
import { personalInfoSchema } from "./personal-info";
import { workExperienceSchema } from "./work-experience";
import { educationSchema } from "./education";

export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
});

export type ResumeSchema = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: File | string | null;
};
