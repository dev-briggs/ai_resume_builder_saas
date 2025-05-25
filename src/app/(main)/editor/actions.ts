"use server";

import prisma from "@/lib/prisma-client";
import { resumeSchema, ResumeSchema } from "@/schema/resume";
import { auth } from "@clerk/nextjs/server";
import { del, put } from "@vercel/blob";
import path from "path";

export async function saveResume(values: ResumeSchema) {
  const { userId } = await auth();

  if (!userId) throw new Error("User not authenticated");

  console.log("received values", values);

  const { id } = values;

  const { photo, workExperiences, educations, ...resumeValues } =
    resumeSchema.parse(values);

  // TODO: Check resume count for non-premium users

  const existingResume = id
    ? await prisma.resume.findUnique({ where: { id, userId } })
    : null;

  if (id && !existingResume) throw new Error("Resume not found");

  if ((photo instanceof File || photo === null) && existingResume?.photoUrl) {
    await del(existingResume.photoUrl);
  }

  let newPhotoUrl: string | undefined | null = undefined;

  if (photo instanceof File) {
    try {
      const blob = await put(
        `resume_photos/${userId}/${path.basename(photo.name)}`,
        photo,
        {
          access: "public",
        },
      );
      newPhotoUrl = blob.url;
    } catch (e) {
      console.error("vercel blob put error:", e);
      throw new Error(
        e instanceof Error ? e.message : "Failed to upload photo.",
      );
    }
  } else if (photo === null) {
    newPhotoUrl = null;
  }

  if (!id) {
    // create resume
    return prisma.resume.create({
      data: {
        ...resumeValues,
        userId,
        photoUrl: newPhotoUrl,
        workExperiences: {
          create: workExperiences,
        },
        educations: {
          create: educations,
        },
      },
    });
  }

  return prisma.resume.update({
    where: { id },
    data: {
      ...resumeValues,
      photoUrl: newPhotoUrl,
      workExperiences: {
        deleteMany: {}, // delete existing work experiences from table
        create: workExperiences,
      },
      educations: {
        deleteMany: {}, // delete existing educations from table
        create: educations,
      },
    },
  });
}
