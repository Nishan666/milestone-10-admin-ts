import { useContext, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import ProductContext from '../contexts/productContext';

export const Pagination = () => {
  const { pagination, setPagination, totalCount: count } = useContext(ProductContext);
  const { offset, limit } = pagination;

  const [initialPage, setInitialPage] = useState(Math.floor(offset / limit));

  useEffect(() => {
    setInitialPage(Math.floor(offset / limit));
  }, [offset, limit]);

  const handlePageClick = (selectedItem) => {
    const newOffset = selectedItem.selected * limit;
    setPagination((prev) => ({
      ...prev,
      offset: newOffset,
    }));
  };

  return (
    <div className="sticky bottom-0 bg-white shadow-xl shadow-black py-2">
      <ReactPaginate
        forcePage={initialPage}
        previousLabel="Previous"
        nextLabel="Next"
        breakLabel="..."
        pageCount={Math.ceil(count / limit)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="flex justify-center"
        pageClassName="pagination-default text-gray-700 hover:bg-blue-400"
        previousClassName="pagination-default text-gray-700 rounded"
        nextClassName="pagination-default text-gray-700 rounded" 
        breakClassName="pagination-default bg-white text-gray-700 hover:bg-gray-50"
        activeClassName="pagination-default bg-blue-500 hover:bg-blue-600"
        disabledClassName="pagination-default bg-gray-300 text-gray-100 cursor-not-allowed  disabled-class"
      />
    </div>
  );
};
