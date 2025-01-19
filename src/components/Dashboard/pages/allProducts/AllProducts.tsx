/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import TablePagination from "@/components/ui/tables/TablePagination";
import TotalDriverTable from "@/components/ui/tables/TotalDriverTable";
import { driverTableHeaders } from "@/constants/totalDriverData";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
// import { useGetAllDriverQuery } from "@/redux/features/products/productsApi";
import { useState } from "react";

export default function AllProducts() {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  // const itemsPerPage = 5;
  const { data: result, isLoading } = useGetAllProductsQuery({});
  const products = result?.data?.products;
  // const result = data?.data?.formattedDrivers;
  // const page = data?.data?.totalDrivers;
  // const totalPages = page && Math.ceil(page / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const paginatedData = driverData.slice(startIndex, startIndex + itemsPerPage);

  console.log("result",result);

  return (
    <div className="relative mt-8 ">
      {
        isLoading ?
          <p>Loading</p>
          :
          <div>
            <div className="overflow-x-hidden-hidden overflow-x-auto">
              <TotalDriverTable
                tableHeader={driverTableHeaders}
                tableData={products}
              />
            </div>
            {/* Pagination */}
            {/* <TablePagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            /> */}
          </div>
      }
    </div>
  );
}
