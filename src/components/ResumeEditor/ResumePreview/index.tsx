import { cn } from "@/lib/utils";
import React, { createContext, useContext, useRef } from "react";
import useDimensions from "@/hooks/useDimensions";
import PersonalInfoHeader from "./PersonalInfoHeader";
import SummarySection from "./SummarySection";
import WorkExperienceSection from "./WorkExperienceSection";
import EducationSection from "./EducationSection";
import SkillSection from "./SkillSection";
import { ResumeSchema } from "@/schema/resume";

export type ResumePreviewContextType = {
  resumeData: ResumeSchema;
};

const ResumePreviewContext = createContext<
  ResumePreviewContextType | undefined
>(undefined);

export const useResumePreviewContext = () => {
  const context = useContext(ResumePreviewContext);
  if (!context) {
    throw new Error(
      "useResumePreviewContext must be used within a ResumePreview component",
    );
  }
  return context;
};

export type ResumePreviewProps = {
  resumeData: ResumeSchema;
  className?: string;
};

export default function ResumePreview({
  resumeData,
  className,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  return (
    <ResumePreviewContext.Provider value={{ resumeData }}>
      <div
        className={cn(
          "h-fit w-full bg-white text-black",
          "aspect-[210/297]", // aspect ratio of a sheet of A4 paper in mm
          className,
        )}
        ref={containerRef}
      >
        <div
          className={cn("space-y-6 p-6", !width && "invisible")}
          style={{
            zoom:
              (1 / 794) * // number of pixels for 210mm
              width,
          }}
        >
          <PersonalInfoHeader />
          <SummarySection />
          <WorkExperienceSection />
          <EducationSection />
          <SkillSection />
        </div>
      </div>
    </ResumePreviewContext.Provider>
  );
}
