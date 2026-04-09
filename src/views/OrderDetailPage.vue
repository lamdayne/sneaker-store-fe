<template>
    <AccountManageSection>
        <div v-if="!order" class="p-8 text-center text-gray-500">
            Đang tải thông tin đơn hàng...
        </div>

        <div v-else class="p-8 flex-1">
            <div class="flex justify-between items-start mb-8">
                <div>
                    <h1 class="text-3xl font-bold flex items-center gap-3 text-gray-900">
                        Đơn hàng #{{ order.orderCode }}
                    </h1>
                    <div class="text-sm text-gray-600 mt-2 flex items-center gap-2">
                        Đặt ngày {{ order.createdAt }}
                        <span class="text-gray-300">|</span>
                        <span :class="statusClass"
                            class="font-semibold px-3 py-1 rounded-full text-xs uppercase tracking-wide">
                            {{ order.status }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm mb-8 flex items-center gap-4">
                <div v-for="(step, index) in steps" :key="index" class="flex-1 flex flex-col items-center relative">
                    <div :class="[
                        'w-10 h-10 rounded-full border-2 flex items-center justify-center relative z-10',
                        step.completed ? 'border-red-600 bg-red-600 text-white' :
                            step.active ? 'border-red-600 bg-white text-red-600' : 'border-gray-200 bg-white text-gray-300'
                    ]">
                        <span v-if="step.completed">✓</span>
                        <div v-else-if="step.active" class="w-3 h-3 bg-red-600 rounded-full"></div>
                    </div>
                    <div v-if="index < steps.length - 1"
                        :class="['absolute top-5 -right-1/2 w-full h-0.5 z-0', step.completed ? 'bg-red-600' : 'bg-gray-100']">
                    </div>
                    <div class="text-[10px] font-bold mt-3 uppercase tracking-tighter"
                        :class="step.completed || step.active ? 'text-gray-900' : 'text-gray-400'">
                        {{ step.label }}
                    </div>
                </div>
            </div>

            <div class="flex gap-8">
                <div class="flex-1 flex flex-col gap-8">
                    <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 class="text-xl font-bold mb-6">Sản phẩm ({{ order.orderItems?.length || 0 }})</h3>
                        <div class="space-y-6">
                            <div v-for="item in order.orderItems" :key="item.id"
                                class="flex gap-6 pb-6 border-b last:border-0 last:pb-0">
                                <img :src="item.product.thumbnail" class="w-24 h-24 rounded-2xl object-cover border" />
                                <div class="flex-1">
                                    <div class="flex justify-between font-bold text-gray-900">
                                        <span>{{ item.product.name }}</span>
                                        <span>{{ format.formatVND(item.unitPrice) }}</span>
                                    </div>
                                    <div class="text-sm text-gray-500 mt-1">
                                        Size: {{ item.size }} | Màu: {{ item.color }}
                                    </div>
                                    <div class="text-sm mt-2">Số lượng: {{ item.quantity }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                        <div class="flex justify-between">
                            <span>Tạm tính</span>
                            <span>{{ format.formatVND(order.subtotal) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Phí vận chuyển</span>
                            <span>{{ format.formatVND(order.shippingFee) }}</span>
                        </div>
                        <div class="flex justify-between text-red-600">
                            <span>Giảm giá</span>
                            <span>-{{ format.formatVND(order.discountAmount) }}</span>
                        </div>
                        <div class="border-t pt-5 flex justify-between items-end">
                            <span class="text-lg font-bold">Tổng thanh toán</span>
                            <span class="text-3xl font-extrabold text-red-600">
                                {{ format.formatVND(order.totalAmount) }}
                            </span>
                        </div>
                    </div>

                    <!-- <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div class="flex justify-between items-center mb-6">
                            <h3 class="text-xl font-bold">Thông tin vận chuyển</h3>
                            <span class="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold">ĐƠN VỊ: {{
                                order.shippingUnit }}</span>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="bg-gray-100 p-4 rounded-xl">
                                <p class="text-xs text-gray-500 uppercase">Mã vận đơn</p>
                                <p class="font-bold mt-1">{{ order.trackingNumber }}</p>
                            </div>
                            <div class="bg-gray-100 p-4 rounded-xl">
                                <p class="text-xs text-gray-500 uppercase">Dự kiến giao hàng</p>
                                <p class="font-bold mt-1">{{ order.expectedDelivery }}</p>
                            </div>
                        </div>
                    </div> -->
                </div>

                <div class="w-96 flex flex-col gap-8">
                    <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                            <i class="fa-solid fa-map"></i>
                            Địa chỉ nhận hàng
                        </h3>
                        <p class="font-bold">{{ address.recipientName }}</p>
                        <p>{{ address.phone }}</p>
                        <p class="mt-4 text-gray-600 leading-relaxed">{{ getAddress(address) }}</p>
                    </div>

                    <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 class="text-xl font-bold mb-4">Thanh toán</h3>
                        <div class="bg-gray-100 p-4 rounded-xl flex items-center gap-4 mb-4">
                            <div class="w-10 h-7 bg-gray-300 rounded"></div>
                            <div>
                                <p class="font-bold text-sm">{{ order.paymentMethod }}</p>
                            </div>
                        </div>
                        <p class="text-green-700 font-medium bg-green-50 p-3 rounded-lg text-center">
                            {{ order.paymentStatus }}
                        </p>
                    </div>

                    <div class="text-center">
                        <button @click="cancelOrder" :disabled="order.status !== 'PENDING'"
                            class="w-full py-3 border border-red-500 text-red-500 font-bold rounded-lg hover:bg-red-50 transition cursor-pointer">
                            HỦY ĐƠN HÀNG
                        </button>
                        <p class="text-[10px] text-gray-400 mt-4 px-4 italic">
                            *Chỉ có thể hủy đơn hàng trước khi đơn vị vận chuyển lấy hàng.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </AccountManageSection>
</template>
<script setup>
import AccountManageSection from '@/components/AccountManageSection.vue';
import { useAddressStore } from '@/store/addressStore';
import { useOrderStore } from '@/store/orderStore';
import { format } from '@/utils/format';
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';

defineEmits(['cancelOrder'])

const orderStore = useOrderStore()
const addressStore = useAddressStore()
const route = useRoute()
const router = useRouter()

const order = ref(null)
const address = ref(null)

onMounted(async () => {
    const resp = await orderStore.getOrderById(route.params.id)
    order.value = resp.data
    const addressValue = await addressStore.getAddressById(order.value.shippingAddressId)
    address.value = addressValue.data
})

const getAddress = (address) => {
    return `${address.streetAddress}, ${address.ward}, ${address.district}, ${address.province}`
}

const steps = computed(() => {
    const currentStatus = order.value?.status || 'pending'
    const allSteps = [
        { key: 'placed', label: 'ĐÃ ĐẶT HÀNG' },
        { key: 'confirmed', label: 'XÁC NHẬN' },
        { key: 'picked', label: 'ĐÃ LẤY HÀNG' },
        { key: 'shipping', label: 'ĐANG VẬN CHUYỂN' },
        { key: 'success', label: 'GIAO THÀNH CÔNG' }
    ]

    return allSteps.map(s => ({
        ...s,
        completed: false,
        active: s.key === currentStatus
    }))
})

const statusClass = computed(() => {
    return 'bg-orange-100 text-orange-600'
})

const cancelOrder = async () => {
    const orderCode = order.value.orderCode
    await orderStore.cancelOrder(orderCode)
    router.push('/auth/order')
}
</script>