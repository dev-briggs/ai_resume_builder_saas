"use client";

import React from "react";
import Link from "next/link";
import { PlusSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import usePremiumModalStore from "@/store/premium-modal.store";

type CreateResumeButtonProps = {
  canCreate: boolean;
};

export default function CreateResumeButton({
  canCreate,
}: CreateResumeButtonProps) {
  const setOpen = usePremiumModalStore((s) => s.setOpen);

  if (canCreate) {
    return (
      <Button asChild className="mx-auto flex w-fit gap-2">
        <Link href="/editor">
          <PlusSquare className="size-5" />
          New resume
        </Link>
      </Button>
    );
  }

  return (
    <Button onClick={() => setOpen(true)} className="mx-auto flex w-fit gap-2">
      <PlusSquare className="size-5" />
      New resume
    </Button>
  );
}
