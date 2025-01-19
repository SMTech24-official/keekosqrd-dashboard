import { GoArrowLeft, GoArrowRight } from "react-icons/go";

interface TablePaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const TablePagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: TablePaginationProps) => {
  const setPrev = Math.max(1, currentPage - 1);
  const setNext = Math.min(totalPages, currentPage + 1);
  return (
    <div className="absolute right-0 -bottom-20 z-10 w-full flex justify-center items-center gap-2 lg:justify-end">
      <button
        className="bg-white flex justify-center items-center gap-2 px-3 py-2  rounded-md text-sm font-medium disabled:opacity-50 text-text_color disabled:text-gray-500 hover:text-black border"
        onClick={() => setCurrentPage(setPrev)}
        disabled={currentPage === 1}
      >
        <GoArrowLeft />
        Previous
      </button>
      {[...Array(totalPages)]?.map((_, i) => (
        <button
          key={i + 1}
          className={`hidden md:block px-3 py-1 h-full text-sm ${
            currentPage === i + 1
              ? "bg-heading_color text-white rounded-md"
              : " text-text_color border rounded-md hover:bg-heading_color/50 hover:text-white"
          }`}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        className="flex justify-center items-center gap-2 px-3 py-2 rounded-md text-sm font-medium disabled:opacity-50 text-text_color hover:text-black border"
        onClick={() => setCurrentPage(setNext)}
        disabled={currentPage === totalPages}
      >
        Next
        <GoArrowRight />
      </button>
    </div>
  );
};

export default TablePagination;
