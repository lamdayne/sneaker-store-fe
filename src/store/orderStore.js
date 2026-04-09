import axiosInstance from "@/axios/axios";
import { defineStore } from "pinia";
import { ref } from "vue";


export const useOrderStore = defineStore('order', () => {
    const orderItems = ref([])
    const productOrders = ref([])
    const orderInfo = ref({})
    const listOrders = ref([])

    const createOrder = async (body) => {
        try {
            const response = await axiosInstance.post(`/orders`, body)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    const createOrderItem = async (body) => {
        try {
            const response = await axiosInstance.post(`/order-items`, body)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    const getAllMyOrder = async () => {
        try {
            const response = await axiosInstance.get(`/orders/me/all`)
            listOrders.value = response.data
            return response
        } catch (error) {
            console.log(error)
        }
    }

    const getOrderById = async (id) => {
        try {
            const response = await axiosInstance.get(`/orders/${id}`)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    const clearStore = () => {
        orderItems.value = []
        productOrders.value = []
        orderInfo.value = {}
    }

    return {
        orderItems,
        productOrders,
        orderInfo,
        createOrder,
        createOrderItem,
        clearStore,
        getAllMyOrder,
        listOrders,
        getOrderById
    }
})