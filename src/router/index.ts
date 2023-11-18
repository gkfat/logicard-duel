import {
    createRouter,
    createWebHistory,
    RouteRecordRaw,
} from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'game',
        component: () => import('../views/GameView.vue'),
    },
    {
        path: '/:catchAll(.*)*',
        name: 'notfound',
        component: () => import('../views/NotFoundView.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
