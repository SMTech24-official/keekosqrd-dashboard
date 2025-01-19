/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import auth from "@/assets/loginBAnner.jpg";
import Image from "next/image";
import React from "react";

const AuthLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="grid md:grid-cols-2 w-full h-screen">
      <div className="hidden h-screen md:block">
        <Image src={auth} alt="image" className="w-full h-full object-cover"/>
      </div>
      <div className="flex justify-center items-center h-full w-full ">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
