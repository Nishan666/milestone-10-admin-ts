/* eslint-disable react/no-unknown-property */
import { useContext, useRef } from "react";
import ModalContext from "../contexts/modalContext";
import ProductContext from "../contexts/productContext";
import FilterDropdown from "./FilterDropDown";

// eslint-disable-next-line react/prop-types
export const Header = () => {
  const { openModal } = useContext(ModalContext)
  const { setSearchQuery, setCategory, setPriceRange, category, priceRange } = useContext(ProductContext);
  const searchInputRef = useRef(null);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchQuery(searchInputRef.current.value)
  }

  const handlePriceFilter = ({ min, max }) => {
    setPriceRange({ min: min, max: max })
  };

  const handleCategoryChange = (category) => {
    setCategory(category)
  };

  return (
    <div className="flex justify-between items-center shadow-sm pt-2 pb-1 top-0 sticky bg-white  px-10 z-10">
      <div><h1 className="font-bold text-3xl">List Of Products</h1></div>
      <div className="flex items-center justify-center gap-4">

        <div>
          <FilterDropdown handlePriceFilter={handlePriceFilter} handleCategoryChange={handleCategoryChange} category={category} priceRange={priceRange} />
        </div>

        <form onSubmit={handleSearch} className="relative w-72">
          <div className="relative w-72">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input ref={searchInputRef} type="search" id="default-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Name..." required />
            <button type="submit" className="text-white absolute end-2 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
        </form>


        <button
          onClick={openModal}
          type="button"
          className="ms-3 mb-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          <i className="fa-solid fa-plus pe-3"></i>
          Add Product
        </button>
      </div>
    </div>
  );
};
