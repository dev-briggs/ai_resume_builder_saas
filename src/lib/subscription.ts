import { cache } from "react";
import prisma from "./prisma-client";
import { isBefore } from "date-fns";
import { env } from "@/env";

export const subscriptionLevel = ["free", "pro", "pro_plus"] as const;
export type SubscriptionLevel = (typeof subscriptionLevel)[number];

export const getUserSubscriptionLevel = cache(
  async (userId: string): Promise<SubscriptionLevel> => {
    const subscription = await prisma.userSubscription.findUnique({
      where: {
        userId,
      },
    });

    if (
      !subscription ||
      isBefore(subscription.stripeCurrentPeriodEnd, new Date())
    )
      return "free";

    if (
      subscription.stripePriceId === env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY
    )
      return "pro";

    if (
      subscription.stripePriceId ===
      env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY
    )
      return "pro_plus";

    throw new Error("Invalid subscription");
  },
);
