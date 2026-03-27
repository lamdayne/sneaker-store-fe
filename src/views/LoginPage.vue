<template>
    <div class="flex justify-center">
        <div class="bg-white w-md mt-12 p-8 lg:p-10 rounded-2xl shadow-xl shadow-slate-200">
            <h1 class="text-2xl uppercase font-bold font-serif text-center">Đăng Nhập</h1>
            <p class="font-sans text-gray-600 text-center">Đăng nhập ngay để khám phá bộ sưu tập mới</p>
            <div class="flex mt-3 gap-4">
                <button
                    class="flex-1 cursor-pointer items-center flex gap-3 justify-center py-2.5 shadow-xs rounded-2xl shadow-gray-300">
                    <img src="https://img.icons8.com/?size=96&id=V5cGWnc9R4xj&format=png" class="w-8 h-8" alt="">
                    <span class="text-[18px] font-mono">Google</span>
                </button>
                <button
                    class="flex-1 cursor-pointer items-center flex gap-3 justify-center py-2.5 shadow-xs rounded-2xl shadow-gray-300">
                    <img src="https://img.icons8.com/?size=96&id=uLWV5A9vXIPu&format=png" class="w-8 h-8" alt="">
                    <span class="text-[18px] font-mono">Facebook</span>
                </button>
            </div>
            <div class="flex flex-col gap-4 mt-3">
                <div class="flex-1">
                    <label class="text-sm font-medium" for="email">Email</label>
                    <input
                        class="block mt-2 w-full px-4 py-3 text-slate-900 bg-transparent shadow-xs rounded-md shadow-gray-300 outline-0"
                        id="email" placeholder="Nhập email của bạn" type="email" />
                </div>
                <div class="flex-1">
                    <label class="text-sm font-medium" for="password">Mật khẩu</label>
                    <input
                        class="block mt-2  w-full px-4 py-3 text-slate-900 bg-transparent shadow-xs rounded-md shadow-gray-300 outline-0"
                        id="password" placeholder="Nhập mật khẩu của bạn" type="password" />
                </div>
                <router-link to="/forgotpassword"
                    class="text-xs font-bold text-right hover:text-black hover:underline cursor-pointer">Quên mật
                    khẩu?</router-link>
                <button
                    class="flex-1 py-3 cursor-pointer shadow-md shadow-gray-400 bg-gray-900 text-white text-xl rounded-md">Đăng
                    nhập</button>
                <div class="flex justify-center items-center gap-2 mt-3">
                    <p class="text-[15px] text-gray-600 font-medium">Chưa có tài khoản?</p>
                    <router-link to="/register" class="text-[14px] font-bold text-red-500">Đăng ký ngay</router-link>
                </div>
            </div>
        </div>
    </div>
</template>