<template>
    <div v-if="productDetail === null">
        <SkeletonProductDetail></SkeletonProductDetail>
    </div>
    <div v-else>
        <ProductDetail :product-detail="productDetail"></ProductDetail>
    </div>
</template>

<script setup>
import ProductDetail from '@/components/ProductDetail.vue';
import SkeletonProductDetail from '@/components/SkeletonProductDetail.vue';
import { useProductStore } from '@/store/productStore';
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const productStore = useProductStore();

const productDetail = computed(() => productStore.productDetail)

onMounted(async () => {
    await productStore.findProductById(route.params.id);
    // console.log(productDetail.value)
})

watch(
    () => route.params.id,
    async (id) => {
        productStore.productDetail = null; // reset để hiện skeleton
        await productStore.findProductById(id);
    },
    { immediate: true }
);
</script>