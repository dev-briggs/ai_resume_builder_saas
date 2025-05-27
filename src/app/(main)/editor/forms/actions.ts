"use server";

import openai from "@/lib/openai";
import { generateSummarySchema, GenerateSummarySchema } from "@/schema/summary";

export async function generateSummary(input: GenerateSummarySchema) {
  // TODO: Block for non-premium users
  const { jobTitle, workExperiences, educations, skills } =
    generateSummarySchema.parse(input);

  const systemMessage = `
  TASK:
  Your task is to write a professional introduction summary for a job resume based on the provided information.

  CONTEXT:
  You are a job resume generator AI.

  REQUIREMENTS:
  The summary should be concise, engaging, and tailored to highlight the candidate's qualifications and experiences relevant to the job title.
  Only return the summary text without any additional explanations or formatting.
  The summary should be written in a professional tone, suitable for a job application.
  `;

  const userMessage = `
  Please generate a professional introduction summary for a job resume based on the following information.
  
    Job Title: ${jobTitle || "N/A"}

    Work Experiences: 
    ${
      workExperiences
        ? workExperiences
            .map(
              (exp) => `
          Position: ${exp.position || "N/A"} at ${exp.company || "N/A"} from ${exp.startDate || "N/A"} to ${exp.endDate || "Present"}
          
          Description: ${exp.description || "N/A"}
            `,
            )
            .join("\n\n")
        : "None"
    }

    Education: 
    ${
      educations
        ? educations
            .map(
              (edu) => `
        Degree: ${edu.degree || "N/A"} at ${edu.school || "N/A"} from ${edu.startDate || "N/A"} to ${edu.endDate || "N/A"}
        `,
            )
            .join("\n\n")
        : "None"
    }

    Skills:
    ${
      skills && skills.length > 0
        ? skills.map((skill) => `- ${skill}`).join("\n")
        : "None"
    }
  `;

  console.log("systemMessage:", systemMessage);
  console.log("userMessage:", userMessage);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: userMessage },
      ],
    });

    const aiResponse = completion.choices[0].message.content;

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
