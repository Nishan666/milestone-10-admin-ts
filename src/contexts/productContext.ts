import { createContext, Dispatch, SetStateAction } from "react";
import { ProductDataProps } from "../components/Product.types";

interface Pagination {
  offset: number;
  limit: number;
}

interface PriceRange {
  min: number;
  max: number;
}

interface SortState {
  key: keyof ProductDataProps;
  ascending: boolean;
}

export interface ProductContextType {
  productData: ProductDataProps[] | null;
  pagination: Pagination;
  loading: boolean;
  error: any; 
  addProductLoading: boolean;
  deleteLoading: boolean;
  createProduct: (productData: ProductDataProps) => Promise<ProductDataProps | null>;
  editProduct: (id: number, productData: ProductDataProps) => Promise<ProductDataProps | null>;
  deleteProduct: (id: number) => Promise<void>;
  setPagination: Dispatch<SetStateAction<Pagination>>;
  setSearchQuery: (query: string) => void;
  setPriceRange: Dispatch<SetStateAction<PriceRange>>;
  setCategory: Dispatch<SetStateAction<number>>;
  category: number;
  priceRange: PriceRange;
  setSort: Dispatch<SetStateAction<SortState>>;
  totalCount: number;
}

const ProductContext = createContext<ProductContextType>({
  productData: null,
  pagination: { offset: 0, limit: 10 },
  loading: false,
  error: null,
  addProductLoading : false,
  deleteLoading : false,
  createProduct: async () => {
    throw new Error("createProduct function not implemented.");
  },
  editProduct: async () => {
    throw new Error("editProduct function not implemented.");
  },
  deleteProduct: async () => {
    throw new Error("deleteProduct function not implemented.");
  },
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
