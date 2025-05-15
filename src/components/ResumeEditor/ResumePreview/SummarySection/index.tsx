import React from "react";
import { useResumeContext } from "../../context";

export default function SummarySection() {
  const { resumeData } = useResumeContext();
  const { summary, colorHex } = resumeData;
  return (
    <>
      <hr className="border-2" style={{ borderColor: colorHex }} />
      <div className="break-inside-avoid space-y-3">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>
          Professional Profile
        </p>
        <div className="text-sm whitespace-pre-line">{summary}</div>
      </div>
    </>
  );
}
