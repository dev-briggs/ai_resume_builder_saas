import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useResumePreviewContext } from "@/components/ResumeEditor/ResumePreview";

export default function PersonalInfoHeader() {
  const { resumeData } = useResumePreviewContext();
  const {
    photo,
    firstName,
    lastName,
    jobTitle,
    city,
    country,
    phone,
    email,
    colorHex,
    borderStyle,
  } = resumeData;

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    /**
     * If photo is a file, turn it into a URL
     * used useEffect to avoid creating multiple object URL and avoid memory leak
     */
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  const borderRadius = useMemo(() => {
    switch (borderStyle) {
      case "square":
        return "0px";
      case "circle":
        return "9999px";
      default:
        return "10%";
    }
  }, [borderStyle]);

  return (
    <div className="flex items-center gap-6">
      {photoSrc && (
        <Image
          src={photoSrc}
          width={100}
          height={100}
          alt="Author photo"
          className="aspect-square object-cover"
          style={{ borderRadius }}
        />
      )}
      <div className="space-y-2.5">
        <div className="space-y-1">
          <p className="text-3xl font-bold" style={{ color: colorHex }}>
            {firstName} {lastName}
          </p>
          <p className="font-medium" style={{ color: colorHex }}>
            {jobTitle}
          </p>
        </div>
        <p className="text-xs text-gray-500">
          {city}
          {city && country ? `, ${country}` : ""}
          {(city || country) && (phone || email) ? " • " : ""}
          {[phone, email].filter(Boolean).join(" • ")}
        </p>
      </div>
    </div>
  );
}
