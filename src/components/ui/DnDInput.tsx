"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { CiPower } from "react-icons/ci";

type TDragAndDropProps = {
  name: string;
  label?: string;
  acceptedTypes?: string;
  width?: string;
  parentClassName?: string;
  labelClassName?: string;
  defaultValue?: string | null;
};

const DragAndDropImageUpload = ({
  name,
  label,
  acceptedTypes = "image",
  width = "w-full",
  parentClassName = "",
  labelClassName = "",
  defaultValue = null,
}: TDragAndDropProps) => {
  const { control, setValue, resetField } = useFormContext();
  const [preview, setPreview] = useState<string | null>(defaultValue);

  const handleFileChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setValue(name, file); // Update form value
  };

  const handleRemoveImage = () => {
    setPreview(null); // Clear preview
    resetField(name); // Clear form value
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  useEffect(() => {
    if (defaultValue) {
      setPreview(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div className={`form-group ${parentClassName}`}>
      {label && (
        <Label className={`mb-2 block ${labelClassName}`}>{label}</Label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ fieldState: { error } }) => (
          <>
            <div
              className={`border-2 border-dashed rounded-lg p-6 ${width} h-[243px] flex flex-col items-center justify-center cursor-pointer relative group`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {preview ? (
                <div className="relative w-fit">
                  <Image
                    src={preview}
                    alt="Uploaded file"
                    width={180}
                    height={180}
                    className="w-36 h-36 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 border p-2 rounded-full  bg-red-100 hidden group-hover:block transition-all"
                  >
                    <Trash2 stroke="red" fill="white" />
                  </button>
                </div>
              ) : (
                <>
                  <label className="bg-primary rounded-full text-white p-2 cursor-pointer">
                    <CiPower className="min-h-8 min-w-8 bg-primary text-white" />
                    <input
                      type="file"
                      accept={acceptedTypes === "image" ? "image/*" : ".pdf"}
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleFileChange(file);
                        }
                      }}
                    />
                  </label>
                  <p className="text-sm text-center text-gray-500 mt-2">
                    Drag and drop or{" "}
                    <span className="text-primary">Choose File</span> to Upload
                  </p>
                  <p className="text-sm text-center text-[#A1A1A1]">
                    Supported Formate: Jpg, png
                  </p>
                </>
              )}
            </div>
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </>
        )}
      />
    </div>
  );
};

export default DragAndDropImageUpload;
