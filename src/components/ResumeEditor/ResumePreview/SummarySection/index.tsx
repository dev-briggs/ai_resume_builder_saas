import React from "react";
import { useResumePreviewContext } from "@/components/ResumeEditor/ResumePreview";

export default function SummarySection() {
  const { resumeData } = useResumePreviewContext();
  const { summary, colorHex } = resumeData;
  return (
    <>
      <hr className="border-2" style={{ borderColor: colorHex }} />
      <div className="break-inside-avoid space-y-3">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>
          Professional Profile
        </p>
        <div className="text-sm wrap-break-word whitespace-pre-line">
          {summary}
        </div>
      </div>
    </>
  );
}
