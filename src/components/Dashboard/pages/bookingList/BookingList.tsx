/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import BookingListTable from "@/components/ui/tables/BookingListTable";
import TablePagination from "@/components/ui/tables/TablePagination";
import {
  // bookingData,
  bookingListTableHeaders,
} from "@/constants/vehicleLiveData";
import { useGetAllBookingQuery } from "@/redux/features/booking/bookingApi";
import { useState } from "react";

export default function BookingList() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { result, isLoading, page } = useGetAllBookingQuery({limit: itemsPerPage, page:currentPage}, {
    selectFromResult: ({ isLoading, data }) => ({
      result: data?.data?.bookingDetailsWithUser,
      isLoading: isLoading,
      page: data?.data?.total_pending_bookings

    })
  })

  console.log(result);


  const totalPages = page && Math.ceil(page / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const paginatedData = bookingData.slice(
  //   startIndex,
  //   startIndex + itemsPerPage
  // );
  return (
    <div className="relative mt-8 ">
      {
        isLoading ?
          "loading"
          :
          <div>
            <div className="overflow-x-hidden-hidden overflow-x-auto">
              <BookingListTable
                tableHeader={bookingListTableHeaders}
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
