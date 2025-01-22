"use client";

import Image from "next/image";
import { useExportUsersMutation } from "@/redux/features/users/usersApi";
import { TableProps } from "@/interface/table.type";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import profile from "@/assets/logo/profileee.png";

export default function WinnerHistoryTable({
  tableHeader,
  tableData,
}: TableProps) {
  const [, { isLoading }] = useExportUsersMutation();

  const handleExport = async () => {
    try {
      const doc = new jsPDF();

      // Add title to the PDF
      doc.setFontSize(18);
      doc.text("User Data Export", 14, 22);

      // Set font for the table
      doc.setFontSize(10);

      // Add table headers
      const headers = tableHeader.map((header) => header.label);
      const yOffset = 30;

      // Headers and table data

      autoTable(doc, {
        head: [headers],
        body: tableData.map((item) => [
          item?.user?.profile_image || "N/A",
          item?.user?.first_name + " " + item?.user?.last_name,
          item?.user?.email || "NA",
          item?.user?.address || "NA",
          "Winner",
          item?.user?.formattedCreatedAt || "N/A",
        ]),
        startY: yOffset,
        theme: "grid",
      });

      // Save PDF
      doc.save("users_export.pdf");
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
                      src={
                        `http://10.0.20.59:8001/storage/${item?.user?.profile_image}` ||
                        profile
                      }
                      alt={item?.user?.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                </td>
                <td className="px-4 py-4 text-gray-500">
                  {item?.user?.first_name || "N/A"}{" "}
                  {item?.user?.last_name || "N/A"}
                </td>
                <td className="px-4 py-4 text-[#131D26]">
                  {item?.user?.email || "N/A"}
                </td>
                <td className="px-4 py-4 text-[#131D26]">
                  {item?.user?.address || "N/A"}
                </td>
                <td className="px-4 py-4 text-[#131D26]">
                  <span className="text-default font-semibold">Winner</span>
                </td>
                <td className="px-4 py-4 text-[#131D26]">
                  {item.formattedCreatedAt || "N/A"}
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
