<template>
    <div v-if="productDetail === null">
        <SkeletonProductDetail></SkeletonProductDetail>
    </div>
    <div v-else>
        <ProductDetail @add-to-cart="addToCart" @buy="buyNow" :product-detail="productDetail"></ProductDetail>
    </div>
</template>

<script setup>
import ProductDetail from '@/components/ProductDetail.vue';
import SkeletonProductDetail from '@/components/SkeletonProductDetail.vue';
import { useProductStore } from '@/store/productStore';
import { useUserStore } from '@/store/userStore';
import Swal from 'sweetalert2';
import { computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter()

const productStore = useProductStore();
const userStore = useUserStore();

const productDetail = computed(() => productStore.productDetail)
const isLogin = computed(() => userStore.isAuthenticated)

onMounted(async () => {
    await productStore.findProductById(route.params.id);
    // console.log(productDetail.value)
})

const addToCart = (variant) => {
    if (!isLogin.value) {
        router.push({
            path: '/login',
            query: {
                redirect: route.fullPath
            }
        })
        return
    }
    if (!validateInput(variant)) return
    console.log(variant)
}

const buyNow = (variant) => {
    if (!validateInput(variant)) return
    console.log(variant)
}

const validateInput = (variant) => {
    if (!variant.size) {
        Swal.fire({
            title: "Thất bại",
            icon: "error",
            draggable: true,
            text: 'Vui lòng chọn size'
        });
        return false
    } else if (!variant.color) {
        Swal.fire({
            title: "Thất bại",
            icon: "error",
            draggable: true,
            text: 'Vui lòng chọn màu'
        });
        return false
    } else if (variant.quantity <= 0) {
        Swal.fire({
            title: "Thất bại",
            icon: "error",
            draggable: true,
            text: 'Số lượng không hợp lệ'
        });
        return false
    }
    return true
}

watch(
    () => route.params.id,
    async (id) => {
        productStore.productDetail = null; // reset để hiện skeleton
        await productStore.findProductById(id);
    },
    { immediate: true }
);
</script>