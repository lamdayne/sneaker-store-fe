<template>
    <AdminSideBar />
    <div class="ml-68 mr-4">
        <slot></slot>
    </div>
</template>

<script setup>
import AdminSideBar from './AdminSideBar.vue';

</script>