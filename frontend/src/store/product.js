import { create } from "zustand";
import api from "../utils/axios.js";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"
    : "/_/backend/api";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields" };
    }

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("image", newProduct.image);

    const res = await api.post("/products", formData);
    set((state) => ({
      products: [...state.products, res.data.data],
    }));

    return { success: true, message: "Create Product Success" };
  },
}));
