import { z } from "zod";
import { generalInfoSchema } from "./general-info";
import { personalInfoSchema } from "./personal-info";

export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
});

export type ResumeSchema = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: File | string | null;
};
