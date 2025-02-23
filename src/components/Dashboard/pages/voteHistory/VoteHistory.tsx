/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import TablePagination from "@/components/ui/tables/TablePagination";
import VoteHistoryTable from "@/components/ui/tables/VoteHistoryTable";
import { voteHistoryHeader } from "@/constants/voteHistoryData";
import {useGetUserAllVotesQuery } from "@/redux/features/users/usersApi";
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

export default function VoteHistory() {

  const { data } = useGetUserAllVotesQuery({})
  console.log("data", data)
  const userVotes = data?.data?.votes || [];
  console.log("user votes", userVotes)
  // console.log(userVotess)
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const itemsPerPage = 7;
  const totalPages = Math.ceil(userVotes?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = userVotes.slice(startIndex, startIndex + itemsPerPage);
  console.log("paginated data", paginatedData)


    // Add formatted dates
    const formattedData = paginatedData.map((user:any) => ({
      ...user,
      formattedCreatedAt: formatDate(user.created_at),
    }));
  
  return (
    <div className="relative mt-8 ">
        <div>
        <h1 className="text-[25px] font-semibold text-default mb-7">Vote History</h1>
      </div>
      <div className="overflow-x-hidden-hidden overflow-x-auto">
        <VoteHistoryTable
          tableHeader={voteHistoryHeader}
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
