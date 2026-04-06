<template>
    <AdminManageSection>
        <div class="flex items-center justify-between mt-3">
            <h1 class="font-serif font-bold uppercase text-2xl">Quản lý thương hiệu</h1>
            <button class="px-4 py-2.5 cursor-pointer rounded-xl bg-gray-900 text-white"
                @click="openBrandModal(false, null)">Thêm
                thương hiệu</button>
        </div>
        <div class="overflow-x-auto mt-4 h-140">
            <table class="table-fixed w-full border border-gray-300 border-collapse">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="border border-gray-300 px-4 py-2 text-left w-1/4">Logo</th>
                        <th class="border border-gray-300 px-4 py-2 text-left w-1/5">Tên thương hiệu</th>
                        <th class="border border-gray-300 px-4 py-2 text-left w-1/4">Mô tả</th>
                        <th class="border border-gray-300 px-4 py-2 text-left w-16">Hoạt động</th>
                        <th class="border border-gray-300 px-4 py-2 text-center w-12">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="brand in brands" :key="brand.id">
                        <td class="px-4 py-2 border border-gray-300">{{ brand.name }}</td>
                        <td class="px-4 py-2 border border-gray-300">
                            <img :src="brand.logoUrl" alt="" class="w-1/3">
                        </td>
                        <td class="px-4 py-2 border border-gray-300">{{ brand.description }}</td>
                        <td class="px-4 py-2 border border-gray-300">
                            <div class="flex items-center justify-between">
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" id="notifications" :checked="brand.active"
                                        class="sr-only peer" @change="changeActiveStatus(brand.id, $event)">
                                    <div
                                        class="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:bg-green-500 transition-colors">
                                    </div>
                                    <div
                                        class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full peer-checked:translate-x-5 transition-transform">
                                    </div>
                                </label>
                            </div>
                        </td>
                        <td class="px-4 py-2 border border-gray-300">
                            <button class="cursor-pointer" @click="openBrandModal(true, brand)">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <PaginationSection :page-no="pagination.pageNo" :page-size="pagination.pageSize"
            :total-elements="pagination.totalElements" :total-page="pagination.totalPage"
            v-model:page-no="pagination.pageNo" @change-page="changePage"></PaginationSection>
        <ModelSection @close-modal="closeBrandModal" :is-open="isOpen" :title="'Thêm thương hiệu'">
            <div class="flex flex-col items-center justify-between gap-4 w-100">
                <div v-if="brandIdEdit" class="w-full">
                    <label class="block text-xs uppercase font-bold mb-2">Tên thương hiệu</label>
                    <input v-model="brandIdEdit" disabled="true"
                        class="bg-gray-300 p-2 w-full border outline-0 rounded-xs" placeholder="Nike" type="text" />
                </div>
                <div class="w-full">
                    <label class="block text-xs uppercase font-bold mb-2">Tên thương hiệu</label>
                    <input v-model="brandInfo.name" class="p-2 w-full border outline-0 rounded-xs" placeholder="Nike"
                        type="text" />
                </div>
                <div class="w-full">
                    <label class="block text-xs uppercase font-bold mb-2">Mô tả</label>
                    <textarea v-model="brandInfo.description" name="" class="w-full border pl-2" rows="5"
                        id=""></textarea>
                </div>
                <div class="w-full">
                    <h1 class="text-xl font-serif font-bold">Ảnh</h1>
                    <input @change="handleImage" type="file" name="" class="p-3 bg-gray-300 rounded-xl w-full"
                        id="imageBrand">
                    <div class="relative">
                        <img class="mt-2 rounded-xl w-1/4" :src="urlImage" alt="">
                        <button @click="removeImage" v-if="urlImage"
                            class="absolute top-0 px-2 py-1 cursor-pointer rounded-full">&times;</button>
                    </div>
                </div>
            </div>
            <template #footer>
                <button v-if="brandIdEdit" @click="updateInfo"
                    class="px-6 py-2.5 rounded-xl cursor-pointer bg-gray-950 text-white">Update</button>
                <div v-else class="flex gap-4">
                    <button @click="resetForm"
                        class="px-6 py-2.5 rounded-xl cursor-pointer shadow shadow-gray-400 text-black">Reset</button>
                    <button @click="saveBrand"
                        class="px-6 py-2.5 rounded-xl cursor-pointer bg-gray-950 text-white">Save</button>
                </div>
            </template>
        </ModelSection>
        <!-- Loading -->
        <ModelSection :is-open="isLoading">
            <div class="animate-spin">
                <i class="fa-solid fa-hourglass"></i>
            </div>
        </ModelSection>
    </AdminManageSection>
