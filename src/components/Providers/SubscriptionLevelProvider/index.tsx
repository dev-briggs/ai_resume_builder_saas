"use client";

import { SubscriptionLevel } from "@/lib/subscription";
import React, { createContext, ReactNode, useContext } from "react";

export type SubscriptionLevelContextType = {
  userSubscriptionLevel: SubscriptionLevel;
};
const SubscriptionLevelContext = createContext<
  SubscriptionLevelContextType | undefined
>(undefined);

export type SubscriptionLevelProviderProps = {
  children: ReactNode;
  userSubscriptionLevel: SubscriptionLevel;
};

export default function SubscriptionLevelProvider({
  children,
  userSubscriptionLevel,
}: SubscriptionLevelProviderProps) {
  return (
    <SubscriptionLevelContext.Provider value={{ userSubscriptionLevel }}>
      {children}
    </SubscriptionLevelContext.Provider>
  );
}

export function userSubscriptionLevelContext() {
  const context = useContext(SubscriptionLevelContext);
  if (context === undefined)
    throw new Error(
      "userSubscriptionLevelContext must be used within a SubscriptionLevelProvider",
    );

  return context;
}
