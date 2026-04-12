<template>
    <div class="min-h-screen bg-[#f9f9f9] flex flex-col items-center justify-center font-sans py-10">
        <div class="w-full max-w-[440px]">

            <div v-if="!isSuccess" class="bg-[#f5f5f2] px-8 py-10 rounded-2xl mx-4 shadow-sm relative">
                <div class="text-center mb-8">
                    <h2 class="text-2xl font-serif font-bold text-gray-900 mb-2">Đặt mật khẩu mới</h2>
                    <p class="text-gray-500 text-sm">Vui lòng nhập mật khẩu mới và xác nhận lại.</p>
                </div>
                <div>
                    <div class="mb-5 relative">
                        <label class="block text-xs font-bold text-slate-500 tracking-wider mb-2">MẬT KHẨU
                            MỚI</label>
                        <input v-model="password" type="password" placeholder="••••••••" required
                            class="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none pr-10 focus:ring-2 focus:ring-black" />
                    </div>

                    <div class="mb-8 relative">
                        <label class="block text-xs font-bold text-slate-500 tracking-wider mb-2">XÁC NHẬN MẬT
                            KHẨU</label>
                        <input v-model="confirmPassword" type="password" placeholder="••••••••" required
                            class="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none pr-10 focus:ring-2 focus:ring-black" />
                        <span v-if="password === confirmPassword && password.length > 0"
                            class="absolute right-4 top-[38px] text-green-500 font-bold text-lg">✓</span>
                    </div>

                    <button
                        class="w-full bg-[#111111] hover:bg-black text-white py-3 rounded-lg font-medium transition-colors">
                        Đặt lại mật khẩu
                    </button>
                </div>
            </div>
            <div v-else class="text-center py-6">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 class="font-bold text-green-600 mb-2 font-serif text-xl">Thành công!</h3>
                <p class="text-gray-500 text-sm mb-6">Mật khẩu của bạn đã được cập nhật.</p>
                <button @click="$router.push('/')"
                    class="w-full bg-[#111111] hover:bg-black text-white py-3 rounded-lg font-medium transition-colors">
                    Về trang Đăng nhập
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const password = ref("")
const confirmPassword = ref("")
const isSuccess = ref(false)

onMounted(() => {
    console.log(route.query)
})
</script>