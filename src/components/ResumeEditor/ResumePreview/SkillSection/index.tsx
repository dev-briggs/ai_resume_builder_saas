import React, { useMemo } from "react";
import { useResumeContext } from "../../context";
import { Badge } from "@/components/ui/badge";

export default function SkillSection() {
  const { resumeData } = useResumeContext();
  const { skills, colorHex, borderStyle } = resumeData;

  const borderRadius = useMemo(() => {
    switch (borderStyle) {
      case "square":
        return "0px";
      case "circle":
        return "9999px";
      default:
        return "8px";
    }
  }, [borderStyle]);

  if (!skills?.length) return null;

  return (
    <>
      <hr className="border-2" style={{ borderColor: colorHex }} />
      <div className="break-inside-avoid space-y-3">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>
          Skills
        </p>
        <div className="flex break-inside-avoid flex-wrap gap-2">
          {skills.map((skill, i) => (
            <Badge
              key={i}
              className="rounded-md bg-black text-white"
              style={{ backgroundColor: colorHex, borderRadius }}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
}
