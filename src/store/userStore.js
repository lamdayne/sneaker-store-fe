import axiosInstance from "@/axios/axios";
import { decodeJWT } from "@/utils/jwt";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore('user', () => {
    const user = ref({})
    const users = ref([])
    const addresses = ref([])
    const accessToken = ref(localStorage.getItem('accessToken') || null)
    const refreshToken = ref(localStorage.getItem('refreshToken') || null)

    const isAuthenticated = computed(() => !!accessToken.value)

    const decodeToken = computed(() => {
        const token = accessToken.value

        if (!token || token === "undefined" || token === "null") {
            return null
        }

        return decodeJWT(accessToken.value)
    })

    const isAdmin = computed(() => decodeToken.value?.scope === 'ADMIN')

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

    const login = async (user) => {
        try {
            const response = await axiosInstance.post(`/auth/token`, user);
            if (response.status === 401 || response.status === 404) {
                return { status: response.status }
            }
            console.log('Success')
            const { accessToken: at, refreshToken: rt } = response.data

            accessToken.value = at
            refreshToken.value = rt
            localStorage.setItem('accessToken', at)
            localStorage.setItem('refreshToken', rt)

            return response
        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
    }

    const logout = async (body) => {
        try {
            const response = await axiosInstance.post(`/auth/logout`, body);
            accessToken.value = null
            refreshToken.value = null
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')

            return response
        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
    }

    const myInfo = async () => {
        try {
            const response = await axiosInstance.get(`/auth/me`);
            user.value = response.data
            addresses.value = response.data.addresses.filter((address) => address.isActive)
            return response
        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
    }

    const updateUser = async (id, body) => {
        try {
            const response = await axiosInstance.put(`/users/${id}`, body);
            user.value = response.data
            return response
        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
    }

    const changeStatus = async (id, status) => {
        try {
            const response = await axiosInstance.patch(`/users/${id}?status=${status}`);
            user.value = response.data
            return response
        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
    }

    const forgotPassword = async (email) => {
        try {
            const response = await axiosInstance.post(`/users/forgot?email=${email}`)
            return response
        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
    }

    const changePassword = async (body) => {
        try {
            const response = await axiosInstance.post(`/users/change-password`, body)
            return response
        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
    }

    return {
        users,
        fetchUsers,
        login,
        isAuthenticated,
        logout,
        myInfo,
        user,
        isAdmin,
        updateUser,
        addresses,
        changeStatus,
        forgotPassword,
        changePassword
    }
})