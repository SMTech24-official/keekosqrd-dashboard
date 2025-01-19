"use client";

import { MoreVertical, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableProps } from "@/interface/table.type";
import { useState } from "react";
import Link from "next/link";
import { useServiceStatusMutation } from "@/redux/features/service/service";
import ShowToastify from "@/utils/ShowToastify";

export default function ServiceTable({
  tableHeader,
  tableData,
  isDelete = false,
}: TableProps) {
  // const [isActive, setIsActive] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  // console.log(isActive, selectedRows, selectAll);
  const [statusChangeFn] = useServiceStatusMutation()

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(tableData?.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const toggleRowSelection = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "inactive":
        return "bg-[#F23045]/10 text-[#F23045]";
      case "active":
        return "bg-[#0DBAB2]/10 text-[#0DBAB2]";
      default:
        return "bg-gray-50 text-gray-500";
    }
  };
  const getDotColor = (dot: string) => {
    switch (dot?.toLowerCase()) {
      case "inactive":
        return "bg-[#F23045]";
      case "active":
        return "bg-[#0DBAB2] ";
      default:
        return "bg-gray-50";
    }
  };

  const handleServiceStatusChange = async (status: string, id: string) => {
    const { data, error } = await statusChangeFn({ id, status })
    if (data) {
      console.log(data);
      ShowToastify({ success: "Service status updated successfully" });
    }
    if (error) {
      console.log(error);
      ShowToastify({ error: "Service status update failed" });
    }
  }

  return (
    <div className="w-full overflow-auto bg-white rounded-lg shadow-md">
      <Link
        href={"/add-service"}
        className="p-5 flex justify-start sm:justify-end"
      >
        <Button>
          <Plus className="text-white" /> Add Service
        </Button>
      </Link>
      <table className="w-full text-sm md:text-base border-y">
        <thead className="border-b border-gray-200">
          <tr>
            <th className="px-4 py-4 text-start font-medium text-gray-500 first:pl-6 last:pr-6">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
              />
            </th>
            {tableHeader?.map((header, idx) => (
              <th
                key={idx}
                className="px-4 py-4 text-start font-medium text-gray-500 first:pl-6 last:pr-6"
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData?.map((item) => {
            const isChecked = selectedRows.includes(item?.id);
            return (
              <tr
                key={item?.id}
                className="border-b border-gray-200 last:border-0"
              >
                <td className="px-4 py-4 first:pl-6">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleRowSelection(item?.id)}
                  />
                </td>
                <td className="px-4 py-4 first:pl-6">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-900">
                      {item?.serviceName}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 text-gray-500">{item.smallCarPrice}</td>
                <td className="px-4 py-4 text-gray-500">{item.largeCarPrice}</td>
                <td className="px-4 py-4 text-gray-500">{item.duration}</td>
                <td className="px-4 py-4 text-gray-500">
                  {item.availableTime?.length > 3 ? (
                    <>
                      {item?.availableTime
                        ?.slice(0, 3)
                        ?.map((time: string, index: number) => (
                          <span key={time}>
                            {time}
                            {index < 2 && ", "}{" "}
                          </span>
                        ))}
                      ... {/* Ellipsis for truncated times */}
                    </>
                  ) : (
                    item?.availableTimes?.map((time: string) => (
                      <span key={time}>
                        {time}
                        {item.availableTimes.indexOf(time) <
                          item.availableTimes.length - 1 && ", "}
                      </span>
                    ))
                  )}
                </td>
                <td className="px-4 py-4 ">
                  <span
                    className={`inline-flex items-center rounded-lg px-2 py-1 text-sm font-bold ${getStatusColor(
                      item.serviceStatus
                    )}`}
                  >
                    <span className="flex items-center gap-1">
                      <span
                        className={`w-2 h-2 rounded-full ${getDotColor(
                          item.serviceStatus
                        )}`}
                      ></span>
                      {item.serviceStatus}
                    </span>
                  </span>
                </td>
                <td className="flex justify-start items-center px-4 py-4 text-right pr-6">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="p-2">
                      <DropdownMenuItem
                        onClick={() => handleServiceStatusChange("INACTIVE", item?.id)}
                        className={`text-sm font-bold bg-[#0DBAB2]/10 text-[#0DBAB2]`}
                      >
                        Inactive
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleServiceStatusChange("ACTIVE", item?.id)}
                        className={`text-sm font-bold mt-2 bg-[#F23045]/10 text-[#F23045]`}
                      >
                        Active
                      </DropdownMenuItem>
                      {isDelete && <DropdownMenuItem>Delete</DropdownMenuItem>}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
