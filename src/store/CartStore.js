import axiosInstance from '@/axios/axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const carts = ref([])

  const fetchMyCart = async () => {
    try {
      const response = await axiosInstance.get(`/cart-items/my-cart`)
      carts.value = response.data
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const addToCart = async (cartItem) => {
    try {
      const response = await axiosInstance.post(`/cart-items`, cartItem)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const removeCartItem = async (cartItemId) => {
    try {
      const response = await axiosInstance.delete(`/cart-items/${cartItemId}`)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  return {
    carts,
    addToCart,
    fetchMyCart,
    removeCartItem
  }
});