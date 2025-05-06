import { createMemoryHistory, createRouter } from 'vue-router'

import OrderDishesView from '../components/OrderDishesView.vue'
import OrderHistoryView from '../components/OrderHistoryView.vue'
import AccountVuew from '../components/AccountVuew.vue'

const routes = [
    {
        path: '/dishes',
        component: OrderDishesView
    },
    {
        path: '/history',
        component: OrderHistoryView
    },
    {
        path: '/account',
        component: AccountVuew
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'Default',
        redirect: '/dishes',
    }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router