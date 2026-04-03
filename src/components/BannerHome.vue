<template>
    <div class="container mx-auto relative h-[640px] overflow-hidden bg-slate-100 group">

        <transition-group :name="transitionName" tag="div" class="absolute inset-0 w-full h-full">
            <img v-for="(img, index) in slides" :key="img" v-show="currentIndex === index" :src="img" alt="Banner"
                class="absolute inset-0 h-full w-full object-cover origin-center">
        </transition-group>

        <div class="absolute inset-0 bg-black/10 pointer-events-none z-0"></div>

        <button @click="$emit('explore')"
            class="absolute z-10 uppercase border px-8 py-4 bg-white font-bold text-xl rounded-full bottom-36 left-1/2 -translate-x-1/2 cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg">
            Khám phá ngay
        </button>

        <button @click="prevSlide"
            class="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/50 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m15 18-6-6 6-6" />
            </svg>
        </button>

        <button @click="nextSlide"
            class="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/50 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m9 18 6-6-6-6" />
            </svg>
        </button>

        <div class="absolute z-10 bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            <button v-for="(_, index) in slides" :key="'dot-' + index" @click="setSlide(index)"
                :class="['w-10 h-1.5 rounded-full transition-colors', currentIndex === index ? 'bg-white' : 'bg-white/40 hover:bg-white/70']"></button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

defineEmits(['explore']);

const slides = [
    'https://static.nike.com/a/images/w_2880,h_1600,c_fill,f_auto/4ed830f2-5f31-4cd9-b1c9-efe735b6d1fc/image.jpg',
    'https://intphcm.com/data/upload/poster-giay-den.jpg',
    'https://bizweb.dktcdn.net/100/413/756/collections/jordan-2.jpg?v=1617462460240'
];

const currentIndex = ref(0);
const direction = ref('next');
let interval = null;

const transitionName = computed(() => `slide-${direction.value}`);

const nextSlide = () => {
    direction.value = 'next';
    currentIndex.value = (currentIndex.value + 1) % slides.length;
    resetInterval();
};
const prevSlide = () => {
    direction.value = 'prev';
    currentIndex.value = (currentIndex.value - 1 + slides.length) % slides.length;
    resetInterval();
};
const setSlide = (index) => {
    if (index === currentIndex.value) return;
    // Tự động tính toán hướng trượt khi bấm dot
    direction.value = index > currentIndex.value ? 'next' : 'prev';
    currentIndex.value = index;
    resetInterval();
};

const startInterval = () => {
    interval = setInterval(nextSlide, 4000);
};

const resetInterval = () => {
    clearInterval(interval);
    startInterval();
};

onMounted(() => {
    startInterval();
});

onUnmounted(() => {
    clearInterval(interval);
});
</script>

<style scoped>
/* HIỆU ỨNG TRƯỢT NGANG (PURE SLIDE) - Sang trọng, tối giản
*/
/* Thiết lập thời gian và độ mượt (easing curve) cho cả 2 kịch bản */
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
    transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
}

.slide-next-enter-from {
    transform: translateX(100%);
}

.slide-next-leave-to {
    transform: translateX(-100%);
}

.slide-prev-enter-from {
    transform: translateX(-100%);
}

.slide-prev-leave-to {
    transform: translateX(100%);
}
</style>