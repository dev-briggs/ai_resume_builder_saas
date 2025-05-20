import { useEffect, useState } from "react";
import { ResumeSchema } from "@/schema/resume";
import useDebouncedValue from "./useDebouncedValue";

export default function useAutoSaveResume(resumeData: ResumeSchema) {
  const debouncedResumeData = useDebouncedValue(resumeData, 1500);

  const [lastSavedData, setLastSavedData] = useState(
    structuredClone(resumeData),
  );

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function save() {
      setIsSaving(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setLastSavedData(structuredClone(debouncedResumeData));
      setIsSaving(false);
    }

    const hasUnsavedChanges =
      JSON.stringify(debouncedResumeData) !== JSON.stringify(lastSavedData);

    if (debouncedResumeData && hasUnsavedChanges && !isSaving) save();
  }, [debouncedResumeData, isSaving, lastSavedData]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(resumeData) !== JSON.stringify(lastSavedData),
  };
}
