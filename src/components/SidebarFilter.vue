<template>
    <aside class="w-full lg:w-60 shrink-0">
        <div class="sticky top-28 flex flex-col gap-8">
            <div class="flex items-center justify-between">
                <h3 class="text-sm font-semibold uppercase tracking-wider">Bộ lọc</h3>
                <button class="text-xs font-medium text-primary hover:underline">Xóa tất cả</button>
            </div>
            <!-- Filter Groups -->
            <div class="flex flex-col gap-6">
                <!-- Danh mục -->
                <div class="border-b border-primary/5 pb-4">
                    <button @click="toggleCategoryMenu"
                        class="flex w-full items-center justify-between py-2 text-sm font-medium cursor-pointer">
                        Danh mục
                        <i class="fa-solid fa-angle-down"></i>
                    </button>
                    <div v-if="isCategoryOpen" class="mt-2 space-y-3">
                        <label v-for="category in categories" :key="category.id"
                            class="flex items-center gap-3 text-sm">
                            <input v-model="categorySelected"
                                class="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/20"
                                type="checkbox" :value="category.id" />
                            {{ category.name }}
                        </label>
                    </div>
                </div>
                <!-- Thương hiệu -->
                <div class="border-b border-primary/5 pb-4">
                    <button @click="toggleBrandMenu"
                        class="flex w-full items-center justify-between py-2 text-sm font-medium cursor-pointer">
                        Thương hiệu
                        <i class="fa-solid fa-angle-down"></i>
                    </button>
                    <div v-if="isBrandOpen" class="mt-2 space-y-3">
                        <label v-for="brand in brands" :key="brand.id"
                            class="flex items-center justify-between text-sm">
                            <div class="flex items-center gap-3">
                                <input class="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/20"
                                    type="checkbox" :value="brand.id" />
                                {{ brand.name }}
                            </div>
                            <!-- <span class="text-[10px] text-slate-400">42</span> -->
                        </label>
                    </div>
                </div>
                <!-- Size -->
                <div class="border-b border-primary/5 pb-4">
                    <button @click="toggleSizeMenu"
                        class="flex w-full items-center justify-between py-2 text-sm font-medium cursor-pointer">
                        Size
                        <i class="fa-solid fa-angle-down"></i>
                    </button>
                    <div v-if="isSizeOpen" class="mt-4 grid grid-cols-5 gap-2">
                        <button
                            class="flex h-9 w-9 items-center justify-center rounded border border-slate-200 text-xs hover:border-primary">36</button>
                        <button
                            class="flex h-9 w-9 items-center justify-center rounded border border-slate-200 text-xs hover:border-primary">37</button>
                        <button
                            class="flex h-9 w-9 items-center justify-center rounded border border-slate-200 text-xs hover:border-primary">38</button>
                        <button
                            class="flex h-9 w-9 items-center justify-center rounded border border-slate-200 text-xs hover:border-primary">39</button>
                        <button
                            class="flex h-9 w-9 items-center justify-center rounded border border-slate-200 text-xs hover:border-primary">40</button>
                        <button
                            class="flex h-9 w-9 items-center justify-center rounded border border-slate-200 text-xs hover:border-primary">41</button>
                        <button
                            class="flex h-9 w-9 items-center justify-center rounded bg-slate-900 text-xs text-white">42</button>
                        <button
                            class="flex h-9 w-9 items-center justify-center rounded border border-slate-200 text-xs hover:border-primary">43</button>
                        <button
                            class="flex h-9 w-9 items-center justify-center rounded border border-slate-200 text-xs hover:border-primary">44</button>
                    </div>
                </div>
                <!-- Màu -->
                <!-- <div class="border-b border-primary/5 pb-4">
                    <button class="flex w-full items-center justify-between py-2 text-sm font-medium">
                        Màu sắc
                        <i class="fa-solid fa-angle-down"></i>
                    </button>
                    <div class="mt-3 flex flex-wrap gap-3">
                        <button class="h-6 w-6 rounded-full bg-black ring-2 ring-primary ring-offset-2"></button>
                        <button class="h-6 w-6 rounded-full border border-slate-200 bg-white"></button>
                        <button class="h-6 w-6 rounded-full bg-red-600"></button>
                        <button class="h-6 w-6 rounded-full bg-blue-600"></button>
                        <button class="h-6 w-6 rounded-full bg-green-600"></button>
                        <button class="h-6 w-6 rounded-full bg-slate-400"></button>
                    </div>
                </div> -->
                <!-- Khoảng giá -->
                <div class="border-b border-primary/5 pb-4">
                    <button class="flex w-full items-center justify-between py-2 text-sm font-medium">
                        Khoảng giá
                        <i class="fa-solid fa-angle-down"></i>
                    </button>
                    <div class="mt-4">
                        <input v-model="price" @input="changePrice" id="priceSlider" type="range" min="0" max="10000000"
                            step="100000"
                            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600">
                        <span class="text-lg">0 - {{ format.formatVND(price) }}</span>
                    </div>
                </div>
            </div>
        </div>
    </aside>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { format } from '@/utils/format';
import { useCategoryStore } from '@/store/categoryStore';
import { useBrandStore } from '@/store/brandStore';

const price = ref(5000000)
const isCategoryOpen = ref(false)
const isBrandOpen = ref(false)
const isSizeOpen = ref(false)

const categorySelected = ref([])

const emit = defineEmits(['update:price'])

const categoryStore = useCategoryStore()
const brandStore = useBrandStore()

const categories = computed(() => categoryStore.categories)
const brands = computed(() => brandStore.brands)

onMounted(async () => {
    await categoryStore.fetchCategories(1, 10)
    await brandStore.fetchBrands(1, 10)
})

const changePrice = (e) => {
    const val = Number(e.target.value);
    emit('update:price', val);
}

const toggleCategoryMenu = () => {
    isCategoryOpen.value = !isCategoryOpen.value
}

const toggleBrandMenu = () => {
    isBrandOpen.value = !isBrandOpen.value
}

const toggleSizeMenu = () => {
    isSizeOpen.value = !isSizeOpen.value
}

watch(categorySelected, () => {
    console.log(categorySelected.value)
})
</script>