import axiosInstance from "@/axios/axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCategoryStore = defineStore('category', () => {
    const categories = ref([]);

    async function fetchCategories(pageNo = 1, pageSize = 5, sortBy = 'name:asc') {
        try {
            const response = await axiosInstance.get(`/categories?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`);
            categories.value = [...response.data.items]
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

    async function create(body) {
        try {
            const response = await axiosInstance.post(`/categories`, body);
            return response;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }

    async function update(id, body) {
        try {
            const response = await axiosInstance.put(`/categories/${id}`, body);
            return response;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }

    async function changeStatus(id, status) {
        try {
            const response = await axiosInstance.patch(`/categories/${id}?status=${status}`);
            return response;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }

    return { categories, fetchCategories, create, update, changeStatus }
})