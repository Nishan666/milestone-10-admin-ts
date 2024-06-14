import { useContext } from "react";
import ModalContext from "../contexts/modalContext";

// eslint-disable-next-line react/prop-types
export const Header = () => {
    const {openModal} = useContext(ModalContext)
  return (
    <div className="flex justify-between py-5">
      <h1 className="font-bold text-3xl">List Of Products</h1>
      <button
        onClick={openModal}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        <i className="fa-solid fa-plus pe-3"></i>
        Add Products
      </button>
    </div>
  );
};
