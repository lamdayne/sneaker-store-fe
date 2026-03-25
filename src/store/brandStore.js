import { defineStore } from "pinia";
import { ref } from "vue";
import axiosInstance from "@/axios/axios";

export const useBrandStore = defineStore('brand', () => {
    const brands = ref([]);

    async function fetchBrands() {
        try {
            const response = await axiosInstance.get('/brands');
            return response;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }

    return { brands, fetchBrands }
})