import React from "react";
import { useResumeContext } from "../context";
import ResumePreview from "../ResumePreview";
import ColorPicker from "@/components/ui/color-picker";
import { cn } from "@/lib/utils";

export default function ResumePreviewSection() {
  const { resumeData, setResumeData } = useResumeContext();
  const { colorHex } = resumeData;

  return (
    <div className="relative hidden w-1/2 md:flex">
      <div
        className={cn(
          "absolute top-1 left-1 flex flex-none flex-col gap-3",
          "lg:top-3 lg:left-3",
        )}
      >
        <ColorPicker
          color={colorHex}
          onChange={(color) =>
            setResumeData({ ...resumeData, colorHex: color.hex })
          }
        />
      </div>
      <div className="bg-secondary flex w-full justify-center overflow-y-auto p-3">
        <ResumePreview className="max-w-2xl shadow-md" />
      </div>
    </div>
  );
}
