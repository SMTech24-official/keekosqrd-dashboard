/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import TablePagination from "@/components/ui/tables/TablePagination";
import TotalUserTable from "@/components/ui/tables/TotalUserTable";
import { userData, userTableHeaders } from "@/constants/totalUserData";
import { useState } from "react";

export default function TotalUser() {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(userData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = userData.slice(startIndex, startIndex + itemsPerPage);
  return (
    <div className="relative mt-8 ">
      <div className="overflow-x-hidden-hidden overflow-x-auto">
        <TotalUserTable
          tableHeader={userTableHeaders}
          tableData={paginatedData}
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
