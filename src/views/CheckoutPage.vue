<template>
    <div class="flex justify-center items-center mt-6 font-mono gap-12">
        <div class="flex gap-4 items-center">
            <span class="py-1 px-3 bg-red-700 text-white rounded-full font-bold">1</span>
            <p class="font-bold">Địa chỉ</p>
        </div>
        <div class="w-20 bg-gray-300 h-0.5"></div>
        <div class="flex gap-4 items-center text-gray-300">
            <span class="py-1 px-3 bg-gray-300 text-white rounded-full font-bold">2</span>
            <p class="font-bold">Thanh toán</p>
        </div>
        <div class="w-20 bg-gray-300 h-0.5"></div>
        <div class="flex gap-4 items-center text-gray-300">
            <span class="py-1 px-3 bg-gray-300 text-white rounded-full font-bold">3</span>
            <p class="font-bold">Xác nhận</p>
        </div>
    </div>
    <div class="container mx-auto grid grid-cols-1 lg:grid-cols-6 gap-4 mt-5">
        <div class="lg:col-span-4">
            <div v-if="addresses.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div v-for="address in addresses" :key="address.id" @click="selectedAddress = address.id" :class="['w-full mt-1 border-gray-600 rounded-lg p-4 cursor-pointer',
                    selectedAddress === address.id ? 'border-2' : 'border']">
                    <div class="flex justify-between">
                        <p class="text-[15px] font-medium">{{ address.recipientName }} | {{ address.phone }}</p>
                        <span v-if="selectedAddress === address.id">
                            <i class="fa-solid fa-circle-check"></i>
                        </span>
                    </div>
                    <span class="ml-1 px-1.5 py-0.5"></span>
                    <p class="text-sm mt-2 ml-1 text-gray-700">{{ getAddress(address) }}</p>
                </div>
            </div>
            <div class="grid grid-cols-1 w-68 h-37 border mt-4 rounded-lg ">
                <button class="cursor-pointer text-lg">
                    <i class="fa-solid fa-circle-plus"></i>
                    Thêm địa chỉ
                </button>
            </div>
        </div>
        <div class="lg:col-span-2">
            <div class="w-full">
                <div class="sticky top-28 border border-gray-100 rounded-3xl p-4 bg-white shadow-sm">
                    <h2 class="text-xl font-bold uppercase mb-5 tracking-tight text-gray-950">
                        Tóm tắt đơn hàng
                    </h2>

                    <div class="flex flex-col gap-6">
                        <div class="flex gap-2">
                            <img src="https://res.cloudinary.com/dmzsletu0/image/upload/v1774517001/sneaker_store/vgbv46l5kcxluv7d3jbh.avif"
                                alt="" class="w-24 h-22 object-cover rounded-xl">
                            <div class="flex flex-col justify-between w-full">
                                <div class="flex flex-col">
                                    <p class="font-medium">Nike</p>
                                    <p class="text-[14px] text-gray-400 uppercase font-medium">
                                        Size: 39 - Màu:
                                        <span class="px-4 ml-1 rounded-lg" :style="{ backgroundColor: '#eee' }"></span>
                                    </p>
                                </div>
                                <div class="flex items-center gap-6">
                                    <span class="text-gray-400 text-[14px] font-medium">SL: 1</span>
                                    <span class="text-red-800 font-bold text-[15px]">
                                        {{ format.formatVND(40000000) }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button
                            class="w-full bg-black text-white py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-zinc-800 transition-all cursor-pointer shadow-lg">
                            Thanh toán ngay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '@/store/userStore';
import { format } from '@/utils/format';
import { computed, onMounted, ref } from 'vue';

const selectedAddress = ref(null)

const userStore = useUserStore()
const addresses = computed(() => userStore.addresses)

onMounted(async () => {
    await userStore.myInfo()
    const defaultAddr = addresses.value.find(a => a.defaultAddress)
    if (defaultAddr) {
        selectedAddress.value = defaultAddr.id
    }
})

const getAddress = (address) => {
    return `${address.streetAddress}, ${address.ward}, ${address.district}, ${address.province}`
}
</script>