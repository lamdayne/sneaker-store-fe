import axiosInstance from "@/axios/axios";
import { defineStore } from "pinia";
import { ref } from "vue";


export const useOrderStore = defineStore('order', () => {
    const orderItems = ref([])
    const productOrders = ref([])
    const orderInfo = ref({})
    const listOrders = ref([])
    const orders = ref([])

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

    const createPaymentQR = async (body) => {
        try {
            const response = await axiosInstance.post(`/payment/payos`, body)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    const checkPaymentStatus = async (orderCode) => {
        try {
            const response = await axiosInstance.get(`/orders/${orderCode}/payment-status`)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    const cancelOrder = async (orderCode) => {
        try {
            const response = await axiosInstance.post(`/orders/cancel/${orderCode}`)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    const getAllOrder = async (pageNo = 1, pageSize = 8, sortBy = 'id:asc') => {
        try {
            const response = await axiosInstance.get(`/orders?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`)
            orders.value = response.data.items
            return response
        } catch (error) {
            console.log(error)
        }
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
        getOrderById,
        createPaymentQR,
        checkPaymentStatus,
        cancelOrder,
        getAllOrder,
        orders
    }
})