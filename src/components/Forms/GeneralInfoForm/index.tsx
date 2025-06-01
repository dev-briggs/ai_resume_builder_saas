import React, { useEffect } from "react";
import { GeneralInfoSchema, generalInfoSchema } from "@/schema/general-info";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash-es";
import { useResumeEditorContext } from "@/components/ResumeEditor";

export default function GeneralInfoForm() {
  const { resumeData, setResumeData } = useResumeEditorContext();

  const form = useForm<GeneralInfoSchema>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      title: resumeData.title,
      description: resumeData.description,
    },
  });

  useEffect(() => {
    const cb: Parameters<typeof form.watch>[0] = async (val) => {
      const isValid = await form.trigger(); // trigger validation because we bypass normal submission via the form submit button
      if (!isValid) return;
      setResumeData({ ...resumeData, ...val });
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
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">General Info</h2>
        <p className="text-muted-foreground text-sm">
          This will not appear on your resume
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="My Resume" autoFocus />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="A resume for my next job" />
                </FormControl>
                <FormDescription>
                  Describe what this resume is for
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
