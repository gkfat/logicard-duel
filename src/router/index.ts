import {
    createRouter,
    createWebHistory,
    type RouteRecordRaw,
} from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/game',
        component: () => import('@/layout/AppLayout.vue'),
        children: [
            {
                path: 'game',
                component: () => import('@/views/GameView.vue'),
            },
        ],
    }, {
        path: '/:catchAll(.*)*',
        component: () => import('@/layout/AppLayout.vue'),
        children: [
            {
                path: '',
                component: () => import('@/views/error/NotFound.vue'),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
