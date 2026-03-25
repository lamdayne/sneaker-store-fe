<template>
    <div class="container mx-auto relative">
        <img src="https://static.nike.com/a/images/w_2880,h_1600,c_fill,f_auto/4ed830f2-5f31-4cd9-b1c9-efe735b6d1fc/image.jpg"
            alt="" class="h-160 w-full object-cover">
        <button @click="$emit('explore')"
            class="absolute uppercase border px-8 py-4 bg-white font-bold text-xl rounded-full bottom-36 left-1/2 -translate-x-1/2 cursor-pointer">
            Khám phá ngay
        </button>
    </div>
</template>

<script setup>
defineEmits(['explore'])
</script>