"use client";

import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";

import { TableProps } from "@/interface/table.type";

import Link from "next/link";

import nikshoes from "@/assets/logo/nike-shoes.jpg";
import { useDeleteCommunityMutation } from "@/redux/features/community/CommunityApi";
import { ToastContainer } from "react-toastify";
import { toast } from "sonner";

export default function CommunityTable({
  tableHeader,
  tableData,
}: // isDelete = false,
TableProps) {
  const [deleteCommunityFn] = useDeleteCommunityMutation();

  const handleDelete = async (id: string) => {
    const response = await deleteCommunityFn(id).unwrap();
    if (response.status) {
      toast.success("Product Delete Successfully");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full overflow-auto bg-white rounded-lg shadow-md">
      <Link
        href={"/add-community"}
        className="p-5 flex justify-start sm:justify-end"
      >
        <Button>
          <Plus className="text-white" /> Add Community
        </Button>
      </Link>
      <table className="w-full text-sm md:text-base border-y">
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
          {Array.isArray(tableData) &&
            tableData?.map((item) => {
              // const isChecked = selectedRows.includes(item.id);
              return (
                <tr
                  key={item?.id}
                  className="border-b border-gray-200 last:border-0"
                >
                  <td className="px-4 py-4 first:pl-6">
                    <div className="flex items-center gap-3">
                      <Image
                        src={
                          `https://api.ksquaredsourcedcity.com/storage/${item?.product_image}` ||
                          nikshoes
                        }
                        alt={"image"}
                        width={40}
                        height={40}
                        className="rounded-full border-2 object-cover w-12 h-12"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-500">
                    {item?.product_name}
                  </td>
                  <td className="px-4 py-4 text-gray-500">{item?.brand}</td>

                  <td className="px-4 py-4 text-gray-500">{item?.model}</td>

                  <td className="px-4 py-4">
                    <button onClick={() => handleDelete(item?.id)}>
                      {" "}
                      <Trash2 className="text-red-500 text-center" />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}
