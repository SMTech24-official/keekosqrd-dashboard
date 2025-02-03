"use client";

import CommunityTable from "@/components/ui/tables/CommunityTable";
import TablePagination from "@/components/ui/tables/TablePagination";
import { communityTableHeaders } from "@/constants/communitTableHeaders";
import { useGetAllCommunityQuery } from "@/redux/features/community/CommunityApi";
import { useState } from "react";

export default function Community() {
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch products data from the backend
  const { data: result, isLoading } = useGetAllCommunityQuery({});

  // Extract data from the API response
  console.log("result community", result)
  const products = result?.data?.communities|| [];
  console.log("products", products)


  // Calculate pagination
  const itemsPerPage = 6;
  const totalPages = Math.ceil(products?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = products.slice(startIndex, startIndex + itemsPerPage);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative mt-8">
      <div>
        <div className="overflow-x-auto">
          <CommunityTable
            tableHeader={communityTableHeaders}
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
    </div>
  );
}
