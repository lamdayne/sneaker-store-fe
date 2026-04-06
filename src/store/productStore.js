import { defineStore } from "pinia";
import { ref } from "vue";
import axiosInstance from "@/axios/axios";

export const useProductStore = defineStore('product', () => {
    const products = ref([]);
    const productDetail = ref(null);

    const fetchProducts = async (pageNo = 1, pageSize = 8, sortBy = 'id:asc') => {
        console.log('Fetch products')
        try {
            const response = await axiosInstance.get(`/products?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`);
            products.value = response.data.items;
            return response
        } catch (error) {
            return Promise.reject(error)
        }
    }

    const findProductById = async (id) => {
        console.log('Get product by id')
        try {
            const response = await axiosInstance.get(`/products/${id}`)
            // const product = response.data;

            // if (product.productImages) {
            //     product.productImages = [...product.productImages].sort(
            //         (a, b) => a.displayOrder - b.displayOrder
            //     );
            // }
            productDetail.value = response.data;
            return response
        } catch (error) {
            console.error(error)
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

    const resetProductDetail = () => {
        productDetail.value = null;
    };

    const search = async ({ pageNo, pageSize, sortBy, name, categoryId, brandId, size, price }) => {
        try {
            const response = await axiosInstance.get(`/products/search?page=${pageNo}&size=${pageSize}&sort=${sortBy}&product=name~${name},basePrice>0, basePrice<${price}`);
            products.value = response.data.items;
            return response
        } catch (error) {
            return Promise.reject(error)
        }
    }

    const update = async (id, product) => {
        console.log('Update product')
        try {
            const response = await axiosInstance.put(`/products/${id}`, product);
            return response
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }

    return {
        fetchProducts,
        products,
        create,
        createProductVariant,
        getCloudinarySignature,
        createProductImage,
        findProductById,
        productDetail,
        resetProductDetail,
        search,
        update
    }
})
