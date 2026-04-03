<template>
    <AdminManageSection>
        <div class="flex items-center justify-between mt-3">
            <h1 class="font-serif font-bold uppercase text-2xl">Dashboard</h1>
        </div>
        <div class="w-full">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                <div class="flex p-4 border-2 border-gray-200 rounded-lg justify-between">
                    <div class="flex flex-col">
                        <p class="text-[15px] font-bold text-slate-500 capitalize">Doanh thu</p>
                        <span class="font-bold text-2xl">{{ format.formatVND(36000000) }}</span>
                        <span class="text-green-600 font-bold mt-3">+18%</span>
                    </div>
                    <div class="p-4 bg-green-300 rounded-lg h-fit text-lg">
                        <i class="fa-solid fa-money-bill"></i>
                    </div>
                </div>
                <div class="flex p-4 border-2 border-gray-200 rounded-lg justify-between">
                    <div class="flex flex-col">
                        <p class="text-[15px] font-bold text-slate-500 capitalize">New Orders</p>
                        <span class="font-bold text-2xl">36</span>
                        <span class="text-green-600 font-bold mt-3">+36%</span>
                    </div>
                    <div class="p-4 bg-blue-300 rounded-lg h-fit text-lg">
                        <i class="fa-solid fa-basket-shopping"></i>
                    </div>
                </div>
                <div class="flex p-4 border-2 border-gray-200 rounded-lg justify-between">
                    <div class="flex flex-col">
                        <p class="text-[15px] font-bold text-slate-500 capitalize">Sản phẩm bán chạy</p>
                        <span class="font-bold text-2xl">Air Force 1</span>
                        <span class="text-green-600 font-bold mt-3">+36%</span>
                    </div>
                    <div class="p-4 bg-orange-400 rounded-lg h-fit text-lg">
                        <i class="fa-solid fa-fire"></i>
                    </div>
                </div>
                <div class="flex p-4 border-2 border-gray-200 rounded-lg justify-between">
                    <div class="flex flex-col">
                        <p class="text-[15px] font-bold text-slate-500 capitalize">Khách hàng mới</p>
                        <span class="font-bold text-2xl">36</span>
                        <span class="text-green-600 font-bold mt-3">+18%</span>
                    </div>
                    <div class="p-4 bg-yellow-200 rounded-lg h-fit text-lg">
                        <i class="fa-solid fa-user"></i>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2">

            </div>
        </div>
    </AdminManageSection>
</template>

<script setup>
import AdminManageSection from '@/components/AdminManageSection.vue';
import { format } from '@/utils/format';


</script>