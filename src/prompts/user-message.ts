import { generateSummarySchema, GenerateSummarySchema } from "@/schema/summary";
import { GenerateWorkExperienceSchema } from "@/schema/work-experience";

export function generateSummaryUserMessage({
  jobTitle,
  workExperiences,
  educations,
  skills,
}: {
  jobTitle: GenerateSummarySchema["jobTitle"];
  workExperiences: GenerateSummarySchema["workExperiences"];
  educations: GenerateSummarySchema["educations"];
  skills: GenerateSummarySchema["skills"];
}) {
  return `
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
}

export function generateWorkExperienceUserMessage(
  description: GenerateWorkExperienceSchema["description"],
) {
  return `
    Please provide a work experience entry from this description:
    ${description}
    `;
}
