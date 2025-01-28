"use client";

import check from "@/assets/chech.png";
import coin from "@/assets/coin.png";
import member from "@/assets/logo/group-chat.png";
import TablePagination from "@/components/ui/tables/TablePagination";
import TransactionTable from "@/components/ui/tables/TransactionTable";
import { transactionTableHeaders } from "@/constants/transactionTableHeaders";
import { Metric } from "@/interface/metric";
import { useGetAllPaymentsQuery } from "@/redux/features/payment/paymentApi";
import {
  useGetTotalMembersQuery,
  useGetTotalPaymentsQuery,
  useGetTotalVotersQuery,
} from "@/redux/features/users/usersApi";
import { formatDate } from "@/utils/formatDate";
import { generateMonthOptions } from "@/utils/generateMonthOptions";
import { useEffect, useState } from "react";
import { MetricCard } from "../../components/cards/metricCard/MetricCard";

export default function Dashboard() {
  const [metricsData, setMetricsData] = useState<Metric[]>([]);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // Fetch total payments, members, and voters from the API using hooks
  const { data: totalPayments, isLoading: isLoadingPayments } =
    useGetTotalPaymentsQuery({});
  const { data: totalMembers, isLoading: isLoadingMembers } =
    useGetTotalMembersQuery({});
  const { data: totalVoters, isLoading: isLoadingVoters } =
    useGetTotalVotersQuery({});

  // Fetch payments data for the selected month and year
  const { data: payments, isLoading } = useGetAllPaymentsQuery({
    month: selectedMonth,
    year: selectedYear,
  });

  // Ensure payments data exists before trying to access it
  const transactionData = payments?.data?.payments || [];

  // Handle pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(transactionData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = transactionData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  interface Payment {
    created_at: string;
    key: string;
  }

  interface FormattedPayment extends Payment {
    formattedCreatedAt: string;
  }

  const formattedData: FormattedPayment[] = paginatedData.map(
    (payment: Payment) => ({
      ...payment,
      formattedCreatedAt: formatDate(payment.created_at),
    })
  );

  // Update metricsData once the API data is available
  useEffect(() => {
    if (totalPayments && totalMembers && totalVoters) {
      setMetricsData([
        {
          title: "Total Payments",
          value: totalPayments?.data?.total_payments,
          change: 0,
          icon: coin,
          description: "Total amount of payments",
        },
        {
          title: "Total Members",
          value: totalMembers?.data?.total_members,
          change: 0,
          icon: member,
          description: "Total number of members",
        },
        {
          title: "Total Voters",
          change: 0,
          icon: check,
          value: totalVoters?.data?.total_voters,
          description: "Total number of voters",
        },
      ]);
    }
  }, [totalPayments, totalMembers, totalVoters]);

  if (isLoadingPayments || isLoadingMembers || isLoadingVoters || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {metricsData.map((metric, index) => (
          <MetricCard color="red" key={index} {...metric} />
        ))}
      </div>
      <div className="mt-8 relative">
        <div className="flex items-center justify-between">
          <h1 className="text-default text-[25px] font-semibold mb-6">
            Transaction History
          </h1>
          <div>
            {/* Filter by Month and Year */}
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
                {Array.from({ length: 5 }, (_, i) => currentYear - i).map(
                  (year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <TransactionTable
            tableHeader={transactionTableHeaders}
            tableData={formattedData}
          />
        </div>
        <TablePagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
