import { createWebHistory, createRouter } from 'vue-router';

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
    // 默认路由
    if (to.path === '/') {
        next({ path: '/dishes' });
    } else {
        next();
    }
});

export default router;