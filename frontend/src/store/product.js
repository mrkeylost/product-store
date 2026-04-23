import { create } from "zustand";
import api from "../utils/axios.js";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"
    : "/_/backend/api";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  fetchProduct: async () => {
    const res = await api.get("/products");
    set({ products: res.data.data });

    return { success: true, message: res.data.message };
  },
  fetchProductDetail: async (prodId) => {
    const res = await api.get(`/products/${prodId}`);
    set({ products: res.data.data });

    return { success: true, message: res.data.message };
  },
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

    return { success: true, message: res.data.message };
  },
  updateProduct: async (prodId, updatedProduct) => {
    const formData = new FormData();
    formData.append("name", updatedProduct.name);
    formData.append("price", updatedProduct.price);
    formData.append("image", updatedProduct.image);

    const res = await api.patch(`/products/${prodId}`, formData);
    if (!res.data.data)
      return { success: false, message: "Update product failed" };

    set((state) => ({
      products: state.products.map((product) =>
        product._id === prodId ? res.data.data : product,
      ),
    }));

    return { success: true, message: res.data.message };
  },
  deleteProduct: async (prodId) => {
    const res = await api.delete(`/products/${prodId}`);
    if (!res.data.data)
      return { success: false, message: "Delete product failed" };

    set((state) => ({
      products: state.products.filter((product) => product._id !== prodId),
    }));

    return { success: true, message: res.data.message };
  },
}));
