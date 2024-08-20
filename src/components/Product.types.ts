export interface ProductDataProps {
  id?: number;
  name?: string;
  price?: number;
  title?: string;
  category?: {
    name: string;
  };
  description?: string;
  images?: string[];
  creationAt?: string; 
  updatedAt?: string; 
}

export interface AddProductProps {
  closeModal: () => void;
  editData: ProductDataProps | null;
  setEditData: (data: ProductDataProps | null) => void;
  resetFields: () => void;
}

export interface CategoryProps {
  id: number;
  name: string;
}

export interface SortState {
  key: keyof ProductDataProps; 
  ascending: boolean;
}





