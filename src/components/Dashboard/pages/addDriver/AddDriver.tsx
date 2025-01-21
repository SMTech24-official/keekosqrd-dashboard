/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import { Button } from "@nextui-org/react";
import DnDInput from "@/components/ui/DnDInput";
import { driverSchema } from "@/schema/driverSchema"; // Import your Zod schema
import { useRouter } from "next/navigation";
import { useAddProductMutation } from "@/redux/features/products/productsApi"; // API hook for adding product
import { toast } from "sonner";

export default function AddProduct() {
  const router = useRouter();
  const [addProductFn] = useAddProductMutation();

  const handleSubmit = async (data: any) => {
    console.log("Form submitted", data);
    const formData = new FormData();

    // Append the form data to FormData object
    formData.append("product_name", data.name);
    formData.append("brand_name", data.brand_name);
    formData.append("model", data.model);
    formData.append("size", data.size);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("status", data.status);

    // Only append the product image if it is provided
    if (data.productImage && data.productImage[0]) {
      formData.append("product_image", data.productImage[0]);
    }

    // console.log("fo")
    try {
      // Call the API to add product
      const { data: res, error } = await addProductFn(formData);

      // If successful, redirect or show a success message
      if (res) {
        console.log("Product added successfully:", res);
        toast.success("Product added successfully");
        router.push("/product-management");
      }

      // Handle errors if any
      if (error) {
        console.log("Error adding product:", error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <h1 className="text-2xl font-medium py-3 text-default">
        Add New Product
      </h1>
      <MyFormWrapper
        onSubmit={handleSubmit}
        resolver={zodResolver(driverSchema)}
        className="space-y-6 mt-4"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-start">
          <div className="space-y-2">
            <MyFormInput
              inputClassName="text-text_color"
              name="name"
              label="Product Name"
              type="text"
              placeHolder="Enter product name"
            />
          </div>

          <div className="space-y-2">
            <MyFormInput
              inputClassName="text-text_color"
              name="brand_name"
              label="Brand Name"
              type="text"
              placeHolder="Enter brand name"
            />
          </div>

          <div className="space-y-2">
            <MyFormInput
              inputClassName="text-text_color"
              name="model"
              label="Model"
              type="text"
              placeHolder="Enter model"
            />
          </div>

          <div className="space-y-2">
            <MyFormInput
              inputClassName="text-text_color"
              name="size"
              label="Size"
              type="text"
              placeHolder="Enter size"
            />
          </div>

          <div className="space-y-2">
            <MyFormInput
              inputClassName="text-text_color"
              name="price"
              label="Price"
              type="text"
              placeHolder="Enter price"
            />
          </div>

          <div className="space-y-2">
            <MyFormInput
              name="status"
              label="Status"
              isDropdown={true}
              dropdownOptions={[
                { label: "true", value: "true" },
                { label: "false", value: "false" },
              ]}
              value="true"
            />
          </div>

          {/* Updated Description field to a Textarea */}
          <div className="space-y-2">
            <MyFormInput
              inputClassName="text-text_color"
              name="description"
              label="Description"
              placeHolder="Enter product description"
            />
          </div>
        </div>

        <div className="col-span-1">
          <DnDInput
            width="w-full"
            name="productImage"
            label="Product Image"
            acceptedTypes="image"
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button
            className="bg-white text-base font-light rounded-full py-[25px] text-text_color border"
            type="reset"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            className="bg-grey rounded-full text-base font-light py-[25px] text-default"
            type="submit"
          >
            Save
          </Button>
        </div>
      </MyFormWrapper>
    </div>
  );
}
