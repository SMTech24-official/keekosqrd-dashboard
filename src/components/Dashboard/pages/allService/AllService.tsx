/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ServiceTable from "@/components/ui/tables/ServiceTable";
import TablePagination from "@/components/ui/tables/TablePagination";
import { serviceTableHeaders } from "@/constants/allServiceData";
import { useGetAllServiceQuery } from "@/redux/features/service/service";
import { useState } from "react";

export default function AllService() {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const itemsPerPage = 5;

  const { result, isLoading, page } = useGetAllServiceQuery({ limit: itemsPerPage, page: currentPage }, {
    selectFromResult: ({ isLoading, data }) => ({
      isLoading: isLoading,
      result: data?.data?.services,
      page: data?.data?.totalServices
    })
  })

  const totalPages = page && Math.ceil(page / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const paginatedData = serviceData.slice(
  //   startIndex,
  //   startIndex + itemsPerPage



  // );
  return (
    <div className="relative mt-8 ">
      {
        isLoading ?
          <div>Loading...</div>
          :
          <div>
            <div className="overflow-x-hidden-hidden overflow-x-auto">
              <ServiceTable
                tableHeader={serviceTableHeaders}
                tableData={result}
              />
            </div>
            {/* Pagination */}
            <TablePagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
      }
    </div>
  );
}
