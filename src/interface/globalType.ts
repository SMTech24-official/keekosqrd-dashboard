/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UserId {
  _id: string;
  fullName: string;
  reviewerName: string;
  amazonCountry: string;
  email: string;
  role: string;
  points: number;
  otp: string | null;
  otpExpires: string | null;
  isVerified: boolean;
  isSubscribed: boolean;
  subscriptionPlane: string;
  invitedFriends: number;
  termsAccepted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type TQueryParam = {
  name: string;
  value: any;
};

export interface ChartProps {
  title: string;
  data: { day: string; percentage: number }[];
  dropdownOptions: { value: string; label: string }[];
  selectedOption: { value: string; label: string };
  onSortChange: (selectedOption: { value: string; label: string }) => void;
}
