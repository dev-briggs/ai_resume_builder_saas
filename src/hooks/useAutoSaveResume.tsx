import { useEffect, useState } from "react";
import { ResumeSchema } from "@/schema/resume";
import useDebouncedValue from "./useDebouncedValue";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { saveResume } from "@/actions/editor";
import { Button } from "@/components/ui/button";
import { fileReplacer } from "@/lib/utils";

export default function useAutoSaveResume(resumeData: ResumeSchema) {
  const searchParams = useSearchParams();

  const debouncedResumeData = useDebouncedValue(resumeData, 1500);

  const [resumeId, setResumeId] = useState(resumeData.id);
  const [isSaving, setIsSaving] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [lastSavedData, setLastSavedData] = useState(
    structuredClone(resumeData),
  );

  useEffect(() => {
    setHasError(false);
  }, [debouncedResumeData]);

  useEffect(() => {
    async function save() {
      try {
        setIsSaving(true);
        setHasError(false);

        const newData = structuredClone(debouncedResumeData);

        const updatedResume = await saveResume({
          ...newData,
          ...(JSON.stringify(lastSavedData.photo, fileReplacer) ===
            JSON.stringify(newData.photo, fileReplacer) && {
            photo: undefined,
          }),
          id: resumeId,
        });

        setResumeId(updatedResume.id);
        setLastSavedData(newData);

        if (searchParams.get("resumeId") !== updatedResume.id) {
          const newSearchParams = new URLSearchParams(searchParams.toString());
          newSearchParams.set("resumeId", updatedResume.id);
          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`,
          );
        }
      } catch (e) {
        const errorMessage =
          e instanceof Error ? e.message : "Could not save changes";
        console.error("saveResume error:", e);
        setHasError(true);
        toast.error(
          <div className="space-y-3">
            <p>{errorMessage}</p>
            <Button
              variant="secondary"
              onClick={() => {
                toast.dismiss();
                save();
              }}
            >
              Retry
            </Button>
          </div>,
        );
      } finally {
        setIsSaving(false);
      }
    }

    const hasUnsavedChanges =
      JSON.stringify(debouncedResumeData, fileReplacer) !==
      JSON.stringify(lastSavedData, fileReplacer);

    if (debouncedResumeData && hasUnsavedChanges && !isSaving && !hasError)
      save();
  }, [
    debouncedResumeData,
    isSaving,
    lastSavedData,
    hasError,
    resumeId,
    searchParams,
    toast,
  ]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(resumeData, fileReplacer) !==
      JSON.stringify(lastSavedData, fileReplacer),
  };
}
