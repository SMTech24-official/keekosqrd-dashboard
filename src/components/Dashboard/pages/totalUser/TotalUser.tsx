/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import TablePagination from "@/components/ui/tables/TablePagination";
import TotalUserTable from "@/components/ui/tables/TotalUserTable";
import { userTableHeaders } from "@/constants/totalUserData";
import {useGetAllUsersQuery } from "@/redux/features/users/usersApi";
import { useState } from "react";

// Helper function to format the date
interface FormatDateOptions extends Intl.DateTimeFormatOptions {
  year: "numeric";
  month: "short";
  day: "numeric";
}

const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  const options: FormatDateOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    
  };
  return date.toLocaleString("en-US", options);
};

export default function TotalUser() {

  const { data } = useGetAllUsersQuery({})
  console.log("data", data)
  const userData = data?.data?.users || [];
  // console.log(userDatas)
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(userData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = userData.slice(startIndex, startIndex + itemsPerPage);


    // Add formatted dates
    const formattedData = paginatedData.map((user:any) => ({
      ...user,
      formattedCreatedAt: formatDate(user.created_at),
    }));
  
  return (
    <div className="relative mt-8 ">
      <div className="overflow-x-hidden-hidden overflow-x-auto">
        <TotalUserTable
          tableHeader={userTableHeaders}
          tableData={formattedData}
        />
      </div>
      {/* Pagination */}
      <TablePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
