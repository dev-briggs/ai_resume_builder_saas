"use server";

import prisma from "@/lib/prisma-client";
import { auth } from "@clerk/nextjs/server";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { unauthorized } from "next/navigation";

export async function deleteResume(id: string) {
  const { userId } = await auth();

  if (!userId) unauthorized();

  const resume = await prisma.resume.findUnique({
    where: { id, userId },
  });

  if (!resume) throw new Error("Resume not found");

  if (resume.photoUrl) await del(resume.photoUrl);

  await prisma.resume.delete({ where: { id } });

  revalidatePath("/resumes"); // Revalidate the resumes page to reflect the deletion
}
