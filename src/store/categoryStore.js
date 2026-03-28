import axiosInstance from "@/axios/axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCategoryStore = defineStore('category', () => {
    const categories = ref([]);

    async function fetchCategories() {
        try {
            const response = await axiosInstance.get('/categories');
            categories.value = [...response.data]
            return response;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }

    async function getCategoryById(id) {
        try {
            const response = await axiosInstance.get(`/categories/${id}`);
            return response;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }

    return { categories, fetchCategories }
})