<template>
    <BannerHome @explore="goToExplore" />
    <div class="container mx-auto my-4 text-3xl font-bold">Sản phẩm nổi bật</div>
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center mb-16">
        <ProductItem v-for="i in 5" :key="i" />
    </div>
    <BrandSlide />
    <div class="container mx-auto my-4 text-3xl font-bold">Sản phẩm nổi bật</div>
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center mb-16">
        <ProductItem v-for="i in 10" :key="i" />
    </div>
    <FooterSection />
</template>

<script setup>
import BannerHome from '@/components/BannerHome.vue';
import BrandSlide from '@/components/BrandSlide.vue';
import FooterSection from '@/components/FooterSection.vue';
import ProductItem from '@/components/ProductItem.vue';
import { useProductStore } from '@/store/productStore';
import { onMounted, toRaw } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const productStore = useProductStore();

onMounted(async () => {
    await productStore.fetchProducts();
    console.log(toRaw(productStore.products))
})

function goToExplore() {
    router.push('/search')
}
</script>