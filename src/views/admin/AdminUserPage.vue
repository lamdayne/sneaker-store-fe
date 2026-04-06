<template>
    <AdminManageSection>
        <div class="min-h-screen bg-slate-50 p-8 font-sans text-slate-900">
            <!-- Header -->
            <!-- <div class="flex justify-between items-center mb-8">
                <h1 class="text-2xl font-bold text-slate-800">Khách hàng</h1>
                <button @click="exportCSV"
                    class="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium">
                    <Download :size="18" />
                    Xuất CSV
                </button>
            </div> -->

            <!-- Filters Section -->
            <div class="bg-white rounded-xl shadow-sm border border-slate-100 p-4 mb-6">
                <div class="flex flex-wrap items-center gap-6">
                    <!-- Search -->
                    <div class="flex-1 min-w-[300px] relative">
                        <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" :size="18" />
                        <input v-model="searchQuery" type="text" placeholder="Tìm kiếm tên, email, số điện thoại..."
                            class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-red-500 text-sm outline-none" />
                    </div>

                    <!-- Date Range -->
                    <div class="flex items-center gap-3">
                        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Ngày đăng ký:</span>
                        <div
                            class="flex items-center gap-2 bg-slate-50 px-4 py-2.5 rounded-lg border-none cursor-pointer">
                            <Calendar class="text-slate-400" :size="18" />
                            <span class="text-sm text-slate-600">{{ dateRange }}</span>
                        </div>
                    </div>

                    <!-- Divider -->
                    <div class="h-8 w-px bg-slate-100 mx-2"></div>

                    <!-- Toggle Filter -->
                    <div class="flex items-center gap-3">
                        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Có đơn hàng:</span>
                        <button @click="hasOrdersFilter = !hasOrdersFilter" :class="[
                            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none',
                            hasOrdersFilter ? 'bg-red-500' : 'bg-slate-200'
                        ]">
                            <span :class="[
                                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                                hasOrdersFilter ? 'translate-x-6' : 'translate-x-1'
                            ]" />
                        </button>
                    </div>
                </div>
            </div>

            <!-- Table Container -->
            <div class="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden relative min-h-[400px]">

                <!-- Loading Overlay -->
                <div v-if="isLoading"
                    class="absolute inset-0 bg-white/60 z-10 flex items-center justify-center backdrop-blur-[1px]">
                    <div class="flex flex-col items-center gap-2">
                        <Loader2 class="animate-spin text-red-600" :size="32" />
                        <span class="text-sm font-medium text-slate-500">Đang tải dữ liệu...</span>
                    </div>
                </div>

                <!-- Error State -->
                <div v-if="error" class="p-12 text-center">
                    <p class="text-red-500 font-medium">{{ error }}</p>
                    <button @click="fetchCustomers" class="mt-4 text-sm text-slate-600 underline">Thử lại</button>
                </div>

                <table v-else class="w-full text-left border-collapse">
                    <thead>
                        <tr class="border-b border-slate-50">
                            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Khách hàng
                            </th>
                            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Liên hệ</th>
                            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                                Đơn hàng</th>
                            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                                Tổng chi tiêu</th>
                            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ngày đăng ký
                            </th>
                            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                                Trạng thái</th>
                            <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                                Hành động</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-50">
                        <tr v-for="user in users" :key="user.id" class="hover:bg-slate-50/50 transition-colors">
                            <td class="px-6 py-4">
                                <div class="flex items-center gap-4">
                                    <div
                                        :class="['w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0']">
                                        <img :src="user.avatarUrl" class="rounded-full" alt="">
                                    </div>
                                    <div>
                                        <div class="font-bold text-slate-800 text-sm">{{ user.fullName }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="text-sm text-slate-600">{{ user.email }}</div>
                                <div class="text-xs text-slate-400 mt-0.5">{{ user.phone }}</div>
                            </td>
                            <td class="px-6 py-4 text-center">
                                <span
                                    class="inline-flex items-center justify-center bg-slate-50 text-slate-700 font-medium px-3 py-1 rounded-md text-sm min-w-[32px]">
                                    12
                                </span>
                            </td>
                            <td class="px-6 py-4 text-right font-bold text-slate-800 text-sm">
                                1234567
                            </td>
                            <td class="px-6 py-4 text-sm text-slate-500">
                                {{ user.createdAt }}
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex justify-center">
                                    <label class="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" id="notifications" :checked="user.isActive"
                                            class="sr-only peer">
                                        <div
                                            class="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:bg-green-500 transition-colors">
                                        </div>
                                        <div
                                            class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full peer-checked:translate-x-5 transition-transform">
                                        </div>
                                    </label>
                                </div>
                            </td>
                            <td class="px-6 py-4 text-right">
                                <a href="#"
                                    class="text-sm font-bold text-red-600 hover:text-red-700 transition-colors">Xem</a>
                            </td>
                        </tr>
                        <!-- Empty State -->
                        <tr v-if="users.length === 0 && !isLoading">
                            <td colspan="7" class="px-6 py-12 text-center text-slate-400 text-sm">
                                Không tìm thấy khách hàng nào phù hợp.
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- Footer / Pagination -->
                <div class="px-6 py-4 border-t border-slate-50 flex items-center justify-between bg-white">
                    <p class="text-sm text-slate-400">
                        Hiển thị 1 - {{ users.length }} trong {{ totalUsers }} khách hàng
                    </p>
                    <div class="flex items-center gap-2">
                        <button @click="currentPage > 1 && (currentPage--, fetchCustomers())"
                            :disabled="currentPage === 1 || isLoading"
                            class="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors disabled:opacity-30">
                            <ChevronLeft :size="18" />
                        </button>

                        <button
                            class="w-8 h-8 flex items-center justify-center rounded-lg bg-red-600 text-white text-sm font-bold shadow-sm shadow-red-200">1</button>

                        <button @click="fetchCustomers()" :disabled="isLoading"
                            class="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors border border-slate-100 disabled:opacity-30">
                            <ChevronRight :size="18" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </AdminManageSection>
</template>

<script setup>
import AdminManageSection from '@/components/AdminManageSection.vue';
import { ref, onMounted, watch, computed } from 'vue';
import { Search, Calendar, Loader2, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { useUserStore } from '@/store/userStore';

const isLoading = ref(false);
const error = ref(null);

const userStore = useUserStore();
const users = computed(() => userStore.users)
const searchQuery = ref('');
const hasOrdersFilter = ref(true);
const dateRange = ref('01/01/2023 - 31/10/2023');
const currentPage = ref(1);
const totalUsers = ref(0);


// 4. Theo dõi thay đổi của filter để fetch lại dữ liệu
watch([searchQuery, hasOrdersFilter], async () => {
    currentPage.value = 1; // Reset về trang 1 khi search
    await userStore.fetchUsers();
});

// Gọi lần đầu khi component mount
onMounted(async () => {
    isLoading.value = true
    const resp = await userStore.fetchUsers()
    isLoading.value = false
    totalUsers.value = resp.data.totalElements
});
</script>