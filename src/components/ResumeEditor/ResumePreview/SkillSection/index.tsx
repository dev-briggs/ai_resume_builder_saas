import React from "react";
import { useResumeContext } from "../../context";
import { Badge } from "@/components/ui/badge";

export default function SkillSection() {
  const { resumeData } = useResumeContext();
  const { skills } = resumeData;

  if (!skills?.length) return null;

  return (
    <>
      <hr className="border-2" />
      <div className="break-inside-avoid space-y-3">
        <p className="text-lg font-semibold">Skills</p>
        <div className="flex break-inside-avoid flex-wrap gap-2">
          {skills.map((skill, i) => (
            <Badge key={i} className="rounded-md bg-black text-white">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
}
