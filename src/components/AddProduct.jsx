/* eslint-disable no-undef */
/* eslint-disable no-useless-escape */
import { useContext, useEffect, useState } from "react";
import { getCategory } from "../api/categoryApi";
import ProductContext from "../contexts/productContext";
import { postImage } from "../api/imageApi";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* eslint-disable react/prop-types */
export const AddProduct = ({
  closeModal,
  editData,
  setEditData,
  resetFields,
}) => {
  const [categories, setCategories] = useState([]);
  const { createProduct, editProduct, loading, error } =
    useContext(ProductContext);

  const [title, setTitle] = useState(editData ? editData.title : "");
  const [price, setPrice] = useState(editData ? editData.price : "");
  const [category, setCategory] = useState(
    editData && editData.category ? editData.category.name : ""
  );
  const [description, setDescription] = useState(
    editData ? editData.description : ""
  );

  const [file, setFile] = useState(null);

  const cleanUrlString = (url) => {
    return url.replace(/^\[\"|\"\]$/g, "");
  };

  const [fileUrl, setFileUrl] = useState(
    editData ? cleanUrlString(editData.images[0]) : ""
  );

  useEffect(() => {
    const fetchCategory = async () => {
      const result = await getCategory();
      if (result.error) {
        console.log(result.error);
      } else {
        setCategories(result.data);
      }
    };
    fetchCategory();
  }, []);

  const handleImageUpload = async (file) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const imgUrl = await postImage(formData);
        setFileUrl(imgUrl.data.location);
        return imgUrl.data.location;
      } catch (error) {
        console.error("Error uploading image:", error);
        return null;
      }
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    closeModal();

    let imageUrl = fileUrl;

    if (file && !fileUrl) {
      imageUrl = await handleImageUpload(file);
      if (!imageUrl) {
        return;
      }
    }

    const selectedCategory = categories.find((cat) => cat.name === category);
    const categoryId = selectedCategory ? selectedCategory.id : null;

    const productData = {
      title,
      price: parseFloat(price),
      categoryId,
      description,
      images: imageUrl
        ? [imageUrl]
        : ["https://www.caspianpolicy.org/no-image.png"],
    };

    let result = null;
    if (editData) {
      result = await editProduct(editData.id, productData);
      toast.success("Edit Successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      result = await createProduct(productData);
      toast.success(`Product ID : ${result.data.id}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }

    setTitle("");
    setPrice("");
    setCategory("");
    setDescription("");
    setFileUrl("");
    setFile(null);
    setEditData(null);
    resetFields();
    resetFields();
  };

  if (error) {
    <div>{error}</div>;
  }

  if (loading) {
    return (
      <div className="h-screen flex justify-center my-16">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="bg-gray-100 h-10 flex justify-end px-3 mb-2">
        <button onClick={closeModal}>
          <i
            className="fa-solid fa-circle-xmark fa-lg"
            style={{ color: "#93969a" }}
          />
        </button>
      </header>
      <form className="max-w-sm mx-auto py-6" onSubmit={handleSubmit}>
        <div className="mb-5 flex gap-4">
          <div>
            <label
              htmlFor="title"
              className="block mb-1 text-sm font-semibold text-gray-700 dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="font-medium shadow-sm bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block mb-1 text-sm font-semibold text-gray-700 dark:text-white"
            >
              Price
            </label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              id="price"
              className="font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none shadow-sm bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
        </div>
        {/* In edit , change category is not possible */}
        {!editData ? (
          <div className="mb-5">
            <label
              htmlFor="category"
              className="block mb-1 text-sm font-semibold text-gray-700 dark:text-white"
            >
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              name="category"
              id="category"
              className="shadow-sm bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            >
              {categories &&
                categories.slice(0, 5).map((cat, index) => (
                  <option
                    key={index}
                    value={cat.name}
                    className="font-bold text-gray-700 text-sm"
                  >
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>
        ) : (
          <div className="mb-5">
            <label
              htmlFor="category"
              className="block mb-1 text-sm font-semibold text-gray-700 dark:text-white"
            >
              Category{" "}
              <span className="text-xs font-light text-gray-500">
                (readonly)
              </span>
            </label>
            <input
              value={category}
              name="category"
              id="category"
              disabled
              className="shadow-sm bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            ></input>
          </div>
        )}
        <div className="mb-5">
          <label
            htmlFor="description"
            className="block mb-1 text-sm font-semibold text-gray-700 dark:text-white"
          >
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            rows={3}
            className="font-medium shadow-sm bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          ></textarea>
        </div>

        {fileUrl != "" || file ? (
          <div className="mb-5 flex items-start">
            <img
              src={file ? URL.createObjectURL(file) : fileUrl}
              alt="No Image"
              className="rounded-full w-14 h-14 object-cover"
            />
            <button
              onClick={() => (fileUrl === "" ? setFile(null) : setFileUrl(""))}
              className="text-sm text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <i
                className="fa-solid fa-file-circle-xmark"
                style={{ color: "#c01c28" }}
              />
            </button>
          </div>
        ) : null}

        {!file && fileUrl === "" && (
          <div className="mb-5">
            <label
              htmlFor="dropzone-file"
              className="block mb-1 text-sm font-semibold text-gray-700 dark:text-white"
            >
              Cover Photo
            </label>
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold text-blue-600">
                    Upload a file
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG, GIF upto 10MB
                </p>
              </div>
              <input
                id="dropzone-file"
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                className="hidden"
              />
            </label>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};
