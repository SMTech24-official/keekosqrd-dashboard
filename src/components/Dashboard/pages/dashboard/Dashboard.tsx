/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { metricsData } from "@/constants/cardData";
import { MetricCard } from "../../components/cards/metricCard/MetricCard";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { DriverCard } from "../../components/cards/driverCard/DriverCard";
// import { demoDrivers } from "@/constants/driverData";
// import BookingReportChart from "../../components/charts/BookingReportChart";
// import {
//   monthlyData,
//   quarterlyData,
//   yearlyData,
// } from "@/constants/bookingData";

export default function Dashboard() {
  // const [data, setData] = useState(monthlyData);
  // const [filter, setFilter] = useState("Monthly"); // Default filter
  // const [pdata, setPdata] = useState(purchaseMonthlyData);

  // const handleFilterChange = (filter: string) => {
  //   if (filter === "Monthly") {
  //     setData(monthlyData);
  //   } else if (filter === "Quarterly") {
  //     setData(quarterlyData);
  //   } else if (filter === "Yearly") {
  //     setData(yearlyData);
  //   }
  // };

  // const handlePurchaseFilterChange = (newFilter: string) => {
  //   setFilter(newFilter);

  //   // Update data based on filter
  //   switch (newFilter) {
  //     case "Monthly":
  //       setPdata(purchaseMonthlyData);
  //       break;
  //     case "Quarterly":
  //       setPdata(purchaseQuarterlyData);
  //       break;
  //     case "Yearly":
  //       setPdata(purchaseYearlyData);
  //       break;
  //     default:
  //       setPdata(purchaseMonthlyData);
  //   }
  // };

  return (
    <div>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {metricsData.map((metric, index) => (
          <MetricCard color="red" key={index} {...metric} />
        ))}
      </div>
      <div className="grid grid-cols-4 gap-5 mt-8">
        {/* <div className=" col-span-4 lg:col-span-3 gap-5">
          <BookingReportChart
            data={data}
            heading="Booking Reports"
            onFilterChange={handleFilterChange}
          />
          <div className="mt-5">
            <PurchaseHistoryChart
              heading="Purchase History"
              data={pdata}
              filters={["Monthly", "Quarterly", "Yearly"]}
              onFilterChange={handlePurchaseFilterChange}
            />
            ;
          </div>
        </div> */}
        {/* <Card className="w-full h-fit col-span-4 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Recent Added Drivers
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-1">
            {demoDrivers.map((driver) => (
              <DriverCard
                key={driver.id}
                name={driver.name}
                avatarUrl={driver.avatarUrl}
              />
            ))}
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}
