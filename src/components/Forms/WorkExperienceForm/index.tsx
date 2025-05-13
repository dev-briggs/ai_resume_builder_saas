import { useResumeContext } from "@/components/ResumeEditor/context";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  workExperienceSchema,
  WorkExperienceSchema,
} from "@/schema/work-experience";
import { zodResolver } from "@hookform/resolvers/zod";
import { debounce } from "lodash-es";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import WorkExperienceItem from "./WorkExperienceItem";

export default function WorkExperienceForm() {
  const { resumeData, setResumeData } = useResumeContext();

  const form = useForm<WorkExperienceSchema>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      workExperiences: resumeData.workExperiences,
    },
  });

  useEffect(() => {
    const cb: Parameters<typeof form.watch>[0] = async (val) => {
      const isValid = await form.trigger(); // trigger validation because we bypass normal submission via the form submit button
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        workExperiences: val.workExperiences?.filter((exp) => !!exp),
      });
    };
    const debouncedCB = debounce(cb, 300);

    const { unsubscribe } = form.watch(debouncedCB);

    return () => {
      unsubscribe(); // cleanup function to unsubscribe from the watch
      debouncedCB.cancel(); // cancel the debounced function to prevent memory leaks
    };
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "workExperiences",
  });
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="5 space-y-1 text-center">
        <h2 className="text-2xl font-semibold">Work Experience</h2>
        <p className="text-muted-foreground text-sm">
          Add as many work experiences as you like.
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-3">
          {fields.map((item, index) => (
            <WorkExperienceItem
              key={item.id}
              index={index}
              form={form}
              remove={remove}
            />
          ))}
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() =>
                append({
                  position: "",
                  company: "",
                  description: "",
                })
              }
            >
              Add work experience
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
