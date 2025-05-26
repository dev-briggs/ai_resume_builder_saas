import React, { createContext, useContext, useEffect, useState } from "react";
import { ResumeSchema } from "@/schema/resume";
import { generalInfoDefaultValues } from "@/schema/general-info";
import { personalInfoDefaultValues } from "@/schema/personal-info";
import { workExperienceDefaultValues } from "@/schema/work-experience";
import { educationDefaultValues } from "@/schema/education";
import { skillDefaultValues } from "@/schema/skill";
import { summaryDefaultValues } from "@/schema/summary";

export type ResumeContextType = {
  resumeData: ResumeSchema;
  setResumeData: (data: ResumeSchema) => void;
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export type ResumeProviderProps = {
  resumeToEdit: ResumeSchema | null;
  children: React.ReactNode;
};

export const ResumeProvider: React.FC<ResumeProviderProps> = ({
  resumeToEdit,
  children,
}) => {
  const resumeDataDefaultValue = {
    ...generalInfoDefaultValues,
    ...personalInfoDefaultValues,
    ...workExperienceDefaultValues,
    ...educationDefaultValues,
    ...skillDefaultValues,
    ...summaryDefaultValues,
  };
  const [resumeData, setResumeData] = useState<ResumeSchema>(
    resumeToEdit ? resumeToEdit : resumeDataDefaultValue,
  );

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
