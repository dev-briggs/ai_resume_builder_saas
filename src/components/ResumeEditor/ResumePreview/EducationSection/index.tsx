import React from "react";
import { format } from "date-fns";
import { useResumePreviewContext } from "@/components/ResumeEditor/ResumePreview";
import { previewDateFormat } from "@/constants/date";

export default function EducationSection() {
  const { resumeData } = useResumePreviewContext();
  const { educations, colorHex } = resumeData;
  const hasEducation = educations?.filter(
    (educ) => Object.values(educ).filter(Boolean).length > 0,
  );
  if (!hasEducation?.length) return null;

  return (
    <>
      <hr className="border-2" style={{ borderColor: colorHex }} />
      <div className="space-y-3">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>
          Education
        </p>
        {hasEducation.map((educ, i) => {
          const { degree, school, startDate, endDate } = educ;
          return (
            <div key={i} className="break-inside-avoid space-y-1">
              <div
                className="flex items-center justify-between text-sm font-semibold"
                style={{ color: colorHex }}
              >
                <span>{degree}</span>
                {startDate && (
                  <span>
                    {format(startDate, previewDateFormat)}
                    {endDate ? `- ${format(endDate, previewDateFormat)}` : ""}
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold">{school}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
