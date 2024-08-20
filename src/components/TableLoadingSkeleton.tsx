/* eslint-disable react/prop-types */
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const TableLoadingSkeleton = ({ numRows  = 10, numCols  = 7 }) => {
  const renderSkeletonRows = () => {
    return [...Array(numRows)].map((_, rowIndex) => (
      <tr key={rowIndex}>
        {renderSkeletonCells(numCols)}
      </tr>
    ));
  };

  const renderSkeletonCells = (numCols : number) => {
    return [...Array(numCols)].map((_, colIndex) => (
      <td key={colIndex} className="px-6 py-6">
        <Skeleton width={getSkeletonWidth(colIndex)} height={10} />
      </td>
    ));
  };

  const getSkeletonWidth = (index : number) => {
    // Adjust the widths based on your specific column requirements
    switch (index) {
      case 0: return 20; // Id column width
      case 1: return 100; // Name column width
      case 2: return 60; // Category column width
      case 3: return 40; // Price column width
      case 4: return 80; // Created Date column width
      case 5: return 80; // Updated Date column width
      default: return 60; // Actions column width
    }
  };

  return (
    <div className="h-full px-10">
      <div className="overflow-x-auto shadow-md sm:rounded-lg my-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 divide-y divide-gray-200">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-4 w-1/12">
                <Skeleton width={20} height={10} />
              </th>
              <th scope="col" className="px-6 py-4 w-1/2">
                <Skeleton width={100} height={10} />
              </th>
              <th scope="col" className="px-6 py-4 w-1/5">
                <Skeleton width={60} height={10} />
              </th>
              <th scope="col" className="px-6 py-4 w-1/6">
                <Skeleton width={40} height={10} />
              </th>
              <th scope="col" className="px-6 py-4 w-1/3">
                <Skeleton width={80} height={10} />
              </th>
              <th scope="col" className="px-6 py-4 w-1/3">
                <Skeleton width={80} height={10} />
              </th>
              <th scope="col" className="px-6 py-4 sticky right-0 bg-gray-50 shadow-lg">
                <Skeleton width={60} height={10} />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {renderSkeletonRows()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableLoadingSkeleton;
