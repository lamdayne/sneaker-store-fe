<template>
    <div class="flex justify-center">
        <div class="bg-white w-md mt-3 p-8 lg:p-10 rounded-2xl shadow-xl shadow-slate-200">
            <h1 class="text-2xl uppercase font-bold font-serif text-center">Đăng ký</h1>

            <div class="flex flex-col gap-4 mt-3">
                <div class="flex-1">
                    <label class="text-sm font-medium" for="email">Họ và tên</label>
                    <input v-model="userInfo.fullName"
                        class="block mt-2 w-full px-4 py-3 text-slate-900 bg-transparent shadow-xs rounded-md shadow-gray-300 outline-0"
                        id="text" placeholder="Nhập họ và tên của bạn" type="text" />
                </div>
                <div class="flex-1">
                    <label class="text-sm font-medium" for="email">Email</label>
                    <input v-model="userInfo.email"
                        class="block mt-2 w-full px-4 py-3 text-slate-900 bg-transparent shadow-xs rounded-md shadow-gray-300 outline-0"
                        id="email" placeholder="Nhập email của bạn" type="email" />
                </div>
                <div class="flex-1">
                    <label class="text-sm font-medium" for="email">Số điện thoại</label>
                    <input v-model="userInfo.phone"
                        class="block mt-2 w-full px-4 py-3 text-slate-900 bg-transparent shadow-xs rounded-md shadow-gray-300 outline-0"
                        id="text" placeholder="Nhập số điện thoại của bạn" type="text" />
                </div>
                <div class="flex-1">
                    <label class="text-sm font-medium" for="password">Mật khẩu</label>
                    <input v-model="userInfo.password"
                        class="block mt-2  w-full px-4 py-3 text-slate-900 bg-transparent shadow-xs rounded-md shadow-gray-300 outline-0"
                        id="password" placeholder="Nhập mật khẩu của bạn" type="password" />
                </div>
                <button @click="registerAccount"
                    class="flex-1 py-3 mt-3 cursor-pointer shadow-md shadow-gray-400 bg-gray-900 text-white uppercase text-[17px] rounded-md">Tạo
                    tài khoản</button>
                <div class="flex justify-center items-center gap-2 mt-3">
                    <p class="text-[15px] text-gray-600 font-medium">Đã có tài khoản?</p>
                    <router-link to="/login" class="text-[14px] font-bold text-red-500">Đăng nhập ngay</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Swal from 'sweetalert2';
import { ref } from 'vue';
import axiosInstance from '@/axios/axios';

const userInfo = ref({
    fullName: '',
    email: '',
    phone: '',
    password: ''
})

const registerAccount = async () => {
    if (!validateForm(userInfo.value)) return;
    const body = { ...userInfo.value }
    try {
        const response = await axiosInstance.post('/users', body);
        if (response === 400) {
            alertDialog(false, response.message);
            return;
        } else {
            alertDialog(true, response.message);
            resetForm();
        }
    } catch (error) {
        return Promise.reject(error)
    }
}

const validateForm = (user) => {
    if (!user.fullName) {
        alertDialog(false, 'Vui lòng nhập họ và tên')
        return false;
    } else if (!user.email) {
        alertDialog(false, 'Vui lòng nhập email')
        return false;
    } else if (!user.phone) {
        alertDialog(false, 'Vui lòng nhập số điện thoại')
        return false;
    } else if (!user.password) {
        alertDialog(false, 'Vui lòng nhập mật khẩu')
        return false;
    }
    return true;
}

const resetForm = () => {
    userInfo.value.fullName = '';
    userInfo.value.email = '';
    userInfo.value.phone = '';
    userInfo.value.password = '';
}

const alertDialog = (success, text) => {
    Swal.fire({
        icon: success ? 'success' : 'error',
        title: success ? 'Thành công' : 'Thất bại',
        text: text
    });
}

</script>