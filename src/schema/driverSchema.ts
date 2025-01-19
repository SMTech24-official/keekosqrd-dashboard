import { z } from "zod";
import dayjs from "dayjs";

export const driverSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Driver name must be at least 2 characters long" })
    .max(50, { message: "Driver name must be less than 50 characters" }),
  phone: z
    .string()
    .regex(/^\d+$/, { message: "Phone number must contain only digits" })
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number must be no more than 15 digits" }),
  date: z
    .any()
    .refine(
      (val) => {
        if (val && dayjs(val).isValid()) {
          return true; // If it's a valid Dayjs object or Date object
        }
        return false;
      },
      {
        message: "Invalid start date",
      }
    )
    .transform((val) => dayjs(val).toDate()), // Convert Dayjs to Date
  driverImage: z
    .instanceof(File)
    .refine((file) => file.type.startsWith("image/"), {
      message: "The file must be an image (JPG, PNG, etc.)",
    })
    .optional(),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});
