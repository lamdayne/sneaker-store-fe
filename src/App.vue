<template>
  <HeaderSection v-if="!isAdminPage" />
  <router-view></router-view>

</template>


<script setup>
import HeaderSection from '@/components/HeaderSection.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const isAdminPage = computed(() => {
  return route.path.includes('admin');
})
</script>


<style scoped></style>
