<template>
    <div v-if="isLoading"
        class="absolute inset-0 bg-white/60 z-10 flex items-center justify-center backdrop-blur-[1px]">
        <div class="flex flex-col items-center gap-2">
            <span class="animate-spin text-xl"><i class="fa-solid fa-hourglass"></i></span>
        </div>
    </div>
    <div class="flex justify-center items-center mt-6 font-mono gap-12">
        <div class="flex gap-4 items-center text-gray-300">
            <span class="py-1 px-3 bg-gray-300 text-white rounded-full font-bold">1</span>
            <p class="font-bold">Địa chỉ</p>
        </div>
        <div class="w-20 bg-gray-300 h-0.5"></div>
        <div class="flex gap-4 items-center text-gray-300">
            <span class="py-1 px-3 bg-gray-300 text-white rounded-full font-bold">2</span>
            <p class="font-bold">Thanh toán</p>
        </div>
        <div class="w-20 bg-gray-300 h-0.5"></div>
        <div class="flex gap-4 items-center">
            <span class="py-1 px-3 bg-red-700 text-white rounded-full font-bold">3</span>
            <p class="font-bold">Xác nhận</p>
        </div>
    </div>
    <div class="flex justify-center items-center mt-8 font-mono flex-col">
        <div class="p-6 bg-gray-100 text-4xl rounded-full text-green-500">
            <i class="fa-solid fa-circle-check"></i>
        </div>
        <h2 class="text-3xl font-serif mt-12">Đặt hàng thành công</h2>
        <!-- <span class="uppercase bg-gray-200 px-1 rounded-lg">Mã đơn hàng: </span> -->
        <router-link to="/" class="p-4 mt-4 bg-gray-950 rounded-2xl text-white">
            Về trang chủ
        </router-link>
    </div>

</template>

<script setup>
import { useOrderStore } from '@/store/orderStore';
import { onMounted } from 'vue';

const orderStore = useOrderStore()

onMounted(() => {
    orderStore.clearStore()
})
</script>