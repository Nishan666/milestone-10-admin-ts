/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { Product } from "./Product";
import ProductContext from "../contexts/productContext";
import Modal from "./Modal";
import { AddProduct } from "./AddProduct";
import ModalContext from "../contexts/modalContext";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableLoadingSkeleton from "./TableLoadingSkeleton";
import { DeleteConfirmation } from "./DeleteConformation";

export const Products = () => {
  const { productData, loading, error, deleteProduct } =
    useContext(ProductContext);
  const { closeModal, openModal, modal } = useContext(ModalContext);

  const [editData, setEditData] = useState(null);

  const [deleteData, setDeleteData] = useState(null);

  const handleEditProduct = (item) => {
    setEditData(item);
    openModal();
  };

  const handleDeleteProduct = (item) => {
    setDeleteData(item);
    openModal();
  };

  const resetFields = () => {
    setEditData(null);
    setDeleteData(null)
  };

  const handleRemove = async (item) => {
    const result = await deleteProduct(item.id);
    console.log(result);
    closeModal()
    setDeleteData(null)
    toast.warn("Product Deleted!", {
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
  };

  if (error) {
    <div>{error}</div>;
  }

  if (loading) {
    return (
      <TableLoadingSkeleton />
    );
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



        <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-2">
          <table className="w-[100%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Created Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Updated Date
                </th>
                <th scope="col" className="px-6 py-3 sticky right-0 bg-gray-50  shadow-lg ">
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
    )
  }

}