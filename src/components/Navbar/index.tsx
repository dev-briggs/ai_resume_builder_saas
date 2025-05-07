"use client";

import React from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { dark } from "@clerk/themes";

import { CreditCard } from "lucide-react";

import logo from "@/assets/images/logo.png";
import ThemeToggle from "../ThemeToggle.tsx";
import { useTheme } from "next-themes";

function Navbar() {
  const { theme } = useTheme();
  return (
    <header className="shadow-sm">
      <div className="max-w-7xl mx-auto p-3 flex items-center justify-between gap-3">
        <Link href="/resumes" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="Logo"
            width={35}
            height={35}
            className="rounded-full"
          />
          <span className="text-xl font-bold tracking-tight">
            AI Resume Builder
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                baseTheme: theme === "dark" ? dark : undefined,
                elements: {
                  avatarBox: {
                    width: 35,
                    height: 35,
                  },
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="Billing"
                  labelIcon={<CreditCard className="size-4" />}
                  href="/billing"
                ></UserButton.Link>
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
