<template>
    <AdminManageSection>
        <div v-if="isLoading"
            class="absolute inset-0 bg-white/60 z-10 flex items-center justify-center backdrop-blur-[1px]">
            <div class="flex flex-col items-center gap-2">
                <span class="animate-spin text-xl"><i class="fa-solid fa-hourglass"></i></span>
                <span class="text-sm font-medium text-slate-500">Đang tải dữ liệu...</span>
            </div>
        </div>
        <div class="flex items-center justify-between mt-3">
            <h1 class="font-serif font-bold uppercase text-2xl">Quản lý sản phẩm</h1>
        </div>
        <div class="flex gap-3 mt-3">
            <div class="flex-5 border p-2.5">
                <input type="text" class="w-full outline-none" placeholder="Tìm tên...">
            </div>
            <div class="flex-2">
                <select name="" id="" class="p-2.5 border w-full cursor-pointer">
                    <option value="">Loại sản phẩm</option>
                </select>
            </div>
            <div class="flex-2">
                <select name="" id="" class="p-2.5 border w-full cursor-pointer">
                    <option value="">Thương hiệu</option>
                </select>
            </div>
            <div class="flex-2">
                <select name="" id="" class="p-2.5 border w-full cursor-pointer">
                    <option value="">Trạng thái</option>
                </select>
            </div>
            <div class="flex-1">
                <button class="border-2 h-full w-full font-medium cursor-pointer text-lg cursor">Lọc</button>
            </div>
        </div>
        <div class="mt-3">
            <table class="w-full text-left border-collapse">
                <thead class="border">
                    <tr class="bg-gray-300 text-left text-[15px]">
                        <th class="p-4 uppercase text-gray-500">Sản phẩm</th>
                        <!-- <th class="p-4 uppercase text-gray-500">Danh mục</th> -->
                        <th class="p-4 uppercase text-gray-500">Thương hiệu</th>
                        <th class="p-4 uppercase text-gray-500">Giá</th>
                        <th class="p-4 uppercase text-gray-500">Tồn kho</th>
                        <th class="p-4 uppercase text-gray-500">Trạng thái</th>
                        <th class="p-4 uppercase text-gray-500">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border" v-for="product in products" :key="product.id">
                        <td class="p-4">
                            <div class="flex gap-3">
                                <img :src="product.thumbnail" alt="" class="w-20 h-20 object-cover shadow">
                                <span class="text-lg font-semibold">{{ product.name }}</span>
                            </div>
                        </td>
                        <!-- <td class="p-4">
                            <span class="font-medium">Giày thể thao</span>
                        </td> -->
                        <td class="p-4">
                            <span class="font-medium">{{ product.brandName }}</span>
                        </td>
                        <td class="p-4">
                            <span class="font-medium text-lg">{{ format.formatVND(product.basePrice) }}</span>
                        </td>
                        <td class="p-4">{{ getTotalStock(product.productVariants) }}</td>
                        <td class="p-4">
                            <span
                                class="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 inset-ring inset-ring-green-500/20">
                                Đang bán
                            </span>
                        </td>
                        <td class="p-4">
                            <div class="flex gap-4">
                                <button class="cursor-pointer">
                                    <i class="fa-solid fa-eye"></i>
                                </button>
                                <button class="cursor-pointer" @click="editProduct(product.id)">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <PaginationSection :page-no="pagination.pageNo" :page-size="pagination.pageSize"
                :total-elements="pagination.totalElements" :total-page="pagination.totalPage"
                v-model:page-no="pagination.pageNo" @change-page="changePage"></PaginationSection>
        </div>
        <ModelSection :title="'Cập nhật thông tin sản phẩm'" :is-open="isEdit" @close-modal="closeDialog">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between gap-4 w-250">
                <div class="w-full">
                    <label class="block text-xs uppercase font-bold mb-2">Id</label>
                    <input v-model="productEdit.id" disabled="true"
                        class="bg-gray-300 p-2 w-full border outline-0 rounded-xs" type="text" />
                </div>
                <div class="w-full">
                    <label class="block text-xs uppercase font-bold mb-2">Tên sản phẩm</label>
                    <input v-model="productEdit.name" class="p-2 w-full border outline-0 rounded-xs" type="text" />
                </div>
                <div class="w-full">
                    <label class="block text-xs uppercase font-bold mb-2">Giá</label>
                    <input v-model="productEdit.basePrice" class="p-2 w-full border outline-0 rounded-xs" type="text" />
                </div>
                <div class="w-full">
                    <label class="block text-xs uppercase font-bold mb-2">Chất liệu</label>
                    <input v-model="productEdit.material" class="p-2 w-full border outline-0 rounded-xs" type="text" />
                </div>
                <div class="w-full">
                    <label class="block text-xs uppercase font-bold mb-2">Thương hiệu</label>
                    <select v-model="productEdit.brandId" name="" id="" class="p-2 w-full border outline-0 rounded-xs">
                        <option v-for="brand in brands" :key="brand.id" :value="brand.id">
                            {{ brand.name }}
                        </option>
                    </select>
                </div>
                <div class="w-full">
                    <label class="block text-xs uppercase font-bold mb-2">Loại sản phẩm</label>
                    <select v-model="productEdit.categoryId" name="" id=""
                        class="p-2 w-full border outline-0 rounded-xs">
                        <option v-for="category in categories" :key="category.id" :value="category.id">
                            {{ category.name }}
                        </option>
                    </select>
                </div>
                <div class="w-full">
                    <label class="block text-xs uppercase font-bold mb-2">Mô tả</label>
                    <textarea v-model="productEdit.description" name="" class="w-full border pl-2" rows="5"
                        id=""></textarea>
                </div>
                <div class="w-full">
                    <label class="block text-xs uppercase font-bold mb-2">Nổi bật</label>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" id="notifications" class="sr-only peer" v-model="productEdit.featured">
                        <div
                            class="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:bg-green-500 transition-colors">
                        </div>
                        <div
                            class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full peer-checked:translate-x-5 transition-transform">
                        </div>
                    </label>
                </div>
                <div class="w-full">
                    <label class="block text-xs uppercase font-bold mb-2">Trạng thái</label>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" id="notifications" class="sr-only peer" v-model="productEdit.active">
                        <div
                            class="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:bg-green-500 transition-colors">
                        </div>
                        <div
                            class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full peer-checked:translate-x-5 transition-transform">
                        </div>
                    </label>
                </div>
            </div>
            <template #footer>
                <button class="px-6 py-2.5 rounded-xl cursor-pointer bg-gray-950 text-white"
                    @click="updateProduct(productEdit.id)">Update</button>
            </template>
        </ModelSection>
    </AdminManageSection>
