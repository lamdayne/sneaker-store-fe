<template>
    <div id="id" @click.self="$emit('closeModal', false)"
        :class="['fixed inset-0 bg-black/60 flex items-center justify-center z-50', isOpen ? '' : 'hidden']">
        <div class="bg-white rounded-2xl shadow-2xl w-fit mx-4 overflow-hidden">

            <!-- Header -->
            <div v-if="title" class="px-6 py-5 border-b flex items-center justify-between">
                <h3 class="text-xl font-semibold text-gray-900">{{ title }}</h3>
                <button @click="$emit('closeModal', false)"
                    class="text-gray-400 hover:text-gray-600 text-3xl leading-none cursor-pointer">
                    &times;
                </button>
            </div>

            <!-- Body -->
            <div class="p-6 text-gray-700">
                <slot></slot>
            </div>

            <!-- Footer -->
            <div v-if="$slots.footer" class="px-6 py-4 bg-gray-50 flex justify-end gap-3 border-t">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<script setup>

defineProps({
    isOpen: {
        type: Boolean,
        default: false
    },
    title: {
        type: String
    }
})

defineEmits(['closeModal'])

</script>