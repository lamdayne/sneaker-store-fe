import { defineStore } from "pinia";
import { ref } from "vue";
import axiosInstance from "@/axios/axios";

export const useProductStore = defineStore('product', () => {
    const products = ref([]);

    const fetchProducts = async () => {
        console.log('Fetch products')
        try {
            const response = await axiosInstance.get('/products');
            products.value = response.data;
        } catch (error) {
            return Promise.reject(error)
        }
    }

    const getById = async (id) => {

    }

    return { fetchProducts, products }
})
