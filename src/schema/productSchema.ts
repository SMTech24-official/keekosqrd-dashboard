import { z } from "zod";

export const productSchema = z.object({
  productImage: z
    .any()
    .refine((file) => file instanceof File || typeof file === "string", {
      message: "Product image is required and must be a valid file.",
    }),
  title: z
    .string()
    .nonempty("Product name is required")
    .max(100, "Product name cannot exceed 100 characters"),
  brandName: z
    .string()
    .nonempty("Brand name is required")
    .max(50, "Brand name cannot exceed 50 characters"),
  price: z
    .string()
    .nonempty("Price is required")
    .refine((value) => /^[0-9]+(\.[0-9]{1,2})?$/.test(value), {
      message: "Price must be a valid number (e.g., 20 or 20.50)",
    }),
  category: z
    .string()
    .nonempty("Category is required")
    .refine(
      (value) =>
        ["flower", "edibles", "vapes", "concentrates", "pre-rolls"].includes(
          value
        ),
      {
        message: "Invalid category selection",
      }
    ),
  description: z
    .string()
    .nonempty("Description is required")
    .max(500, "Description cannot exceed 500 characters"),
});
