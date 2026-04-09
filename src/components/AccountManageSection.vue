<template>
    <div class="container mx-auto flex gap-4">
        <SideBarUser></SideBarUser>
        <slot></slot>
    </div>
</template>

<script setup>
import SideBarUser from '@/components/SideBarUser.vue';
import { useUserStore } from '@/store/userStore';
import { onMounted } from 'vue';

const userStore = useUserStore()

onMounted(async () => {
    await userStore.myInfo()
})
</script>