"use client";

import { createCustomerPortalSession } from "@/actions/billing";
import LoadingButton from "@/components/ui/loading-button";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";

export default function ManageSubscriptionButton() {
  const [isPending, startTransition] = useTransition();

  async function handleClick() {
    startTransition(async () => {
      try {
        const redirectUrl = await createCustomerPortalSession();
        window.location.href = redirectUrl;
      } catch (e) {
        console.log(e);
        toast.error("Something went wrong. Please try again.");
      }
    });
  }

  return (
    <LoadingButton onClick={handleClick} loading={isPending}>
      Manage subscription
    </LoadingButton>
  );
}
