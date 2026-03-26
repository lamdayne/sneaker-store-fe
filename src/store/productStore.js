import { defineStore } from "pinia";
import { ref } from "vue";
import axiosInstance from "@/axios/axios";

export const useProductStore = defineStore('product', () => {
    const products = ref([]);

    const fetchProducts = async () => {
        console.log('Fetch products')
        try {
            const response = await axiosInstance.get('/products');
            products.value = response.data;
        } catch (error) {
            return Promise.reject(error)
        }
    }

    const create = async (product) => {
        console.log('Create Product')
        try {
            const response = await axiosInstance.post('/products', product)
            return response;
        } catch (error) {
            console.error(error)
            return Promise.reject(error);
        }
    }

    const createProductVariant = async (productVariant) => {
        console.log('Create product variant')
        try {
            const response = await axiosInstance.post('/product-variants', productVariant);
            return response
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }

    const createProductImage = async (productImage) => {
        console.log('Create product image')
        try {
            const response = await axiosInstance.post('/product-images', productImage);
            return response;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }

    const getCloudinarySignature = async () => {
        try {
            const response = await axiosInstance.post('/cloudinary/sign-info')
            return response;
        } catch (error) {
            console.error(error)
            return Promise.reject(error)
        }
    }

    return { fetchProducts, products, create, createProductVariant, getCloudinarySignature, createProductImage }
})
