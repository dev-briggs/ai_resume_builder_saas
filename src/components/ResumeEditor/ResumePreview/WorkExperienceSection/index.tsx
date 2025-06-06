import React from "react";
import { format } from "date-fns";
import { useResumePreviewContext } from "@/components/ResumeEditor/ResumePreview";
import { previewDateFormat } from "@/constants/date";

export default function WorkExperienceSection() {
  const { resumeData } = useResumePreviewContext();
  const { workExperiences, colorHex } = resumeData;
  const hasWorkExperience = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0,
  );

  if (!hasWorkExperience?.length) return null;

  return (
    <>
      <hr className="border-2" style={{ borderColor: colorHex }} />
      <div className="space-y-3">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>
          Work Experience
        </p>
        {hasWorkExperience.map((exp, i) => {
          const { company, description, position, startDate, endDate } = exp;
          return (
            <div key={i} className="break-inside-avoid space-y-1">
              <div
                className="flex items-center justify-between text-sm font-semibold"
                style={{ color: colorHex }}
              >
                <span>{position}</span>
                {startDate && (
                  <span>
                    {format(startDate, previewDateFormat)} -{" "}
                    {endDate ? format(endDate, previewDateFormat) : "Present"}
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold">{company}</p>
              <div className="text-xs whitespace-pre-line">{description}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
