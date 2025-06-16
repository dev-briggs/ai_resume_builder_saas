"use client";

import { Button } from "@/components/ui/button";
import usePremiumModalStore from "@/store/premium-modal.store";

export default function GetSubscriptionButton() {
  const premiumModal = usePremiumModalStore();
  return (
    <Button
      variant="premium"
      onClick={() => premiumModal.setOpen(true)}
    ></Button>
  );
}
