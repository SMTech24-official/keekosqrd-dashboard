"use client";

import member from "@/assets/logo/group-chat.png";
import TransactionTable from "@/components/ui/tables/TransactionTable";
import { transactionTableHeaders } from "@/constants/transactionTableHeaders";
import {
  useGetTotalParticipateQuery,
  useGetTotalUserWinnerQuery,
  useGetUserPaymentsQuery,
} from "@/redux/features/users/usersApi";
import { StaticImageData } from "next/image";
import { ReactNode } from "react";
import { useEffect, useState } from "react";
import { MetricCard } from "../../components/cards/metricCard/MetricCard";
import { GiPodiumWinner } from "react-icons/gi";
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
    icon: ReactNode | StaticImageData;
    change: number;
    description: string;
  }

  const [metricsData, setMetricsData] = useState<Metric[]>([]);

  // Fetch total payments, members, and voters from the API using hooks
  const { data: totalParticipate, isLoading: isLoadingPayments } =
    useGetTotalParticipateQuery({});
  const { data: totalWin, isLoading: isLoadingMembers } =
    useGetTotalUserWinnerQuery({});

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
    if (totalParticipate && totalWin) {
      setMetricsData([
        {
          title: "Total Participate",
          value: totalParticipate?.data?.total_votes,
          change: 0,
          icon: member,
          description: "Total number of members",
        },
        {
          title: "Total Win",
          change: 0,
          icon: <GiPodiumWinner />,
          value: totalWin?.data?.total_winer,
          description: "Total number of voters",
        },
      ]);
    }
  }, [totalParticipate, totalWin]);

  if (isLoadingPayments || isLoadingMembers || isLoading) {
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
