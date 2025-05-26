import { formatBytes } from "@/lib/formatter";
import { z } from "zod";
import {
  optionalEmailSchema,
  optionalStringSchema,
  phoneNumberSchema,
} from "./common";
import { countries } from "country-data-list";

const MAX_FILE_SIZE = 4 * 1024 * 1024; // we can only send up to 4mb to a serverless function in NextJS

export const personalInfoSchema = z.object({
  photo: z
    .custom<File | undefined>()
    .refine(
      (file) => !file || file instanceof File,
      `file should be an instance of File`,
    )
    .refine(
      (file) => !file || file.type.startsWith("image/"),
      `Must be an image file`,
    )
    .refine(
      (file) => !file || file?.size <= MAX_FILE_SIZE,
      `Please choose an image smaller than ${formatBytes(MAX_FILE_SIZE)}`,
    ),
  firstName: optionalStringSchema,
  lastName: optionalStringSchema,
  jobTitle: optionalStringSchema,
  country: z
    .enum(Object.keys(countries) as [string, ...string[]])
    .optional()
    .or(z.literal("")),
  city: optionalStringSchema,
  phone: phoneNumberSchema,
  email: optionalEmailSchema,
});

export type PersonalInfoSchema = z.infer<typeof personalInfoSchema>;

export const personalInfoDefaultValues = {
  firstName: "",
  lastName: "",
  jobTitle: "",
  country: "",
  city: "",
  phone: "",
  email: "",
};
