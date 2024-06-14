import { useContext } from "react";
import ProductContext from "../contexts/productContext";

export const Pagination = () => {
  const { pagination, setPagination } = useContext(ProductContext);
  const { offset, limit } = pagination;
  const currentPage = Math.floor(offset / limit) + 1;

  const changePage = (newPage) => {
    setPagination((prev) => ({
      ...prev,
      offset: (newPage - 1) * limit,
    }));
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i > 0) {
        pageNumbers.push(i);
      }
    }
    return pageNumbers;
  };

  return (
    <nav
      aria-label="Page navigation example"
      className="m-5 flex justify-center"
    >
      <ul className="flex items-center -space-x-px h-10 text-base">
        {currentPage > 1 && (
          <li>
            <a
              href="#"
              onClick={() => changePage(currentPage - 1)}
              className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-900 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </a>
          </li>
        )}
        {currentPage <= 1 && (
          <li>
            <span
              href="#"
              className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-200 bg-white border border-e-0 border-gray-300 rounded-s-lg cursor-default"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </span>
          </li>
        )}
        {renderPageNumbers().map((page) => (
          <li key={page}>
            <a
              href="#"
              onClick={() => changePage(page)}
              className={`flex items-center justify-center px-4 h-10 leading-tight ${
                page === currentPage
                  ? "text-blue-900 border border-blue-300 bg-blue-50 font-bold"
                  : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-900 font-bold  "
              } dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            >
              {page}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#"
            onClick={() => changePage(currentPage + 1)}
            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-900 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-3 h-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
};
