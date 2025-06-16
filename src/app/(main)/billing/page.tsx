import GetSubscriptionButton from "@/components/Billing/GetSubscriptionButton";
import ManageSubscriptionButton from "@/components/Billing/ManageSubscriptionButton";
import { billingPeriodEndDateFormat } from "@/constants/date";
import prisma from "@/lib/prisma-client";
import stripe from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";
import { formatDate } from "date-fns";
import { Metadata } from "next";
import { unauthorized } from "next/navigation";
import React from "react";
import Stripe from "stripe";

export const metadata: Metadata = {
  title: "Billing",
};

export default async function Page() {
  const { userId } = await auth();

  if (!userId) unauthorized();

  const subscription = await prisma.userSubscription.findUnique({
    where: { userId },
  });

  const priceInfo = subscription
    ? await stripe.prices.retrieve(subscription.stripePriceId, {
        expand: ["product"],
      })
    : null;

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <h1 className="text-3xl font-bold">Billing</h1>
      <p>
        Your current plan:{" "}
        <span className="font-bold">
          {priceInfo ? (priceInfo.product as Stripe.Product).name : "Free"}
        </span>
      </p>
      {subscription ? (
        <>
          {subscription.stripeCancelAtPeriodEnd && (
            <p className="text-destructive">
              Your subscription will be cancelled on{" "}
              {formatDate(
                subscription.stripeCurrentPeriodEnd,
                billingPeriodEndDateFormat,
              )}
            </p>
          )}
          <ManageSubscriptionButton />
        </>
      ) : (
        <GetSubscriptionButton />
      )}
    </main>
  );
}
