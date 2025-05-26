import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import { useResumeContext } from "../context";
import useDimensions from "@/hooks/useDimensions";
import PersonalInfoHeader from "./PersonalInfoHeader";
import SummarySection from "./SummarySection";
import WorkExperienceSection from "./WorkExperienceSection";
import EducationSection from "./EducationSection";
import SkillSection from "./SkillSection";

export type ResumePreviewProps = {
  className?: string;
};

export default function ResumePreview({ className }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resumeData } = useResumeContext();
  const { width } = useDimensions(containerRef);

  return (
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
        <pre>{JSON.stringify(resumeData, null, 2)}</pre>
        <PersonalInfoHeader />
        <SummarySection />
        <WorkExperienceSection />
        <EducationSection />
        <SkillSection />
      </div>
    </div>
  );
}
