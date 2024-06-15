import { Header } from "./components/Header";
import { Pagination } from "./components/Pagination";
import { Products } from "./components/Products";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <div>
        <ToastContainer />
        <Header />
        <Products />
        <Pagination />
      </div>
    </>
  );
};

export default App;
