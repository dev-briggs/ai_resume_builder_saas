import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { BORDER_STYLES } from "@/schema/resume";
import { Circle, Square, Squircle } from "lucide-react";
import { userSubscriptionLevelContext } from "@/components/Providers/SubscriptionLevelProvider";
import usePremiumModalStore from "@/store/premium-modal.store";
import { canUseCustomizations } from "@/lib/permissions";

export type BorderStyleSelectorProps = {
  borderStyle?: (typeof BORDER_STYLES)[number];
  onChange: (borderStyle: (typeof BORDER_STYLES)[number]) => void;
};

export default function BorderStyleSelector({
  borderStyle,
  onChange,
}: BorderStyleSelectorProps) {
  const { userSubscriptionLevel } = userSubscriptionLevelContext();
  const premiumModal = usePremiumModalStore();

  function handleClick() {
    if (!canUseCustomizations(userSubscriptionLevel)) {
      premiumModal.setOpen(true);
      return;
    }
    const currentIndex = borderStyle ? BORDER_STYLES.indexOf(borderStyle) : 0;
    const nextIndex = (currentIndex + 1) % BORDER_STYLES.length;
    onChange(BORDER_STYLES[nextIndex]);
  }

  const Icon = useMemo(() => {
    switch (borderStyle) {
      case "square":
        return Square;
      case "circle":
        return Circle;
      default:
        return Squircle;
    }
  }, [borderStyle]);

  return (
    <Button
      variant="outline"
      size="icon"
      title="Change border style"
      onClick={handleClick}
    >
      <Icon className="size-5" />
    </Button>
  );
}
