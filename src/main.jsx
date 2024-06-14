import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.css";
import ProductProvider from "./contexts/ProductProvider.jsx";
import ModalProvider from "./contexts/ModalProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ModalProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </ModalProvider>
  </React.StrictMode>
);
