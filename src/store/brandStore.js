import { defineStore } from "pinia";
import { ref } from "vue";
import axiosInstance from "@/axios/axios";

export const useBrandStore = defineStore('brand', () => {
    const brands = ref([]);

    async function fetchBrands() {
        try {
            const response = await axiosInstance.get('/brands');
            brands.value = response.data;
            return response;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }

    async function getBrandById(id) {
        try {
            const response = await axiosInstance.get(`/brands/${id}`)
            return response;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }

    return { brands, fetchBrands }
})