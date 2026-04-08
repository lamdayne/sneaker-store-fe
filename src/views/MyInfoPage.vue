<template>
    <AccountManageSection>
        <div v-if="isLoading"
            class="absolute inset-0 bg-white/60 z-10 flex items-center justify-center backdrop-blur-[1px]">
            <div class="flex flex-col items-center gap-2">
                <span class="animate-spin text-xl"><i class="fa-solid fa-hourglass"></i></span>
            </div>
        </div>
        <div class="mt-4 mx-auto">
            <h1 class="text-2xl font-serif font-bold">Thông tin cá nhân</h1>
            <div class="w-250 mt-4 border rounded-lg p-4">
                <div class="flex p-4">
                    <div class="flex gap-6">
                        <img :src="user.avatarUrl" class="w-20 rounded-full shadow-xs" alt="">
                        <div class="flex flex-col justify-center">
                            <p class="text-[17px] font-semibold">Ảnh đại diện</p>
                            <span class="text-[14px]">Định dạng jpg, png,...Tối đa 2MB</span>
                        </div>
                    </div>
                </div>
                <div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="text-sm font-medium">Họ và tên</label>
                        <input v-model="user.fullName"
                            class="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md outline-none" type="text" />
                    </div>
                    <div>
                        <label class="text-sm font-medium">Email</label>
                        <input v-model="user.email" disabled="true"
                            class="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md outline-none bg-gray-100"
                            type="email" />
                    </div>
                    <div>
                        <label class="text-sm font-medium">Số điện thoại</label>
                        <input class="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md outline-none" type="text"
                            v-model="user.phone" />
                    </div>
                    <div>
                        <label class="text-sm font-medium">Mật khẩu</label>
                        <input v-model="user.password"
                            class="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md outline-none" type="text" />
                    </div>
                    <button @click="updateInfo(userStore.user.id)"
                        class="bg-gray-950 w-52 text-white p-3 rounded-lg cursor-pointer">Lưu thay đổi</button>
                </div>
            </div>
        </div>
    </AccountManageSection>
</template>

<script setup>
import AccountManageSection from '@/components/AccountManageSection.vue';
import { useUserStore } from '@/store/userStore';
import Swal from 'sweetalert2';
import { reactive, ref, watch } from 'vue';

const isLoading = ref(false)
const userStore = useUserStore()
const user = reactive({
    fullName: null,
    email: 'example@gmail.com',
    phone: null,
    password: null,
    avatarUrl: null,
    active: true
})

const updateInfo = async (id) => {
    isLoading.value = true
    try {
        const resp = await userStore.updateUser(id, { ...user })
        isLoading.value = false
        if (resp.status === 202) {
            Swal.fire({
                title: "Thành công",
                icon: "success",
                draggable: true,
                text: resp.message
            });
        } else {
            Swal.fire({
                title: "Thất bại",
                icon: "error",
                draggable: true,
                text: resp.message
            });
        }
    } catch (error) {
        console.error(error)
        Swal.fire({
            title: "Thất bại",
            icon: "error",
            draggable: true,
            text: 'Lỗi khi cập nhật thông tin'
        });
        isLoading.value = false
    }
}

watch(
    () => userStore.user,
    (newUser) => {
        if (newUser) {
            Object.assign(user, newUser)
        }
    },
    { immediate: true }
)

</script>