</template>

<script setup>
import AdminManageSection from '@/components/AdminManageSection.vue';
import ModelSection from '@/components/ModelSection.vue';
import PaginationSection from '@/components/PaginationSection.vue';
import { useBrandStore } from '@/store/brandStore';
import { useCategoryStore } from '@/store/categoryStore';
import { useProductStore } from '@/store/productStore';
import { format } from '@/utils/format';
import Swal from 'sweetalert2';
import { computed, onMounted, ref } from 'vue';

const isLoading = ref(false)
const isEdit = ref(false)

const productStore = useProductStore()
const brandStore = useBrandStore()
const categoryStore = useCategoryStore()

const products = computed(() => productStore.products)

const pagination = ref({
    pageNo: 0,
    pageSize: 0,
    totalPage: 0,
    totalElements: 0
})

const productEdit = ref({
    id: '',
    name: '',
    basePrice: 0,
    material: '',
    brandId: '',
    categoryId: '',
    description: '',
    featured: false,
    active: false
})

const brands = computed(() => brandStore.brands)
const categories = computed(() => categoryStore.categories)

onMounted(async () => {
    isLoading.value = true
    await brandStore.fetchBrands(0, 10)
    await categoryStore.fetchCategories(0, 10)
    const resp = await productStore.fetchProducts()
    const value = resp.data
    pagination.value = {
        pageNo: value.pageNo,
        pageSize: value.pageSize,
        totalElements: value.totalElements,
        totalPage: value.totalPage
    }
    isLoading.value = false
})

const getTotalStock = (variants) => {
    return variants.reduce((preValue, currValue) => {
        return currValue.stockQuantity + preValue
    }, 0)
}

const changePage = async (page) => {
    isLoading.value = true
    await productStore.fetchProducts(page)
    isLoading.value = false
}

const editProduct = async (id) => {
    isLoading.value = true
    const resp = await productStore.findProductById(id);
    const productValue = resp.data
    isLoading.value = false
    isEdit.value = true
    productEdit.value = {
        id,
        name: productValue.name,
        basePrice: productValue.basePrice,
        material: productValue.material,
        brandId: productValue.brandId,
        categoryId: productValue.categoryId,
        description: productValue.description,
        featured: productValue.featured,
        active: productValue.active
    }
}

const closeDialog = () => {
    isEdit.value = false
    productEdit.value = {
        id: '',
        name: '',
        basePrice: 0,
        material: '',
        brandId: '',
        categoryId: '',
        description: '',
        featured: false,
        active: false
    }
}

const updateProduct = async (id) => {
    isLoading.value = true
    const body = { ...productEdit.value }
    try {
        const response = await productStore.update(id, body)
        closeDialog()
        if (response.status === 202) {
            isLoading.value = false
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
</script>