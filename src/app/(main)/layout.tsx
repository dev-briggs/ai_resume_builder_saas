"use client";

import Navbar from "@/components/Navbar";
import PremiumModal from "@/components/Premium/PremiumModal";
import React from "react";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {children}
      <PremiumModal />
    </div>
  );
}