</template>

<script setup>
import AdminManageSection from '@/components/AdminManageSection.vue';
import ModelSection from '@/components/ModelSection.vue';
import PaginationSection from '@/components/PaginationSection.vue';
import { useBrandStore } from '@/store/brandStore';
import { uploadToCloudinary } from '@/utils/fileUtil';
import Swal from 'sweetalert2';
import { computed, onMounted, ref } from 'vue';

const isOpen = ref(false);
const isLoading = ref(false);
const urlImage = ref(null);
const brandStore = useBrandStore()

const brandIdEdit = ref(null);

const brands = computed(() => brandStore.brands);
const pagination = ref({
    pageNo: 0,
    pageSize: 0,
    totalPage: 0,
    totalElements: 0
})

onMounted(async () => {
    isLoading.value = true
    const resp = await brandStore.fetchBrands();
    const value = resp.data;
    pagination.value = {
        pageNo: value.pageNo,
        pageSize: value.pageSize,
        totalPage: value.totalPage,
        totalElements: value.totalElements
    }
    isLoading.value = false
})

const brandInfo = ref({
    name: '',
    description: ''
})

const imageFile = ref(null)

const openBrandModal = (isEdit, brand) => {
    if (isEdit) {
        brandIdEdit.value = brand.id
        fillForm(brand)
    }
    isOpen.value = true;
}

const fillForm = (brand) => {
    brandInfo.value = { name: brand.name, description: brand.description };
    urlImage.value = brand.logoUrl;
}

const closeBrandModal = (e) => {
    isOpen.value = e
    resetForm()
}

const removeImage = () => {
    urlImage.value = ''
    document.getElementById('imageBrand').value = ''
}

const resetForm = () => {
    removeImage();
    brandInfo.value = {
        name: '',
        description: ''
    }
    imageFile.value = null;
    brandIdEdit.value = null;
}

const updateInfo = async () => {
    let secureUrl;
    isLoading.value = true
    let body;

    if (imageFile.value) {
        secureUrl = await uploadLogoBrand(imageFile.value);
        body = { ...brandInfo.value, logoUrl: secureUrl.secure_url, active: true }
    } else {
        body = { ...brandInfo.value, logoUrl: urlImage.value, active: true }
    }

    try {
        const response = await brandStore.update(brandIdEdit.value, body)
        closeBrandModal(false)
        if (response.status === 202) {
            isLoading.value = false
            resetForm()
            Swal.fire({
                title: "Thành công",
                icon: "success",
                draggable: true,
                text: response.message
            });
        } else {
            Swal.fire({
                title: "Thất bại",
                icon: "error",
                draggable: true,
                text: response.message
            });
            isLoading.value = false
        }
    } catch (error) {
        console.error(error)
    }
}

const handleImage = (event) => {
    const file = event.target.files[0];
    if (!file || !file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    urlImage.value = url
    imageFile.value = file
}

const changeActiveStatus = async (id, e) => {
    await brandStore.changeStatus(id, e.target.checked)
}

const saveBrand = async () => {
    isLoading.value = true
    const secureUrl = await uploadLogoBrand(imageFile.value);
    try {
        const response = await brandStore.create({ ...brandInfo.value, logoUrl: secureUrl.secure_url })
        closeBrandModal(false)
        if (response.status === 201) {
            isLoading.value = false
            // brands.value.push(response.data)
            resetForm()
            Swal.fire({
                title: "Thành công",
                icon: "success",
                draggable: true,
                text: response.message
            });
        } else {
            Swal.fire({
                title: "Thất bại",
                icon: "error",
                draggable: true,
                text: response.message
            });
            isLoading.value = false
        }
    } catch (error) {
        console.error(error)
    }
}

const uploadLogoBrand = async (file) => {
    console.log(file)
    return uploadToCloudinary(file);
}

const changePage = async (page) => {
    isLoading.value = true
    await brandStore.fetchBrands(page)
    isLoading.value = false
}

</script>