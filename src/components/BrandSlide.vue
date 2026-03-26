<template>
    <div class="bg-gray-100 py-24">

        <div class="mx-auto max-w-7xl px-6">
            <div class="relative mt-10 overflow-hidden">
                <div class="flex w-max animate-scroll">
                    <div class="flex items-center gap-24">
                        <img v-for="brand in brands" :key="brand.id" :src="brand.logoUrl" class="h-16" />
                    </div>
                    <div class="flex items-center gap-24 ml-16">
                        <img v-for="brand in brands" :key="brand.id" :src="brand.logoUrl" class="h-16" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useBrandStore } from '@/store/brandStore';
import { computed, onMounted } from 'vue';

const brandStore = useBrandStore();

const brands = computed(() => brandStore.brands)

onMounted(async () => {
    await brandStore.fetchBrands()
})
</script>

<style lang="css" scoped>
@keyframes scroll {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(calc(-50% - 2rem));
    }
}

.animate-scroll {
    animation: scroll 25s linear infinite;
}

.animate-scroll:hover {
    animation-play-state: paused;
}
</style>