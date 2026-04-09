<template>
    <div v-if="isLoading"
        class="absolute inset-0 bg-white/60 z-10 flex items-center justify-center backdrop-blur-[1px]">
        <div class="flex flex-col items-center gap-2">
            <span class="animate-spin text-xl"><i class="fa-solid fa-hourglass"></i></span>
        </div>
    </div>
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
import { useCartStore } from '@/store/CartStore';
import { useOrderStore } from '@/store/orderStore';
import { useProductStore } from '@/store/productStore';
import { useUserStore } from '@/store/userStore';
import Swal from 'sweetalert2';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter()

const isLoading = ref(false)

const productStore = useProductStore();
const userStore = useUserStore();
const cartStore = useCartStore()
const orderStore = useOrderStore()

const productDetail = computed(() => productStore.productDetail)
const isLogin = computed(() => userStore.isAuthenticated)

onMounted(async () => {
    await productStore.findProductById(route.params.id);
    // console.log(productDetail.value)
})

const addToCart = async (variant) => {
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
    isLoading.value = true
    const resp = await cartStore.addToCart(variant)
    if (resp.status === 201) {
        isLoading.value = false
        Swal.fire({
            title: "Thành công",
            icon: "success",
            draggable: true,
            text: resp.message
        })
    } else {
        isLoading.value = false
        Swal.fire({
            title: "Thất bại",
            icon: "error",
            draggable: true,
            text: 'Lỗi khi thêm sản phẩm vào giỏ hàng'
        });
    }
}

const buyNow = (variant) => {
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
    orderStore.orderItems = [variant]
    console.log(orderStore.orderItems)
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