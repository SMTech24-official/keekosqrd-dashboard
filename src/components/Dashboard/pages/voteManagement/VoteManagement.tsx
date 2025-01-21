/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import TablePagination from "@/components/ui/tables/TablePagination";
import VoteManagementTable from "@/components/ui/tables/VoteManagementTable";
import { votesTableHeaders } from "@/constants/totalVoteManagementData";
import { useGetAllVotesQuery } from "@/redux/features/Votes/votesApi";
import { formatDate } from "@/utils/formatDate";



// Helper function to generate month options
const generateMonthOptions = (): { label: string; value: number }[] => {
  const options = [];
  for (let i = 0; i < 12; i++) {
    const date = new Date(0, i);
    options.push({ label: date.toLocaleString("default", { month: "long" }), value: i + 1 });
  }
  return options;
};

export default function VoteManagement() {
  // Current year and month as default
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  // State for selected month and year
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // Fetch votes based on selected month and year
  const { data } = useGetAllVotesQuery({ month: selectedMonth, currentYear: selectedYear });
  const userVotes = data?.data?.votes || [];

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(userVotes?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = userVotes.slice(startIndex, startIndex + itemsPerPage);

  // Add formatted dates
  const formattedData = paginatedData.map((vote: any) => ({
    ...vote,
    formattedCreatedAt: formatDate(vote.created_at),
  }));

  return (
    <div className="relative mt-8">
      {/* Filters for Month and Year */}
      <div className="flex items-center gap-4 mb-6">
        <label className="text-gray-500 font-medium">Filter by:</label>

        {/* Month Dropdown */}
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="appearance-none bg-white border border-gray-300 text-gray-700 text-sm px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
        >
          {generateMonthOptions().map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Year Dropdown */}
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="appearance-none bg-white border border-gray-300 text-gray-700 text-sm px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
        >
          {Array.from({ length: 5 }, (_, i) => currentYear - i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Table with Data */}
      <div className="overflow-x-auto">
        <VoteManagementTable tableHeader={votesTableHeaders} tableData={formattedData} />
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
