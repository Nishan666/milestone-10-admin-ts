import { ProductDataProps } from "./Product.types";

interface ProductProps {
  item: ProductDataProps;
  handleEditProduct: (item: ProductDataProps) => void;
  handleRemove: (item: ProductDataProps) => void;
}

export const Product = ({
  item,
  handleEditProduct,
  handleRemove,
}: ProductProps) => {
  const cleanUrlString = (url: string): string => {
    return url.replace(/^\[\"|\"\]$/g, "");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      {item && (
        <tr className="border-b dark:border-gray-700">
          <td className="px-6 py-4 w-4">
            <span className="rounded-lg bg-green-200 px-2.5 py-0.5 text-xs font-extrabold">
              {item.id}
            </span>
          </td>
          <td
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center w-1/3"
          >
            {item.images && (
              <img
                src={cleanUrlString(item.images[0])}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://curie.pnnl.gov/sites/default/files/default_images/default-image_0.jpeg";
                }}
                className="w-10 h-10 rounded-full me-4"
                alt=""
              />
            )}
            <span className="text-base text-gray-900 font-semibold">
              {item.title}
            </span>
          </td>
          {item.category?.name && (
            <td className="px-6 py-4 font-medium text-gray-900 ">
              {item.category.name}
            </td>
          )}
          <td className="px-6 py-4 font-medium text-gray-900 ">
            ${item.price}
          </td>
          {item.creationAt && (
            <td className="px-6 py-4 font-medium text-gray-900 ">
              {formatDate(item.creationAt)}
            </td>
          )}
          {item.updatedAt && (
            <td className="px-6 py-4 font-medium text-gray-900">
              {formatDate(item.updatedAt)}
            </td>
          )}

          <td className="px-6 py-4 sticky top-0 right-0 z-10 bg-white shadow-lg ">
            <div className="flex justify-around items-center">
              <span
                className="font-semibold text-blue-600 dark:text-blue-500 cursor-pointer"
                onClick={() => handleEditProduct(item)}
              >
                Edit
              </span>
              <i
                onClick={() => handleRemove(item)}
                className="fa-solid fa-circle-xmark fa-lg cursor-pointer"
                style={{ color: "#93969a" }}
              />
            </div>
          </td>
        </tr>
      )}
    </>
  );
};
