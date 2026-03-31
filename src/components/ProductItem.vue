<template>
    <router-link :to="`/product/${product.id}`" class="mt-3">
        <div class="flex flex-col">
            <img :src="product.thumbnail" alt=""
                class="w-60.75 h-60.75 object-cover rounded-lg shadow-xs hover:scale-101">
            <p class="mt-2 text-[14px] uppercase font-bold text-red-400">{{ product.brandName }}</p>
            <p class="text-[17px] font-medium">{{ product.name }}</p>
            <div class="flex items-center">
                <p class="font-medium text-[15px]">{{ format.formatVND(product.basePrice) }}</p>
                <!-- <p class="ms-3 text-[13px] text-gray-400 line-through">5.000.000 đ</p> -->
            </div>
        </div>
    </router-link>
</template>

<script setup>
import { format } from '@/utils/format';


defineProps({
    product: {
        type: Object,
        default: () => ({})
    }
})
</script>