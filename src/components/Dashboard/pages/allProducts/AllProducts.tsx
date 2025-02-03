"use client";

import TablePagination from "@/components/ui/tables/TablePagination";
import TotalDriverTable from "@/components/ui/tables/TotalDriverTable";
import { driverTableHeaders } from "@/constants/totalDriverData";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import { useState } from "react";

export default function AllProducts() {
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch products data from the backend
  const { data: result, isLoading } = useGetAllProductsQuery({});

  // Extract data from the API response
  const products = result?.data?.products?.data || [];
  // const totalPages = result?.data?.products?.last_page || 1;

  // pagination
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
          <TotalDriverTable
            tableHeader={driverTableHeaders}
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
