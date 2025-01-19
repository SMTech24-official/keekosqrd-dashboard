import trendUp from "@/assets/trend-up.png";
import trendDown from "@/assets/trend-down.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";

type BookingData = {
  month: string;
  bookings: number;
  percentageChange: number;
  isIncrease: boolean;
};

type BookingReportChartProps = {
  data: BookingData[];
  heading: string;
  onFilterChange: (filter: string) => void;
};

const BookingReportChart: React.FC<BookingReportChartProps> = ({
  data,
  heading,
  onFilterChange,
}) => {
  const [filter, setFilter] = useState("Monthly"); // Monthly, Quarterly, Yearly

  const handleFilterChange = (value: string) => {
    setFilter(value);
    onFilterChange(value);
  };

  return (
    <div className="border rounded-lg p-5 bg-white shadow-sm">
      {/* Chart Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">{heading}</h2>
        <Select value={filter} onValueChange={handleFilterChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Monthly">Monthly</SelectItem>
            <SelectItem value="Quarterly">Quarterly</SelectItem>
            <SelectItem value="Yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis axisLine={false} dataKey="month" />
          <YAxis
            tickFormatter={(value) => {
              if (value >= 1000) return `${value / 1000}k`;
              return value;
            }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const { month, bookings, percentageChange, isIncrease } =
                  payload[0].payload;
                return (
                  <div className="p-2 bg-white shadow-md rounded border text-text_color">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-bold">{month}</p>
                      {isIncrease ? (
                        <span className="bg-green-500/20 rounded">
                          <Image src={trendUp} alt="trend-arrow" />
                        </span>
                      ) : (
                        <span className="bg-red-500/20 rounded">
                          <Image src={trendDown} alt="trend-arrow" />
                        </span>
                      )}
                    </div>

                    <p className="text-bold text-black">{`${bookings}`}</p>
                    <p className="flex gap-2 items-center">
                      <span>Total Bookings</span> {`${percentageChange}% `}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          {/* Bar Styling */}
          <Bar
            dataKey="bookings"
            fill="#f9a826"
            radius={[8, 8, 8, 8]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BookingReportChart;
