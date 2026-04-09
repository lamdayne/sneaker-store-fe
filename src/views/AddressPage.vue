<template>
    <AccountManageSection>
        <div v-if="isLoading"
            class="absolute inset-0 bg-white/60 z-10 flex items-center justify-center backdrop-blur-[1px]">
            <div class="flex flex-col items-center gap-2">
                <span class="animate-spin text-xl"><i class="fa-solid fa-hourglass"></i></span>
            </div>
        </div>
        <div class="mt-4 mb-4 mx-auto">
            <div class="flex items-center justify-between mt-3 mb-4">
                <h1 class="font-serif font-bold uppercase text-2xl">Quản lý địa chỉ</h1>
                <button class="px-4 py-2.5 cursor-pointer rounded-xl bg-gray-900 text-white" @click="openModal">
                    Thêm địa chỉ
                </button>
            </div>
            <ModelSection :is-open="isOpen" @close-modal="closeModal">
                <div class="w-250 border-2 rounded-lg p-4">
                    <h1 class="p-4 text-2xl font-serif font-bold">
                        <i class="fa-solid fa-pen-to-square"></i>
                        {{ isEdit ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ' }}
                    </h1>
                    <div class="px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="text-xs font-bold uppercase text-gray-600">Họ tên người nhận</label>
                            <input class="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md outline-none"
                                type="text" v-model="addressInfo.recipientName" />
                        </div>
                        <div>
                            <label class="text-xs font-bold uppercase text-gray-600">Số điện thoại</label>
                            <input class="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md outline-none"
                                type="text" v-model="addressInfo.phone" />
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
                                class="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md outline-none"
                                id=""></textarea>
                        </div>
                    </div>
                    <div class="px-4 flex gap-2 items-center">
                        <input class="" type="checkbox" name="" id="defaultAddress"
                            v-model="addressInfo.defaultAddress">
                        <label class="text-xs font-bold uppercase text-gray-600 cursor-pointer" for="defaultAddress">Đặt
                            làm
                            địa chỉ mặc
                            định</label>
                    </div>
                    <div class="px-4 flex gap-4 mt-3">
                        <button @click="handleSubmit" :disabled="isDisabled"
                            class="py-2.5 px-6 font-medium bg-gray-950 rounded-xl text-white cursor-pointer">
                            {{ isEdit ? 'Cập nhật' : 'Thêm địa chỉ' }}
                        </button>
                        <button @click="closeModal(false)"
                            class="py-2.5 px-6 font-medium bg-gray-300 rounded-xl cursor-pointer">
                            Hủy
                        </button>
                    </div>
                </div>
            </ModelSection>
            <div class="grid grid-cols-1 md:grid-cols-3 w-250 gap-4">
                <div v-for="address in addresses" :key="address.id"
                    class="w-full mt-1 border border-gray-600 rounded-lg p-4">
                    <p class="text-[15px] font-medium">{{ address.recipientName }} | {{ address.phone }}</p>
                    <span v-if="address.defaultAddress"
                        class="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-green-700 text-white rounded-md uppercase">
                        Mặc định
                    </span>
                    <span v-else class="ml-1 px-1.5 py-0.5"></span>
                    <p class="text-sm mt-2 ml-1 text-gray-700">{{ getAddress(address) }}</p>
                    <div class="mt-3 ml-1 flex gap-4">
                        <button class="uppercase text-xs font-bold cursor-pointer" @click="edit(address)">
                            Chỉnh sửa
                        </button>
                        <button class="uppercase text-xs font-bold text-red-500 cursor-pointer"
                            @click="deleteAddress(address.id)">Xóa</button>
                    </div>
                </div>
            </div>
        </div>
    </AccountManageSection>
</template>

<script setup>
import AccountManageSection from '@/components/AccountManageSection.vue';
import ModelSection from '@/components/ModelSection.vue';
import { useAddressStore } from '@/store/addressStore';
import { useUserStore } from '@/store/userStore';
import Swal from 'sweetalert2';
import { computed, onMounted, ref, watch } from 'vue';

const userStore = useUserStore()
const addressStore = useAddressStore()
const provinces = computed(() => addressStore.provinces)
const districts = computed(() => addressStore.districts)
const wards = computed(() => addressStore.wards)

const isOpen = ref(false)
const isDisabled = ref(false)
const isLoading = ref(false)
const isEdit = ref(false)
const addressIdEdit = ref(null)

const addressInfo = ref({
    recipientName: '',
    phone: '',
    province: '',
    district: '',
    ward: '',
    streetAddress: '',
    defaultAddress: false
})

const addresses = computed(() => userStore.addresses)

const getAddress = (address) => {
    return `${address.streetAddress}, ${address.ward}, ${address.district}, ${address.province}`
}

onMounted(async () => {
    await addressStore.fetchProvinces()
})

const openModal = () => {
    isOpen.value = true
}

const closeModal = () => {
    isOpen.value = false
    isDisabled.value = false
    isEdit.value = false
    addressIdEdit.value = null
    resetForm()
}

const handleSubmit = () => {
    if (isEdit.value) {
        updateAddress();
    } else {
        saveAddress();
    }
}

const edit = (address) => {
    addressInfo.value.recipientName = address.recipientName
    addressInfo.value.phone = address.phone
    addressInfo.value.streetAddress = address.streetAddress
    addressInfo.value.defaultAddress = address.defaultAddress
    addressIdEdit.value = address.id
    isEdit.value = true
    console.log(addressInfo.value)
    openModal()
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

const updateAddress = async () => {
    if (!validateForm()) return
    addressInfo.value.province = addressInfo.value.province.name
    addressInfo.value.district = addressInfo.value.district.name
    isDisabled.value = true
    isLoading.value = true
    try {
        const resp = await addressStore.updateAddress(addressIdEdit.value, { ...addressInfo.value })
        closeModal()
        isLoading.value = false
        if (resp.status === 202) {
            Swal.fire({
                title: "Thành công",
                icon: "success",
                draggable: true,
                text: resp.message
            });
        } else {
            Swal.fire({
                title: "Thất bại",
                icon: "error",
                draggable: true,
                text: resp.message
            });
        }
    } catch (error) {
        console.log(error)
    } finally {
        isLoading.value = false
    }
    await userStore.myInfo()
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

const deleteAddress = async (id) => {
    isLoading.value = true
    try {
        const resp = await addressStore.deleteAddress(id);
        isLoading.value = false
        if (resp.status === 204) {
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
            text: 'Lỗi khi xóa địa chỉ'
        });
    } finally {
        isLoading.value = false
    }
    await userStore.myInfo()
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