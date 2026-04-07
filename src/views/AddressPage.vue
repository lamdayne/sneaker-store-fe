<template>
    <AccountManageSection>
        <div class="mt-4 mb-4 mx-auto">
            <h1 class="text-2xl font-serif font-bold">Địa chỉ giao hàng</h1>
            <div class="w-250 mt-4 border border-2 rounded-lg p-4">
                <h1 class="p-4 text-2xl font-serif font-bold">
                    <i class="fa-solid fa-pen-to-square"></i>
                    Cập nhật địa chỉ
                </h1>
                <div class="px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="text-xs font-bold uppercase text-gray-600">Họ tên người nhận</label>
                        <input class="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md outline-none"
                            type="text" />
                    </div>
                    <div>
                        <label class="text-xs font-bold uppercase text-gray-600">Số điện thoại</label>
                        <input class="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md outline-none"
                            type="text" />
                    </div>
                </div>
                <div class="px-4 grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    <div>
                        <label class="text-xs font-bold uppercase text-gray-600">Tỉnh / Thành phố</label>
                        <select
                            class="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md outline-none appearance-none"
                            name="" id=""></select>
                    </div>
                    <div>
                        <label class="text-xs font-bold uppercase text-gray-600">Quận / Huyện</label>
                        <select
                            class="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md outline-none appearance-none"
                            name="" id=""></select>
                    </div>
                    <div>
                        <label class="text-xs font-bold uppercase text-gray-600">Phường / Xã</label>
                        <select
                            class="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md outline-none appearance-none"
                            name="" id=""></select>
                    </div>
                </div>
                <div class="px-4 grid grid-cols-1 md:grid-cols-1 gap-6 mt-4 mb-2">
                    <div>
                        <label class="text-xs font-bold uppercase text-gray-600">Tỉnh / Thành phố</label>
                        <textarea name="" class="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md outline-none"
                            id=""></textarea>
                    </div>
                </div>
                <div class="px-4 flex gap-2 items-center">
                    <input class="" type="checkbox" name="" id="defaultAddress">
                    <label class="text-xs font-bold uppercase text-gray-600 cursor-pointer" for="defaultAddress">Đặt làm
                        địa chỉ mặc
                        định</label>
                </div>
                <div class="px-4 flex gap-4 mt-3">
                    <button class="py-2.5 px-6 font-medium bg-gray-950 rounded-xl text-white cursor-pointer">
                        Lưu thay đổi
                    </button>
                    <button class="py-2.5 px-6 font-medium bg-gray-300 rounded-xl cursor-pointer">
                        Hủy
                    </button>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 w-250 gap-4">
                <div v-for="address in addresses" :key="address.id"
                    class="w-full mt-4 border border-gray-600 rounded-lg p-4">
                    <p class="text-[15px] font-medium">{{ address.recipientName }} | {{ address.phone }}</p>
                    <span v-if="address.defaultAddress"
                        class="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-green-700 text-white rounded-md uppercase">
                        Mặc định
                    </span>
                    <span v-else class="ml-1 px-1.5 py-0.5"></span>
                    <p class="text-sm mt-2 ml-1 text-gray-700">{{ getAddress(address) }}</p>
                    <div class="mt-3 ml-1 flex gap-4">
                        <button class="uppercase text-xs font-bold cursor-pointer">Chỉnh sửa</button>
                        <button class="uppercase text-xs font-bold text-red-500 cursor-pointer">Xóa</button>
                    </div>
                </div>
            </div>
        </div>
    </AccountManageSection>
</template>

<script setup>
import AccountManageSection from '@/components/AccountManageSection.vue';
import { useUserStore } from '@/store/userStore';
import { computed, onMounted } from 'vue';

const userStore = useUserStore()

const addresses = computed(() => userStore.addresses)

onMounted(async () => {
    await userStore.myInfo()
})

const getAddress = (address) => {
    return `${address.streetAddress}, ${address.ward}, ${address.district}, ${address.province}`
}
</script>