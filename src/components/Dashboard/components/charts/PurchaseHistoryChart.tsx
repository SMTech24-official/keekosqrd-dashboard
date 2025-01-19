"use client";

import trendUp from "@/assets/trend-up.png";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Select,
} from "@/components/ui/select";
import { useState } from "react";
import Image from "next/image";

type ChartData = {
  month: string;
  revenue: number;
};

type PurchaseHistoryChartProps = {
  heading: string;
  data: ChartData[];
  onFilterChange?: (filter: string) => void;
  filters?: string[];
};

export const PurchaseHistoryChart: React.FC<PurchaseHistoryChartProps> = ({
  heading,
  data,
  onFilterChange,
  filters = ["Monthly", "Quarterly", "Yearly"],
}) => {
  const [filter, setFilter] = useState(filters[0]); // Default to the first filter

  const handleFilterChange = (value: string) => {
    setFilter(value);
    if (onFilterChange) {
      onFilterChange(value);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row items-center justify-between pb-8">
        <div className="text-xl font-bold text-neutral-700">{heading}</div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-[#A78BFA]" />
            <span className="text-xs font-medium text-neutral-500">
              Revenue
            </span>
          </div>
          <Select value={filter} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              {filters.map((filterOption) => (
                <SelectItem key={filterOption} value={filterOption}>
                  {filterOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#A78BFA" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#A78BFA" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value / 1000}k`}
                domain={[0, Math.max(...data.map((d) => d.revenue)) * 1.2]} // Dynamic domain
              />
              <CartesianGrid
                stroke="#E0E0E0"
                strokeDasharray="3 3"
                vertical={false}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white text-black rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid gap-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-medium">
                              {payload[0].payload.month}
                            </span>
                            <span className="bg-green-500/20 rounded">
                              <Image src={trendUp} alt="trend-arrow" />
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-bold">
                              Total Sales:
                            </span>
                            <span className="text-sm ">
                              {payload[0].value}k
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#A78BFA"
                strokeWidth={2}
                fill="url(#revenueGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
