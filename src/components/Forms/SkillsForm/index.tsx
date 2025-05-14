import { useResumeContext } from "@/components/ResumeEditor/context";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputTags } from "@/components/ui/multiple-tag-input";
import { skillSchema, SkillSchema } from "@/schema/skill";
import { zodResolver } from "@hookform/resolvers/zod";
import { debounce } from "lodash-es";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function SkillsForm() {
  const { resumeData, setResumeData } = useResumeContext();

  const form = useForm<SkillSchema>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      skills: resumeData.skills,
    },
  });

  useEffect(() => {
    const cb: Parameters<typeof form.watch>[0] = async (val) => {
      const isValid = await form.trigger(); // trigger validation because we bypass normal submission via the form submit button
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        skills:
          val.skills
            ?.filter((skill) => skill !== undefined)
            .map((skill) => skill?.trim())
            .filter((skill) => skill !== "") || [],
      });
    };
    const debouncedCB = debounce(cb, 300);

    const { unsubscribe } = form.watch(debouncedCB);

    return () => {
      unsubscribe(); // cleanup function to unsubscribe from the watch
      debouncedCB.cancel(); // cancel the debounced function to prevent memory leaks
    };
  }, [form, resumeData, setResumeData]);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="5 space-y-1 text-center">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <p className="text-muted-foreground text-sm">What are you good at?</p>
      </div>

      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Skills</FormLabel>
                <FormControl>
                  <InputTags
                    {...field}
                    placeholder="e.g. React.js, Node.js, Graphic Design, ..."
                  />
                </FormControl>
                <FormDescription>
                  Separate each skill with a comma.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
