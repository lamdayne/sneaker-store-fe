<template>
    <AccountManageSection>
        <div class="flex-1 p-8 bg-white min-h-screen">
            <h1 class="text-2xl font-bold mb-6">Đơn hàng của tôi</h1>

            <div class="flex space-x-8 border-b border-gray-200 mb-6 overflow-x-auto">
                <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
                    'pb-4 text-sm font-medium transition-colors relative whitespace-nowrap',
                    activeTab === tab.id ? 'text-red-600' : 'text-gray-500 hover:text-gray-700'
                ]">
                    {{ tab.label }}
                    <span v-if="tab.count" class="ml-1 bg-gray-100 px-2 py-0.5 rounded-full text-xs">
                        {{ tab.count }}
                    </span>
                    <div v-if="activeTab === tab.id" class="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></div>
                </button>
            </div>

            <div class="relative mb-6">
                <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </span>
                <input type="text" placeholder="Tìm theo mã đơn hoặc tên sản phẩm"
                    class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300" />
            </div>

            <div class="space-y-4">
                <div v-for="order in listOrders" :key="order.id"
                    class="border border-gray-100 rounded-xl p-6 shadow-sm">

                    <div class="flex justify-between items-center mb-6 pb-4 border-b border-gray-50">
                        <div class="flex items-center space-x-3">
                            <span class="font-bold">#{{ order.orderCode }}</span>
                            <span class="text-gray-400 text-sm">Đặt ngày {{ order.createdAt }}</span>
                        </div>
                        <span
                            class="text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider bg-gray-50 text-gray-600">
                            {{ order.status }}
                        </span>
                    </div>

                    <div class="flex items-center space-x-4 mb-6">
                        <div class="flex -space-x-2">
                            <div v-for="(orderItem, index) in order.orderItems" :key="index"
                                class="w-16 h-16 border border-gray-100 rounded-lg overflow-hidden bg-gray-50">
                                <img :src="orderItem.product.thumbnail"
                                    class="w-full h-full object-cover shadow-gray-600" />
                            </div>
                        </div>
                        <div class="flex-1">
                            <p class="text-sm text-gray-700 line-clamp-1">{{ order.orderItems[0]['product']['name'] }}
                            </p>
                        </div>
                    </div>

                    <div class="flex justify-between items-center pt-4">
                        <div class="text-sm">
                            <span class="text-gray-500">Tổng cộng:</span>
                            <span class="ml-2 font-bold text-lg">{{ format.formatVND(order.totalAmount) }}</span>
                        </div>
                        <div class="flex space-x-3">
                            <router-link :to="`/order/${order.id}`"
                                class="px-6 py-2 rounded-lg text-sm font-semibold border border-gray-200">Chi
                                tiết</router-link>
                            <!-- <button class="px-6 py-2 rounded-lg text-sm font-semibold bg-black text-white">Mua
                                lại</button> -->
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </AccountManageSection>
</template>

<script setup>
import AccountManageSection from '@/components/AccountManageSection.vue';
import { useOrderStore } from '@/store/orderStore';
import { format } from '@/utils/format';
import { computed, onMounted, ref } from 'vue'
const activeTab = ref('all')
const tabs = ref([
    { id: 'all', label: 'Tất cả', count: 0 },
    { id: 'pending', label: 'Chờ xác nhận', count: 0 },
    { id: 'processing', label: 'Đang xử lý', count: 0 },
    { id: 'shipping', label: 'Đang giao', count: 0 },
    { id: 'completed', label: 'Đã giao', count: 0 },
    { id: 'cancelled', label: 'Đã hủy', count: 0 },
])

const orderStore = useOrderStore()
const listOrders = computed(() => orderStore.listOrders)

onMounted(async () => {
    await orderStore.getAllMyOrder()
    console.log(listOrders.value);
})

</script>