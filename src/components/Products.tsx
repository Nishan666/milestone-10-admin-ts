/* eslint-disable react/prop-types */
import { useCallback, useContext, useState } from "react";
import { Product } from "./Product";
import ProductContext from "../contexts/productContext";
import Modal from "./Modal";
import { AddProduct } from "./AddProduct";
import ModalContext from "../contexts/modalContext";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableLoadingSkeleton from "./TableLoadingSkeleton";
import { DeleteConfirmation } from "./DeleteConformation";
import { ProductDataProps , SortState } from "./Product.types";

export const Products = () => {
  const { productData, loading, error, deleteProduct, setSort } =
    useContext(ProductContext);
  const { closeModal, openModal, modal } = useContext(ModalContext);

  const [editData, setEditData] = useState<ProductDataProps | null>(null);

  const [deleteData, setDeleteData] = useState<ProductDataProps | null>(null);

  const handleEditProduct = (item: ProductDataProps): void => {
    setEditData(item);
    openModal();
  };

  const handleDeleteProduct = (item: ProductDataProps): void => {
    setDeleteData(item);
    openModal();
  };

  const resetFields = useCallback(() => {
    setEditData(null);
    setDeleteData(null);
  }, []);

  const handleRemove = async (item: ProductDataProps): Promise<void> => {
    if (item.id) {
      const result = await deleteProduct(item.id);
      console.log(result);
      closeModal();
      setDeleteData(null);
      toast.success("Product Deleted", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleSort = (key: keyof ProductDataProps) => {
    setSort((prevSort) => ({
      key,
      ascending: prevSort.key === key ? !prevSort.ascending : true,
    }));
  };

  if (error) {
    <div>{error}</div>;
  }

  if (loading) {
    return <TableLoadingSkeleton />;
  }

  if (productData) {
    return (
      <div className="px-10">
        <Modal open={modal} resetFields={resetFields} deleteData={!!deleteData}>
          {!deleteData && (
            <AddProduct
              resetFields={resetFields}
              closeModal={closeModal}
              editData={editData}
              setEditData={setEditData}
            />
          )}
          {deleteData && (
            <DeleteConfirmation
              item={deleteData}
              handleConfirm={handleRemove}
              handleCancel={closeModal}
            />
          )}
        </Modal>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-2 h-[81vh]">
          <table className="w-[100%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="sticky top-0 bg-gray-50 z-20">
                {[
                  "id",
                  "title",
                  "category",
                  "price",
                  "created Date",
                  "updated Date",
                ].map((key) => (
                  <th key={key} scope="col" className="px-6 py-3">
                    <span className="flex items-center">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                      <button
                        type="button"
                        onClick={() => handleSort(key as keyof ProductDataProps)}
                        className="ml-1.5 focus:outline-none"
                      >
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                        </svg>
                      </button>
                    </span>
                  </th>
                ))}
                <th
                  scope="col"
                  className="px-6 py-3 flex justify-center sticky right-0 top-0 bg-gray-50 shadow-lg z-20 "
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {productData.map((data) => (
                <Product
                  key={data.id}
                  item={data}
                  handleEditProduct={handleEditProduct}
                  handleRemove={handleDeleteProduct}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};
