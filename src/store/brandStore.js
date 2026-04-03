import { defineStore } from "pinia";
import { ref } from "vue";
import axiosInstance from "@/axios/axios";

export const useBrandStore = defineStore('brand', () => {
    const brands = ref([]);

    async function fetchBrands(pageNo = 1, pageSize = 9, sortBy = 'name:asc') {
        try {
            const response = await axiosInstance.get(`/brands?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`);
            brands.value = response.data.items;
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

    async function create(brand) {
        try {
            const response = await axiosInstance.post('/brands', brand)
            return response
        } catch (error) {
            console.error(error)
            return Promise.reject(error)
        }
    }

    async function update(id, brand) {
        try {
            const response = await axiosInstance.put(`/brands/${id}`, brand)
            return response
        } catch (error) {
            console.error(error)
            return Promise.reject(error)
        }
    }

    async function changeStatus(id, active) {
        try {
            const response = await axiosInstance.patch(`/brands/${id}?active=${active}`)
            return response
        } catch (error) {
            console.error(error)
            return Promise.reject(error)
        }
    }

    return { brands, fetchBrands, create, changeStatus, update }
})