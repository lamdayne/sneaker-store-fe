import axiosInstance from "@/axios/axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user', () => {
    const users = ref([])

    const fetchUsers = async (pageNo = 0, pageSize = 8, sortBy = 'fullName:asc') => {
        try {
            const response = await axiosInstance.get(`/users?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`)
            users.value = response.data.items
            return response
        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
    }

    return {
        users,
        fetchUsers
    }
})