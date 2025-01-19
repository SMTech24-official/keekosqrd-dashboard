import { StaticImageData } from "next/image";
import { IconType } from "react-icons/lib";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  profilePic: string;
  bannerPic: string;
  summary: string | null;
  birthday: string | null;
  skills: string[] | null;
  phone: string | null;
  address: string | null;
  otp: string | null;
  OtpExpires: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Metadata = {
  createdAt: string;
  updatedAt: string;
};

export type Button = {
  label: string;
  variant: "outline" | "solid"; // Can expand this based on button variants
  style: string;
};

export type NavLink = {
  name: string;
  href: string;
  icon: IconType | StaticImageData;
};
