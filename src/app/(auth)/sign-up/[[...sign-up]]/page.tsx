import { SignUp } from "@clerk/nextjs";
import React from "react";

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-3">
      <SignUp />
    </main>
  );
}
