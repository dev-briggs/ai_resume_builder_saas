import React, { useState } from "react";
import { toast } from "sonner";
import { useResumeEditorContext } from "@/components/ResumeEditor";
import LoadingButton from "@/components/ui/loading-button";
import { WandSparklesIcon } from "lucide-react";
import { generateSummary } from "@/app/(main)/editor/forms/actions";

export type GenerateSummaryButtonProps = {
  onSummaryGenerated: (summary: string) => void;
};

export default function GenerateSummaryButton({
  onSummaryGenerated,
}: GenerateSummaryButtonProps) {
  const { resumeData } = useResumeEditorContext();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    // TODO: Block for non-premium users
    try {
      setLoading(true);
      const aiResponse = await generateSummary(resumeData);
      onSummaryGenerated(aiResponse);
    } catch (e) {
      toast.error(
        e instanceof Error
          ? e.message
          : "Something went wrong with the AI generation. Please try again later.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoadingButton
      variant="outline"
      type="button"
      onClick={handleClick}
      loading={loading}
    >
      <WandSparklesIcon className="size-4" />
      Generate (AI)
    </LoadingButton>
  );
}
