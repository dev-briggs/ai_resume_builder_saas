import { cn } from "@/lib/utils";
import Image from "next/image";

import logo from "@/assets/images/logo.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main
      className={cn(
        "flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-100 px-5 py-12 text-center text-gray-900",
        "md:flex-row md:text-start lg:gap-12",
      )}
      data-testid="home-main-container"
    >
      <div
        className="max-w-prose space-y-3"
        data-testid="home-content-container"
      >
        <Image
          src={logo}
          alt="Logo"
          width={150}
          height={150}
          className={cn("mx-auto", "md:ms-0")}
          data-testid="home-logo-image"
        />
        <h1
          className={cn(
            "scroll-m-20 text-4xl font-extrabold tracking-tight",
            "lg:text-5xl",
          )}
          data-testid="home-main-heading"
        >
          Create the{" "}
          <span
            className="inline-block bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent"
            data-testid="home-highlighted-text"
          >
            Perfect Resume
          </span>{" "}
          in minutes
        </h1>
        <p
          className="text-lg text-gray-500"
          data-testid="home-description-paragraph"
        >
          Our <span className="font-bold">AI resume builder</span> helps you
          design a professional resume, even if you&apos;re not very smart.
        </p>
        <Button
          asChild
          size="lg"
          variant="premium"
          data-testid="home-get-started-button"
        >
          <Link href="/resumes" data-testid="home-get-started-link">
            Get started
          </Link>
        </Button>
      </div>
      <div data-testid="home-resume-preview-container">
        {/*
          * TODO: add a resume preview image or render a sample ResumePreview
        <Image
          src={}
          alt="Resume preview"
          width={600}
          className={cn("shadow-md", "lg:rotate-[1.5deg")}
          data-testid="home-resume-preview-image"
        /> */}
      </div>
    </main>
  );
}
