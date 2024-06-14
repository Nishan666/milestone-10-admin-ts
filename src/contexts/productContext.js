import { createContext } from "react";

const ProductContext = createContext({
  productData: null,
  pagination: { offset: 0, limit: 10 },
  loading: false,
  error: null,
  createProduct: () => {},
  editProduct: () => {},
  deleteProduct: () => {},
  setPagination: () => {},
});

export default ProductContext;
