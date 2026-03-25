<template>
    <AdminSideBar />
    <div class="ml-68 mr-4">
        <div class="flex items-center justify-between mt-3">
            <h1 class="font-serif font-bold uppercase text-2xl">Thêm sản phẩm</h1>
            <button class="px-4 py-2.5 rounded-xl bg-gray-900 text-white">Lưu sản phẩm</button>
        </div>
        <div class="flex gap-4">
            <div class="w-3/5">
                <div class="bg-slate-100 mt-3 p-4">
                    <h1 class="text-xl font-serif font-bold">Thông tin cơ bản</h1>
                    <div class="flex items-center justify-between gap-4 mt-3">
                        <div class="flex-1">
                            <label class="block text-xs uppercase font-bold mb-2">Tên sản phẩm</label>
                            <input class="p-2 w-full border outline-0 rounded-xs"
                                placeholder="VD: Nike Air Jordan 1 Retro High" type="text" />
                        </div>
                        <div class="flex-1">
                            <label class="block text-xs uppercase font-bold mb-2">Chất liệu</label>
                            <input class="p-2 w-full flex-1 border outline-0 rounded-xs" placeholder="VD: Chất liệu da"
                                type="text" />
                        </div>
                    </div>
                    <div class="mt-3">
                        <label class="block text-xs font-bold mb-2 uppercase">Mô tả chi tiết</label>
                        <textarea name="" class="w-full outline-0 rounded-xs p-2 border" rows="5" id=""></textarea>
                    </div>
                </div>
            </div>
            <div class="w-2/5">
                <div class="bg-slate-100 mt-3 p-4">
                    <h1 class="text-xl font-serif font-bold">Phân loại và thương hiệu</h1>
                    <div class="flex items-center justify-between gap-4 mt-3">
                        <div class="flex-1">
                            <label class="block text-xs font-bold mb-2 uppercase">Phân loại</label>
                            <select name="" id="" class="p-2.5 border w-full">
                                <option value="d">jasdfasdf</option>
                                <option value="d">jasdf</option>
                            </select>
                        </div>
                    </div>
                    <div class="flex items-center justify-between gap-4 mt-3">
                        <div class="flex-1">
                            <label class="block text-xs font-bold mb-2 uppercase">Thương hiệu</label>
                            <select name="" id="" class="p-2.5 border w-full">
                                <option value="d">jasdfasdf</option>
                                <option value="d">jasdf</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="bg-slate-100 mt-3 p-4">
                    <h1 class="text-xl font-serif font-bold">Nổi bật</h1>
                    <div class="flex items-center gap-4">
                        <div>
                            <input type="radio" name="isFeatured" value="true" id="">
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
                        <button class="px-4 py-2.5 rounded-xl bg-gray-900 text-white">Thêm thể loại</button>
                    </div>
                </div>
            </div>
            <div class="w-2/5"></div>
        </div>
    </div>
</template>

<script setup>
import AdminSideBar from '@/components/AdminSideBar.vue';

</script>