import axios from "axios";
import { resolve } from "./resolver";

const getProducts = async (pagination) => {
    const { offset, limit } = pagination;
    const result = await axios.get(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`);
    return resolve(result);
}

const createProducts = async (productData) => {
    const result = await axios.post("https://api.escuelajs.co/api/v1/products", productData);
    return resolve(result);
}

const editProducts = async (id, productData) => {
    const result = await axios.put(`https://api.escuelajs.co/api/v1/products/${id}`, productData);
    return resolve(result);
}

const deleteProducts = async (id) => {
    const result = await axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`);
    return resolve(result);
}

export { getProducts, createProducts, editProducts, deleteProducts };
