<template>
    <div class="container mx-auto flex gap-10">
        <SidebarFilter></SidebarFilter>
        <div class="gap-4 grid grid-cols-4">
            <ProductItem v-for="i in 20" :key="i" />
        </div>
    </div>
</template>

<script setup>
import ProductItem from '@/components/ProductItem.vue';
import SidebarFilter from '@/components/SidebarFilter.vue';


</script>