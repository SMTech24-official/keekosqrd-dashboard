"use client";

import Image from "next/image";
// import { useExportUsersMutation } from "@/redux/features/users/usersApi";
import { TableProps } from "@/interface/table.type";

export default function VoteHistoryTable({
  tableHeader,
  tableData,
  // isDelete = false,
}: TableProps) {

  console.log("tabledata", tableData)
 

  return (
    <div>
      <div className="w-full overflow-auto bg-white rounded-lg shadow-md">
        <table className="w-full text-sm md:text-base border-y mt-5">
          <thead className="border-b border-gray-200">
            <tr>
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
            {tableData.map((item) => (
              <tr key={item.id} className="border-b border-gray">
                <td className="px-4 py-4 first:pl-6">
                  <div className="flex items-center gap-3">
                    <Image
                      src={`https://api.ksquaredsourcedcity.com/storage/${item?.product?.product_image}`}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                </td>
                <td className="px-4 py-4 text-gray-500">
                  {item?.product?.product_name}
                </td>
               
                <td className="px-4 py-4 text-gray-500">
                  {item?.product?.brand_name}
                </td>
                <td className="px-4 py-4 text-[#131D26]">{item.formattedCreatedAt}</td>
                <td className="px-4 py-4 text-gray-500">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      item?.status
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item?.status ? "Winner" : "Not selected"}
                  </span>
                </td>
                <td className="px-4 py-4 text-[#131D26]">
                  {item.formattedCreatedAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
