<template>
    <aside class="w-64 bg-gray-900 flex flex-col fixed inset-y-0 z-49">
        <div class="p-6">
            <div class="flex items-center gap-3">
                <div class="bg-accent rounded size-8 flex items-center justify-center">
                    <span class="text-white font-bold text-lg">S</span>
                </div>
                <div class="flex flex-col">
                    <h1 class="text-white text-[14px] font-bold tracking-wider leading-none">SOLEHAUS</h1>
                    <p class="text-slate-500 text-[10px] font-medium uppercase mt-1">admin panel</p>
                </div>
            </div>
        </div>
        <nav class="flex-1 px-3 space-y-1">
            <!-- Dashboard Active -->
            <router-link :class="{
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 cursor-pointer hover:text-white hover:bg-white/5 transition-all': true,
                'bg-white/10 text-white': isActive('/admin/dashboard')
            }" to="/admin/dashboard">
                <i class="fa-solid fa-gauge-high"></i>
                <span class="text-[13px] font-medium">Dashboard</span>
            </router-link>
            <!-- Sản phẩm with nested -->
            <div>
                <div :class="{
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 cursor-pointer hover:text-white hover:bg-white/5 transition-all': true,
                    'bg-white/10 text-white': isActive('/admin/product')
                }" @click="toggleProductMenu">
                    <i class="fa-solid fa-box-archive"></i>
                    <span class="text-[13px] font-medium">Sản phẩm</span>
                </div>
                <div v-if="isProductMenuOpen" class="ml-9 mt-1 space-y-1">
                    <a class="block py-1.5 text-[12px] text-slate-500 hover:text-white" href="#">Danh sách</a>
                    <router-link to="/admin/product"
                        class="block py-1.5 text-[12px] text-slate-500 hover:text-white">Thêm mới</router-link>
                </div>
            </div>
            <router-link :class="{
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 cursor-pointer hover:text-white hover:bg-white/5 transition-all': true,
                'bg-white/10 text-white': isActive('/admin/brand')
            }" to="/admin/brand">
                <i class="fa-solid fa-tag"></i>
                <span class="text-[13px] font-medium">Thương hiệu</span>
            </router-link>
            <router-link :class="{
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 cursor-pointer hover:text-white hover:bg-white/5 transition-all': true,
                'bg-white/10 text-white': isActive('/admin/category')
            }" to="/admin/category">
                <i class="fa-solid fa-layer-group"></i>
                <span class="text-[13px] font-medium">Phân loại</span>
            </router-link>
            <router-link :class="{
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 cursor-pointer hover:text-white hover:bg-white/5 transition-all': true,
                'bg-white/10 text-white': isActive('/admin/order')
            }" to="/admin/order">
                <i class="fa-solid fa-cart-shopping"></i>
                <span class="text-[13px] font-medium">Đơn hàng</span>
            </router-link>
            <router-link :class="{
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 cursor-pointer hover:text-white hover:bg-white/5 transition-all': true,
                'bg-white/10 text-white': isActive('/admin/user')
            }" to="/admin/user">
                <i class="fa-solid fa-user-group"></i>
                <span class="text-[13px] font-medium">Khách hàng</span>
            </router-link>
        </nav>
        <div class="mt-auto p-4 border-t border-white/5">
            <div class="flex items-center gap-3">
                <div class="size-9 rounded-full bg-slate-700 overflow-hidden">
                    <img alt="Admin user profile picture" class="w-full h-full object-cover"
                        data-alt="Close-up portrait of a professional male administrator"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0ZH6zhd7WX4jay2MkpBAe0QvgNU2IXE8rMEObVoXtx1X8fWUb5FB3EVnxHU1qfw634t8NSCR-8MrV4xu4h4C-3rUHmEEoSjaC4QbqzT7vkUim2iJB3JzuM0a6ISSFrLxK-MM6ber1t_GiOOqaKfgGMRzS0MOAGIsZ2ikz7NajPx7LaHSepwWqsjqoiLTaBk--iktY-QbEeke-YQVhBzfSm1vDP5n1__4WUnYsnU3w5gaPkNQj55yXG3Bl3feTlQ0QHfw5GwR94So" />
                </div>
                <div class="flex-1 overflow-hidden">
                    <p class="text-white text-[12px] font-medium truncate">Alexander S.</p>
                    <p class="text-slate-500 text-[10px] truncate">Senior Manager</p>
                </div>
                <button class="text-slate-400 hover:text-accent">
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                </button>
            </div>
        </div>
    </aside>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isProductMenuOpen = ref(false);

const toggleProductMenu = () => {
    isProductMenuOpen.value = !isProductMenuOpen.value;
}

const isActive = (path) => route.path.includes(path)
</script>