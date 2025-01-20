"use client";

import TablePagination from "@/components/ui/tables/TablePagination";
import TotalDriverTable from "@/components/ui/tables/TotalDriverTable";
import { driverTableHeaders } from "@/constants/totalDriverData";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import { useState } from "react";

export default function AllProducts() {
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch products data from the backend
  const { data: result, isLoading } = useGetAllProductsQuery({ page: currentPage });

  // Extract data from the API response
  const products = result?.data?.products?.data || [];
  const totalPages = result?.data?.products?.last_page || 1;

  // Handle page change from the pagination component
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); // Update local state
    }
  };

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
          <TotalDriverTable
            tableHeader={driverTableHeaders}
            tableData={products}
          />
        </div>

        {/* Pagination */}
        <TablePagination
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
