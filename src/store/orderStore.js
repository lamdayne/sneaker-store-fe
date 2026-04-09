import { defineStore } from "pinia";
import { ref } from "vue";


export const useOrderStore = defineStore('order', () => {
    const orderItems = ref([])
    const productOrders = ref([])

    return {
        orderItems,
        productOrders
    }
})