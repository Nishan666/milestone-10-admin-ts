import React from "react";
import { Header } from "./components/Header";
import { Pagination } from "./components/Pagination";
import { Products } from "./components/Products";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App : React.FC = () => {
  return (
    <>
      <ToastContainer />
      <Header />
      <Products />
      <Pagination />
    </>
  );
};

export default App;
