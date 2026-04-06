<template>
    <AdminManageSection>
        <div class="flex items-center justify-between mt-3">
            <h1 class="font-serif font-bold uppercase text-2xl">Thêm sản phẩm</h1>
            <button class="px-4 py-2.5 rounded-xl bg-gray-900 text-white" @click="saveProduct">Lưu sản
                phẩm</button>
        </div>
        <div class="flex gap-4">
            <div class="w-3/5">
                <div class="bg-slate-100 mt-3 p-4">
                    <h1 class="text-xl font-serif font-bold">Thông tin cơ bản</h1>
                    <div class="flex items-center justify-between gap-4 mt-3">
                        <div class="flex-1">
                            <label class="block text-xs uppercase font-bold mb-2">Tên sản phẩm</label>
                            <input v-model="productInfo.name" class="p-2 w-full border outline-0 rounded-xs"
                                placeholder="VD: Nike Air Jordan 1 Retro High" type="text" />
                        </div>
                        <div class="flex-1">
                            <label class="block text-xs uppercase font-bold mb-2">Chất liệu</label>
                            <input v-model="productInfo.material" class="p-2 w-full flex-1 border outline-0 rounded-xs"
                                placeholder="VD: Chất liệu da" type="text" />
                        </div>
                    </div>
                    <div class="mt-3">
                        <label class="block text-xs font-bold mb-2 uppercase">Mô tả chi tiết</label>
                        <textarea v-model="productInfo.description" name=""
                            class="w-full outline-0 rounded-xs p-2 border" rows="5" id=""></textarea>
                    </div>
                </div>
            </div>
            <div class="w-2/5">
                <div class="bg-slate-100 mt-3 p-4">
                    <h1 class="text-xl font-serif font-bold">Phân loại và thương hiệu</h1>
                    <div class="flex items-center justify-between gap-4 mt-3">
                        <div class="flex-1">
                            <label class="block text-xs font-bold mb-2 uppercase">Phân loại</label>
                            <select v-model="productInfo.categoryId" name="" id="" class="p-2.5 border w-full">
                                <option v-for="category in categories" :key="category.id" :value="category.id">
                                    {{ category.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="flex items-center justify-between gap-4 mt-3">
                        <div class="flex-1">
                            <label class="block text-xs font-bold mb-2 uppercase">Thương hiệu</label>
                            <select v-model="productInfo.brandId" name="" id="" class="p-2.5 border w-full">
                                <option v-for="brand in brands" :key="brand.id" :value="brand.id">
                                    {{ brand.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="bg-slate-100 mt-3 p-4">
                    <h1 class="text-xl font-serif font-bold">Nổi bật</h1>
                    <div class="flex items-center gap-4">
                        <div>
                            <input v-model="productInfo.featured" type="radio" name="isFeatured" value="true" id="">
                            <span class="ms-2">Yes</span>
                        </div>
                        <div>
                            <input type="radio" name="isFeatured" value="false" id="">
                            <span class="ms-2">No</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex gap-4">
            <div class="w-3/5">
                <div class="bg-slate-100 mt-3 p-4">
                    <div class="flex items-center justify-between">
                        <h1 class="text-xl font-serif font-bold">Giá và thể loại</h1>
                        <button @click="addVariants" class="px-4 py-2.5 rounded-xl bg-gray-900 text-white">Thêm thể
                            loại</button>
                    </div>
                    <div class="flex items-center w-1/2 justify-between gap-4">
                        <div class="flex-1">
                            <label class="block text-xs uppercase font-bold mb-2">Giá (VND)</label>
                            <input v-model="productInfo.basePrice"
                                class="p-2 w-full border text-xl outline-0 rounded-xs" placeholder="2.000.000"
                                type="number" />
                        </div>
                    </div>
                    <table class="w-full mt-2 table-fixed">
                        <thead>
                            <tr class="text-xs text-gray-500 font-bold uppercase border-b border-border-custom">
                                <th class="pb-3 px-2">Size</th>
                                <th class="pb-3 px-2">Màu sắc</th>
                                <th class="pb-3 px-2">Kho</th>
                                <th class="pb-3 px-2">Giá riêng</th>
                                <th class="pb-3 px-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in variants" :key="index" class="border-b">
                                <td class="py-2 px-2 text-center">
                                    <input v-model="item.size" type="text" class="text-xl p-2 border rounded-xs w-3/5"
                                        placeholder="36">
                                </td>
                                <td class="py-2 px-2 text-center">
                                    <input v-model="item.colorHex" type="color" class="border rounded-xs w-3/5">
                                </td>
                                <td class="py-2 px-2 text-center">
                                    <input v-model="item.stockQuantity" type="number"
                                        class="p-2 text-xl border rounded-xs w-3/5" placeholder="36">
                                </td>
                                <td class="py-2 px-1">
                                    <input type="text" class="p-2 text-xl border rounded-xs w-full"
                                        placeholder="2.000.000 đ" v-model="item.priceOverride">
                                </td>
                                <td class="text-center py-2 px-1">
                                    <button @click="removeVariant(index)" class="text-red-500 cursor-pointer w-full">
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="w-2/5">
                <div class="bg-slate-100 mt-3 p-4">
                    <h1 class="text-xl font-serif font-bold">Ảnh</h1>
                    <input @change="handleImages" type="file" name="" multiple=""
                        class="p-3 bg-gray-300 rounded-xl w-full" id="">
                    <div class="grid grid-cols-5 gap-2">
                        <div v-for="item, index in previewImages" :key="item">
                            <img class="mt-2 rounded-xl w-full" :src="item.url" alt="">
                            <div class="flex mt-2 items-center">
                                <input :value="index" v-model="mainImageIndex" type="radio" name="productImage">
                                <span>Ảnh chính</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
import { useBrandStore } from '@/store/brandStore';
import { useCategoryStore } from '@/store/categoryStore';
import { useProductStore } from '@/store/productStore';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';

const brandStore = useBrandStore();
const categoryStore = useCategoryStore();
const brands = ref([]);
const categories = ref([]);
const productStore = useProductStore();
const mainImageIndex = ref(null);
const isLoading = ref(false);

const productInfo = ref({
    name: '',
    description: '',
    basePrice: 0,
    material: '',
    featured: false,
    brandId: '',
    categoryId: ''
})

const loadBrands = async () => {
    const result = await brandStore.fetchBrands(1, 10);
    brands.value = result.data.items;
}

const loadCategories = async () => {
    const result = await categoryStore.fetchCategories(1, 10);
    categories.value = result.data.items;
}

onMounted(async () => {
    await loadBrands();
    await loadCategories();
})

const variants = ref([{
    size: '',
    colorHex: '#000',
    stockQuantity: 0,
    overridePrice: 0
}])

const previewImages = ref([]);

const handleImages = (event) => {
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith('image/')) continue;
        const url = URL.createObjectURL(file);
        previewImages.value.push({
            file,
            url,
            isMain: false
        });
    }
    console.log(previewImages)
}

const addVariants = () => {
    variants.value.push({
        size: '',
        colorHex: '#000',
        stock: 0,
        priceOverride: 0
    })
}

const resetVariantForm = () => {
    variants.value = [];
    addVariants()
}

const resetForm = () => {
    productInfo.value = {
        name: '',
        description: '',
        basePrice: 0,
        material: '',
        featured: false,
        brandId: '',
        categoryId: ''
    }
    mainImageIndex.value = false;
    previewImages.value = []
}

const removeVariant = (index) => {
    variants.value.splice(index, 1);
}

const saveProduct = async () => {
    isLoading.value = true
    const product = { ...productInfo.value }
    const response = await productStore.create(product)
    if (response.status === 201) {
        const productId = response.data.id
        const result = await saveProductVariant(productId);
        await saveProductImage(productId, result.data.id);
        resetVariantForm()
        resetForm()
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
}

const saveProductVariant = async (productId) => {
    let response;
    for (let i = 0; i < variants.value.length; i++) {
        response = await productStore.createProductVariant({ ...variants.value[i], productId, color: variants.value[i].colorHex });
        // if (response.status === 201) {
        //     Swal.fire({
        //         title: "Thành công",
        //         icon: "success",
        //         draggable: true,
        //         text: response.message
        //     });
        // } else {
        //     Swal.fire({
        //         title: "Thất bại",
        //         icon: "error",
        //         draggable: true,
        //         text: response.message
        //     });
        //     return;
        // }
    }
    return response;
}

const saveProductImage = async (productId, variantId) => {
    let response;
    for (let i = 0; i < previewImages.value.length; i++) {
        const item = previewImages.value[i];

        const upload = await uploadToCloudinary(item.file);
        response = productStore.createProductImage({
            productId,
            variantId,
            imageUrl: upload.secure_url,
            isPrimary: i === mainImageIndex.value,
            displayOrder: i + 1
        })
    }
    return response;
}

const uploadToCloudinary = async (file) => {
    const res = await productStore.getCloudinarySignature()

    const { signature, timestamp, api_key, cloud_name, folder } = res.data

    const formData = new FormData()
    formData.append('file', file)
    formData.append('api_key', api_key)
    formData.append('timestamp', timestamp)
    formData.append('signature', signature)
    formData.append('folder', folder)

    // 3. gọi cloudinary
    const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
            method: 'POST',
            body: formData
        }
    )

    const data = await uploadRes.json()
    return data
}

</script>