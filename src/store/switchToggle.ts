import { ref } from 'vue';

import { defineStore } from 'pinia';

import { useSoundStore } from './sound';

export const useSwitchToggleStore = defineStore('switchToggle', () => {
    const soundStore = useSoundStore();
    const spinnerOpen = ref(false);
    const rankOpen = ref(false);
    const backpackOpen = ref(false);
    const shopOpen = ref(false);

    /** 開關 Spinner */
    const switchSpinner = (target: boolean) => {
        spinnerOpen.value = target;
    };

    /** 開關元件 */
    const toggle = async (target: 'rank' | 'backpack' | 'shop') => {
        await soundStore.playSound(soundStore.sounds.effect.click);
        switch (target) {
        case 'rank':
            rankOpen.value = !rankOpen.value;
            backpackOpen.value = false;
            shopOpen.value = false;
            break;
        case 'backpack':
            rankOpen.value = false;
            backpackOpen.value = !backpackOpen.value;
            shopOpen.value = false;
            break;
        case 'shop':
            rankOpen.value = false;
            backpackOpen.value = false;
            shopOpen.value = !shopOpen.value;
            break;
        default:
            break;
        }
    };

    return {
        spinnerOpen,
        rankOpen,
        backpackOpen,
        shopOpen,
        switchSpinner,
        toggle,
    };
});

