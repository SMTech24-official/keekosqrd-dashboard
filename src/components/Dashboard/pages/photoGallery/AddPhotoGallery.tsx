/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DragAndDropImageUpload from "@/components/ui/DnDInput";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import { useAddCommunityMutation } from "@/redux/features/community/CommunityApi";
import { photogallerySchema } from "@/schema/driverSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function AddPhotoGallery() {
  const router = useRouter();
  const [addCommunityFn] = useAddCommunityMutation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    console.log("Form submitted", data);
    const formData = new FormData();

    // Append the form data to FormData object
    formData.append("product_name", data.name);
    formData.append("brand", data.brand_name);
    formData.append("model", data.model);
    formData.append("description", data.description);

    // Only append the product image if it is provided
    if (data.productImage) {
      formData.append("product_image", data.productImage);
    }

    // console.log("fo")
    try {
      // Call the API to add product
      const { data: res, error } = await addCommunityFn(formData);

      // If successful, redirect or show a success message
      if (res) {
        console.log("Community added successfully:", res);
        toast.success("Community added successfully");
        router.push("/community");
      }

      // Handle errors if any
      if (error) {
        console.log("Error adding product:", error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <h1 className="text-2xl font-medium py-3 text-default">
        Add New Community
      </h1>
      <MyFormWrapper
        onSubmit={handleSubmit}
        resolver={zodResolver(photogallerySchema)}
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
          <DragAndDropImageUpload
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
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </MyFormWrapper>
    </div>
  );
}
