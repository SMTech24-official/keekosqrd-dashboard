/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const MyFormSelect = ({
  name,
  label,
  labelClassName,
  selectClassName,
  options,
  placeholder,
  value,
  onValueChange,
}: {
  name: string;
  label?: string;
  labelClassName?: string;
  selectClassName?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  value?: any;
  onValueChange?: (newValue: any) => void;
}) => {
  const { setValue, control } = useFormContext();

  // Watch the select field's value
  const selectedValue = useWatch({
    control,
    name,
  });

  useEffect(() => {
    setValue(name, value, { shouldValidate: false });
  }, [value, name, setValue]);

  useEffect(() => {
    if (onValueChange) {
      onValueChange(selectedValue); // Trigger the callback whenever the value changes
    }
  }, [selectedValue, onValueChange]);

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col justify-center w-full">
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
            <Select
              {...field}
              value={field.value || ""} // Set default value to an empty string if undefined
              onValueChange={(newValue) => field.onChange(newValue)}
            >
              <SelectTrigger className={cn("w-full", selectClassName)}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </div>
        )}
      />
    </div>
  );
};

export default MyFormSelect;
