"use client";

import Image from "next/image";
import { useExportUsersMutation } from "@/redux/features/users/usersApi";
import profile from "@/assets/logo/profileee.png";
import { TableProps } from "@/interface/table.type";

export default function TotalUserTable({
  tableHeader,
  tableData,
  isDelete = false,
}: TableProps) {
  const [exportUsers, { isLoading }] = useExportUsersMutation();

  const handleExport = async () => {
    try {
      const response = await exportUsers({ format: "csv" }).unwrap();

      // Assuming the backend returns a downloadable file blob
      const blob = new Blob([response], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "users_export.csv"); // File name
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

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
                      src={`item.profile_image || profile`}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                </td>
                <td className="px-4 py-4 text-gray-500">
                  {item.first_name} {item.last_name}
                </td>
                <td className="px-4 py-4 text-[#131D26]">{item.email}</td>
                <td className="px-4 py-4 text-gray-500">
                  {item.payment_method || "N/A"}
                </td>
                <td className="px-4 py-4 text-gray-500">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      item?.status
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item?.status ? "Active" : "Inactive"}
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
      <div className="flex items-center justify-end mt-6">
        <button
          onClick={handleExport}
          disabled={isLoading}
          className="bg-grey text-default px-6 py-3 rounded-md hover:bg-gray-600"
        >
          {isLoading ? "Exporting..." : "Export"}
        </button>
      </div>
    </div>
  );
}
