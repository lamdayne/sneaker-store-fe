<template>
    <div class="container mx-auto flex flex-col lg:flex-row gap-8 mt-2 animate-pulse">
        <div class="flex flex-col">
            <div class="p-2 w-fit bg-gray-200 rounded-2xl">
                <div alt="" class="w-130 h-120 object-cover rounded-2xl border-gray-200"></div>
            </div>
            <div class="flex mt-3 justify-around w-130">
                <div v-for="i in 4" :key="i" alt="" class="w-24 h-24 rounded-2xl border border-gray-200 bg-gray-200">
                </div>
            </div>
        </div>
        <div class="flex flex-col font-mono">
            <div class="p-3 rounded-2xl bg-gray-200 w-20"></div>
            <div class="mt-2 p-5 rounded-2xl bg-gray-200"></div>
            <div class="flex items-center my-4">
                <div class="p-4 w-36 bg-gray-200 rounded-2xl me-2"></div>
                <div class="p-3 w-32 bg-gray-200 rounded-2xl"></div>
            </div>
            <p class="font-sans text-[15px] font-bold">Màu sắc</p>
            <div class="flex mt-3 gap-4">
                <div v-for="i in 4" :key="i" class="w-9 h-9 rounded-full bg-gray-200"></div>
            </div>
            <p class="font-sans text-[15px] font-bold mt-3">Kích thước</p>
            <div class="grid grid-cols-4 gap-2 mt-2">
                <div v-for="s in 7" :key="s" class="py-5 px-14 bg-gray-200 rounded-lg"></div>
            </div>
            <p class="font-sans text-[15px] font-bold mt-3">Số lượng</p>
            <div class="p-5 w-20 rounded-2xl bg-gray-200"></div>
            <div class="flex gap-4 mt-4">
                <div class="flex-1 p-7 rounded-xl bg-gray-200"></div>
                <div class="flex-1 p-7 rounded-xl bg-gray-200"></div>
            </div>
        </div>
    </div>
</template>