import { z } from "zod";
import { optionalStringSchema } from "./common";

export const generalInfoSchema = z.object({
  title: optionalStringSchema,
  description: optionalStringSchema,
});

export type GeneralInfoSchema = z.infer<typeof generalInfoSchema>;

export const generalInfoDefaultValues = {
  title: "",
  description: "",
};
