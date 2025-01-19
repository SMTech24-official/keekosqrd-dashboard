/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";
import { Checkbox } from "antd";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";

const MyFormCheckbox = ({
  name,
  label,
  labelClassName,
  checkboxClassName,
  checkBoxText,
  value = false,
  onValueChange,
}: {
  name: string;
  label?: string;
  checkBoxText: string;
  labelClassName?: string;
  checkboxClassName?: string;
  value?: boolean;
  onValueChange?: (newValue: boolean) => void;
}) => {
  const { setValue, control } = useFormContext();

  // Watch the checkbox field's value
  const checkboxValue = useWatch({
    control,
    name,
  });

  useEffect(() => {
    setValue(name, value, { shouldValidate: false });
  }, [value, name, setValue]);

  useEffect(() => {
    if (onValueChange) {
      onValueChange(checkboxValue);
    }
  }, [checkboxValue, onValueChange]);

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
            <Checkbox
              {...field}
              checked={checkboxValue}
              onChange={(e) => field.onChange(e.target.checked)}
              className={cn(checkboxClassName)}
            >
              {checkBoxText}
            </Checkbox>
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </div>
        )}
      />
    </div>
  );
};

export default MyFormCheckbox;
