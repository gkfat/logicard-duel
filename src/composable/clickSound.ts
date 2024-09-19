import { useSoundStore } from '@/store/sound';

export const useClickSound = async (next: Function) => {
    const soundStore = useSoundStore();

    const clickSound = async () => {
        await soundStore.playSound(soundStore.sounds.effect.click);
        next();
    };

    return await clickSound();
};
