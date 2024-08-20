import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.css";
import ProductProvider from "./contexts/ProductProvider.js";
import ModalProvider from "./contexts/ModalProvider.js";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
    <ModalProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </ModalProvider>
  </React.StrictMode>
);

// or
// ReactDOM.createRoot(document.getElementById("root")!).render(

