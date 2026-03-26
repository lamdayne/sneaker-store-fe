<template>
    <div class="bg-white min-h-screen pt-10 pb-10 font-sans italic-none">
        <div class="container mx-auto px-4 max-w-7xl">
            <div class="flex justify-between items-end border-b border-gray-200 pb-4 mb-10">
                <h1 class="text-3xl font-bold italic uppercase tracking-tighter text-gray-950">
                    Giỏ hàng ({{ cartStore.totalItems }})
                </h1>
                <label v-if="cartStore.totalItems > 0" class="flex items-center gap-2 text-[10px] font-bold uppercase text-gray-400 cursor-pointer hover:text-black transition-colors">
                    <input type="checkbox" class="size-4 accent-black cursor-pointer" />
                    <span>Chọn tất cả</span>
                </label>
            </div>

            <div v-if="cartStore.totalItems === 0" class="flex flex-col items-center justify-center py-32 space-y-6">
                <div class="size-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
                    <i class="fa-solid fa-cart-plus text-4xl"></i>
                </div>
                <p class="text-gray-400 uppercase font-bold tracking-widest text-sm text-center">Giỏ hàng của bạn đang trống</p>
                <router-link to="/" class="bg-black text-white px-8 py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-zinc-800 transition-all">
                    Khám phá sản phẩm ngay
                </router-link>
            </div>

            <div v-else class="flex flex-col lg:flex-row gap-12 mb-20">
                <div class="flex-1 flex flex-col gap-10">
                    <div v-for="(item, index) in cartStore.items" :key="index" 
                         class="flex items-start gap-4 border-b border-gray-100 pb-10 last:border-0">
                        
                        <input type="checkbox" v-model="item.selected" class="mt-12 size-4 accent-black cursor-pointer" />
                        
                        <div class="size-32 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden shrink-0 border border-gray-100">
                            <img :src="item.image" class="w-full h-full object-contain mix-blend-multiply scale-110" />
                        </div>

                        <div class="flex-1">
                            <div class="flex justify-between items-start">
                                <div class="space-y-1">
                                    <p class="text-[11px] font-bold text-red-600 uppercase tracking-widest">{{ item.brand }}</p>
                                    <h3 class="text-xl font-bold tracking-tight text-gray-950">{{ item.name }}</h3>
                                    <p class="text-[11px] text-gray-400 uppercase font-medium">Size: {{ item.size }}</p>
                                </div>

                                <div class="flex flex-col items-end">
                                    <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden mb-3">
                                        <button @click="cartStore.decrementQty(index)" class="px-3 py-1 text-gray-400 hover:bg-gray-100 transition-colors cursor-pointer">-</button>
                                        <span class="px-2 font-bold text-xs w-8 text-center">{{ item.quantity }}</span>
                                        <button @click="cartStore.incrementQty(index)" class="px-3 py-1 text-gray-400 hover:bg-gray-100 transition-colors cursor-pointer">+</button>
                                    </div>
                                    <p class="text-lg font-bold tracking-tighter text-gray-950">
                                        {{ formatPrice(item.price * item.quantity) }} đ
                                    </p>
                                    <button @click="cartStore.removeItem(index)" class="text-gray-300 hover:text-red-500 mt-3 transition-colors cursor-pointer">
                                        <i class="fa-solid fa-trash-can text-sm"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <router-link to="/" class="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                        <i class="fa-solid fa-arrow-left me-2"></i> Tiếp tục mua sắm
                    </router-link>
                </div>

                <div class="w-full lg:w-96">
                    <div class="sticky top-28 border border-gray-100 rounded-3xl p-8 bg-white shadow-sm">
                        <h2 class="text-xl font-bold italic uppercase mb-8 tracking-tight text-gray-950">Tóm tắt đơn hàng</h2>
                        
                        <div class="flex flex-col gap-6">
                            <div>
                                <label class="text-[11px] font-bold uppercase mb-2 block">Mã giảm giá</label>
                                <div class="flex gap-2">
                                    <input type="text" placeholder="Nhập mã ưu đãi..." class="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm outline-none focus:border-black transition-all" />
                                    <button class="bg-gray-950 text-white px-4 py-2 rounded-xl text-[11px] font-bold uppercase hover:bg-black transition-all">Áp dụng</button>
                                </div>
                            </div>
                            <div class="flex flex-col gap-4 border-b border-gray-50 pb-6">
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-400 font-medium font-sans italic">Tạm tính</span>
                                    <span class="font-bold text-gray-950 tracking-tight">{{ formatPrice(cartStore.subTotal) }} đ</span>
                                </div>
                                <div class="flex justify-between text-sm text-gray-400 italic">
                                    <span class="font-sans italic">Phí vận chuyển</span>
                                    <span class="font-bold text-gray-950 italic">35.000 đ</span>
                                </div>
                                <div class="flex justify-between text-sm text-green-600 italic">
                                    <span class="font-sans italic">Giảm giá</span>
                                    <span class="font-bold italic">-0đ</span>
                                </div>
                            </div>

                            <div class="flex justify-between items-end">
                                <span class="text-sm font-bold uppercase italic tracking-tighter">Tổng cộng</span>
                                <span class="text-2xl font-bold text-red-600 tracking-tighter">{{ formatPrice(cartStore.subTotal + 35000) }} đ</span>
                            </div>

                            <button class="w-full bg-black text-white py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-zinc-800 transition-all cursor-pointer shadow-lg">
                                Thanh toán ngay
                            </button>

                            <div class="flex flex-col items-center gap-4 mt-2">
                                <div class="flex gap-4 opacity-30 grayscale scale-75">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" class="h-3" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" class="h-5" />
                                </div>
                                <p class="text-[9px] text-gray-400 font-bold tracking-widest uppercase">
                                    <i class="fa-solid fa-lock me-1"></i> SSL 256-BIT BẢO MẬT GIAO DỊCH
                                </p>
                            </div>
                        </div>
                    </div>
                    <p class="text-center mt-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        Cần hỗ trợ? Gọi ngay <span class="text-red-600 border-b border-red-600">1900 1000</span>
                    </p>
                </div>
            </div>
        </div>

        <footer class="border-t border-gray-100 pt-10">
            <div class="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6">
                <div class="font-playfair text-xl font-bold tracking-tighter text-red-600 uppercase">
                    SOLEHAUS
                </div>
                <div class="flex gap-8 text-[11px] font-bold uppercase text-gray-400">
                    <a href="#" class="hover:text-black transition-colors">Chính sách bảo mật</a>
                    <a href="#" class="hover:text-black transition-colors">Điều khoản dịch vụ</a>
                    <a href="#" class="hover:text-black transition-colors">Chính sách đổi trả</a>
                </div>
                <div class="text-[11px] text-gray-300 font-medium">
                    © 2024 Solehaus. All rights reserved.
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { useCartStore } from '@/store/CartStore';

const cartStore = useCartStore();
const formatPrice = (val) => new Intl.NumberFormat('vi-VN').format(val);
</script>