"use client";

import Image from "next/image";
import { TableProps } from "@/interface/table.type";
import profile from "@/assets/logo/profileee.png";
import { useSelectWinnerMutation } from "@/redux/features/Votes/votesApi";
import { toast } from "sonner";
import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface SelectWinnerParams {
  id: string;
  month: number;
  year: number;
}

export default function VoteManagementTable({
  tableHeader,
  tableData,
}: TableProps) {
  const [selectWinner, { isLoading, isError, error, isSuccess }] =
    useSelectWinnerMutation();
  const [selectedWinners, setSelectedWinners] = useState<{
    [key: string]: boolean;
  }>({});

  const dateFormat = new Date();
  const month = dateFormat.getMonth() + 1;
  const year = dateFormat.getFullYear();

  const handleSelect = async (id: string): Promise<void> => {
    try {
      setSelectedWinners((prev) => ({ ...prev, [id]: true }));
      await selectWinner({
        id,
        month,
        year,
      } as SelectWinnerParams).unwrap();
      toast.success("Winner selected successfully!");
    } catch (error) {
      console.error("Error selecting winner:", error);
      if (error instanceof Error) {
        toast.error("Error selecting winner: " + error.message);
      } else {
        toast.error("An unknown error occurred");
      }
      setSelectedWinners((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleExport = () => {
    try {
      const doc = new jsPDF();

      // Title
      doc.setFontSize(18);
      doc.text("Vote Management Table Export", 14, 22);

      // Table headers and data
      const headers = tableHeader.map((header) => header.label);
      const data = tableData.map((item) => [
        "N/A",
        item?.user?.first_name + " " + item?.user?.last_name,
        item?.user?.email || "N/A",
        item?.product?.product_name || "N/A",
        item?.product?.brand_name || "N/A",
        item.payment_method || "N/A",
        item.formattedCreatedAt || "N/A",
        selectedWinners[item?.id] ? "Winner" : "Not Selected",
      ]);

      // Generate table
      autoTable(doc, {
        head: [headers],
        body: data,
        startY: 30,
        theme: "grid",
      });

      // Save the PDF
      doc.save("vote_management_table.pdf");
      toast.success("Table exported successfully!");
    } catch (error) {
      console.error("Error exporting table:", error);
      toast.error("Error exporting table");
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
            {tableData.map((item) => {
              const isWinner = !!selectedWinners[item?.id];
              return (
                <tr key={item.id} className="border-b border-gray">
                  <td className="px-4 py-4 first:pl-6">
                    <div className="flex items-center gap-3">
                      <Image
                        src={item?.user?.profile_image || profile}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-500">
                    {item?.user?.first_name} {item?.user?.last_name}
                  </td>
                  <td className="px-4 py-4 text-[#131D26]">
                    {item?.user?.email}
                  </td>
                  <td className="px-4 py-4 text-[#131D26]">
                    {item?.product?.product_name}
                  </td>
                  <td className="px-4 py-4 text-[#131D26]">
                    {item?.product?.brand_name}
                  </td>
                  <td className="px-4 py-4 text-gray-500">
                    {item.payment_method || "N/A"}
                  </td>
                  <td className="px-4 py-4 text-[#131D26]">
                    {item.formattedCreatedAt}
                  </td>
                  <td>
                    <button
                      onClick={() => handleSelect(item?.id)}
                      className="border border-grey px-6 py-2 bg-transparent rounded-lg text-default font-semibold"
                      disabled={isWinner || isLoading}
                    >
                      {isWinner
                        ? "Winner"
                        : isLoading && selectedWinners[item?.id]
                        ? "Selecting..."
                        : "Select"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-end mt-6">
        <button
          onClick={handleExport}
          className="bg-grey text-default px-6 py-3 rounded-md"
        >
          Export
        </button>
      </div>

      {/* Success/Error Message */}
      {isSuccess && <div className="mt-4 text-green-500">Winner selected!</div>}
      {isError && (
        <div className="mt-4 text-red-500">
          {error && "data" in error
            ? (error.data as { message: string }).message
            : "An error occurred"}
        </div>
      )}
    </div>
  );
}
