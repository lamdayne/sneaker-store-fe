<template>
    <AccountManageSection>
        <div class="mt-4 mx-auto">
            <h1 class="text-2xl font-serif font-bold">Thông tin cá nhân</h1>
            <div class="w-250 mt-4 border rounded-lg p-4">
                <div class="flex p-4">
                    <div class="flex gap-6">
                        <img src="https://files.catbox.moe/lonccy.jpg" class="w-20 rounded-full shadow-xs" alt="">
                        <div class="flex flex-col justify-center">
                            <p class="text-[17px] font-semibold">Ảnh đại diện</p>
                            <span class="text-[14px]">Định dạng jpg, png,...Tối đa 2MB</span>
                        </div>
                    </div>
                </div>
                <div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="text-sm font-medium">Họ và tên</label>
                        <input value="Nguyen Hoang Phuong Lam"
                            class="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md outline-none" type="text" />
                    </div>
                    <div>
                        <label class="text-sm font-medium">Email</label>
                        <input value="phuonglam.dev@gmail.com" disabled="true"
                            class="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md outline-none bg-gray-100"
                            type="email" />
                    </div>
                    <div>
                        <label class="text-sm font-medium">Số điện thoại</label>
                        <input class="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md outline-none"
                            type="text" />
                    </div>
                    <div>
                        <label class="text-sm font-medium">Mật khẩu</label>
                        <input class="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md outline-none"
                            type="text" />
                    </div>
                    <button class="bg-gray-950 w-52 text-white p-3 rounded-lg cursor-pointer">Lưu thay đổi</button>
                </div>
            </div>
        </div>
    </AccountManageSection>
</template>

<script setup>
import AccountManageSection from '@/components/AccountManageSection.vue';


</script>