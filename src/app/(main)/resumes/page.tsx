import CreateResumeButton from "@/components/Resumes/CreateResumeButton";
import ResumeItem from "@/components/Resumes/ResumeItem";
import { canCreateResume } from "@/lib/permissions";
import prisma from "@/lib/prisma-client";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import { resumeDataInclude } from "@/schema/resume";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { unauthorized } from "next/navigation";

export const metadata: Metadata = {
  title: "Your Resumes",
};

export default async function Page() {
  const { userId } = await auth();

  if (!userId) unauthorized();

  const [resumes, totalCount, subscriptionLevel] = await Promise.all([
    prisma.resume.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      include: resumeDataInclude,
    }),
    prisma.resume.count({ where: { userId } }),
    getUserSubscriptionLevel(userId),
  ]);

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <CreateResumeButton
        canCreate={canCreateResume(subscriptionLevel, totalCount)}
      />
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Your resumes</h1>
        <p>Total: {totalCount}</p>
      </div>
      <div className="flex w-full grid-cols-2 flex-col gap-3 sm:grid md:grid-cols-3 lg:grid-cols-4">
        {resumes.map((resume) => (
          <ResumeItem key={resume.id} resume={resume} />
        ))}
      </div>
    </main>
  );
}
