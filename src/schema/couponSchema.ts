import { z } from "zod";
import dayjs from "dayjs";

export const couponSchema = z.object({
  couponCode: z
    .string()
    .min(1, { message: "Coupon name is required" })
    .max(50, { message: "Coupon name should be less than 50 characters" }),

  percentage: z
    .string() // Expecting a string input for discount (e.g., "40" or "40%")
    .refine(
      (val) => {
        // Check if it's a valid percentage value
        const numVal = parseFloat(val);
        return !isNaN(numVal) && numVal >= 0 && numVal <= 100; // Make sure it’s between 0 and 100
      },
      {
        message: "Discount must be a number between 0 and 100",
      }
    )
    .transform((val) => {
      // Convert string to number and remove any non-numeric characters (like "%")
      return parseFloat(val.replace("%", ""));
    }),

  expiryDate: z
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

  newUser: z.boolean().optional(), // Optional checkbox (for first-time users)
});
