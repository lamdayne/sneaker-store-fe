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
                    <button class="flex w-full items-center justify-between py-2 text-sm font-medium">
                        Danh mục
                        <i class="fa-solid fa-angle-down"></i>
                    </button>
                    <div class="mt-2 space-y-3">
                        <label class="flex items-center gap-3 text-sm">
                            <input class="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/20"
                                type="checkbox" />
                            Chạy bộ
                        </label>
                        <label class="flex items-center gap-3 text-sm">
                            <input checked="true"
                                class="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/20"
                                type="checkbox" />
                            Lifestyle
                        </label>
                        <label class="flex items-center gap-3 text-sm">
                            <input class="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/20"
                                type="checkbox" />
                            Bóng rổ
                        </label>
                        <label class="flex items-center gap-3 text-sm">
                            <input class="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/20"
                                type="checkbox" />
                            Tennis
                        </label>
                    </div>
                </div>
                <!-- Thương hiệu -->
                <div class="border-b border-primary/5 pb-4">
                    <button class="flex w-full items-center justify-between py-2 text-sm font-medium">
                        Thương hiệu
                        <i class="fa-solid fa-angle-down"></i>
                    </button>
                    <div class="mt-2 space-y-3">
                        <label class="flex items-center justify-between text-sm">
                            <div class="flex items-center gap-3">
                                <input checked="true"
                                    class="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/20"
                                    type="checkbox" />
                                Nike
                            </div>
                            <span class="text-[10px] text-slate-400">42</span>
                        </label>
                        <label class="flex items-center justify-between text-sm">
                            <div class="flex items-center gap-3">
                                <input class="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/20"
                                    type="checkbox" />
                                Adidas
                            </div>
                            <span class="text-[10px] text-slate-400">38</span>
                        </label>
                        <label class="flex items-center justify-between text-sm">
                            <div class="flex items-center gap-3">
                                <input class="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/20"
                                    type="checkbox" />
                                Jordan
                            </div>
                            <span class="text-[10px] text-slate-400">24</span>
                        </label>
                    </div>
                </div>
                <!-- Size -->
                <div class="border-b border-primary/5 pb-4">
                    <button class="flex w-full items-center justify-between py-2 text-sm font-medium">
                        Size
                        <i class="fa-solid fa-angle-down"></i>
                    </button>
                    <div class="mt-4 grid grid-cols-5 gap-2">
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
                <div class="border-b border-primary/5 pb-4">
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
                </div>
                <!-- Khoảng giá -->
                <div class="border-b border-primary/5 pb-4">
                    <button class="flex w-full items-center justify-between py-2 text-sm font-medium">
                        Khoảng giá
                        <i class="fa-solid fa-angle-down"></i>
                    </button>
                    <div class="mt-4">
                        <div class="relative h-1 w-full rounded-full bg-slate-200">
                            <div class="absolute h-full w-2/3 bg-primary rounded-full left-1/4"></div>
                            <div
                                class="absolute left-1/4 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-white shadow-sm cursor-pointer">
                            </div>
                            <div
                                class="absolute left-3/4 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-white shadow-sm cursor-pointer">
                            </div>
                        </div>
                        <div class="mt-4 flex justify-between text-xs font-medium">
                            <span>200,000đ</span>
                            <span>5,000,000đ</span>
                        </div>
                    </div>
                </div>
                <!-- Giới tính -->
                <div class="border-b border-primary/5 pb-4">
                    <button class="flex w-full items-center justify-between py-2 text-sm font-medium">
                        Giới tính
                        <i class="fa-solid fa-angle-down"></i>
                    </button>
                    <div class="mt-3 flex flex-wrap gap-2">
                        <button
                            class="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white">Nam</button>
                        <button
                            class="rounded-full bg-slate-200 dark:bg-slate-800 px-4 py-1.5 text-xs font-medium hover:bg-primary/10 transition-colors">Nữ</button>
                    </div>
                </div>
            </div>
        </div>
    </aside>
</template>