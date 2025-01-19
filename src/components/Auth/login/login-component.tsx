/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import { useAppDispatch } from "@/redux/hooks";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import AuthLayout from "../AuthLayout";
import { useLoginMutation } from "@/redux/features/auth/authApi";

const validationSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  password: z.string({ required_error: "Password is required" }),
});

const LoginComponent = () => {
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const router = useRouter();

  const handleSubmit = async (formData: any) => {
    const res = await handleAsyncWithToast(
      async () => login(formData),
      "Logging in...",
      "Login successful!",
      "Login failed. Please try again.",
      true,
      dispatch,
      "/dashboard",
      router
    );

    console.log(res)
  };

  return (
    <div>
      <AuthLayout>
        <div className="w-full max-w-3xl px-5 mt-24 md:mt-0">
          <p className="text-base font-normal mb-2">We missed you</p>
          <h5 className="text-3xl font-bold mb-10">
            <span className="text-default">Welcome</span> back!
          </h5>
          <MyFormWrapper
            className="flex flex-col gap-6 w-full"
            onSubmit={handleSubmit}
            resolver={zodResolver(validationSchema)}
          >
            <div className="w-full">
              <MyFormInput
                label="Email"
                labelClassName="mb-1 text-xs font-medium"
                name="email"
                placeHolder="Email"
                value={"admin@test.com"}
              />
            </div>
            <div className="w-full">
              <MyFormInput
                label="Password"
                labelClassName="mb-1 text-xs font-medium"
                name="password"
                isPassword
                placeHolder="Password"
                value={"12345678"}
              />
            </div>
            <div className="flex items-center justify-end gap-2 text-xs font-medium">
              <Link href="/forgot-password" className="text-[#5F7992]">
                Forgot Password?
              </Link>
              
            </div>
            <Button
              className="w-fit mx-auto py-3 rounded-lg bg-grey text-default text-base font-normal leading-6 mb-5"
              type="submit"
            >
              Login
            </Button>
            
          </MyFormWrapper>
        </div>
      </AuthLayout>
    </div>
  );
};

export default LoginComponent;
