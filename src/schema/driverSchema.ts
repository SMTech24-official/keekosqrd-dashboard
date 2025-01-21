import { z } from "zod";

// Define the updated product schema
export const driverSchema = z.object({
  name: z.string().nonempty({ message: "Product name is required" }),
  brand_name: z.string().nonempty({ message: "Brand name is required" }),
  model: z.string().nonempty({ message: "Model is required" }),
  size: z.string().nonempty({ message: "Size is required" }),
  price: z.string().nonempty({ message: "Price is required" }), // Keep as string if necessary
  description: z.string().optional(), // Optional as it's missing in the console log
  status: z.enum(["true", "false"]).optional(), // Optional as it's missing in the console log
  productImage: z
    .instanceof(File)
    .refine((file) => file.type.startsWith("image/"), {
      message: "The file must be an image (JPG, PNG, etc.)",
    })
    .optional(), // Optional in case no image is provided
});

