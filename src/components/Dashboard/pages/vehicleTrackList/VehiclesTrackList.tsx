// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import TablePagination from "@/components/ui/tables/TablePagination";
// import VehiclesTrackListTable from "@/components/ui/tables/VehiclesTrackListTable";
// import {
//   vehicleData,
//   vehicleTableHeaders,
// } from "@/constants/vehicaleTrackData";
// import { useState } from "react";

// export default function VehiclesTrackList() {
//   const [currentPage, setCurrentPage] = useState(1);

//   // Calculate pagination
//   const itemsPerPage = 5;
//   const totalPages = Math.ceil(vehicleData?.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedData = vehicleData.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );
//   return (
//     <div className="relative mt-8 ">
//       <div className="overflow-x-hidden-hidden overflow-x-auto">
//         <VehiclesTrackListTable
//           tableHeader={vehicleTableHeaders}
//           tableData={paginatedData}
//         />
//       </div>
//       {/* Pagination */}
//       <TablePagination
//         currentPage={currentPage}
//         setCurrentPage={setCurrentPage}
//         totalPages={totalPages}
//       />
//     </div>
//   );
// }
