<template>
    <div class="bg-gray-900 py-24">

        <div class="mx-auto max-w-7xl px-6">

            <h2 class="text-center text-lg font-semibold text-white">
                Trusted by the world’s most innovative teams
            </h2>

            <div class="relative mt-10 overflow-hidden">
                <!-- Wrapper -->
                <div class="flex w-max animate-scroll">

                    <!-- GROUP 1 -->
                    <div class="flex items-center gap-16">
                        <img v-for="i in 4" :key="i"
                            src="https://tailwindcss.com/plus-assets/img/logos/158x48/transistor-logo-white.svg"
                            class="h-12" />
                    </div>

                    <!-- GROUP 2 (copy y hệt) -->
                    <div class="flex items-center gap-16 ml-16">
                        <img src="https://tailwindcss.com/plus-assets/img/logos/158x48/transistor-logo-white.svg"
                            class="h-12" />
                        <img src="https://tailwindcss.com/plus-assets/img/logos/158x48/reform-logo-white.svg"
                            class="h-12" />
                        <img src="https://tailwindcss.com/plus-assets/img/logos/158x48/tuple-logo-white.svg"
                            class="h-12" />
                        <img src="https://tailwindcss.com/plus-assets/img/logos/158x48/savvycal-logo-white.svg"
                            class="h-12" />
                        <img src="https://tailwindcss.com/plus-assets/img/logos/158x48/statamic-logo-white.svg"
                            class="h-12" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
@keyframes scroll {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(calc(-50% - 2rem));
    }
}

.animate-scroll {
    animation: scroll 25s linear infinite;
}

.animate-scroll:hover {
    animation-play-state: paused;
}
</style>