<template>
    <footer class="bg-black text-white pt-16 pb-8 px-4 md:px-8">
        <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <!-- About -->
            <div>
                <h4 class="font-playfair text-xl mb-6">
                    <i class="fa-solid fa-shoe-prints"></i>
                    SOLEHAUS
                </h4>
                <p class="text-gray-400 text-sm leading-relaxed mb-4">
                    Hệ thống cửa hàng phân phối giày chính hãng hàng đầu Việt Nam. Tận hưởng trải nghiệm mua sắm đẳng
                    cấp với các thương hiệu quốc tế.
                </p>
                <div class="flex space-x-4">
                    <a class="hover:text-accent" href="#"><i class="fa-brands fa-facebook"></i></a>
                    <a class="hover:text-accent" href="#"><i class="fa-brands fa-instagram"></i></a>
                    <a class="hover:text-accent" href="#"><i class="fa-brands fa-youtube"></i></a>
                </div>
            </div>
            <!-- Customer Service -->
            <div>
                <h4 class="text-sm font-bold uppercase tracking-widest mb-6">Dịch vụ khách hàng</h4>
                <ul class="space-y-3 text-sm text-gray-400">
                    <li><a class="hover:text-white transition-colors" href="#">Hướng dẫn chọn size</a></li>
                    <li><a class="hover:text-white transition-colors" href="#">Chính sách đổi trả</a></li>
                    <li><a class="hover:text-white transition-colors" href="#">Theo dõi đơn hàng</a></li>
                    <li><a class="hover:text-white transition-colors" href="#">Hệ thống cửa hàng</a></li>
                    <li><a class="hover:text-white transition-colors" href="#">Liên hệ với chúng tôi</a></li>
                </ul>
            </div>
            <!-- Quick Links -->
            <div>
                <h4 class="text-sm font-bold uppercase tracking-widest mb-6">Hỗ trợ</h4>
                <ul class="space-y-3 text-sm text-gray-400">
                    <li><a class="hover:text-white transition-colors" href="#">Về SOLEHAUS</a></li>
                    <li><a class="hover:text-white transition-colors" href="#">Tuyển dụng</a></li>
                    <li><a class="hover:text-white transition-colors" href="#">Chính sách bảo mật</a></li>
                    <li><a class="hover:text-white transition-colors" href="#">Điều khoản dịch vụ</a></li>
                </ul>
            </div>
            <!-- Newsletter -->
            <div>
                <h4 class="text-sm font-bold uppercase tracking-widest mb-6">Đăng ký nhận tin</h4>
                <p class="text-gray-400 text-sm mb-4">Nhận cập nhật về các bộ sưu tập mới và ưu đãi độc quyền.</p>
                <form class="flex">
                    <input
                        class="bg-white/10 p-3 rounded-s-xl outline-none shadow-xs border-none rounded-l-button text-sm w-full"
                        placeholder="Email của bạn" type="email" />
                    <button
                        class="bg-white text-gray-950 rounded-e-xl px-4 py-2 rounded-r-button hover:bg-surface transition-colors"
                        type="submit">
                        <i class="fa-solid fa-paper-plane"></i>
                    </button>
                </form>
            </div>
        </div>
    </footer>
</template>