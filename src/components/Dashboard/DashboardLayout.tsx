"use client";

import TopBar from "@/components/Dashboard/components/navigationBar/TopBar";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import React, { useEffect, useRef, useState } from "react";
import {
  AiOutlineCheckSquare,
  AiOutlineProduct,
  AiOutlineUser,
} from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { GiPodiumWinner } from "react-icons/gi";
import { MdManageHistory, MdOutlineHistory } from "react-icons/md";
import SideBar from "./components/navigationBar/SiderBar";
// import { cookies } from "next/headers";
// import { useGetMeUserQuery } from "@/redux/features/profile/profileApi";
// import serviceIcon from "@/assets/NavIcons/all-service.svg";
// import couponIcon from "@/assets/NavIcons/coupon.svg";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector(selectCurrentUser);
  // console.log("user", user)
  // const token = Cookies.get("toekn") ;
  // console.log("token", token)
  // const role = user?.role || '';
  // console.log("user dashboard",role)
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  // const {data} = useGetMeUserQuery({})
  // console.log("me user", data)

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
      icon: AiOutlineProduct,
      roles: ["admin"],
    },
    {
      name: "User Dashboard",
      href: "/user-dashboard",
      icon: AiOutlineProduct,
      roles: ["user"],
    },
    {
      name: "Profile",
      href: "/profile",
      icon: CgProfile,
      roles: ["admin", "user"],
    },
    // {
    //   name: "Transaction History",
    //   href: "/transaction-history",
    //   icon: AiOutlineTransaction,
    // },
    {
      name: "Vote History",
      href: "/vote-history",
      icon: MdOutlineHistory,
      roles: ["user"],
    },
    {
      name: "Product Management",
      href: "/product-management",
      icon: MdManageHistory,
      roles: ["admin"],
    },
    {
      name: "User Management",
      href: "/user-management",
      icon: AiOutlineUser,
      roles: ["admin"],
    },
    {
      name: "Vote Management",
      href: "/vote-management",
      icon: AiOutlineCheckSquare,
      roles: ["admin"],
    },
    {
      name: "Winner History",
      href: "/winner-history",
      icon: GiPodiumWinner,
      roles: ["admin"],
    },
  ];

  // const filteredMenuItems = navLink.filter((item) =>
  //   item.roles?.includes(role)
  // );

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
          <TopBar setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>
        <div className="bg-[#F6F6F6] min-h-screen"> {children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
