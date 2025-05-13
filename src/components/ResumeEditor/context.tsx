import React, { createContext, useContext, useState } from "react";
import { ResumeSchema } from "@/schema/resume";
import { generalInfoDefaultValues } from "@/schema/general-info";
import { personalInfoDefaultValues } from "@/schema/personal-info";
import { workExperienceDefaultValues } from "@/schema/work-experience";
import { educationDefaultValues } from "@/schema/education";

export type ResumeContextType = {
  resumeData: ResumeSchema;
  setResumeData: (data: ResumeSchema) => void;
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [resumeData, setResumeData] = useState<ResumeSchema>({
    ...generalInfoDefaultValues,
    ...personalInfoDefaultValues,
    ...workExperienceDefaultValues,
    ...educationDefaultValues,
  });

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResumeContext must be used within a ResumeProvider");
  }
  return context;
};
