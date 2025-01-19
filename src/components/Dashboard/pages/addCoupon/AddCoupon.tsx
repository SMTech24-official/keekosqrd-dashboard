/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import { Button } from "@nextui-org/react";
import MyFormDatePicker from "@/components/ui/MyForm/MyFormDatePicker/MyFormDatePicker";
import MyFormCheckbox from "@/components/ui/MyForm/MyFormCheckbox/MyFormCheckbox";
import { couponSchema } from "@/schema/couponSchema";
import {
  useAddCouponMutation,
  useGetAllCouponQuery,
} from "@/redux/features/coupon/couponApi";
import { toast } from "sonner";

export default function AddDriver() {
  const [addCoupon, { isLoading }] = useAddCouponMutation();
  const { data: couponData, isLoading: isCouponLoading } = useGetAllCouponQuery(
    {}
  );
  if (isLoading || isCouponLoading) {
    return <div>Loading.....</div>;
  }

  console.log(couponData);

  const handleSubmit = async (formData: any, reset: () => void) => {
    console.log(formData);

    try {
      await addCoupon(formData);
      console.log("Formdata", formData);
      toast.success("Coupon created");
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <h1 className="text-2xl font-medium py-3">Add New coupon</h1>
      <MyFormWrapper
        onSubmit={handleSubmit}
        resolver={zodResolver(couponSchema)}
        className="space-y-6 mt-4"
      >
        <div className="grid grid-cols-1 gap-6 text-start">
          <div className="grid gap-6 col-span-1 sm:col-span-3 text-start">
            <div className="space-y-2">
              <MyFormInput
                inputClassName="text-black"
                name="couponCode"
                label="Generate New Coupon"
                type="text"
                placeHolder="VZM96BN21"
              />
            </div>
            <div className="space-y-2">
              <MyFormInput
                inputClassName="text-black"
                name="percentage"
                label="Discount Percentage Number "
                type="number"
                placeHolder="40"
              />
            </div>
            <div className="space-y-2">
              <MyFormDatePicker
                name="expiryDate"
                label="Join Date"
                labelClassName="text-black"
                value={null}
                onValueChange={(newValue) =>
                  console.log("Date changed:", newValue)
                }
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-3">
          <div className="space-y-2">
            {/* {it will be optional} */}
            <MyFormCheckbox
              name="firstTimeUser"
              checkBoxText="For First Time User"
              onValueChange={(newValue) =>
                console.log("Checkbox value changed:", newValue)
              }
            />
          </div>
          <Button
            className="bg-primary rounded-full text-base font-light  py-[25px] text-white"
            type="submit"
          >
            Generate Coupon
          </Button>
        </div>
      </MyFormWrapper>
    </div>
  );
}
