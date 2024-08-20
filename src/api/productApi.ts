import axios from "axios";
import { resolve } from "./resolver";
import { ProductDataProps } from "../components/Product.types";

// Define the type for a product
interface Product {
  id: number;
  title: string;
  price: number;
  category: {
    id: number;
    name: string;
  };
  images: string[];
  description: string;
  creationAt: string;
  updatedAt: string;
}

// Define the type for pagination
interface Pagination {
  offset: number;
  limit: number;
}

// Define the type for price range
interface PriceRange {
  min: number;
  max: number;
}

interface ResolvedResult<T> {
  data: T | null;
  error: any | null;
}

const getProducts = async (
  pagination: Pagination,
  searchQuery = "",
  priceRange: PriceRange = { min: 0, max: 10000 },
  category :number
): Promise<ResolvedResult<Product[]>> => {
  const { offset, limit } = pagination;
  const { min, max } = priceRange;

  return resolve(
    axios.get<Product[]>("https://api.escuelajs.co/api/v1/products", {
      params: {
        offset,
        limit,
        title: searchQuery,
        price_min: min,
        price_max: max,
        categoryId: category,
      },
    })
  );
};

const createProducts = async (
  productData: ProductDataProps
): Promise<ResolvedResult<Product>> => {
  return resolve(
    axios.post<Product>("https://api.escuelajs.co/api/v1/products", productData)
  );
};

const editProducts = async (
  id: number,
  productData: ProductDataProps
): Promise<ResolvedResult<Product>> => {
  return resolve(
    axios.put<Product>(
      `https://api.escuelajs.co/api/v1/products/${id}`,
      productData
    )
  );
};

const deleteProducts = async (id: number) => {
  return resolve(
    axios.delete<null>(`https://api.escuelajs.co/api/v1/products/${id}`)
  );
};

const findLimit = async (
  limit: number,
  searchQuery: string = "",
  priceRange: PriceRange = { min: 0, max: 10000 },
  category: number 
): Promise<number | undefined> => {
  const { min, max } = priceRange;

  const resolvedResult = await resolve(
    axios.get<Product[]>("https://api.escuelajs.co/api/v1/products", {
      params: {
        limit,
        title: searchQuery,
        price_min: min,
        price_max: max,
        categoryId: category,
      },
    })
  );

  return resolvedResult.data?.length;
};

export { getProducts, createProducts, editProducts, deleteProducts, findLimit };
