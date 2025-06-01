"use client";

import React, { createContext, useContext, useState } from "react";
import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./Footer";
import ResumePreviewSection from "./ResumePreviewSection";
import { cn } from "@/lib/utils";
import useAutoSaveResume from "@/hooks/useAutoSaveResume";
import useUnloadWarning from "@/hooks/useUnloadWarning";
import { ResumeSchema } from "@/schema/resume";
import { generalInfoDefaultValues } from "@/schema/general-info";
import { personalInfoDefaultValues } from "@/schema/personal-info";
import { workExperienceDefaultValues } from "@/schema/work-experience";
import { educationDefaultValues } from "@/schema/education";
import { skillDefaultValues } from "@/schema/skill";
import { summaryDefaultValues } from "@/schema/summary";

export type ResumeEditorContextType = {
  resumeData: ResumeSchema;
  setResumeData: (data: ResumeSchema) => void;
};

const ResumeEditorContext = createContext<ResumeEditorContextType | undefined>(
  undefined,
);

export const useResumeEditorContext = () => {
  const context = useContext(ResumeEditorContext);
  if (!context) {
    throw new Error(
      "useResumeEditorContext must be used within a ResumeEditor component",
    );
  }
  return context;
};

export type ResumeEditorProps = {
  resumeToEdit: ResumeSchema | null;
};

export default function ResumeEditor({ resumeToEdit }: ResumeEditorProps) {
  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step") || steps[0].key;

  const resumeDataDefaultValue = {
    ...generalInfoDefaultValues,
    ...personalInfoDefaultValues,
    ...workExperienceDefaultValues,
    ...educationDefaultValues,
    ...skillDefaultValues,
    ...summaryDefaultValues,
  };

  const [resumeData, setResumeData] = useState<ResumeSchema>(
    resumeToEdit ? resumeToEdit : resumeDataDefaultValue,
  );

  const [showSmResumePreview, setShowSmResumePreview] = useState(false);

  const { isSaving, hasUnsavedChanges } = useAutoSaveResume(resumeData);

  useUnloadWarning(hasUnsavedChanges);

  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`); // use instead of router.push to avoid making request to server
  }

  const FormComponent = steps.find(
    (step) => step.key === currentStep,
  )?.component;

  return (
    <ResumeEditorContext.Provider value={{ resumeData, setResumeData }}>
      <div className="flex grow flex-col">
        <header className="space-y-1.5 border-b px-3 py-5 text-center">
          <h1 className="text-2xl font-bold">Design your resume</h1>
          <p className="text-muted-foreground text-sm">
            Follow the steps below to create your resume. Your progress will be
            saved automatically.
          </p>
        </header>
        <main className="relative grow">
          <div className="absolute top-0 bottom-0 flex w-full">
            <div
              className={cn(
                "w-full space-y-6 overflow-y-auto p-3",
                "md:block md:w-1/2",
                showSmResumePreview && "hidden",
              )}
            >
              <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
              {FormComponent && <FormComponent />}
            </div>
            <div className="grow md:border-r"></div>
            <ResumePreviewSection
              className={cn(showSmResumePreview && "flex")}
            />
          </div>
        </main>
        <Footer
          currentStep={currentStep}
          setCurrentStep={setStep}
          showSmResumePreview={showSmResumePreview}
          setShowSmResumePreview={setShowSmResumePreview}
          isSaving={isSaving}
        />
      </div>
    </ResumeEditorContext.Provider>
  );
}
