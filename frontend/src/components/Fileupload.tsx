import React from "react";
import { BsUpload } from "react-icons/bs";
export default function FileUpload({
  fileInputRef,
  handleFileChange,
}: {
  fileInputRef: React.RefObject<HTMLInputElement|null>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <BsUpload
        onClick={() => fileInputRef.current?.click()}
        className="self-center absolute right-0 bottom-17 w-1/4 h-7 transition-all opacity-60 hover:opacity-100 hover:scale-110"
      />
    </>
  );
}