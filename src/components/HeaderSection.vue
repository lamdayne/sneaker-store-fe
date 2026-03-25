<template>
    <header class="sticky top-0 z-50 h-15 px-4 flex bg-white border-b border-gray-200 md:px-8">
        <div class="container mx-auto flex items-center justify-between">
            <router-link to="/" class="font-playfair text-[20px] font-bold tracking-tighter">
                <i class="fa-solid fa-shoe-prints"></i>
                SOLEHAUS
            </router-link>
            <nav class="hidden lg:flex items-center space-x-8 text-[14px] font-medium uppercase tracking-tight">
                <a class="hover:text-accent transition-colors" href="#">Trang chủ</a>
                <a class="hover:text-accent transition-colors" href="#">Nam</a>
                <a class="hover:text-accent transition-colors" href="#">Nữ</a>
                <a class="hover:text-accent transition-colors" href="#">Trẻ em</a>
                <a class="hover:text-accent transition-colors" href="#">Thương hiệu</a>
                <a class="hover:text-accent transition-colors text-accent" href="#">Sale</a>
            </nav>
            <div class="flex items-center space-x-5">
                <button aria-label="Search" class="hover:opacity-70 transition-opacity">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
                <router-link to="/login" aria-label="Login" class="hidden sm:block hover:opacity-70 transition-opacity">
                    <i class="fa-regular fa-user"></i>
                </router-link>
                <button aria-label="Cart" class="relative hover:opacity-70 transition-opacity">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <span
                        class="absolute -top-1.5 -right-1.5 bg-green-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">3</span>
                </button>
            </div>
        </div>
    </header>
</template>

<script setup></script>