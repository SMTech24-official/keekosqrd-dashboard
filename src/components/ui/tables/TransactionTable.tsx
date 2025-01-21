"use client";

import Image from "next/image";
import { useExportUsersMutation } from "@/redux/features/users/usersApi";
import profile from "@/assets/logo/profileee.png";
import { TableProps } from "@/interface/table.type";

export default function TransactionTable({
  tableHeader,
  tableData,
  isDelete = false,
}: TableProps) {
  

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
               
                <td className="px-4 py-4 text-gray-500">
                  {item.id}
                </td>
                <td className="px-4 py-4 text-gray-500">
                  {item.payment_method || "N/A"}
                </td>
                <td className="px-4 py-4 text-[#131D26]">{item.amount}</td>
                
                <td className="px-4 py-4 text-[#131D26]">{item.formattedCreatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     
    </div>
  );
}
