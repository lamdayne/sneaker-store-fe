<template>
    <div class="container mx-auto mt-10 px-4">
        <div class="flex flex-col items-center mb-12">
            <h1 class="font-playfair text-4xl font-bold mb-8 uppercase tracking-tight">Kết quả tìm kiếm</h1>

            <div class="relative w-full max-w-2xl">
                <i class="fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input type="text" placeholder="Tìm kiếm sản phẩm..."
                    class="w-full py-4 pl-14 pr-6 rounded-full border border-slate-200 shadow-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-lg" />
            </div>

            <div class="flex items-center gap-3 mt-6">
            </div>
        </div>

        <div class="flex gap-10">
            <SidebarFilter />

            <div class="flex-1">
                <div v-if="products.length === 0"
                    class="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <SkeletonProductItem v-for="i in 20" :key="i" />
                </div>
                <div class="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <ProductItem :product="product" v-for="product in products" :key="product.id" />
                </div>
            </div>
        </div>
    </div>

    <FooterSection class="mt-20" />
</template>

<script setup>
import SidebarFilter from '@/components/SidebarFilter.vue';
import ProductItem from '@/components/ProductItem.vue';
import FooterSection from '@/components/FooterSection.vue';
import { useProductStore } from '@/store/productStore';
import { computed, onMounted } from 'vue';
import SkeletonProductItem from '@/components/SkeletonProductItem.vue';

const productStore = useProductStore();

const products = computed(() => productStore.products);

onMounted(async () => {
    await productStore.fetchProducts();
})
</script>