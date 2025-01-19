/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";
import { Controller, useFormContext } from "react-hook-form";

const MyTimeSelector = ({
  name,
  label,
  options,
  labelClassName,
  buttonClassName,
  onValueChange,
}: {
  name: string;
  label?: string;
  options: string[]; // Array of time options, e.g., ["10:00AM", "11:00AM"]
  labelClassName?: string;
  buttonClassName?: string;
  onValueChange?: (newValue: string) => void;
}) => {
  const { control, setValue } = useFormContext();

  return (
    <div>
      {label && (
        <p
          className={cn(
            "ps-1 mb-2 text-[#101828] text-base font-normal leading-6",
            labelClassName
          )}
        >
          {label}
        </p>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <div className="flex flex-wrap gap-2 border border-gray-300 rounded-lg p-1">
              {options.map((time) => (
                <button
                  key={time}
                  type="button"
                  className={cn(
                    "px-4 py-1 border rounded-full text-sm transition",
                    field.value === time
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100",
                    buttonClassName
                  )}
                  onClick={() => {
                    field.onChange(time);
                    setValue(name, time, { shouldValidate: true });
                    if (onValueChange) onValueChange(time);
                  }}
                >
                  {time}
                </button>
              ))}
            </div>
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </div>
        )}
      />
    </div>
  );
};

export default MyTimeSelector;
