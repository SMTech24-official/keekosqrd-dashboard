"use client";

import coin from "@/assets/coin.png";
import check from "@/assets/chech.png";
import member from "@/assets/logo/group-chat.png";
import { useEffect, useState } from "react";
import { StaticImageData } from "next/image";
import { MetricCard } from "../../components/cards/metricCard/MetricCard";
import {
  useGetTotalPaymentsQuery,
  useGetTotalMembersQuery,
  useGetTotalVotersQuery,
  useGetUserPaymentsQuery,
} from "@/redux/features/users/usersApi";
import TransactionTable from "@/components/ui/tables/TransactionTable";
import { transactionTableHeaders } from "@/constants/transactionTableHeaders";
// import { useGetAllPaymentsQuery } from "@/redux/features/payment/paymentApi";
import { formatDate } from "@/utils/formatDate";
// import TablePagination from "@/components/ui/tables/TablePagination";

// Helper function to generate month options
// const generateMonthOptions = (): { label: string; value: number }[] => {
//   const options = [];
//   for (let i = 0; i < 12; i++) {
//     const date = new Date(0, i);
//     options.push({ label: date.toLocaleString("default", { month: "long" }), value: i + 1 });
//   }
//   return options;
// };

export default function Dashboard() {
  // Use state to store the API response data
  interface Metric {
    title: string;
    value: number;
    description: string;
    icon: StaticImageData;
    change: number;
  }

  const [metricsData, setMetricsData] = useState<Metric[]>([]);

  // Fetch total payments, members, and voters from the API using hooks
  const { data: totalPayments, isLoading: isLoadingPayments } =
    useGetTotalPaymentsQuery({});
  const { data: totalMembers, isLoading: isLoadingMembers } =
    useGetTotalMembersQuery({});
  const { data: totalVoters, isLoading: isLoadingVoters } =
    useGetTotalVotersQuery({});

  // Fetch payments data for the selected month and year
  const { data: payments, isLoading } = useGetUserPaymentsQuery({});

  // Ensure payments data exists before trying to access it
  const transactionData = payments?.data?.payments || [];
  console.log(transactionData);

  // Handle pagination

  interface Payment {
    created_at: string;
    key: string;
  }

  interface FormattedPayment extends Payment {
    formattedCreatedAt: string;
  }

  const formattedData: FormattedPayment[] = transactionData.map(
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
        </div>
        <div className="overflow-x-auto">
          <TransactionTable
            tableHeader={transactionTableHeaders}
            tableData={formattedData}
          />
        </div>
      </div>
    </div>
  );
}
