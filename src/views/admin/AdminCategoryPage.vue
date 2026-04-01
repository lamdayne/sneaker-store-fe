<template>
    <AdminManageSection>
        <div class="flex items-center justify-between mt-3">
            <h1 class="font-serif font-bold uppercase text-2xl">Quản lý loại sản phẩm</h1>
            <button class="px-4 py-2.5 cursor-pointer rounded-xl bg-gray-900 text-white" @click="openCategoryModel">Thêm
                loại sản phẩm</button>
        </div>
        <div class="overflow-x-auto mt-4">
            <table class="table-fixed w-full border border-gray-300 border-collapse">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="border border-gray-300 px-4 py-2 text-left w-1/5">Tên thương hiệu</th>
                        <th class="border border-gray-300 px-4 py-2 text-left w-1/4">Logo</th>
                        <th class="border border-gray-300 px-4 py-2 text-left w-16">Hoạt động</th>
                        <th class="border border-gray-300 px-4 py-2 text-center w-12">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="category in categories" :key="category.id">
                        <td class="px-4 py-2 border border-gray-300">{{ category.name }}</td>
                        <td class="px-4 py-2 border border-gray-300">
                            <img :src="category.imageUrl" alt="" class="w-1/3 rounded-lg">
                        </td>
                        <td class="px-4 py-2 border border-gray-300">
                            <div class="flex items-center justify-between">
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" id="notifications" :checked="category.active"
                                        class="sr-only peer" @change="changeActiveStatus(category.id, $event)">
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
                            <button class="cursor-pointer" @click="editCategory(category)">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ModelSection v-if="!isLoading" :title="'Thêm loại sản phẩm'" :is-open="isOpen"
            @close-modal="closeCategoryModel">
            <div class="flex flex-col items-center justify-between gap-4 w-100">
                <div class="w-full">
                    <label class="block text-xs uppercase font-bold mb-2">Tên loại sản phẩm</label>
                    <input v-model="categoryInfo.name" class="p-2 w-full border outline-0 rounded-xs"
                        placeholder="Giày thể thao" type="text" />
                </div>
                <div class="w-full">
                    <h1 class="text-xl font-serif font-bold">Ảnh</h1>
                    <input @change="handleImage" type="file" name="" class="p-3 bg-gray-300 rounded-xl w-full"
                        id="imageCategory">
                    <div class="relative">
                        <img class="mt-2 rounded-xl w-1/4" :src="imageUrl" alt="">
                        <button v-if="imageUrl" @click="removeImage"
                            class="absolute top-0 px-2 py-1 cursor-pointer rounded-full">&times;</button>
                    </div>
                </div>
            </div>
            <template #footer>
                <button v-if="categoryId" @click="updateCategory"
                    class="px-6 py-2.5 rounded-xl cursor-pointer bg-gray-950 text-white">Update</button>
                <button v-else @click="saveCategory"
                    class="px-6 py-2.5 rounded-xl cursor-pointer bg-gray-950 text-white">Save</button>
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
import { useCategoryStore } from '@/store/categoryStore';
import { uploadToCloudinary } from '@/utils/fileUtil';
import Swal from 'sweetalert2';
import { computed, onMounted, ref } from 'vue';

const imageUrl = ref(null);
const logoFile = ref(null);

const isOpen = ref(false);
const isLoading = ref(false);

const categoryStore = useCategoryStore();
const categoryId = ref(null);

const categories = computed(() => categoryStore.categories)

onMounted(async () => {
    await categoryStore.fetchCategories();
})

const categoryInfo = ref({
    name: '',
    imageUrl: '',
    displayOrder: 1,
    active: true
})

const openCategoryModel = () => {
    isOpen.value = true
}

const closeCategoryModel = (e) => {
    isOpen.value = e
    resetForm()
}

const removeImage = () => {
    imageUrl.value = null
    logoFile.value = null
}

const resetForm = () => {
    categoryInfo.value = {
        name: '',
        imageUrl: '',
        displayOrder: 1,
        active: true
    }
    removeImage()
}

const editCategory = (category) => {
    const categoryRaw = { ...category }
    categoryInfo.value = {
        name: categoryRaw.name,
        imageUrl: categoryRaw.imageUrl,
        displayOrder: categoryRaw.displayOrder,
        active: categoryRaw.active
    }
    categoryId.value = categoryRaw.id
    imageUrl.value = categoryRaw.imageUrl
    openCategoryModel()
}

const updateCategory = async () => {
    isLoading.value = true
    if (logoFile.value) {
        const categoryImage = await uploadCategoryImage(logoFile.value)
        categoryInfo.value.imageUrl = categoryImage.secure_url;
    }
    try {
        const response = await categoryStore.update(categoryId.value, { ...categoryInfo.value })
        if (response.status === 202) {
            isLoading.value = false
            closeCategoryModel(false)
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
        console.error(error);
    }
}

const handleImage = (event) => {
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith('image/')) continue;
        const url = URL.createObjectURL(file);
        imageUrl.value = url
        logoFile.value = file
    }
}

const saveCategory = async () => {
    isLoading.value = true
    const categoryImage = await uploadCategoryImage(logoFile.value)
    categoryInfo.value.imageUrl = categoryImage.secure_url;
    try {
        const response = await categoryStore.create({ ...categoryInfo.value })
        if (response.status === 201) {
            isLoading.value = false
            closeCategoryModel(false)
            resetForm()
            Swal.fire({
                title: "Thành công",
                icon: "success",
                draggable: true,
                text: response.message
            });
            categories.value.push(response.data)
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
        console.error(error);
    }
}

const uploadCategoryImage = async (file) => {
    return uploadToCloudinary(file)
}
</script>
