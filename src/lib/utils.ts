import { BORDER_STYLES, ResumeSchema, ResumeServerData } from "@/schema/resume";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fileReplacer(key: string, value: unknown) {
  return value instanceof File
    ? {
        name: value.name,
        size: value.size,
        type: value.type,
        lastModified: value.lastModified,
      }
    : value;
}

export function mapServerToClientResumeValues(
  data: ResumeServerData,
): ResumeSchema {
  const {
    id,
    title,
    description,
    userId,
    photoUrl,
    firstName,
    lastName,
    jobTitle,
    city,
    country,
    phone,
    email,
    workExperiences,
    educations,
    ...resumeValues
  } = data;

  return {
    ...resumeValues,
    id,
    title: title ?? undefined,
    description: description ?? undefined,
    photo: photoUrl ?? undefined,
    firstName: firstName ?? undefined,
    lastName: lastName ?? undefined,
    jobTitle: jobTitle ?? undefined,
    city: city ?? undefined,
    country: country ?? undefined,
    phone: phone ?? undefined,
    email: email ?? undefined,
    workExperiences: workExperiences.map((exp) => ({
      position: exp.position ?? undefined,
      company: exp.company ?? undefined,
      startDate: exp.startDate ?? undefined,
      endDate: exp.endDate ?? undefined,
      description: exp.description ?? undefined,
    })),
    educations: educations.map((edu) => ({
      school: edu.school ?? undefined,
      degree: edu.degree ?? undefined,
      startDate: edu.startDate ?? undefined,
      endDate: edu.endDate ?? undefined,
    })),
    borderStyle:
      (resumeValues.borderStyle as (typeof BORDER_STYLES)[number]) ?? undefined,
    summary: data.summary ?? undefined,
  };
}
