import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/views/HomePage.vue";
import LoginPage from "@/views/LoginPage.vue";
import ProductDetail from "@/components/ProductDetail.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import AdminProductPage from "@/views/admin/AdminProductPage.vue";
import SearchPage from "@/views/SearchPage.vue";
import MyInfoPage from "@/views/MyInfoPage.vue";
import CartPage from "@/views/CartPage.vue";

import ForgotPassword from "@/components/ForgotPassword.vue";
import AddressPage from "@/views/AddressPage.vue";
import OrderManagePage from "@/views/OrderManagePage.vue";
import ProductDetailPage from "@/views/ProductDetailPage.vue";
const routes = [
    {
        path: "/",
        component: HomePage
    },
    {
        path: "/login",
        component: LoginPage
    },
    {
        path: "/product/:id",
        component: ProductDetailPage
    },
    {
        path: "/register",
        component: RegisterPage
    },
    {
        path: "/admin/product",
        component: AdminProductPage
    },
    {
        path: '/search',
        component: SearchPage
    },
    {
        path: "/cart",
        component: CartPage

    },
    {
        path: '/forgotpassword',
        component: ForgotPassword
    },
    {
        path: '/auth/me',
        component: MyInfoPage
    },
    {
        path: '/auth/address',
        component: AddressPage
    },
    {
        path: '/auth/order',
        component: OrderManagePage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    // scrollBehavior(to, from, savedPosition) {
    //     // Scroll to top on route change, or return to saved position
    //     if (savedPosition) {
    //         return savedPosition;
    //     } else {
    //         return { top: 0, behavior: 'smooth' };
    //     }
    // }
})

export default router;
