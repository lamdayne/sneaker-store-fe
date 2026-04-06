<template>
    <div class="container mx-auto flex flex-col lg:flex-row gap-8 mt-2">
        <div class="flex flex-col">
            <div class="p-2 w-fit bg-gray-200 rounded-2xl">
                <img :src="selectedImage || productDetail.thumbnail" alt=""
                    class="w-130 h-120 object-cover rounded-2xl border-gray-200">
            </div>
            <div class="flex mt-3 justify-around w-130">
                <img v-for="productImage in productDetail.productImages" :key="productImage.id"
                    :src="productImage.imageUrl" alt="" @click="selectedImage = productImage.imageUrl" :class="[
                        'w-24 h-24 rounded-2xl object-cover cursor-pointer transition-all',
                        selectedImage === productImage.imageUrl
                            ? 'ring-2 ring-primary'
                            : 'border border-gray-200'
                    ]">
            </div>
        </div>
        <div class="flex flex-col font-mono">
            <p class="text-red-600 uppercase text-[17px] font-bold">{{ productDetail.brandName }}</p>
            <p class="mt-2 text-3xl font-bold">{{ productDetail.name }}</p>
            <div class="flex items-center my-4">
                <span class="font-sans font-bold text-gray-800 text-xl me-2">
                    {{ format.formatVND(productDetail.basePrice) }}
                </span>
                <!-- <p class="font-sans text-gray-300 line-through">5.000.000 đ</p> -->
            </div>
            <p class="font-sans text-[15px] font-bold">Màu sắc</p>
            <div class="flex mt-3 gap-4">
                <button v-for="productVariant in productDetail.productVariants" :key="productVariant.id"
                    :style="{ backgroundColor: productVariant.colorHex }" :class="['w-8 h-8 rounded-full bg-red-400 cursor-pointer',
                        selectedColor === productVariant.colorHex
                            ? 'ring-2 ring-primary ring-offset-2'
                            : 'border border-gray-200']" @click="selectedColor = productVariant.colorHex"></button>
            </div>
            <p class="font-sans text-[15px] font-bold mt-3">Kích thước</p>
            <div class="grid grid-cols-4 gap-2 mt-2">
                <button v-for="productVariant in sortedVariants" :key="productVariant.id"
                    @click="selectedSize = productVariant.size" :class="['py-2 px-12 border font-bold border-slate-200 text-sm rounded-lg hover:border-primary transition-all cursor-pointer',
                        selectedSize === productVariant.size ? 'bg-gray-950 text-white' : '']">
                    {{ productVariant.size }}
                </button>
                <!-- <button
                    class="py-2 px-12 bg-gray-800 text-white border font-bold border-slate-200 text-sm rounded-lg hover:border-primary transition-all">44</button> -->
            </div>
            <p class="font-sans text-[15px] font-bold mt-3">Số lượng</p>
            <input v-model="quantity" type="number" value="1"
                class="w-20 p-2 mt-2 rounded-2xl outline-1 outline-gray-400" />
            <div class="flex gap-4 mt-4">
                <button @click="$emit('addToCart', { ...variant })"
                    class="flex-1 p-3.5 border-2 uppercase rounded-xl text-xl cursor-pointer font-bold">Thêm vào giỏ
                    hàng</button>
                <button @click="$emit('buy', { ...variant })"
                    class="flex-1 p-3.5 uppercase bg-black text-white rounded-xl text-xl cursor-pointer font-bold">Mua
                    ngay</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { format } from '@/utils/format';
import { ref, computed } from 'vue';

const selectedColor = ref(null)
const selectedSize = ref(null)
const quantity = ref(1)

const props = defineProps({
    productDetail: {
        type: Object,
        default: null
    }
})

defineEmits(['addToCart', 'buy'])

const variant = computed(() => ({
    productId: props.productDetail.id,
    size: selectedSize.value,
    color: selectedColor.value,
    quantity: quantity.value,
    unitPrice: props.productDetail.basePrice
}))

const sortedVariants = computed(() => {
    if (!props.productDetail?.productVariants) return [];

    return [...props.productDetail.productVariants].sort((a, b) => {
        return Number(a.size) - Number(b.size);
    });
});

const selectedImage = ref(null);
</script>