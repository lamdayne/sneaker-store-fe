<template>
    <div class="container mx-auto flex flex-col lg:flex-row gap-8 mt-2">
        <div class="flex flex-col">
            <div class="p-2 w-fit bg-gray-200 rounded-2xl">
                <img src="https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/502f1725-4015-4e8a-9956-982bc0f96a99/SABRINA+3+ASW+%28GS%29.png"
                    alt="" class="w-130 h-120 object-cover rounded-2xl border-gray-200">
            </div>
            <div class="flex mt-3 justify-around w-130">
                <img v-for="i in 4" :key="i"
                    src="https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/502f1725-4015-4e8a-9956-982bc0f96a99/SABRINA+3+ASW+%28GS%29.png"
                    alt="" class="w-24 h-24 rounded-2xl object-cover border border-gray-200 cursor-pointer">
            </div>
        </div>
        <div class="flex flex-col font-mono">
            <p class="text-red-600 uppercase text-[17px] font-bold">Nike</p>
            <p class="mt-2 text-3xl font-bold">SABRINA 3 ASW GS</p>
            <div class="flex items-center my-4">
                <span class="font-sans font-bold text-gray-800 text-xl me-2">2.500.000 đ</span>
                <p class="font-sans text-gray-300 line-through">5.000.000 đ</p>
            </div>
            <p class="font-sans text-[15px] font-bold">Màu sắc</p>
            <div class="flex mt-3 gap-4">
                <button v-for="i in 4" :key="i"
                    class="w-8 h-8 rounded-full bg-red-400 ring-2 ring-primary ring-offset-2 cursor-pointer"></button>
            </div>
            <p class="font-sans text-[15px] font-bold mt-3">Kích thước</p>
            <div class="grid grid-cols-4 gap-2 mt-2">
                <button v-for="s, i in 7" :key="s"
                    class="py-2 px-12 border font-bold border-slate-200 text-sm rounded-lg hover:border-primary transition-all">{{
                        i + 38 }}</button>
                <button
                    class="py-2 px-12 bg-gray-800 text-white border font-bold border-slate-200 text-sm rounded-lg hover:border-primary transition-all">44</button>
            </div>
            <p class="font-sans text-[15px] font-bold mt-3">Số lượng</p>
            <input type="number" value="1" class="w-20 p-2 mt-2 rounded-2xl outline-1 outline-gray-400" />
            <div class="flex gap-4 mt-4">
                <button class="flex-1 p-3.5 border-2 uppercase rounded-xl text-xl cursor-pointer font-bold">Thêm vào giỏ
                    hàng</button>
                <button
                    class="flex-1 p-3.5 uppercase bg-black text-white rounded-xl text-xl cursor-pointer font-bold">Mua
                    ngay</button>
            </div>
        </div>
    </div>
</template>