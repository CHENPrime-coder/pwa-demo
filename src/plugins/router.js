import { createWebHistory, createRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const whiteList = [
    '/login',
];

const routes = [
    {
        path: '/',
        component: () => import('@/views/HomeView.vue'),
        children: [
            {
                path: 'dishes',
                component: () => import('@/views/OrderDishesView.vue')
            },
            {
                path: 'history',
                component: () => import('@/views/OrderHistoryView.vue')
            },
            {
                path: 'account',
                component: () => import('@/views/AccountView.vue')
            },
        ]
    },
    {
        path: '/customer-service',
        component: () => import('@/views/account/CustomerServiceView.vue')
    },
    {
        path: '/address-management',
        component: () => import('@/views/account/AddressManagementView.vue')
    },
    {
        path: '/login',
        component: () => import('@/views/LoginView.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'Default',
        redirect: '/',
    }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
    if (whiteList.includes(to.path)) {
        // If the route is in the white list, allow access
        next();
        return;
    }
    const user = useUserStore();
    if (!user.isLoggedIn) {
        // Try to load the localStorage user data
        const userData = localStorage.getItem('user');
        if (userData) {
            // If user data exists, set it in the store
            user.setUser(JSON.parse(userData));
        } else {
            // If no user data, redirect to login page
            next({ path: '/login' });
            return;
        }
    }
    // 默认路由
    if (to.path === '/') {
        next({ path: '/dishes' });
    } else {
        next();
    }
});

export default router;