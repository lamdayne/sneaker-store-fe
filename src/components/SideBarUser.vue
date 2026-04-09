<template>
    <aside class="w-full md:w-64">
        <div class="flex mt-3 items-center gap-4">
            <img src="https://files.catbox.moe/lonccy.jpg" class="w-14 rounded-full" alt="">
            <div class="flex flex-col">
                <p class="text-[14px] font-medium">{{ user.fullName }}</p>
                <span class="text-[14px]">{{ user.email }}</span>
            </div>
        </div>
        <nav class="flex flex-col mt-4 gap-2">
            <router-link to="/auth/me"
                :class="['flex items-center p-3 gap-4 rounded-xl', isActive('/auth/me') ? 'bg-gray-950 text-white' : 'hover:bg-blue-50']">
                <i class="fa-regular fa-user"></i>
                <span>Thông tin tài khoản</span>
            </router-link>
            <router-link to="/auth/address"
                :class="['flex items-center p-3 gap-4 rounded-xl', isActive('/auth/address') ? 'bg-gray-950 text-white' : 'hover:bg-blue-50']">
                <i class="fa-solid fa-location-dot"></i>
                <span>Địa chỉ</span>
            </router-link>
            <router-link to="/auth/order"
                :class="['flex items-center p-3 gap-4 rounded-xl', isActive('/auth/order') ? 'bg-gray-950 text-white' : 'hover:bg-blue-50']">
                <i class="fa-solid fa-box-open"></i>
                <span>Đơn hàng của tôi</span>
            </router-link>
            <!-- <router-link to="/auth/change-password"
                :class="['flex items-center p-3 gap-4 rounded-xl', isActive('/auth/change-password') ? 'bg-gray-950 text-white' : 'hover:bg-blue-50']">
                <i class="fa-solid fa-lock"></i>
                <span>Đổi mật khẩu</span>
            </router-link> -->
            <div class="border border-gray-200"></div>
            <button class="flex items-center p-3 hover:bg-blue-50 gap-4 rounded-xl cursor-pointer" @click="logout">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
                <span>Đăng xuất</span>
            </button>
        </nav>
    </aside>
</template>

<script setup>
import { useUserStore } from '@/store/userStore';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore()

const user = computed(() => userStore.user)

const isActive = (path) => {
    return route.fullPath === path
}

const logout = async () => {
    const body = {
        token: localStorage.getItem('accessToken')
    }
    await userStore.logout(JSON.stringify(body))
    router.push('/')
}
</script>