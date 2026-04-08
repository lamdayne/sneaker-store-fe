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
import DashboardPage from "@/views/admin/DashboardPage.vue";
import AdminBrandPage from "@/views/admin/AdminBrandPage.vue";
import AdminCategoryPage from "@/views/admin/AdminCategoryPage.vue";
import AdminOrderPage from "@/views/admin/AdminOrderPage.vue";
import AdminUserPage from "@/views/admin/AdminUserPage.vue";
import AdminProductListPage from "@/views/admin/AdminProductListPage.vue";
import { useUserStore } from "@/store/userStore";
import CheckoutPage from "@/views/CheckoutPage.vue";

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
        component: AdminProductPage,
        meta: {
            requiresAuth: true,
            requiresAdmin: true
        }
    },
    {
        path: '/search',
        component: SearchPage
    },
    {
        path: "/cart",
        component: CartPage,
        meta: {
            requiresAuth: true
        }

    },
    {
        path: '/forgotpassword',
        component: ForgotPassword
    },
    {
        path: '/auth/me',
        component: MyInfoPage,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/auth/address',
        component: AddressPage,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/auth/order',
        component: OrderManagePage,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/admin/dashboard',
        component: DashboardPage,
        meta: {
            requiresAuth: true,
            requiresAdmin: true
        }
    },
    {
        path: '/admin/brand',
        component: AdminBrandPage,
        meta: {
            requiresAuth: true,
            requiresAdmin: true
        }
    },
    {
        path: '/admin/category',
        component: AdminCategoryPage,
        meta: {
            requiresAuth: true,
            requiresAdmin: true
        }
    },
    {
        path: '/admin/order',
        component: AdminOrderPage,
        meta: {
            requiresAuth: true,
            requiresAdmin: true
        }
    },
    {
        path: '/admin/user',
        component: AdminUserPage,
        meta: {
            requiresAuth: true,
            requiresAdmin: true
        }
    },
    {
        path: '/admin/product/list',
        component: AdminProductListPage,
        meta: {
            requiresAuth: true,
            requiresAdmin: true
        }
    },
    {
        path: '/order/checkout',
        component: CheckoutPage
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

router.beforeEach((to, from, next) => {
    const userStore = useUserStore()

    if (to.meta.requiresAuth && !userStore.isAuthenticated) {
        next({
            path: '/login',
            query: {
                redirect: to.fullPath
            }
        })
    } else if (to.meta.requiresAdmin) {
        if (userStore.isAdmin) {
            next()
        } else {
            next('/')
        }
    } else {
        next()
    }
})

export default router;
