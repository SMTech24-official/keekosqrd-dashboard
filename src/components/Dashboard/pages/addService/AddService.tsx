/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import { Button } from "@nextui-org/react";
import DnDInput from "@/components/ui/DnDInput";
import { useRouter } from "next/navigation";
// import MyFormSelect from "@/components/ui/MyForm/MyFormSelect/MyFormSelect";
// import MyTimeSelector from "@/components/ui/MyForm/MyTimeSelector/MyTimeSelector";
// import { serviceSchema } from "@/schema/serviceSchema";
import { useAddServiceMutation } from "@/redux/features/service/service";
// import { toast } from "sonner";
import { useState } from "react";

export default function AddService() {
  const [addService, { isLoading: isServiceLoading }] = useAddServiceMutation();
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const router = useRouter();
 
  const handleTimeChange = (time: string) => {
    setAvailableTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };


  console.log("avialable time", availableTimes);

  if (isServiceLoading) {
    return <div>Loading....</div>;
  }

  const handleSubmit = async (formData: any, reset: () => void) => {
    const form = new FormData() || {};

    // Append form fields to the FormData object
    form.append("serviceName", formData.serviceName);
    form.append("largeCarPrice", formData.largeCarPrice);
    form.append("smallCarPrice", formData.smallCarPrice);
    form.append("duration", formData.duration);
    form.append("serviceImage", formData.serviceImage);
  

    availableTimes.forEach((time) => {
      form.append("availableTimes", time);
    });

    form.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    // if (availableTimes.length === 0) {
    //   toast.error("Please select at least one available time");
    //   return;
    // }
    // try {
    //   const dataToSubmit = { ...formData, availableTimes };
    //   await addService(dataToSubmit);
    //   toast.success("Service created");
    //   reset();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <h1 className="text-2xl font-medium py-3">Add New Service</h1>
      <MyFormWrapper
        onSubmit={handleSubmit}
        // resolver={zodResolver(serviceSchema)}
        className="space-y-6 mt-4"
      >
        <div className="grid grid-cols-1 gap-6 text-start">
          <div className="grid gap-6 col-span-1 sm:col-span-3 text-start">
            <div className="space-y-2">
              <MyFormInput
                inputClassName="text-black"
                name="serviceName"
                label="Service Name"
                type="text"
                placeHolder="Exterior Service"
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <MyFormInput
                  inputClassName="text-black"
                  name="largeCarPrice"
                  label="largeCarPrice"
                  type="number"
                  placeHolder="$20"
                />
              </div>
              <div className="space-y-2">
                <MyFormInput
                  inputClassName="text-black"
                  name="smallCarPrice"
                  label="smallCarPrice"
                  type="number"
                  placeHolder="$20"
                />
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <MyFormInput
                  inputClassName="text-black"
                  name="duration"
                  label="Duration"
                  type="text"
                  placeHolder="15-20 Minutes"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Available Times
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    "09:00am",
                    "10:00am",
                    "11:00am",
                    "12:00pm",
                    "01:00pm",
                    "02:00pm",
                    "03:00pm",
                  ].map((time) => (
                    <button
                      key={time}
                      type="button"
                      className={`px-3 py-2 rounded-md border ${
                        availableTimes.includes(time)
                          ? "bg-blue-500 text-white"
                          : "bg-white text-black"
                      }`}
                      onClick={() => handleTimeChange(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <DnDInput
              width="w-full"
              name="serviceImage"
              label="Upload Photo"
              acceptedTypes="image"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button
            className="bg-white text-base font-light rounded-full py-[25px] text-text_color border"
            type="reset"
            onClick={() => router.back()}
          >
            cancel
          </Button>
          <Button
            className="bg-primary rounded-full text-base font-light  py-[25px] text-white"
            type="submit"
          >
            Add Service
          </Button>
        </div>
      </MyFormWrapper>
    </div>
  );
}
