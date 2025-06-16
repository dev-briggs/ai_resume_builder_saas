import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function UnauthorizedPage() {
  return (
    <main className="mx-auto max-w-7xl space-y-6 px-3 py-6 text-center">
      <h1 className="text-3xl font-bold">401 - Unauthorized</h1>
      <p>Please log in to access this page</p>
      <div className="flex items-center justify-center gap-2">
        <Button asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
        <Button asChild>
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </div>
    </main>
  );
}
