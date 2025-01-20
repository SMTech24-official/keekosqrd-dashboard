"use client";

import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import { TableProps } from "@/interface/table.type";

import Link from "next/link";

import { ToastContainer } from "react-toastify";
import nikshoes from "@/assets/logo/nike-shoes.jpg";
import { useDeleteProductMutation } from "@/redux/features/products/productsApi";
import { toast } from "sonner";

export default function TotalDriverTable({
  tableHeader,
  tableData,
}: // isDelete = false,
TableProps) {
  const [deleteProductFn] = useDeleteProductMutation();

  const handleDelete = async (id: string) => {
    const response = await deleteProductFn(id).unwrap();
    if (response.status) {
      toast.success("Product Delete Successfully");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full overflow-auto bg-white rounded-lg shadow-md">
      <Link
        href={"/add-products"}
        className="p-5 flex justify-start sm:justify-end"
      >
        <Button>
          <Plus className="text-white" /> Add Products
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
            tableData?.map((item: any) => {
              // const isChecked = selectedRows.includes(item.id);
              return (
                <tr
                  key={item?.id}
                  className="border-b border-gray-200 last:border-0"
                >
                  <td className="px-4 py-4 first:pl-6">
                    <div className="flex items-center gap-3">
                      <Image
                        src={item?.product_image?.src || nikshoes}
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
                  <td className="px-4 py-4 text-gray-500">
                    {item?.brand_name}
                  </td>
                  <td className="px-4 py-4 text-gray-500">{item?.price}</td>
                  <td className="px-4 py-4 text-gray-500">{item?.model}</td>
                  <td className="px-4 py-4 text-gray-500">{item?.size}</td>
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
