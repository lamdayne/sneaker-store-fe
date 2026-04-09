import axiosInstance from "@/axios/axios";
import { defineStore } from "pinia";
import { ref } from "vue";


export const useOrderStore = defineStore('order', () => {
    const orderItems = ref([])
    const productOrders = ref([])
    const orderInfo = ref({})

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

    const createPaymentQR = async () => {

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
        clearStore
    }
})