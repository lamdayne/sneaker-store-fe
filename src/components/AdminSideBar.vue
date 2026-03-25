<template>
    <aside class="w-64 bg-gray-900 flex flex-col fixed inset-y-0 z-49">
        <div class="p-6">
            <div class="flex items-center gap-3">
                <div class="bg-accent rounded size-8 flex items-center justify-center">
                    <span class="text-white font-bold text-lg">S</span>
                </div>
                <div class="flex flex-col">
                    <h1 class="text-white text-[14px] font-bold tracking-wider leading-none">SOLEHAUS</h1>
                    <p class="text-slate-500 text-[10px] font-medium uppercase mt-1">admin panel</p>
                </div>
            </div>
        </div>
        <nav class="flex-1 px-3 space-y-1">
            <!-- Dashboard Active -->
            <a class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/10 text-white" href="#">
                <i class="fa-solid fa-gauge-high"></i>
                <span class="text-[13px] font-medium">Dashboard</span>
            </a>
            <!-- Sản phẩm with nested -->
            <div class="pt-2">
                <div class="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white transition-colors">
                    <i class="fa-solid fa-box-archive"></i>
                    <span class="text-[13px] font-medium">Sản phẩm</span>
                </div>
                <div class="ml-9 mt-1 space-y-1">
                    <a class="block py-1.5 text-[12px] text-slate-500 hover:text-white" href="#">Danh sách</a>
                    <a class="block py-1.5 text-[12px] text-slate-500 hover:text-white" href="#">Thêm mới</a>
                    <a class="block py-1.5 text-[12px] text-slate-500 hover:text-white" href="#">Danh mục</a>
                    <a class="block py-1.5 text-[12px] text-slate-500 hover:text-white" href="#">Thương hiệu</a>
                </div>
            </div>
            <a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                href="#">
                <i class="fa-solid fa-cart-shopping"></i>
                <span class="text-[13px] font-medium">Đơn hàng</span>
            </a>
            <a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                href="#">
                <i class="fa-solid fa-user-group"></i>
                <span class="text-[13px] font-medium">Khách hàng</span>
            </a>
        </nav>
        <div class="mt-auto p-4 border-t border-white/5">
            <div class="flex items-center gap-3">
                <div class="size-9 rounded-full bg-slate-700 overflow-hidden">
                    <img alt="Admin user profile picture" class="w-full h-full object-cover"
                        data-alt="Close-up portrait of a professional male administrator"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0ZH6zhd7WX4jay2MkpBAe0QvgNU2IXE8rMEObVoXtx1X8fWUb5FB3EVnxHU1qfw634t8NSCR-8MrV4xu4h4C-3rUHmEEoSjaC4QbqzT7vkUim2iJB3JzuM0a6ISSFrLxK-MM6ber1t_GiOOqaKfgGMRzS0MOAGIsZ2ikz7NajPx7LaHSepwWqsjqoiLTaBk--iktY-QbEeke-YQVhBzfSm1vDP5n1__4WUnYsnU3w5gaPkNQj55yXG3Bl3feTlQ0QHfw5GwR94So" />
                </div>
                <div class="flex-1 overflow-hidden">
                    <p class="text-white text-[12px] font-medium truncate">Alexander S.</p>
                    <p class="text-slate-500 text-[10px] truncate">Senior Manager</p>
                </div>
                <button class="text-slate-400 hover:text-accent">
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                </button>
            </div>
        </div>
    </aside>
</template>