import axios from "axios";
import { resolve } from "./resolver";

interface Category {
  id: number;
  name: string;
  image : string;
  creationAt: string;
  updatedAt : string;
}

interface ResolvedResult<T> {
  data: T | null;
  error: any | null;
}

const getCategories = async (): Promise<ResolvedResult<Category[]>> => {
  return resolve(axios.get<Category[]>("https://api.escuelajs.co/api/v1/categories"));
};

export { getCategories };
