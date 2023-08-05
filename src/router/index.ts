import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const isLoggedIn = computed(() => store.getters.isLoggedIn);


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'game',
    component: () => import('../views/GameView.vue')
  },
  {
    path: '/:catchAll(.*)*',
    name: 'notfound',
    component: () => import('../views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
