import { useEffect, useState } from "react";
import {
  getProducts,
  createProducts,
  editProducts,
  deleteProducts,
} from "../api/productApi";
import ProductContext from "./productContext";

// eslint-disable-next-line react/prop-types
const ProductProvider = ({ children }) => {
  const [productData, setProductData] = useState(null);

  const [pagination, setPagination] = useState({ offset: 0, limit: 10 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [addProductLoading , setAddProductLoading] = useState(false)

  const [deleteLoading , setDeleteLoading] = useState(false)

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    const result = await getProducts(pagination);
    if (result.error) {
      setError(result.error.message);
    } else {
      setProductData(result.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [pagination]);

  const createProduct = async (productData) => {
    setAddProductLoading(true);
    setError(null);
    const result = await createProducts(productData);
    if (result.error) {
      setError(result.error.message);
    } else {
      await fetchProducts();
    }
    setAddProductLoading(false);
    return result
  };

  const editProduct = async (id, productData) => {
    setAddProductLoading(true);
    setError(null);
    const result = await editProducts(id, productData);
    if (result.error) {
      setError(result.error.message);
    } else {
      await fetchProducts();
    }
    setAddProductLoading(false);
    return result
  };

  const deleteProduct = async (id) => {
    setDeleteLoading(true)
    setError(null);
    const result = await deleteProducts(id);
    if (result.error) {
      setError(result.error.message);
    } else {
      await fetchProducts();
    }
    setDeleteLoading(false)
  };

  const contextValue = {
    productData,
    pagination,
    setPagination,
    loading,
    error,
    createProduct,
    editProduct,
    deleteProduct,
    addProductLoading,
    deleteLoading
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
