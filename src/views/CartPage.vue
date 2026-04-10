<template>
    <div class="bg-white min-h-screen pt-10 pb-10 font-sans italic-none">
        <div v-if="isLoading"
            class="absolute inset-0 bg-white/60 z-10 flex items-center justify-center backdrop-blur-[1px]">
            <div class="flex flex-col items-center gap-2">
                <span class="animate-spin text-xl"><i class="fa-solid fa-hourglass"></i></span>
            </div>
        </div>
        <div class="container mx-auto px-4 max-w-7xl">
            <div class="flex justify-between items-end border-b border-gray-200 pb-4 mb-10">
                <h1 class="text-2xl font-bold font-serif uppercase tracking-tighter text-gray-950">
                    Giỏ hàng ({{ carts.length }})
                </h1>
                <!-- <label v-if="cartStore.totalItems > 0"
                    class="flex items-center gap-2 text-[10px] font-bold uppercase text-gray-400 cursor-pointer hover:text-black transition-colors">
                    <input type="checkbox" class="size-4 accent-black cursor-pointer" />
                    <span>Chọn tất cả</span>
                </label> -->
            </div>

            <div v-if="carts.length === 0" class="flex flex-col items-center justify-center py-32 space-y-6">
                <div class="size-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
                    <i class="fa-solid fa-cart-plus text-4xl"></i>
                </div>
                <p class="text-gray-400 uppercase font-bold tracking-widest text-sm text-center">Giỏ hàng của bạn đang
                    trống</p>
                <router-link to="/"
                    class="bg-black text-white px-8 py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-zinc-800 transition-all">
                    Khám phá sản phẩm ngay
                </router-link>
            </div>

            <div v-else class="flex flex-col lg:flex-row gap-12 mb-20">
                <div class="flex-1 flex flex-col gap-4">
                    <div v-for="cart in carts" :key="cart.id"
                        class="flex items-start gap-4 border-b border-gray-100 pb-4 last:border-0">

                        <div
                            class="size-32 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden shrink-0 border border-gray-100">
                            <img :src="cart.product.thumbnail"
                                class="w-full h-full object-cover mix-blend-multiply scale-110" />
                        </div>

                        <div class="flex-1">
                            <div class="flex justify-between items-start">
                                <div class="space-y-1">
                                    <p class="text-[11px] font-bold text-red-600 uppercase tracking-widest">{{
                                        cart.product.brandName }}</p>
                                    <router-link :to="`/product/${cart.product.id}`"
                                        class="text-xl font-bold tracking-tight text-gray-950">{{ cart.product.name }}
                                    </router-link>
                                    <p class="text-[11px] text-gray-400 uppercase font-medium">
                                        Size: {{ cart.size }} - Màu:
                                        <span class="px-4 ml-1 rounded-lg"
                                            :style="{ backgroundColor: cart.color }"></span>
                                    </p>
                                </div>

                                <div class="flex flex-col items-end">
                                    <div
                                        class="flex items-center border border-gray-200 rounded-lg overflow-hidden mb-3">
                                        <!-- <button
                                            class="px-3 py-1 text-gray-400 hover:bg-gray-100 transition-colors cursor-pointer">-</button> -->
                                        <span class="px-2 font-bold text-xs w-8 text-center">{{ cart.quantity }}</span>
                                        <!-- <button
                                            class="px-3 py-1 text-gray-400 hover:bg-gray-100 transition-colors cursor-pointer">+</button> -->
                                    </div>
                                    <p class="text-lg font-bold tracking-tighter text-gray-950">
                                        {{ format.formatVND(cart.unitPrice * cart.quantity) }}
                                    </p>
                                    <button @click="removeCartItem(cart.id)"
                                        class="text-gray-300 hover:text-red-500 mt-3 transition-colors cursor-pointer">
                                        <i class="fa-solid fa-trash-can text-sm"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <router-link to="/"
                        class="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                        <i class="fa-solid fa-arrow-left me-2"></i> Tiếp tục mua sắm
                    </router-link>
                </div>

                <div class="w-full lg:w-96">
                    <div class="sticky top-28 border border-gray-100 rounded-3xl p-8 bg-white shadow-sm">
                        <h2 class="text-xl font-bold uppercase mb-8 tracking-tight text-gray-950">Tóm tắt đơn
                            hàng</h2>

                        <div class="flex flex-col gap-6">
                            <div>
                                <label class="text-[11px] font-bold uppercase mb-2 block">Mã giảm giá</label>
                                <div class="flex gap-2">
                                    <input type="text" placeholder="Nhập mã ưu đãi..."
                                        class="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm outline-none focus:border-black transition-all" />
                                    <button
                                        class="bg-gray-950 text-white px-4 py-2 rounded-xl text-[11px] font-bold uppercase hover:bg-black transition-all">Áp
                                        dụng</button>
                                </div>
                            </div>
                            <div class="flex flex-col gap-4 border-b border-gray-50 pb-6">
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-400 font-medium font-sans italic">Tạm tính</span>
                                    <span class="font-bold text-gray-950 tracking-tight">
                                        {{ format.formatVND(totalPrice) }}
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

                            <div class="flex justify-between items-end">
                                <span class="text-sm font-bold uppercase italic tracking-tighter">Tổng cộng</span>
                                <span class="text-2xl font-bold text-red-600 tracking-tighter">
                                    {{ format.formatVND(totalPrice) }}
                                </span>
                            </div>

                            <button @click="checkout"
                                class="w-full bg-black text-white py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-zinc-800 transition-all cursor-pointer shadow-lg">
                                Thanh toán ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCartStore } from '@/store/CartStore';
import { useOrderStore } from '@/store/orderStore';
import { format } from '@/utils/format';
import Swal from 'sweetalert2';
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const isLoading = ref(false)

const router = useRouter()
const cartStore = useCartStore();
const orderStore = useOrderStore()

const carts = computed(() => cartStore.carts)
const totalPrice = computed(() => {
    return carts.value.reduce((total, cart) => {
        return total + cart.unitPrice * cart.quantity
    }, 0)
})

onMounted(async () => {
    isLoading.value = true
    await cartStore.fetchMyCart()
    isLoading.value = false
})

watch(() => carts.value, (carts) => {
    orderStore.orderItems = carts.map(item => ({
        productId: item.product.id,
        size: item.size,
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        color: item.color
    }))
})

const checkout = () => {
    router.push('/order/checkout')
}

const removeCartItem = async (id) => {
    try {
        isLoading.value = true
        const resp = await cartStore.removeCartItem(id)
        if (resp.status === 204) {
            isLoading.value = false
            Swal.fire({
                title: "Thành công",
                icon: "success",
                draggable: true,
                text: resp.message
            })
        } else {
            isLoading.value = false
            Swal.fire({
                title: "Thất bại",
                icon: "error",
                draggable: true,
                text: 'Lỗi khi thêm sản phẩm vào giỏ hàng'
            });
        }
        await cartStore.fetchMyCart()
    } catch (error) {
        isLoading.value = false
        console.error(error)
    }
}
</script>