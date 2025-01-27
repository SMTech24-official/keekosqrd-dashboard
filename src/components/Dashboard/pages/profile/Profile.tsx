"use client";

import {
  useGetMeUserQuery,
  useUpdateUserProfileMutation,
} from "@/redux/features/profile/profileApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { toast } from "sonner";

const Profile = () => {
  const { data, isLoading } = useGetMeUserQuery({});
  const [updateProfile] = useUpdateUserProfileMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    profile_image: "",
    address: "",
  });

  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");

  useEffect(() => {
    if (data?.data?.user) {
      const user = data.data.user;
      setUserInfo({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        profile_image: user.profile_image || "",
        address: user.address || "",
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateClick = async () => {
    setIsUpdating(true);
    try {
      const updatedData = new FormData();
      updatedData.append("first_name", userInfo.first_name);
      updatedData.append("last_name", userInfo.last_name);
      updatedData.append("email", userInfo.email);
      updatedData.append("address", userInfo.address);

      if (avatar) {
        updatedData.append("profile_image", avatar);
      }

      const response = await updateProfile({
        id: data?.data?.user?.id,
        userData: updatedData,
      }).unwrap();

      if (response.status) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
        setAvatarPreview("");
      } else {
        toast.error("Error updating profile. Please try again.");
      }
    } catch {
      toast.error("An error occurred while updating your profile.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-16 py-8 shadow rounded-lg bg-white">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-6">Account Profile</h1>
        {!isEditing && (
          <button
            onClick={handleEditClick}
            className="bg-transparent border border-[#D0D5DD] rounded-[8px] flex items-center gap-2 p-2 text-darkGray"
          >
            Edit
            <FaEdit className="mr-1" />
          </button>
        )}
      </div>

      <div className="flex items-center mb-6">
        {isEditing ? (
          <div>
            <input
              type="file"
              name="avatar"
              onChange={handleAvatarChange}
              className="text-darkBlack mt-2 p-2 w-full border rounded-[8px] focus:outline-none bg-transparent"
            />
            {avatarPreview && (
              <Image
                src={avatarPreview}
                alt="Preview"
                className="w-20 h-20 rounded-full mt-4"
                width={20}
                height={20}
              />
            )}
          </div>
        ) : (
          <Image
            src={`http://104.248.113.165:8003/storage/${userInfo.profile_image}`}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
            width={80}
            height={80}
          />
        )}
        <div className="ml-4">
          <h2 className="text-2xl font-semibold text-default">
            {userInfo.first_name} {userInfo.last_name}
          </h2>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-[24px] font-semibold mb-6">Personal Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-darkGray">First Name</label>
            {isEditing ? (
              <input
                type="text"
                name="first_name"
                value={userInfo.first_name}
                onChange={handleChange}
                className="text-darkBlack text-lg font-medium mt-2 px-4 py-3 w-full border rounded-[8px] focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-darkBlack text-lg font-medium">
                {userInfo.first_name}
              </p>
            )}
          </div>
          <div>
            <label className="text-darkGray">Last Name</label>
            {isEditing ? (
              <input
                type="text"
                name="last_name"
                value={userInfo.last_name}
                onChange={handleChange}
                className="text-darkBlack text-lg font-medium mt-2 px-4 py-3 w-full border rounded-[8px] focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-darkBlack text-lg font-medium">
                {userInfo.last_name}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-[24px] font-semibold mb-6">Address</h3>
        <div>
          <label className="text-darkGray">Address</label>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={userInfo.address}
              onChange={handleChange}
              className="text-darkBlack text-lg font-medium mt-2 px-4 py-3 w-full border rounded-[8px] focus:outline-none bg-transparent"
            />
          ) : (
            <p className="text-darkBlack text-lg font-medium">
              {userInfo.address}
            </p>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="text-center">
          <button
            onClick={handleUpdateClick}
            disabled={isUpdating}
            className={`px-8 py-4 rounded hover:bg-blue-600 text-white ${
              isUpdating ? "bg-gray-400 cursor-not-allowed" : "bg-[#0061FF]"
            }`}
          >
            {isUpdating ? "Updating..." : "Update Profile"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
