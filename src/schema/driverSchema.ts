import { z } from "zod";

// Define the updated product schema
export const driverSchema = z.object({
  name: z.string().nonempty({ message: "Product name is required" }),
  brand_name: z.string().nonempty({ message: "Brand name is required" }),
  model: z.string().nonempty({ message: "Model is required" }),
  size: z.string().nonempty({ message: "Size is required" }),
  price: z.string().nonempty({ message: "Price is required" }), 
  description: z.string().optional(), 
  status: z.enum(["true", "false"]).optional(),
  productImage: z
    .instanceof(File)
    .refine((file) => file.type.startsWith("image/"), {
      message: "The file must be an image (JPG, PNG, etc.)",
    })
    .optional(), // Optional in case no image is provided
});


// Define the updated product schema
export const photogallerySchema = z.object({
  name: z.string().nonempty({ message: "Product name is required" }),
  brand_name: z.string().nonempty({ message: "Brand name is required" }),
  model: z.string().nonempty({ message: "Model is required" }),
  description: z.string().optional(), 
  status: z.enum(["true", "false"]).optional(), 
  productImage: z
    .instanceof(File)
    .refine((file) => file.type.startsWith("image/"), {
      message: "The file must be an image (JPG, PNG, etc.)",
    })
    .optional(), // Optional in case no image is provided
});

