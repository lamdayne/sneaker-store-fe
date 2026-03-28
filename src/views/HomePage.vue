<template>
    <BannerHome @explore="goToExplore" />
    <div class="container mx-auto my-4 text-3xl font-bold">Sản phẩm nổi bật</div>
    <ProductList></ProductList>
    <BrandSlide />
    <div class="container mx-auto my-4 text-3xl font-bold">Sản phẩm nổi bật</div>
    <ProductList :limit="10"></ProductList>
    <FooterSection />
</template>

<script setup>
import BannerHome from '@/components/BannerHome.vue';
import BrandSlide from '@/components/BrandSlide.vue';
import FooterSection from '@/components/FooterSection.vue';
import ProductList from '@/components/ProductList.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function goToExplore() {
    router.push('/search')
}
</script>