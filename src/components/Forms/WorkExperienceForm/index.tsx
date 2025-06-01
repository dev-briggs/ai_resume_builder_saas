import React, { useEffect } from "react";
import { debounce } from "lodash-es";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

import { useResumeEditorContext } from "@/components/ResumeEditor";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  workExperienceSchema,
  WorkExperienceSchema,
} from "@/schema/work-experience";
import WorkExperienceItem from "./WorkExperienceItem";

export default function WorkExperienceForm() {
  const { resumeData, setResumeData } = useResumeEditorContext();

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

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "workExperiences",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = fields.findIndex((field) => field.id === active.id);
    const newIndex = fields.findIndex((field) => field.id === over.id);
    move(oldIndex, newIndex);
    return arrayMove(fields, oldIndex, newIndex);
  }

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
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={fields}
              strategy={verticalListSortingStrategy}
            >
              {fields.map((field, index) => (
                <WorkExperienceItem
                  key={field.id}
                  id={field.id}
                  index={index}
                  form={form}
                  remove={remove}
                />
              ))}
            </SortableContext>
          </DndContext>
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
