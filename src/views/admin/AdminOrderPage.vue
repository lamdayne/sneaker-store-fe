<template>
    <AdminManageSection>
        <div class="min-h-screen bg-[#F8F9FA] p-8 font-sans text-slate-900">
            <!-- Header -->
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold text-slate-800">Đơn hàng</h1>
                <!-- <button @click="exportCSV"
                    class="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium shadow-sm">
                    <Download :size="16" />
                    Xuất CSV
                </button> -->
            </div>

            <!-- Filter Section -->
            <div class="bg-white rounded-xl shadow-sm border border-slate-100 p-5 mb-6">
                <div class="grid grid-cols-12 gap-4 items-end">
                    <!-- Search -->
                    <div class="col-span-3">
                        <label class="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider">Tìm
                            kiếm</label>
                        <div class="relative">
                            <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" :size="16" />
                            <input v-model="searchQuery" type="text" placeholder="Mã đơn, tên, SĐT..."
                                class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg focus:ring-1 focus:ring-slate-200 outline-none text-sm" />
                        </div>
                    </div>

                    <!-- Status Filter -->
                    <div class="col-span-2">
                        <label class="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider">Trạng
                            thái</label>
                        <div class="relative">
                            <select v-model="statusFilter"
                                class="w-full appearance-none bg-slate-50 border border-slate-100 px-4 py-2 rounded-lg text-sm outline-none cursor-pointer">
                                <option value="all">Tất cả trạng thái</option>
                            </select>
                            <ChevronDown
                                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                                :size="14" />
                        </div>
                    </div>

                    <!-- Payment Filter -->
                    <div class="col-span-2">
                        <label class="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider">Thanh
                            toán</label>
                        <div class="relative">
                            <select v-model="paymentFilter"
                                class="w-full appearance-none bg-slate-50 border border-slate-100 px-4 py-2 rounded-lg text-sm outline-none cursor-pointer">
                                <option value="all">Tất cả phương thức</option>
                            </select>
                            <ChevronDown
                                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                                :size="14" />
                        </div>
                    </div>

                    <!-- Date Picker -->
                    <div class="col-span-3">
                        <label
                            class="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider">Ngày</label>
                        <div class="relative">
                            <Calendar class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" :size="16" />
                            <input type="text" placeholder="Chọn khoảng ngày"
                                class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm outline-none" />
                        </div>
                    </div>

                    <!-- Filter Button -->
                    <div class="col-span-2">
                        <button
                            class="w-full bg-slate-900 text-white py-2 rounded-lg font-bold text-sm hover:bg-slate-800 transition-all">
                            Lọc
                        </button>
                    </div>
                </div>
            </div>

            <!-- Tabs -->
            <div class="flex gap-8 border-b border-slate-200 mb-6">
                <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
                    'pb-3 text-sm font-bold transition-all relative',
                    activeTab === tab.id ? 'text-slate-900 border-b-2 border-red-500' : 'text-slate-400 hover:text-slate-600'
                ]">
                    {{ tab.label }} ({{ tab.count }})
                </button>
            </div>

            <!-- Bulk Actions -->
            <div class="flex items-center gap-3 mb-6">
                <span class="text-xs text-slate-500">Thao tác hàng loạt:</span>
                <div class="relative">
                    <select
                        class="appearance-none bg-white border border-slate-200 pl-4 pr-10 py-1.5 rounded-lg text-xs outline-none cursor-pointer">
                        <option>Cập nhật trạng thái</option>
                    </select>
                    <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" :size="12" />
                </div>
                <button
                    class="bg-slate-50 border border-slate-200 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-100">Áp
                    dụng</button>
            </div>

            <!-- Orders Table -->
            <div class="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden relative min-h-[500px]">
                <div v-if="isLoading" class="absolute inset-0 bg-white/60 z-20 flex items-center justify-center">
                    <Loader2 class="animate-spin text-slate-400" :size="32" />
                </div>

                <table class="w-full text-left">
                    <thead class="bg-slate-50/50">
                        <tr class="border-b border-slate-100">
                            <th class="pl-6 py-4 w-12">
                                <input type="checkbox" class="rounded border-slate-300 text-red-600 focus:ring-red-500">
                            </th>
                            <th class="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mã đơn
                            </th>
                            <th class="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Khách
                                hàng</th>
                            <th class="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sản
                                phẩm</th>
                            <th class="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tổng
                                tiền</th>
                            <th
                                class="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
                                Thanh toán</th>
                            <th
                                class="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
                                Trạng thái thanh toán</th>
                            <th
                                class="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
                                Trạng thái đơn</th>
                            <th class="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ngày
                            </th>
                            <th class="px-4 py-4"></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-50">
                        <tr v-for="order in orders" :key="order.id"
                            class="hover:bg-slate-50/30 transition-colors group">
                            <td class="pl-6 py-4">
                                <input type="checkbox" class="rounded border-slate-300 text-red-600 focus:ring-red-500">
                            </td>
                            <td class="px-4 py-4 text-xs font-medium text-slate-600">{{ order.orderCode }}</td>
                            <td class="px-4 py-4">
                                <div class="text-sm font-bold text-slate-800">{{ order.user.fullName }}</div>
                                <div class="text-[11px] text-slate-400">{{ order.user.email }}</div>
                            </td>
                            <td class="px-4 py-4 text-xs text-slate-600">{{ getTotalQuantity(order.orderItems) }} sản
                                phẩm</td>
                            <td class="px-4 py-4 text-sm font-bold text-slate-800">{{
                                format.formatVND(order.totalAmount) }}</td>
                            <td class="px-4 py-4 text-center">
                                <span
                                    class="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-tighter">
                                    {{ order.paymentMethod }}
                                </span>
                            </td>
                            <td class="px-4 py-4 text-center">
                                <span
                                    :class="['px-3 py-1 rounded-md text-[11px] font-bold inline-block min-w-[100px]', order.paymentStatus]">
                                    {{ order.paymentStatus }}
                                </span>
                            </td>
                            <td class="px-4 py-4 text-xs text-slate-400 font-bold">{{ order.status }}</td>
                            <td class="px-4 py-4 text-xs text-slate-400">{{ order.createdAt }}</td>
                            <td class="px-4 py-4 text-right">
                                <div
                                    class="flex items-center gap-3 justify-end pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button class="text-slate-400 hover:text-slate-600" @click="showOrderDetail(order)">
                                        <Eye :size="18" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- Pagination -->
                <PaginationSection :page-no="pagination.pageNo" :page-size="pagination.pageSize"
                    :total-elements="pagination.totalElements" :total-page="pagination.totalPage"
                    v-model:page-no="pagination.pageNo" @change-page="changePage"></PaginationSection>
            </div>
        </div>
        <ModelSection :is-open="isOpen" @close-modal="closeModal">
            <div class="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2 space-y-8">
                    <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 class="text-xl font-bold mb-6">Sản phẩm ({{ order?.orderItems?.length || 0 }})</h3>
                        <div class="space-y-6">
                            <div v-for="item in order?.orderItems" :key="item?.id"
                                class="flex gap-6 pb-6 border-b last:border-0 last:pb-0">
                                <img :src="item?.product?.thumbnail"
                                    class="w-24 h-24 rounded-2xl object-cover border" />
                                <div class="flex-1">
                                    <div class="flex justify-between font-bold text-gray-900">
                                        <span>{{ item?.product?.name }}</span>
                                        <span>{{ format.formatVND(item?.unitPrice) }}</span>
                                    </div>
                                    <div class="text-sm text-gray-500 mt-1">
                                        Size: {{ item?.size }} | Màu: {{ item?.color }}
                                    </div>
                                    <div class="text-sm mt-2">Số lượng: {{ item?.quantity }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="space-y-6">
                    <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                        <div class="flex justify-between">
                            <span>Tạm tính</span>
                            <span>{{ format.formatVND(order?.subtotal) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Phí vận chuyển</span>
                            <span>{{ format.formatVND(order?.shippingFee) }}</span>
                        </div>
                        <div class="flex justify-between text-red-600">
                            <span>Giảm giá</span>
                            <span>-{{ format.formatVND(order?.discountAmount) }}</span>
                        </div>
                        <div class="border-t pt-5 flex justify-between items-end">
                            <span class="text-lg font-bold">Tổng thanh toán</span>
                            <span class="text-3xl font-extrabold text-red-600">
                                {{ format.formatVND(order?.totalAmount) }}
                            </span>
                        </div>
                    </div>
                    <select v-model="orderStatus" name="" id="" class="w-full p-3 shadow rounded-xl">
                        <option value="PENDING">PENDING</option>
                        <option value="ACCEPTED">ACCEPTED</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="COMPLETED">COMPLETED</option>
                    </select>
                    <button @click="changeStatus"
                        class="w-full p-4 bg-gray-950 text-white rounded-xl shadow cursor-pointer">
                        Update
                    </button>
                </div>
            </div>
        </ModelSection>
    </AdminManageSection>
</template>

<script setup>
import AdminManageSection from '@/components/AdminManageSection.vue';
import { ref, onMounted, computed } from 'vue';
import {
    Search,
    Calendar,
    Loader2,
    Eye,
    ChevronDown
} from 'lucide-vue-next';
import { useOrderStore } from '@/store/orderStore';
import { format } from '@/utils/format';
import PaginationSection from '@/components/PaginationSection.vue';
import ModelSection from '@/components/ModelSection.vue';


const isLoading = ref(false);

// 2. Tham số lọc và Tab
const activeTab = ref('all');
const searchQuery = ref('');
const statusFilter = ref('all');
const paymentFilter = ref('all');

const tabs = [
    { id: 'all', label: 'Tất cả', count: 12 },
    { id: 'pending', label: 'Chờ xác nhận', count: 42 },
    { id: 'processing', label: 'Đang xử lý', count: 15 },
    { id: 'shipping', label: 'Đang giao', count: 28 },
    { id: 'delivered', label: 'Đã giao', count: 1120 },
    { id: 'cancelled', label: 'Đã hủy', count: 35 },
];

const orderStore = useOrderStore()

const orders = computed(() => orderStore.orders)
const order = ref(null)
const isOpen = ref(false)
const orderStatus = ref(null)

const pagination = ref({
    pageNo: 0,
    pageSize: 0,
    totalPage: 0,
    totalElements: 0
})

onMounted(async () => {
    const resp = await orderStore.getAllOrder()
    const value = resp.data
    pagination.value = {
        pageNo: value.pageNo,
        pageSize: value.pageSize,
        totalElements: value.totalElements,
        totalPage: value.totalPage
    }
});

const getTotalQuantity = (orderItems) => {
    return orderItems.reduce((total, item) => total + item.quantity, 0)
}

const changePage = async (page) => {
    isLoading.value = true
    await orderStore.getAllOrder(page)
    isLoading.value = false
}

const showOrderDetail = (orderDetail) => {
    order.value = orderDetail
    isOpen.value = true
    console.log(order);
}

const closeModal = () => {
    isOpen.value = false
    order.value = null
}

const changeStatus = async () => {
    await orderStore.changeStatus(order.value.orderCode, orderStatus.value)
    await orderStore.getAllOrder()
    closeModal()
}

</script>