import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { unauthorized } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Billing",
};

export default async function Page() {
  const { userId } = await auth();

  if (!userId) unauthorized();

  return <div>Billing</div>;
}
