<template>
    <model-section :is-open="isLoading">
        <div class="animate-spin">
            <i class="fa-solid fa-hourglass"></i>
        </div>
    </model-section>
    <div class="flex justify-center items-center mt-6 font-mono gap-12">
        <div class="flex gap-4 items-center text-gray-300">
            <span class="py-1 px-3 bg-gray-300 text-white rounded-full font-bold">1</span>
            <p class="font-bold">Địa chỉ</p>
        </div>
        <div class="w-20 bg-gray-300 h-0.5"></div>
        <div class="flex gap-4 items-center">
            <span class="py-1 px-3 bg-red-700 text-white rounded-full font-bold">2</span>
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
            <h2 class="font-serif text-3xl mb-8">Phương thức thanh toán</h2>
            <div class="space-y-4">
                <label class="payment-option block">
                    <div
                        class="flex items-center gap-6 border border-gray-200 rounded-xl p-4 hover:border-gray-900 transition-all cursor-pointer">
                        <input type="radio" v-model="orderStore.orderInfo.paymentMethod" name="paymentMethod"
                            value="COD" class="w-5 h-5">
                        <div class="flex-1">
                            <div class="font-medium">Thanh toán khi nhận hàng (COD)</div>
                            <div class="text-sm text-gray-500">Thanh toán bằng tiền mặt khi nhận hàng</div>
                        </div>
                        <img src="https://cdn.iconscout.com/icon/free/png-256/free-cod-icon-svg-download-png-32260.png"
                            alt="COD" class="w-10 h-10">
                    </div>
                </label>
                <label class="payment-option block">
                    <div
                        class="flex items-center gap-6 border border-gray-200 rounded-xl p-4 hover:border-gray-900 transition-all cursor-pointer">
                        <input type="radio" v-model="orderStore.orderInfo.paymentMethod" name="paymentMethod"
                            value="PAY" class="w-5 h-5">
                        <div class="flex-1">
                            <div class="font-medium">Thanh toán hình thức chuyển khoản</div>
                            <div class="text-sm text-gray-500">Thanh toán bằng tiền mặt khi nhận hàng</div>
                        </div>
                        <img src="https://www.rapyd.net/wp-content/uploads/2025/04/vietqr.png" alt="PAY" class="w-20">
                    </div>
                </label>
            </div>
        </div>
        <div class="lg:col-span-2">
            <div class="w-full">
                <div class="sticky top-28 border border-gray-100 rounded-3xl p-4 bg-white shadow-sm">
                    <h2 class="text-xl font-bold uppercase mb-5 tracking-tight text-gray-950">
                        Tóm tắt đơn hàng
                    </h2>

                    <div class="flex flex-col gap-6">
                        <div v-for="product, index in products" :key="product.id" class="flex gap-2">
                            <img :src="product.thumbnail" alt="" class="w-24 h-22 object-cover rounded-xl">
                            <div class="flex flex-col justify-between w-full">
                                <div class="flex flex-col">
                                    <p class="font-medium">{{ product.name }}</p>
                                    <p class="text-[14px] text-gray-400 uppercase font-medium">
                                        Size: {{ orderItems[index].size }} - Màu:
                                        <span class="px-4 ml-1 rounded-lg"
                                            :style="{ backgroundColor: orderItems[index].color }"></span>
                                    </p>
                                </div>
                                <div class="flex items-center gap-6">
                                    <span class="text-gray-400 text-[14px] font-medium">SL: {{
                                        orderItems[index].quantity }}</span>
                                    <span class="text-red-800 font-bold text-[15px]">
                                        {{ format.formatVND(orderItems[index].unitPrice) }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col gap-4 border-b border-gray-50 pb-6">
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-400 font-medium font-sans italic">Tạm tính</span>
                                <span class="font-bold text-gray-950 tracking-tight">
                                    {{ format.formatVND(getTotalPrice()) }}
                                </span>
                            </div>
                            <div class="flex justify-between text-sm text-gray-400 italic">
                                <span class="font-sans italic">Phí vận chuyển</span>
                                <span class="font-bold text-gray-950 italic">0 đ</span>
                            </div>
                            <div class="flex justify-between text-sm text-green-600 italic">
                                <span class="font-sans italic">Giảm giá</span>
                                <span class="font-bold italic">-0đ</span>
                            </div>
                        </div>
                        <button @click="pay"
                            class="w-full bg-black text-white py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-zinc-800 transition-all cursor-pointer shadow-lg">
                            Thanh toán ngay
                        </button>
                        <router-link to="/order/checkout"
                            class="flex gap-2 justify-center items-center font-bold text-xs text-gray-400">
                            <i class="fa-solid fa-arrow-left"></i>
                            <span>Quay lại địa chỉ</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <model-section :is-open="showQr">
        <div class="w-60 h-70 flex flex-col items-center">
            <img :src="qrImageUrl" alt="" class="shadow-2xl rounded-xl">
            <span class="mt-4 font-mono font-bold text-red-600 animate-pulse">QR sẽ hết hạn sau 2 phút</span>
        </div>
    </model-section>
</template>

<script setup>
import ModelSection from '@/components/ModelSection.vue';
import { useOrderStore } from '@/store/orderStore';
import { useUserStore } from '@/store/userStore';
import { format } from '@/utils/format';
import Swal from 'sweetalert2';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const selectedAddress = ref(null)
const isLoading = ref(false)

const userStore = useUserStore()
const orderStore = useOrderStore()
const addresses = computed(() => userStore.addresses)
const orderItems = computed(() => orderStore.orderItems)
const products = computed(() => orderStore.productOrders)
const orderId = ref('');
const orderCode = ref(null)
const qrImageUrl = ref('')
const showQr = ref(false)
const totalAmount = ref(null)

onMounted(async () => {
    if (orderItems.value.length <= 0) router.push('/')
    isLoading.value = true
    await userStore.myInfo()
    const defaultAddr = addresses.value.find(a => a.defaultAddress)
    if (defaultAddr) {
        selectedAddress.value = defaultAddr.id
    }
    isLoading.value = false
    // console.log(orderItems.value)
})

const getTotalPrice = () => {
    return orderItems.value.reduce((total, value) => {
        return total + value.quantity * value.unitPrice
    }, 0)
}

const pay = async () => {
    if (!orderStore.orderInfo.paymentMethod) {
        Swal.fire({
            title: 'Chưa chọn phương thức thanh toán',
            icon: 'warning',
            text: 'Vui lòng chọn một phương thức thanh toán',
            confirmButtonText: 'OK'
        })
        return
    }
    console.log(orderStore.orderInfo)
    if (orderStore.orderInfo.paymentMethod === 'PAY') {
        await createOrder()
        const body = {
            amount: totalAmount.value,
            description: orderCode.value
        }
        const resp = await orderStore.createPaymentQR({ ...body })
        qrImageUrl.value = resp.data.qrImageUrl
        showQr.value = true

        if (window.paymentTimer) {
            clearTimeout(window.paymentTimer)
        }

        startCheckPayment()

        window.paymentTimer = setTimeout(() => {
            qrImageUrl.value = null
            showQr.value = false
            console.log('QR đã hết hạn sau 2 phút')
        }, 120 * 1000)
    } else {
        if (!orderCode.value) {
            await createOrder()
            router.push('/order/success')
        } else {
            router.push('/order/success')
        }
    }
}

let isChecking = false;
let intervalId = null;
let startedAt = null;

const EXPIRE_TIME = 2 * 60 * 1000; // 2 phút

const startCheckPayment = () => {
    if (intervalId) return;

    startedAt = Date.now();

    intervalId = setInterval(async () => {
        // check hết hạn trước
        if (Date.now() - startedAt > EXPIRE_TIME) {
            clearInterval(intervalId);
            intervalId = null;
            console.log("QR hết hạn");
            showQr.value = false;
            return;
        }

        if (isChecking) return;
        isChecking = true;

        try {
            const res = await orderStore.checkPaymentStatus(orderCode.value);
            console.log(res)
            if (res.data === "PAID") {
                clearInterval(intervalId);
                intervalId = null;
                router.push("/order/success");
            }
        } finally {
            isChecking = false;
        }
    }, 2000);
};

const createOrder = async () => {
    isLoading.value = true
    await orderStore.clearMyCart()

    try {
        const resp = await orderStore.createOrder({ ...orderStore.orderInfo })
        if (resp.status === 201) {
            await createOrderItem(resp.data.id)
            totalAmount.value = resp.data.totalAmount
        } else {
            Swal.fire({
                title: "Thất bại",
                icon: "error",
                draggable: true,
                text: 'Lỗi khi tạo đơn hàng'
            });
        }
        if (resp.data.orderCode) {
            console.log(resp.data.orderCode)
            orderCode.value = resp.data.orderCode
        }
    } catch (error) {
        console.error(error)
    } finally {
        isLoading.value = false
    }
    console.log(orderId.value)
}

const createOrderItem = async (orderId) => {
    const items = orderStore.orderItems.map((orderItem) => ({ ...orderItem, orderId }))
    const promises = items.map(item => orderStore.createOrderItem(item))

    await Promise.all(promises)
}

</script>