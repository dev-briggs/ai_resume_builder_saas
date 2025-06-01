import React from "react";
import { useResumeEditorContext } from "@/components/ResumeEditor";
import ResumePreview from "../ResumePreview";
import ColorPicker from "@/components/ui/color-picker";
import { cn } from "@/lib/utils";
import BorderStyleSelector from "./BorderStyleSelector";

export type ResumePreviewSectionProps = {
  className?: string;
};

export default function ResumePreviewSection({
  className,
}: ResumePreviewSectionProps) {
  const { resumeData, setResumeData } = useResumeEditorContext();
  const { colorHex, borderStyle } = resumeData;

  return (
    <div
      className={cn(
        "group relative hidden w-full",
        "md:flex md:w-1/2",
        className,
      )}
    >
      <div
        className={cn(
          "absolute top-1 left-1 flex flex-none flex-col gap-3 opacity-50",
          "lg:top-3 lg:left-3",
          "xl:opacity-100",
          "group-hover:opacity-100",
        )}
      >
        <ColorPicker
          color={colorHex}
          onChange={(color) =>
            setResumeData({ ...resumeData, colorHex: color.hex })
          }
        />
        <BorderStyleSelector
          borderStyle={borderStyle}
          onChange={(borderStyle) =>
            setResumeData({ ...resumeData, borderStyle })
          }
        />
      </div>
      <div className="bg-secondary flex w-full justify-center overflow-y-auto p-3">
        <ResumePreview resumeData={resumeData} className="max-w-2xl shadow-md" />
      </div>
    </div>
  );
}
