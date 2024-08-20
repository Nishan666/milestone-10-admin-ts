/* eslint-disable react/prop-types */
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { getCategories } from "../api/categoryApi";

export interface FilterDropdownProps {
  handlePriceFilter: (priceRange: { min: number; max: number }) => void;
  handleCategoryChange: (categoryId: number) => void;
  category: number;
  priceRange: {
    min: number;
    max: number;
  };
}

const FilterDropdown = ({
  handlePriceFilter,
  handleCategoryChange,
  category,
  priceRange,
} : FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [minPrice, setMinPrice] = useState<number>(priceRange.min);
  const [maxPrice, setMaxPrice] = useState<number>(priceRange.max);
  const [selectedCategory, setSelectedCategory] = useState<number>(category);

  const [filterCount, setFilterCount] = useState<number>(0);

  const fetchCategory = async () : Promise<void> => {
    const result = await getCategories();
    if (result.error) {
      console.log(result.error);
    } else {
      setCategories(result.data || []);
    }
  };

  useEffect(() => {
    fetchCategory();

    let initialFilterCount = 0;
    if (minPrice > 0) initialFilterCount++;
    if (maxPrice < 3000) initialFilterCount++;
    if (category !== 0) initialFilterCount++;
    setFilterCount(initialFilterCount);
  }, [category, maxPrice, minPrice]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const applyFilters = () => {
    let newFilterCount = 0;
    if (minPrice > 0) newFilterCount++;
    if (maxPrice < 3000) newFilterCount++;
    if (selectedCategory !== 0) newFilterCount++;

    setFilterCount(newFilterCount);

    if (minPrice <= maxPrice) {
      handlePriceFilter({
        min: minPrice,
        max: maxPrice,
      });
      handleCategoryChange(selectedCategory);
      setIsOpen(false);
    } else {
      alert("Min price should not be greater than Max price.");
    }
  };

  const clearFilter = async () => {
    setMinPrice(0);
    setMaxPrice(3000);
    setSelectedCategory(0);
    setFilterCount(0);
    handlePriceFilter({ min: 0, max: 3000 });
    handleCategoryChange(0);
  };

  const handleMinSliderChange = (event : ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (value <= maxPrice) {
      setMinPrice(value);
    }
  };

  const handleMaxSliderChange = (event : ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (value >= minPrice) {
      setMaxPrice(value);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        <button
          onClick={toggleDropdown}
          className="flex items-center space-x-2"
          id="filter-menu"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <span>Filter</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
          <div className="absolute inline-flex items-center justify-center w-4 h-4 text-xs font-semibold text-white bg-blue-500 border-1 border-white rounded-full -top-1 -end-1 dark:border-gray-900">
            {filterCount}
          </div>
        </button>
      </div>
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-72 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="filter-menu"
        >
          <div className="py-1" role="none">
            <div className="px-4 py-2" role="menuitem">
              <label className="block text-sm font-medium text-gray-700">
                Min Price
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(parseFloat(e.target.value))}
                  className="block w-full p-2 mt-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  placeholder="Min Price"
                  min="0"
                  max="3000"
                  step="100"
                />
                <input
                  type="range"
                  min="0"
                  max="3000"
                  value={minPrice}
                  onChange={handleMinSliderChange}
                  step="100"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </label>
            </div>
            <div className="px-4 py-2" role="menuitem">
              <label className="block text-sm font-medium text-gray-700">
                Max Price
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
                  className="block w-full p-2 mt-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  placeholder="Max Price"
                  min="0"
                  max="3000"
                  step="100"
                />
                <input
                  type="range"
                  min="0"
                  max="3000"
                  value={maxPrice}
                  onChange={handleMaxSliderChange}
                  step="100"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </label>
            </div>

            <div className="border-t border-gray-200"></div>
            <div className="px-4 py-2" role="menuitem">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
                <select
                  onChange={(e :ChangeEvent<HTMLSelectElement> ) => setSelectedCategory(parseInt(e.target.value, 10))}
                  value={selectedCategory}
                  aria-label="Category"
                  className="block w-full mt-1 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                >
                  <option value={0} className="text-blue-700 hover:bg-red-100">
                    All
                  </option>
                  {categories &&
                    categories.slice(0, 5).map((category) => (
                      <option
                        key={category.id}
                        value={category.id}
                        className="text-gray-700 hover:bg-blue-100"
                      >
                        {category.name}
                      </option>
                    ))}
                </select>
              </label>
            </div>
            <div
              className="px-4 py-2 flex justify-between gap-2"
              role="menuitem"
            >
              <button
                type="button"
                onClick={applyFilters}
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                Apply Filters
              </button>
              <button
                type="button"
                onClick={clearFilter}
                className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
