"use client";
import image from "@/assets/no-face.png";
import { MoreVertical } from "lucide-react";
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
import { useAssignDriverMutation, useGetAllDriverQuery } from "@/redux/features/products/productsApi";
import ShowToastify from "@/utils/ShowToastify";
import { ToastContainer } from "react-toastify";

interface DriverProps {
  id: string;
  fullName: string;
}

export default function BookingListTable({
  tableHeader,
  tableData,
  isDelete = false,
}: TableProps) {
  const [isActive, setIsActive] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  // const [driverNames] = useState<string[]>([
  //   "John Doe",
  //   "Jane Smith",
  //   "Mike Johnson",
  // ]); // Demo driver names
  const [selectedDriver, ] = useState<{
    [key: string]: string;
  }>({});
  console.log(isActive, selectedRows, selectAll);

  const { result, isLoading } = useGetAllDriverQuery({}, {
    selectFromResult: ({ isLoading, data }) => ({
      result: data?.data?.formattedDrivers,
      isLoading: isLoading
    })
  })

  console.log(result);

  const [assignDriver] = useAssignDriverMutation();


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

  // Handle selecting a driver
  const handleDriverSelect = async (id: string, driverName: string) => {

    const { data: res, error } = await assignDriver({ driverId: driverName, bookingId: id });
    if (error) {
      console.log("Error assigning driver:", error);
    }

    if (res) {
      console.log(res);
      ShowToastify({ success: "Driver Assigned Successfully" });
    }

    // console.log("Selected driver for row", id, ":", driverName); // For now, just log the selected driver
    // setSelectedDriver((prev) => ({ ...prev, [id]: driverName })); // Update selected driver per row
  };

  return (
    <div className="w-full overflow-auto bg-white rounded-lg shadow-md">
      <table className="w-full mt-5 text-sm md:text-base border-y">
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
          {
            tableData?.length <= 0 ?
              <tr>
                <td>No Data Found</td>
              </tr>
              :
              tableData?.map((item) => {
                const isChecked = selectedRows.includes(item.id);
                return (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 last:border-0"
                  >
                    <td className="px-4 py-4 first:pl-6">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleRowSelection(item.id)}
                      />
                    </td>
                    <td className="px-4 py-4 first:pl-6">
                      <div className="flex items-center gap-3">
                        <Image
                          src={item.user?.profileImage == null ? image : item.user?.profileImage}
                          alt={"image"}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <span className="font-medium text-gray-900">
                          {item?.user?.fullName}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-500">{item?.user?.phoneNumber}</td>
                    <td className="px-4 py-4 text-heading_color">
                      {item.location}
                    </td>
                    <td className="px-4 py-4 text-gray-500">{item.bookingTime}</td>
                    <td className="px-4 py-4 text-gray-500">{item.serviceDate.split("T")[0]}</td>
                    <td className="px-4 py-4">
                      {/* Driver dropdown selection */}
                      <select
                        value={selectedDriver[item.id] || ""}
                        onChange={(e) =>
                          handleDriverSelect(item.id, e.target.value)
                        }
                        className=" bg-primary/10 text-primary rounded-md p-2"
                      >
                        <option value="">Select Driver</option>
                        {
                          isLoading ?
                            "loading"
                            :
                            result?.map((driverName: DriverProps) => (
                              <option key={driverName?.id} value={driverName?.id}>
                                {driverName?.fullName}
                              </option>
                            ))
                        }
                      </select>
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
                            onClick={() => setIsActive("active")}
                            className={`text-sm font-bold bg-[#0DBAB2]/10 text-[#0DBAB2]`}
                          >
                            Active
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setIsActive("blocked")}
                            className={`text-sm font-bold mt-2 bg-[#F23045]/10 text-[#F23045]`}
                          >
                            inactive
                          </DropdownMenuItem>
                          {isDelete && <DropdownMenuItem>Delete</DropdownMenuItem>}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })
          }
        </tbody>
      </table>
      <ToastContainer/>
    </div>
  );
}
