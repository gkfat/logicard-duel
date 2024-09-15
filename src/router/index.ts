import {
    createRouter,
    createWebHistory,
    RouteRecordRaw,
} from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'game',
        component: () => import('@/views/game-view/GameView.vue'),
    },
    {
        path: '/:catchAll(.*)*',
        name: 'notfound',
        component: () => import('@/views/error/NotFound.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
