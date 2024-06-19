import { createContext } from "react";

const ProductContext = createContext({
  productData: null,
  pagination: { offset: 0, limit: 10 },
  loading: false,
  error: null,
  addProductLoading : false,
  deleteLoading : false,
  createProduct: () => {},
  editProduct: () => {},
  deleteProduct: () => {},
  setPagination: () => {},
  setSearchQuery : () => {},
  setPriceRange : () => {},
  setCategory : () => {},
  category : 0,
  priceRange : {min : 0 , max : 3000},
  setSort : () => {},
  totalCount : 0,
});

export default ProductContext;
