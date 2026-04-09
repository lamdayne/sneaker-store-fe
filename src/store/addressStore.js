import axiosInstance from "@/axios/axios";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAddressStore = defineStore('address', () => {
    const provinces = ref([])
    const districts = ref([])
    const wards = ref([])

    const fetchProvinces = async () => {
        try {
            const response = await axios.get(`https://provinces.open-api.vn/api/v1/p`)
            provinces.value = response.data
            return response.data
        } catch (error) {
            console.error(error)
            return Promise.reject(error)
        }
    }

    const fetchDistricts = async (provinceCode) => {
        try {
            const response = await axios.get(`https://provinces.open-api.vn/api/v1/p/${provinceCode}?depth=2`)
            districts.value = response.data.districts
            return response.data
        } catch (error) {
            console.error(error)
            return Promise.reject(error)
        }
    }

    const fetchWards = async (districtCode) => {
        try {
            const response = await axios.get(`https://provinces.open-api.vn/api/v1/d/${districtCode}?depth=2`)
            wards.value = response.data.wards
            return response.data
        } catch (error) {
            console.error(error)
            return Promise.reject(error)
        }
    }

    const clearStore = () => {
        districts.value = []
        wards.value = []
    }

    const createAddress = async (body) => {
        try {
            const response = await axiosInstance.post(`/addresses`, body);
            return response
        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
    }

    const deleteAddress = async (id) => {
        try {
            const response = await axiosInstance.delete(`/addresses/${id}`);
            return response
        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
    }

    const updateAddress = async (id, body) => {
        try {
            const response = await axiosInstance.put(`/addresses/${id}`, body);
            return response
        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
    }

    return {
        provinces,
        districts,
        wards,
        fetchProvinces,
        fetchDistricts,
        fetchWards,
        clearStore,
        createAddress,
        deleteAddress,
        updateAddress
    }
})