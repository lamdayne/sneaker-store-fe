<template>
    <div class="min-h-screen bg-[#f9f9f9] flex flex-col items-center justify-center font-sans py-10">
        <div v-if="isLoading"
            class="absolute inset-0 bg-white/60 z-10 flex items-center justify-center backdrop-blur-[1px]">
            <div class="flex flex-col items-center gap-2">
                <span class="animate-spin text-xl"><i class="fa-solid fa-hourglass"></i></span>
            </div>
        </div>
        <div v-if="currentStep === 1" class="w-full max-w-[440px]">
            <div class="flex items-center justify-center gap-3 mb-8">
                <svg class="w-8 h-8 text-black" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.5 5h19l-9.5 13L2.5 5z" />
                    <rect x="1.5" y="3" width="21" height="1.5" fill="currentColor" />
                </svg>
                <span class="text-xl font-bold tracking-[0.2em] text-black uppercase mt-1">Solehaus</span>
            </div>

            <div class="bg-[#f5f5f2] px-8 py-10 rounded-2xl mx-4 shadow-sm">
                <div class="text-center mb-8">
                    <h1 class="text-3xl font-serif font-bold text-gray-900 mb-2">Quên mật khẩu?</h1>
                    <p class="text-gray-500 text-sm">Nhập email để nhận link đặt lại mật khẩu</p>
                </div>

                <div>
                    <div class="mb-6">
                        <label class="block text-xs font-bold text-slate-500 tracking-wider mb-2">EMAIL</label>
                        <input v-model="email" type="email" placeholder="name@example.com" required
                            class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black outline-none" />
                    </div>
                    <button @click="forgotPassword"
                        class="w-full bg-[#111111] hover:bg-black text-white py-3 rounded-lg font-medium transition-colors">
                        Gửi link đặt lại
                    </button>
                </div>
            </div>
            <div class="text-center mt-6">
                <router-link to="/login" class="text-sm text-gray-600 hover:text-black">← Quay lại đăng
                    nhập</router-link>
            </div>
        </div>

        <div v-else-if="currentStep === 2" class="w-full max-w-[440px]">
            <div class="flex items-center justify-center gap-3 mb-8">
                <svg class="w-8 h-8 text-black" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.5 5h19l-9.5 13L2.5 5z" />
                    <rect x="1.5" y="3" width="21" height="1.5" fill="currentColor" />
                </svg>
                <span class="text-xl font-bold tracking-[0.2em] text-black uppercase mt-1">Solehaus</span>
            </div>

            <div class="bg-[#f5f5f2] px-8 py-10 rounded-2xl mx-4 shadow-sm">
                <div class="flex flex-col items-center text-center">
                    <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                        <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h2 class="text-2xl font-serif font-bold text-gray-900 mb-2">Kiểm tra email</h2>
                    <p class="text-gray-500 text-sm mb-8">
                        Chúng tôi đã gửi link đến <br>
                        <span class="font-medium text-black">{{ email }}</span>
                    </p>

                    <!-- <button @click="currentStep = 3"
                        class="w-full bg-[#111111] hover:bg-black text-white py-3 rounded-lg font-medium transition-colors mb-4">
                        Kiểm tra email và đặt lại mật khẩu
                    </button>

                    <button @click="currentStep = 1" class="text-sm text-gray-500 hover:text-black underline">
                        Dùng email khác
                    </button> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '@/store/userStore'
import Swal from 'sweetalert2'
import { ref } from 'vue'

const currentStep = ref(1)
const email = ref('')
const isLoading = ref(false)

const userStore = useUserStore()

const forgotPassword = async () => {
    if (!validateForm()) return
    isLoading.value = true
    try {
        await userStore.forgotPassword(email.value)
        currentStep.value = 2
        isLoading.value = false
    } catch (error) {
        console.error(error)
    } finally {
        isLoading.value = false
    }
}

const validateForm = () => {
    if (!email.value) {
        Swal.fire({
            title: "Thất bại",
            icon: "error",
            draggable: true,
            text: 'Vui lòng nhập email'
        });
        return false
    }
    return true
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');

.font-serif {
    font-family: 'Playfair Display', serif;
}
</style>