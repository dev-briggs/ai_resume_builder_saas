import { z } from "zod";

export const skillSchema = z.object({
  skills: z.array(z.string().trim()),
});

export type SkillSchema = z.infer<typeof skillSchema>;

export const skillDefaultValues: SkillSchema = {
  skills: [],
};
