"use client";

import { createCheckoutSession } from "@/actions/checkout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { env } from "@/env";
import usePremiumModalStore from "@/store/premium-modal.store";
import { Check } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

const premiumFeatures = ["AI tools", "Up to 3 resumes"];
const premiumPlusFeatures = [
  "Everything in Premium",
  "Infinite resumes",
  "Design customizations",
];

export default function PremiumModal() {
  const { open, setOpen } = usePremiumModalStore();
  const [isPending, startTransition] = useTransition();

  function handlePremiumClick(priceId: string) {
    startTransition(async () => {
      try {
        const redirectUrl = await createCheckoutSession(priceId);
        window.location.href = redirectUrl;
      } catch (e) {
        console.log(e);
        toast.error(
          e instanceof Error
            ? e.message
            : "Something went wrong. Please try again",
        );
      }
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!isPending) setOpen(open);
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Resume Builder AI Premium</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <p>Get premium subscription to unlock more features</p>
          <div className="flex">
            <div className="flex w-1/2 flex-col space-y-5">
              <h3 className="text-center text-lg font-bold">Premium</h3>
              <ul className="grow list-inside space-y-2">
                {premiumFeatures.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="size-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() =>
                  handlePremiumClick(
                    env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY,
                  )
                }
                disabled={isPending}
              >
                Get Premium
              </Button>
            </div>
            <div className="mx-6 border-l" />
            <div className="flex w-1/2 flex-col space-y-5">
              <h3 className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-center text-lg font-bold text-transparent">
                Premium Plus
              </h3>
              <ul className="grow list-inside space-y-2">
                {premiumPlusFeatures.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="size-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                variant="premium"
                onClick={() =>
                  handlePremiumClick(
                    env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY,
                  )
                }
                disabled={isPending}
              >
                Get Premium Plus
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
