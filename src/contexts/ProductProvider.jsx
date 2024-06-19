import { useEffect, useState } from "react";
import {
  getProducts,
  createProducts,
  editProducts,
  deleteProducts,
  findLimit,
} from "../api/productApi";
import ProductContext from "./productContext";

// eslint-disable-next-line react/prop-types
const ProductProvider = ({ children }) => {
  const [productData, setProductData] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 3000 })
  const [category, setCategory] = useState(0)

  const [pagination, setPagination] = useState({ offset: 0, limit: 10 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addProductLoading, setAddProductLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const [totalCount, setTotalCount] = useState(0);


  const [sort, setSort] = useState({ id: false, name: false, price: false, createdDate: false, updatedDate: false })

  useEffect(() => {

    const updateTotalCount = async () => {
      const totalCount = await getTotalCount();
      setTotalCount(totalCount);
    }

    setPagination((prev) => ({ ...prev, offset: 0 }));
    updateTotalCount()
  }, [searchQuery, category, priceRange]);


  useEffect(() => {
    fetchProducts();
  }, [pagination]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    const result = await getProducts(pagination, searchQuery, priceRange, category);
    if (result.error) {
      setError(result.error.message);
    } else {
      setProductData(result.data);
    }
    setLoading(false);
  };

  const getTotalCount = async () => {
    try {
      const totalCount = await findLimit(2000, searchQuery, priceRange, category);
      return totalCount;
    } catch (error) {
      console.error("Error fetching total count:", error);
      return 0;
    }
  };

  useEffect(() => {
    if (productData && sort.key) {
      const sortedData = [...productData].sort((a, b) => {
        console.log(sort.key);
        let keyA = "";
        let keyB = "";
        if (sort.key === "category") {
          keyA = a[sort.key].name;
          keyB = b[sort.key].name;
        } else {
          keyA = a[sort.key];
          keyB = b[sort.key];
        }
        if (sort.key === 'createdDate' || sort.key === 'updatedDate') {
          keyA = new Date(keyA);
          keyB = new Date(keyB);
        } else if (sort.key === 'category' || sort.key === 'name') {
          keyA = keyA.toLowerCase();
          keyB = keyB.toLowerCase();
        }
        if (!sort.ascending) {
          return keyA < keyB ? -1 : keyA > keyB ? 1 : 0;
        } else {
          return keyA > keyB ? -1 : keyA < keyB ? 1 : 0;
        }
      });
      setProductData(sortedData);
    }
  }, [sort]);

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
