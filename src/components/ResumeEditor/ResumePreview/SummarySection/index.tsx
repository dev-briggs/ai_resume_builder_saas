import React from "react";
import { useResumeContext } from "../../context";

export default function SummarySection() {
  const { resumeData } = useResumeContext();
  const { summary } = resumeData;
  return (
    <>
      <hr className="border-2" />
      <div className="break-inside-avoid space-y-3">
        <p className="text-lg font-semibold">Professional Summary</p>
        <div className="text-sm whitespace-pre-line">{summary}</div>
      </div>
    </>
  );
}
