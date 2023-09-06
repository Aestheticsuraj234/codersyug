"use client";

import { FileIcon, X } from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthings";
import "@uploadthing/react/styles.css";

interface FileUploadProps {
  onChange: (value: string) => void;
  value: string;
  endpoint: "serverImage" | "messageFile";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const handleFileRemove = () => {
    onChange("");
  };

  // Ensure that value is a non-nullable string by providing a default empty string
  const imageUrl = value || "";

  if (imageUrl) {
    // Render the image if the endpoint is "messageFile"
    return (
      <div className="relative h-20 w-20">
        <Image
          src={imageUrl}
          alt="Upload"
          className="rounded-full"
          width={80} // Set the width and height according to your requirements.
          height={80}
        />
        <button
          onClick={handleFileRemove}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  // Render the UploadDropzone if the endpoint is "imageUpload"
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url || ""); // Provide a default empty string if URL is undefined
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};
