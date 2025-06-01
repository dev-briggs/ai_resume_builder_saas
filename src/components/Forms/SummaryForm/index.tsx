import { useResumeEditorContext } from "@/components/ResumeEditor";
import GenerateSummaryButton from "@/components/ResumeEditor/GenerateSummaryButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { SummarySchema, summarySchema } from "@/schema/summary";
import { zodResolver } from "@hookform/resolvers/zod";
import { debounce } from "lodash-es";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function SummaryForm() {
  const { resumeData, setResumeData } = useResumeEditorContext();

  const form = useForm<SummarySchema>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      summary: resumeData.summary,
    },
  });

  useEffect(() => {
    const cb: Parameters<typeof form.watch>[0] = async (val) => {
      const isValid = await form.trigger(); // trigger validation because we bypass normal submission via the form submit button
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        ...val,
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
        <h2 className="text-2xl font-semibold">Professional Summary</h2>
        <p className="text-muted-foreground text-sm">
          Write a short introduction for your resume or let the AI generate one
          from your entered data.
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Professional Summary</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="A brief, engaging text about yourself."
                  />
                </FormControl>
                <FormMessage />
                <GenerateSummaryButton
                  onSummaryGenerated={(summary) =>
                    form.setValue("summary", summary)
                  }
                />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
