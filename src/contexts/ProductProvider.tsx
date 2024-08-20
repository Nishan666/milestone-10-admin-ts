import { ReactNode, useEffect, useState } from "react";
import {
  getProducts,
  createProducts,
  editProducts,
  deleteProducts,
  findLimit,
} from "../api/productApi";
import ProductContext, { ProductContextType } from "./productContext";
import { ProductDataProps } from "../components/Product.types";

interface ProductProviderProps {
  children: ReactNode;
}

interface SortState {
  key: keyof ProductDataProps;
  ascending: boolean;
}

// eslint-disable-next-line react/prop-types
const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [productData, setProductData] = useState<ProductDataProps[] | null>(
    null
  );

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 3000,
  });
  const [category, setCategory] = useState<number>(0);

  const [pagination, setPagination] = useState<{
    offset: number;
    limit: number;
  }>({ offset: 0, limit: 10 });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [addProductLoading, setAddProductLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const [totalCount, setTotalCount] = useState<number>(0);

  const [sort, setSort] = useState<SortState>({ key: "id", ascending: true });

  useEffect(() => {
    const updateTotalCount = async () => {
      const totalCount = await getTotalCount();
      if (totalCount) {
        setTotalCount(totalCount);
      }
    };

    updateTotalCount();
  }, [searchQuery, category, priceRange]);

  useEffect(() => {
    fetchProducts();
  }, [pagination, searchQuery, category, priceRange]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    const result = await getProducts(
      pagination,
      searchQuery,
      priceRange,
      category
    );
    if (result.error) {
      setError(result.error.message);
    } else {
      setProductData(result.data);
    }
    setLoading(false);
  };

  const getTotalCount = async () => {
    try {
      const totalCount = await findLimit(
        2000,
        searchQuery,
        priceRange,
        category
      );
      return totalCount;
    } catch (error) {
      console.error("Error fetching total count:", error);
      return 0;
    }
  };

  useEffect(() => {
    if (productData && sort.key) {
      const sortedData = [...productData].sort((a, b) => {
        let keyA: any;
        let keyB: any;

        if (sort.key === "category") {
          keyA = a[sort.key]?.name.toLowerCase();
          keyB = b[sort.key]?.name.toLowerCase();
        } else {
          keyA = a[sort.key];
          keyB = b[sort.key];
        }

        if (typeof keyA === "string" && typeof keyB === "string") {
          keyA = keyA.toLowerCase();
          keyB = keyB.toLowerCase();
        }

        if (sort.ascending) {
          return keyA > keyB ? 1 : keyA < keyB ? -1 : 0;
        } else {
          return keyA < keyB ? 1 : keyA > keyB ? -1 : 0;
        }
      });

      setProductData(sortedData); // This could trigger another re-render
    }
  }, [sort]); // Only listen to changes in sort, not productData

  const createProduct = async (
    productData: ProductDataProps
  ): Promise<ProductDataProps | null> => {
    setAddProductLoading(true);
    setError(null);
    const result = await createProducts(productData);
    if (result.error) {
      setError(result.error.message);
      setAddProductLoading(false);
      return null;
    }
    if (result.data) {
      await fetchProducts();
      setAddProductLoading(false);
      return result.data;
    }
    setAddProductLoading(false);
    return null;
  };

  const editProduct = async (
    id: number,
    productData: ProductDataProps
  ): Promise<ProductDataProps | null> => {
    setAddProductLoading(true);
    setError(null);
    const result = await editProducts(id, productData);
    if (result.error) {
      setError(result.error.message);
    } else {
      await fetchProducts();
    }
    setAddProductLoading(false);
    if (result.data) {
      return result.data;
    }
    return null;
  };

  const deleteProduct = async (id: number): Promise<void> => {
    setDeleteLoading(true);
    setError(null);
    const result = await deleteProducts(id);
    if (result.error) {
      setError(result.error.message);
    } else {
      await fetchProducts();
    }
    setDeleteLoading(false);
  };

  const contextValue: ProductContextType = {
    productData,
    pagination,
    setPagination,
    loading,
    error,
    createProduct,
    editProduct,
    deleteProduct,
    addProductLoading,
    deleteLoading,
    setSearchQuery,
    setPriceRange,
    setCategory,
    category,
    priceRange,
    setSort,
    totalCount,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
