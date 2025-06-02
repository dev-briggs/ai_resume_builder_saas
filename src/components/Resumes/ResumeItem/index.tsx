"use client";

import React, { useRef } from "react";
import { ResumeServerData } from "@/schema/resume";
import Link from "next/link";
import { formatDate } from "date-fns";
import { useReactToPrint } from "react-to-print";

import { timestampDateFormat } from "@/constants/date";
import ResumePreview from "@/components/ResumeEditor/ResumePreview";
import { mapServerToClientResumeValues } from "@/lib/utils";
import { MoreMenu } from "./MoreMenu";

export type ResumeItemProps = {
  resume: ResumeServerData;
};

export default function ResumeItem({ resume }: ResumeItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: resume.title || "Untitled Resume",
  });
  const wasUpdated = resume.updatedAt !== resume.createdAt;
  return (
    <div className="group hover:border-border bg-secondary relative rounded-lg border border-transparent p-3 transition-colors">
      <div className="space-y-3">
        <Link
          href={`/editor?resumeId=${resume.id}`}
          className="inline-block w-full text-center"
        >
          <p className="line-clamp-1 font-semibold">
            {resume.title || "Untitled Resume"}
          </p>
          {resume.description && (
            <p className="line-clamp-2 text-sm">{resume.description}</p>
          )}
          <p className="text-muted-foreground text-xs">
            {wasUpdated ? "Updated" : "Created"} on{" "}
            {formatDate(resume.updatedAt, timestampDateFormat)}
          </p>
        </Link>
        <Link
          href={`/editor?resumeId=${resume.id}`}
          className="relative inline-block w-full"
        >
          <ResumePreview
            resumeData={mapServerToClientResumeValues(resume)}
            className="overflow-hidden shadow-sm transition-shadow group-hover:shadow-lg"
            contentRef={contentRef}
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </Link>
      </div>
      <MoreMenu resumeId={resume.id} onPrintClick={reactToPrintFn} />
    </div>
  );
}
