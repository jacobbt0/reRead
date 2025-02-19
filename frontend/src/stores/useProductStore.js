import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js"
import { useUserStore } from "./useUserStore"

export const useProductStore = create((set, get) => ({
	book : [],
	products: [],
	loading: false,
	myProducts: [],
	setProducts: (products) => set({ products }),
	setBook: (book) => set({book}),
	createProduct: async (productData) => {
		set({ loading: true });
		try {
			const res = await axiosInstance.post("/books", productData);
			set((prevState) => ({
				products: [...prevState.products, res.data],
				loading: false,
			}));
		} catch (error) {
			toast.error(error.response.data.error);
			set({ loading: false });
		}
	},

	fetchAllProducts: async () => {
		set({ loading: true });
		try {
			const response = await axiosInstance.get("/books");
			
			set({ products: response.data.books, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			toast.error(error.response.data.error || "Failed to fetch products");
		}
	},
	fetchProductsBySemester: async (department, semester) => {
		set({ loading: true });
		try {
			const response = await axiosInstance.get(`/books/${department}/${semester}`)

			set({ products: response.data, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			toast.error(error.response.data.error || "Failed to fetch products");
		}
	},
	deleteProduct: async (productId) => {
		set({ loading: true });
		try {
			
			await axiosInstance.delete(`/books/${productId}`)
			set((prevProducts) => ({
				products: prevProducts.products.filter((product) => product._id !== productId),
				loading: false,
			}));
			toast.success("Book deleted")
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to delete product");
		}
	},

	fetchAccountData: async () => {
		try {

			const userId = useUserStore.getState().user
			console.log("User",userId)
			const response = await axiosInstance.get(`/books/${userId?._id}`)
			console.log(response)
			set({ myProducts: response.data })

		} catch (err) {
			console.error('Error fetching account data', err);
		}
	}

}))