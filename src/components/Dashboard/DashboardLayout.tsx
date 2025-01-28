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

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  // Get the user information from Redux store
  const user = useAppSelector(selectCurrentUser);
  const role = user?.role || "";

  // Decode the JWT token to get user role

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

  // Navigation links with roles
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

  // Filter the menu items based on the user's role
  const filteredMenuItems = navLink.filter((item) =>
    item.roles.includes(role as string)
  );
  console.log(filteredMenuItems);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="max-h-screen h-full sticky top-0 z-50">
        <SideBar
          navLink={filteredMenuItems} // Pass the filtered links based on role
          isOpen={isOpen}
          user={user}
          navRef={navRef}
        />
      </div>

      {/* Main Content */}
      <div className="w-full">
        <div className="sticky top-0 z-40">
          <TopBar setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>
        <div className="bg-[#F6F6F6] min-h-screen">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
