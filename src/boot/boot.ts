import { useAppStore } from '@/store/app';

export const boot = async() => {
    const appStore = useAppStore();
    appStore.bootGame();
};
