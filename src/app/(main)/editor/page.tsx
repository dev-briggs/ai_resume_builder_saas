import React from "react";
import { Metadata } from "next";
import prisma from "@/lib/prisma-client";
import { auth } from "@clerk/nextjs/server";
import { resumeDataInclude } from "@/schema/resume";
import { mapServerToClientResumeValues } from "@/lib/utils";
import ResumeEditor from "@/components/ResumeEditor";

export type PageProps = {
  searchParams: Promise<{
    resumeId?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Design your resume",
};

export default async function Page({ searchParams }: PageProps) {
  const { resumeId } = await searchParams;
  const { userId } = await auth();

  if (!userId) return null;

  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where: { id: resumeId, userId },
        include: resumeDataInclude,
      })
    : null;

  const mappedResumeToEdit = resumeToEdit
    ? mapServerToClientResumeValues(resumeToEdit)
    : null;

  return <ResumeEditor resumeToEdit={mappedResumeToEdit} />;
}
