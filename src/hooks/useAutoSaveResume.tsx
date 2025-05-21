import { useEffect, useState } from "react";
import { ResumeSchema } from "@/schema/resume";
import useDebouncedValue from "./useDebouncedValue";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { saveResume } from "@/app/(main)/editor/actions";
import { Button } from "@/components/ui/button";

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
          ...(lastSavedData.photo?.toString() === newData.photo?.toString() && {
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
        setHasError(true);
        console.log(e);
        toast.error(
          <div className="space-y-3">
            <p>Could not save changes.</p>
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
      JSON.stringify(debouncedResumeData) !== JSON.stringify(lastSavedData);

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
      JSON.stringify(resumeData) !== JSON.stringify(lastSavedData),
  };
}
