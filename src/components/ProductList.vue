<template>
    <div v-if="products.length === 0"
        class="container mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center mb-16">
        <SkeletonProductItem v-for="i in limit" :key="i" />
    </div>
    <div v-else
        class="container mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center mb-16">
        <ProductItem :product="product" v-for="product in products.slice(0, limit)" :key="product.id" />
    </div>
</template>

<script setup>
import ProductItem from './ProductItem.vue';
import { computed, onMounted } from 'vue';
import { useProductStore } from '@/store/productStore';
import SkeletonProductItem from './SkeletonProductItem.vue';

defineProps({
    limit: {
        type: Number,
        default: 5
    }
})

const productStore = useProductStore();

const products = computed(() => productStore.products)

onMounted(async () => {
    await productStore.fetchProducts();
})
</script>