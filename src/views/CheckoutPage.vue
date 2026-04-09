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
                <div class="grid grid-cols-1 w-68 h-40 border rounded-lg ">
                    <button class="cursor-pointer text-lg" @click="openModal">
                        <i class="fa-solid fa-circle-plus"></i>
                        Thêm địa chỉ
                    </button>
                </div>
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
                        <button
                            class="w-full bg-black text-white py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-zinc-800 transition-all cursor-pointer shadow-lg">
                            Thanh toán ngay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <ModelSection :is-open="isOpen" @close-modal="closeModal">
        <div class="w-250 border-2 rounded-lg p-4">
            <h1 class="p-4 text-2xl font-serif font-bold">
                <i class="fa-solid fa-pen-to-square"></i>
                Thêm địa chỉ
            </h1>
            <div class="px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="text-xs font-bold uppercase text-gray-600">Họ tên người nhận</label>
                    <input class="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md outline-none" type="text"
                        v-model="addressInfo.recipientName" />
                </div>
                <div>
                    <label class="text-xs font-bold uppercase text-gray-600">Số điện thoại</label>
                    <input class="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md outline-none" type="text"
                        v-model="addressInfo.phone" />
                </div>
            </div>
            <div class="px-4 grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                <div>
                    <label class="text-xs font-bold uppercase text-gray-600">Tỉnh / Thành phố</label>
                    <select v-model="addressInfo.province"
                        class="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md outline-none appearance-none"
                        name="" id="">
                        <option v-for="province in provinces" :key="province.code" :value="province">
                            {{ province.name }}
                        </option>
                    </select>
                </div>
                <div>
                    <label class="text-xs font-bold uppercase text-gray-600">Quận / Huyện</label>
                    <select v-model="addressInfo.district"
                        class="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md outline-none appearance-none"
                        name="" id="">
                        <option v-for="district in districts" :key="district.code" :value="district">
                            {{ district.name }}
                        </option>
                    </select>
                </div>
                <div>
                    <label class="text-xs font-bold uppercase text-gray-600">Phường / Xã</label>
                    <select v-model="addressInfo.ward"
                        class="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md outline-none appearance-none"
                        name="" id="">
                        <option v-for="ward in wards" :key="ward.code" :value="ward.name">
                            {{ ward.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="px-4 grid grid-cols-1 md:grid-cols-1 gap-6 mt-4 mb-2">
                <div>
                    <label class="text-xs font-bold uppercase text-gray-600">Tên đường</label>
                    <textarea name="" v-model="addressInfo.streetAddress"
                        class="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md outline-none" id=""></textarea>
                </div>
            </div>
            <div class="px-4 flex gap-2 items-center">
                <input class="" type="checkbox" name="" id="defaultAddress" v-model="addressInfo.defaultAddress">
                <label class="text-xs font-bold uppercase text-gray-600 cursor-pointer" for="defaultAddress">
                    Đặt làm địa chỉ mặc định
                </label>
            </div>
            <div class="px-4 flex gap-4 mt-3">
                <button @click="saveAddress" :disabled="isDisabled"
                    class="py-2.5 px-6 font-medium bg-gray-950 rounded-xl text-white cursor-pointer">
                    Thêm địa chỉ
                </button>
                <button @click="closeModal(false)"
                    class="py-2.5 px-6 font-medium bg-gray-300 rounded-xl cursor-pointer">
                    Hủy
                </button>
            </div>
        </div>
    </ModelSection>
</template>

<script setup>
import ModelSection from '@/components/ModelSection.vue';
import { useAddressStore } from '@/store/addressStore';
import { useOrderStore } from '@/store/orderStore';
import { useProductStore } from '@/store/productStore';
import { useUserStore } from '@/store/userStore';
import { format } from '@/utils/format';
import Swal from 'sweetalert2';
import { computed, onMounted, ref, watch } from 'vue';

const selectedAddress = ref(null)
const isOpen = ref(false)
const isLoading = ref(false)
const addressInfo = ref({
    recipientName: '',
    phone: '',
    province: '',
    district: '',
    ward: '',
    streetAddress: '',
    defaultAddress: false
})
const isDisabled = ref(false)

const userStore = useUserStore()
const orderStore = useOrderStore()
const productStore = useProductStore()
const addresses = computed(() => userStore.addresses)
const orderItems = computed(() => orderStore.orderItems)
const addressStore = useAddressStore()
const provinces = computed(() => addressStore.provinces)
const districts = computed(() => addressStore.districts)
const wards = computed(() => addressStore.wards)
const products = ref([])

onMounted(async () => {
    await userStore.myInfo()
    const defaultAddr = addresses.value.find(a => a.defaultAddress)
    if (defaultAddr) {
        selectedAddress.value = defaultAddr.id
    }
    await addressStore.fetchProvinces()
    const productPromises = orderItems.value.map(item =>
        productStore.findProductById(item.productId)
            .then(res => res.data)
    )

    const productList = await Promise.all(productPromises)

    products.value = productList
})

const getAddress = (address) => {
    return `${address.streetAddress}, ${address.ward}, ${address.district}, ${address.province}`
}

const openModal = () => {
    isOpen.value = true
}

const closeModal = () => {
    isOpen.value = false
    isDisabled.value = false
    resetForm()
}

const getTotalPrice = () => {
    return orderItems.value.reduce((total, value) => {
        return total + value.quantity * value.unitPrice
    }, 0)
}

const validateForm = () => {
    for (const key in { ...addressInfo.value }) {
        if (key === 'defaultAddress') continue
        else {
            if (!addressInfo.value[key]) {
                Swal.fire({
                    title: "Thất bại",
                    icon: "error",
                    draggable: true,
                    text: `Vui lòng nhập đầy đủ dữ liệu`
                });
                return false
            }
        }
    }
    return true
}

const saveAddress = async () => {
    if (!validateForm()) return
    addressInfo.value.province = addressInfo.value.province.name
    addressInfo.value.district = addressInfo.value.district.name
    isDisabled.value = true
    isLoading.value = true
    try {
        const resp = await addressStore.createAddress({ ...addressInfo.value })
        closeModal()
        isLoading.value = true
        if (resp.status === 201) {
            Swal.fire({
                title: "Thành công",
                icon: "success",
                draggable: true,
                text: resp.message
            });
            addresses.value.push(resp.data)
        } else {
            Swal.fire({
                title: "Thất bại",
                icon: "error",
                draggable: true,
                text: resp.message
            });
        }
    } catch (error) {
        console.error(error)
        Swal.fire({
            title: "Thất bại",
            icon: "error",
            draggable: true,
            text: 'Lỗi khi thêm địa chỉ'
        });
    } finally {
        isLoading.value = false
    }
    await userStore.myInfo()
}

const resetForm = () => {
    addressInfo.value = {
        recipientName: '',
        phone: '',
        province: '',
        district: '',
        ward: '',
        streetAddress: '',
        defaultAddress: false
    }
    addressStore.clearStore()
}

watch(() => addressInfo.value.province, async ({ ...newValue }) => {
    if (newValue.code) {
        await addressStore.fetchDistricts(newValue.code)
    }
})

watch(() => addressInfo.value.district, async ({ ...newValue }) => {
    if (newValue.code) {
        await addressStore.fetchWards(newValue.code)
    }
})

</script>