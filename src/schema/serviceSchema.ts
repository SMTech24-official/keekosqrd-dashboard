import * as z from "zod";

export const serviceSchema = z.object({
  serviceName: z
    .string()
    .nonempty("Service Name is required.")
    .min(3, "Service Name must be at least 3 characters."),

  largeCarPrice: z
    .string()
    .refine((value) => !isNaN(Number(value)), "Price must be a valid number")
    .transform((value) => parseFloat(value)),
  smallCarPrice: z
    .string()
    .refine((value) => !isNaN(Number(value)), "Price must be a valid number")
    .transform((value) => parseFloat(value)),
  duration: z
    .string()
    .nonempty("Duration is required.")
    .regex(
      /^[0-9]+(-[0-9]+)?\s?(Minutes|Hours)$/i,
      "Duration must be in the format '15-20 Minutes' or '2 Hours'."
    ),
  availableTimes: z
    .array(z.string())
    .min(1, "At least one available time is required"),
  serviceImage: z
    .instanceof(File)
    .refine((file) => file.type.startsWith("image/"), {
      message: "The file must be an image (JPG, PNG, etc.)",
    })
    .optional(), // Optional field for image
});


// {
//   "serviceName": "Dashboard cleaning",
//   "largeCarPrice": 55,
//   "smallCarPrice": 50,
//   "duration": "50-60 minutes",
//   "availableTimes": ["09:00am", "10:00am"]
// }