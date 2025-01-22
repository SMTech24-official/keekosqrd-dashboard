"use client";

import Image from "next/image";
import { TableProps } from "@/interface/table.type";
import profile from "@/assets/logo/profileee.png";
import { useSelectWinnerMutation } from "@/redux/features/Votes/votesApi"; 
import { toast } from "sonner";

export default function VoteManagementTable({
  tableHeader,
  tableData,
  // isDelete = false,
}: TableProps) {
  // Use the mutation hook to select a winner
  const [selectWinner, { isLoading, isError, error, isSuccess }] =
    useSelectWinnerMutation();

  const dateFormat = new Date();
  const month = dateFormat && dateFormat.getMonth() + 1; 
  const year = dateFormat && dateFormat.getFullYear(); 
  interface SelectWinnerParams {
    userId: string;
    month: number;
    year: number;
  }

  const handleSelect = async (userId: string): Promise<void> => {
    try {
      // Call the API to select the winner with userId, month, and year
      await selectWinner({
        userId,
        month,
        year,
      } as SelectWinnerParams).unwrap(); // unwrap to handle the response
      toast.success("Winner selected successfully!");
    } catch (error) {
      console.error("Error selecting winner:", error);
      if (error instanceof Error) {
        toast.error("Error selecting winner: " + error.message);
      } else {
        toast.error("An unknown error occurred");
      }
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
                      onClick={() => handleSelect(item?.votes?.product_id)}
                      className="border border-grey px-6 py-2 bg-transparent rounded-lg text-default font-semibold"
                      disabled={isLoading}
                    >
                      {isLoading ? "Selecting..." : "Winner"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-end mt-6">
        <button className="bg-grey text-default px-6 py-3 rounded-md">
          Export
        </button>
      </div>

      {/* Success/Error Message */}
      {isSuccess && <div className="mt-4 text-green-500">Winner selected!</div>}
      {isError && (
        <div className="mt-4 text-red-500">
          {error && 'data' in error ? (error.data as { message: string }).message : "An error occurred"}
        </div>
      )}
    </div>
  );
}
