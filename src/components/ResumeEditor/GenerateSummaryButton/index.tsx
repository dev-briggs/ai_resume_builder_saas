import React, { useState } from "react";
import { toast } from "sonner";
import { useResumeEditorContext } from "@/components/ResumeEditor";
import LoadingButton from "@/components/ui/loading-button";
import { WandSparklesIcon } from "lucide-react";
import { generateSummary } from "@/actions/form";
import { userSubscriptionLevelContext } from "@/components/Providers/SubscriptionLevelProvider";
import usePremiumModalStore from "@/store/premium-modal.store";
import { canUseAITools } from "@/lib/permissions";

export type GenerateSummaryButtonProps = {
  onSummaryGenerated: (summary: string) => void;
};

export default function GenerateSummaryButton({
  onSummaryGenerated,
}: GenerateSummaryButtonProps) {
  const { userSubscriptionLevel } = userSubscriptionLevelContext();
  const premiumModal = usePremiumModalStore();

  const { resumeData } = useResumeEditorContext();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!canUseAITools(userSubscriptionLevel)) {
      premiumModal.setOpen(true);
      return;
    }
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
