"use client";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { DatePicker } from "antd";
import { CalendarOutlined } from "@ant-design/icons"; // Ant Design Calendar Icon
import { ConfigProvider } from "antd"; // Import ConfigProvider to customize the theme

const MyFormDatePicker = ({
  name,
  label,
  labelClassName,
  inputClassName,
  value,
  onValueChange,
}: {
  name: string;
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
  value?: string | Date | null;
  onValueChange?: (newValue: string | Date | null) => void;
}) => {
  const { control, setValue } = useFormContext();

  // Watch the input field's value
  const inputValue = useWatch({
    control,
    name,
  });

  useEffect(() => {
    setValue(name, value, { shouldValidate: false });
  }, [value, name, setValue]);

  useEffect(() => {
    if (onValueChange) {
      onValueChange(inputValue);
    }
  }, [inputValue, onValueChange]);

  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#FCC734", // Set your primary color here
            colorBorder: "#FCC734", // Example for border color (optional)
          },
        }}
      >
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className="flex flex-col justify-center w-full">
              {label && (
                <p
                  className={cn(
                    "ps-1 mb-2 text-text_color text-base font-normal leading-6",
                    labelClassName
                  )}
                >
                  {label}
                </p>
              )}
              <div className="relative">
                {/* Ant Design DatePicker */}
                <DatePicker
                  {...field}
                  value={field.value ? field.value : null}
                  onChange={(date) => field.onChange(date)}
                  placeholder="Select Date"
                  style={{ border: " 1px solid 	#B8B8B8" }}
                  className={cn(
                    "w-full px-3 py-2 border rounded-lg text-text_color focus:ring-2 focus:ring-primary focus:outline-none",
                    inputClassName
                  )}
                  suffixIcon={<CalendarOutlined className="text-primary" />}
                />
              </div>
              {error && <small style={{ color: "red" }}>{error.message}</small>}
            </div>
          )}
        />
      </ConfigProvider>
    </div>
  );
};

export default MyFormDatePicker;
