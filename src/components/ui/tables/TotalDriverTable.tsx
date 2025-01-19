"use client";

import { MoreVertical, Plus } from "lucide-react";
import Image from "next/image";
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
// import { useDriverStatusMutation } from "@/redux/features/products/productsApi";
import ShowToastify from "@/utils/ShowToastify";
import { ToastContainer } from "react-toastify";

export default function TotalDriverTable({
  tableHeader,
  tableData,
  isDelete = false,
}: TableProps) {
  // const [isActive, setIsActive] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  // console.log(isActive, selectedRows, selectAll);

  // const [statusFn] = useDriverStatusMutation()

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(tableData.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const toggleRowSelection = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // const handleStatusChange = async (status: string, id: string) => {
  //   const { data, error } = await statusFn({ id, status })

  //   if (data) {
  //     console.log(data);
  //     ShowToastify({ success: "Driver status updated successfully" });
  //   }
  //   if (error) {
  //     console.log(error);
  //   }
  // }





  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "blocked":
        return "bg-[#F23045]/10 text-[#F23045]";
      case "active":
        return "bg-[#0DBAB2]/10 text-[#0DBAB2]";
      default:
        return "bg-gray-50 text-gray-500";
    }
  };
  const getDotColor = (dot: string) => {
    switch (dot.toLowerCase()) {
      case "blocked":
        return "bg-[#F23045]";
      case "active":
        return "bg-[#0DBAB2] ";
      default:
        return "bg-gray-50";
    }
  };

  return (
    <div className="w-full overflow-auto bg-white rounded-lg shadow-md">
      <Link
        href={"/add-driver"}
        className="p-5 flex justify-start sm:justify-end"
      >
        <Button>
          <Plus className="text-white" /> Add Driver
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
            {tableHeader.map((header, idx) => (
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
          {tableData?.map((item: any) => {
            // const isChecked = selectedRows.includes(item.id);
            return (
              <tr
                key={item?.id}
                className="border-b border-gray-200 last:border-0"
              >
                <td className="px-4 py-4 first:pl-6">
                  <div className="flex items-center gap-3">
                    <Image
                      src={item?.product_image.src}
                      alt={"image"}
                      width={40}
                      height={40}
                      className="rounded-full border-2 object-cover w-12 h-12"
                    />
                    <span className="font-medium text-gray-900">
                      {item?.product_name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 text-gray-500">{item?.brand_name}</td>
                {/* <td className="px-4 py-4 text-gray-500">{item.password}</td> */}
                <td className="px-4 py-4 text-gray-500">{item.joinDate}</td>
                {/* <td className="px-4 py-4 ">
                  <span
                    className={`inline-flex items-center rounded-lg px-2 py-1 text-sm font-bold ${getStatusColor(
                      item.status
                    )}`}
                  >
                    <span className="flex items-center gap-1">
                      <span
                        className={`w-2 h-2 rounded-full ${getDotColor(
                          item.status
                        )}`}
                      ></span>
                      {item.status}
                    </span>
                  </span>
                </td> */}
                {/* <td className="flex justify-start items-center px-4 py-4 text-right pr-6">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="p-2">
                      <DropdownMenuItem
                        onClick={() => handleStatusChange("BLOCKED", item?.id)}
                        className={`text-sm font-bold bg-[#0DBAB2]/10 text-[#0DBAB2]`}
                      >
                        Block
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange("ACTIVE", item?.id)}
                        className={`text-sm font-bold mt-2 bg-[#F23045]/10 text-[#F23045]`}
                      >
                        Active
                      </DropdownMenuItem>
                      {isDelete && <DropdownMenuItem>Delete</DropdownMenuItem>}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}
