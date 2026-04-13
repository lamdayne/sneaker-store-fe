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
                        <span class="text-green-600 font-bold mt-3"></span>
                    </div>
                    <div class="p-4 bg-green-300 rounded-lg h-fit text-lg">
                        <i class="fa-solid fa-money-bill"></i>
                    </div>
                </div>
                <div class="flex p-4 border-2 border-gray-200 rounded-lg justify-between">
                    <div class="flex flex-col">
                        <p class="text-[15px] font-bold text-slate-500 capitalize">New Orders</p>
                        <span class="font-bold text-2xl">{{ totalOrder }}</span>
                        <span class="text-green-600 font-bold mt-3"></span>
                    </div>
                    <div class="p-4 bg-blue-300 rounded-lg h-fit text-lg">
                        <i class="fa-solid fa-basket-shopping"></i>
                    </div>
                </div>
                <div class="flex p-4 border-2 border-gray-200 rounded-lg justify-between">
                    <div class="flex flex-col">
                        <p class="text-[15px] font-bold text-slate-500 capitalize">Sản phẩm bán chạy</p>
                        <span class="font-bold text-2xl">{{ bestProduct }}</span>
                        <span class="text-green-600 font-bold mt-3"></span>
                    </div>
                    <div class="p-4 bg-orange-400 rounded-lg h-fit text-lg">
                        <i class="fa-solid fa-fire"></i>
                    </div>
                </div>
                <div class="flex p-4 border-2 border-gray-200 rounded-lg justify-between">
                    <div class="flex flex-col">
                        <p class="text-[15px] font-bold text-slate-500 capitalize">Khách hàng</p>
                        <span class="font-bold text-2xl">{{ totalUser }}</span>
                        <span class="text-green-600 font-bold mt-3"></span>
                    </div>
                    <div class="p-4 bg-yellow-200 rounded-lg h-fit text-lg">
                        <i class="fa-solid fa-user"></i>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">
                <div class="w-full p-2 border-2 border-gray-200 rounded-2xl">
                    <h1 class="uppercase font-bold text-slate-500 font-mono text-center">
                        Thống kê lượt tạo tài khoản
                    </h1>
                    <Line :data="chartData" :options="chartOptions" />
                </div>
                <div class="w-full p-2 border-2 border-gray-200 rounded-2xl">
                    <h1 class="uppercase font-bold text-slate-500 font-mono text-center">
                        Thống kê lượt mua hàng
                    </h1>
                    <Line :data="chartData" :options="chartOptions" />
                </div>
            </div>
        </div>
    </AdminManageSection>
</template>

<script setup>
import AdminManageSection from '@/components/AdminManageSection.vue';
import { format } from '@/utils/format';
import { Line } from 'vue-chartjs'

import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
} from 'chart.js'
import { useOrderStore } from '@/store/orderStore';
import { onMounted, ref } from 'vue';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
)

const orderStore = useOrderStore()
const totalUser = ref(0)
const totalOrder = ref(0)
const bestProduct = ref(null)

onMounted(async () => {
    const resp = await orderStore.revenue()
    console.log(resp.data)
    totalUser.value = resp.data.totalUser
    totalOrder.value = resp.data.totalOrder
    const bestProductSell = resp.data.bestSellingProduct.reduce((max, current) => {
        return current[1] > max[1] ? current : max;
    });

    bestProduct.value = bestProductSell[0]
})

function getLast7Days() {
    const days = []
    const today = new Date()

    for (let i = 6; i >= 0; i--) {
        const d = new Date()
        d.setDate(today.getDate() - i)

        days.push(
            d.toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit'
            })
        )
    }

    return days
}

const chartData = {
    labels: getLast7Days(),
    datasets: [
        {
            label: 'User',
            data: [40, 20, 12, 30, 50, 30, 70],
            borderColor: '#42A5F5',
            backgroundColor: '#42A5F5',
            cubicInterpolationMode: 'monotone',
            tension: 0.4
        }
    ]
}

const chartOptions = {
    responsive: true
}
</script>