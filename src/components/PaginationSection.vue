<template>
    <div class="px-6 py-4 border-t border-slate-50 flex items-center justify-between bg-white">
        <p class="text-sm text-slate-400">
            Hiển thị {{ startIndex }} - {{ endIndex }} trong {{ totalElements }} dòng dữ liệu
        </p>
        <div class="flex items-center gap-2">
            <button :disabled="pageNo <= 1" @click="previousPage"
                class="p-2 cursor-pointer text-slate-400 hover:bg-slate-50 rounded-lg transition-colors disabled:opacity-30">
                <i class="fa-solid fa-angle-left"></i>
            </button>

            <button
                class="w-8 h-8 flex items-center justify-center rounded-lg bg-red-600 text-white text-sm font-bold shadow-sm shadow-red-200">
                {{ pageNo }}
            </button>

            <button :disabled="pageNo >= totalPage" @click="nextPage"
                class="p-2 cursor-pointer text-slate-400 hover:bg-slate-50 rounded-lg transition-colors border border-slate-100 disabled:opacity-30">
                <i class="fa-solid fa-angle-right"></i>
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    pageNo: {
        type: Number,
        default: 1
    },
    pageSize: {
        type: Number,
        default: 0
    },
    totalElements: {
        type: Number,
        default: 0
    },
    totalPage: {
        type: Number,
        default: 0
    }
})

const emit = defineEmits(['changePage', 'update:pageNo'])

const startIndex = computed(() => {
    if (props.totalElements === 0) return 0
    return (props.pageNo - 1) * props.pageSize + 1
})

const endIndex = computed(() => {
    const end = props.pageNo * props.pageSize
    // return Math.max(end, props.totalElements)
    return end
})

const nextPage = () => {
    if (props.pageNo < props.totalPage) {
        emit('changePage', props.pageNo + 1)
        emit('update:pageNo', props.pageNo + 1)
    }
}

const previousPage = () => {
    if (props.pageNo > 1) {
        emit('update:pageNo', props.pageNo - 1);
        emit('changePage', props.pageNo - 1);
    }
}

</script>