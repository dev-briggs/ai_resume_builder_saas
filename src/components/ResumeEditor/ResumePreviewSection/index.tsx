import React from "react";
import { useResumeContext } from "../context";
import ResumePreview from "../ResumePreview";

export default function ResumePreviewSection() {
  const { resumeData, setResumeData } = useResumeContext();

  return (
    <div className="hidden w-1/2 md:flex">
      <div className="bg-secondary flex w-full justify-center overflow-y-auto p-3">
        <ResumePreview className="max-w-2xl shadow-md" />
      </div>
    </div>
  );
}
