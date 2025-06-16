"use server";

import openai from "@/lib/openai";
import { canUseAITools } from "@/lib/permissions";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import {
  GENERATE_SUMMARY_SYSTEM_MESSAGE,
  GENERATE_WORK_EXPERIENCE_SYSTEM_MESSAGE,
} from "@/prompts/system-message";
import {
  generateSummaryUserMessage,
  generateWorkExperienceUserMessage,
} from "@/prompts/user-message";
import { generateSummarySchema, GenerateSummarySchema } from "@/schema/summary";
import {
  GenerateWorkExperienceSchema,
  generateWorkExperienceSchema,
  WorkExperienceItem,
} from "@/schema/work-experience";
import { auth } from "@clerk/nextjs/server";
import { unauthorized } from "next/navigation";

export async function generateSummary(input: GenerateSummarySchema) {
  const { userId } = await auth();

  if (!userId) unauthorized();

  const subscriptionLevel = await getUserSubscriptionLevel(userId);

  if (!canUseAITools(subscriptionLevel))
    throw new Error("Upgrade your subscription to use this feature.");

  const { jobTitle, workExperiences, educations, skills } =
    generateSummarySchema.parse(input);

  const userMessage = generateSummaryUserMessage({
    jobTitle,
    workExperiences,
    educations,
    skills,
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: GENERATE_SUMMARY_SYSTEM_MESSAGE },
        { role: "user", content: userMessage },
      ],
    });

    const aiResponse = completion.choices[0].message.content;

    console.log("AI response:", aiResponse);

    if (!aiResponse) {
      throw new Error(
        "AI response is empty. Please ensure the input data is complete and try again.",
      );
    }
    return aiResponse;
  } catch (e) {
    throw new Error(
      e instanceof Error
        ? e.message
        : "Failed to generate summary. Please try again later.",
    );
  }
}

export async function generateWorkExperience(
  input: GenerateWorkExperienceSchema,
) {
  const { userId } = await auth();

  if (!userId) unauthorized();

  const subscriptionLevel = await getUserSubscriptionLevel(userId);

  if (!canUseAITools(subscriptionLevel))
    throw new Error("Upgrade your subscription to use this feature.");

  const { description } = generateWorkExperienceSchema.parse(input);

  const userMessage = generateWorkExperienceUserMessage(description);
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: GENERATE_WORK_EXPERIENCE_SYSTEM_MESSAGE },
        { role: "user", content: userMessage },
      ],
    });

    const aiResponse = completion.choices[0].message.content;

    console.log("AI response:", aiResponse);

    if (!aiResponse) {
      throw new Error(
        "AI response is empty. Please ensure the input data is complete and try again.",
      );
    }

    const startDateString = aiResponse.match(
      /Start date: (\d{4}-\d{2}-\d{2})/,
    )?.[1];
    const endDateString = aiResponse.match(
      /End date: (\d{4}-\d{2}-\d{2})/,
    )?.[1];

    return {
      position: aiResponse.match(/Job title: (.*)/)?.[1] || "",
      company: aiResponse.match(/Company: (.*)/)?.[1] || "",
      description: (
        aiResponse.match(/Description:([\s\S]*)/)?.[1] || ""
      ).trim(),
      startDate: startDateString ? new Date(startDateString) : undefined,
      endDate: endDateString ? new Date(endDateString) : undefined,
    } satisfies WorkExperienceItem;
  } catch (e) {
    throw new Error(
      e instanceof Error
        ? e.message
        : "Failed to generate work experience. Please try again later.",
    );
  }
}
