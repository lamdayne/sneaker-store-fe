<template>
    <div class="container mx-auto mt-10 px-4">
        <div v-if="isLoading"
            class="absolute inset-0 bg-white/60 z-10 flex items-center justify-center backdrop-blur-[1px]">
            <div class="flex flex-col items-center gap-2">
                <span class="animate-spin text-xl"><i class="fa-solid fa-hourglass"></i></span>
                <span class="text-sm font-medium text-slate-500">Đang tải dữ liệu...</span>
            </div>
        </div>
        <div class="flex flex-col items-center mb-12">
            <h1 class="font-playfair text-4xl font-bold mb-8 uppercase tracking-tight">Kết quả tìm kiếm</h1>

            <div class="relative w-full max-w-2xl">
                <i class="fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input @keyup.enter="search" type="text" placeholder="Tìm kiếm sản phẩm..." v-model="searchInfo.name"
                    class="w-full py-4 pl-14 pr-6 rounded-full border border-slate-200 shadow-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-lg" />
            </div>

            <div class="flex items-center gap-3 mt-6">
            </div>
        </div>

        <div class="flex gap-10">
            <SidebarFilter v-model:price="searchInfo.price" />

            <div class="flex-1">
                <div v-if="isLoading" class="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <SkeletonProductItem v-for="i in 20" :key="i" />
                </div>
                <div class="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4">
                    <h1 v-if="products.length === 0" class="font-bold">Không tồn tại sản phẩm nào</h1>
                    <ProductItem :product="product" v-for="product in products" :key="product.id" />
                </div>
                <PaginationSection :page-no="pagination.pageNo" :page-size="pagination.pageSize"
                    :total-elements="pagination.totalElements" :total-page="pagination.totalPage"
                    v-model:page-no="pagination.pageNo" @change-page="changePage"></PaginationSection>
            </div>
        </div>
    </div>

    <FooterSection class="mt-20" />
</template>

<script setup>
import SidebarFilter from '@/components/SidebarFilter.vue';
import ProductItem from '@/components/ProductItem.vue';
import FooterSection from '@/components/FooterSection.vue';
import { useProductStore } from '@/store/productStore';
import { computed, onMounted, ref } from 'vue';
import SkeletonProductItem from '@/components/SkeletonProductItem.vue';
import PaginationSection from '@/components/PaginationSection.vue';

const productStore = useProductStore();
const searchInfo = ref({
    name: '',
    price: 5000000
})

const isLoading = ref(false)

const products = computed(() => productStore.products);
const pagination = ref({
    pageNo: 0,
    pageSize: 0,
    totalPage: 0,
    totalElements: 0
})

onMounted(async () => {
    isLoading.value = true
    const resp = await productStore.fetchProducts(1, 12);
    const value = resp.data
    pagination.value = {
        pageNo: value.pageNo,
        pageSize: value.pageSize,
        totalElements: value.totalElements,
        totalPage: value.totalPage
    }
    isLoading.value = false
})

const changePage = async (page) => {
    isLoading.value = true
    await productStore.fetchProducts(page)
    isLoading.value = false
}

const search = async () => {
    isLoading.value = true
    await productStore.search({ ...searchInfo.value, pageNo: 0, pageSize: 12, sortBy: 'name' })
    console.log(searchInfo.value)
    isLoading.value = false
}

</script>