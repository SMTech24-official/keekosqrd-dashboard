"use client";

import TopBar from "@/components/Dashboard/components/navigationBar/TopBar";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCreditCard, AiOutlineCheckSquare, AiOutlineProduct, AiOutlineUser } from "react-icons/ai";
import SideBar from "./components/navigationBar/SiderBar";
// import serviceIcon from "@/assets/NavIcons/all-service.svg";
// import couponIcon from "@/assets/NavIcons/coupon.svg";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector(selectCurrentUser);
  const [isOpen, setIsOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navRef]);

  const navLink = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: AiOutlineProduct
    },
    {
      name: "Product Management",
      href: "/product-management",
      icon: AiOutlineProduct
    },
    {
      name: "User Management",
      href: "/user-management",
      icon: AiOutlineUser
      
    },
    {
      name: "Vote Management",
      href: "/vote-management",
      icon: AiOutlineCheckSquare,
    },

    {
      name: "History",
      href: "/vehicles-track-list",
      icon: AiOutlineCreditCard,
    },
  ];

  return (
    <div className="flex">
      <div className="max-h-screen h-full sticky top-0 z-50">
        <SideBar
          navLink={navLink}
          isOpen={isOpen}
          user={user}
          navRef={navRef}
        />
      </div>
      <div className="w-full">
        <div className="sticky top-0 z-40">
          <TopBar setIsOpen={setIsOpen} isOpen={isOpen} user={user} />
        </div>
        <div className="bg-[#F6F6F6] min-h-screen"> {children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
