import { useOpponentStore } from '@/store/opponent';
import { useRankStore } from '@/store/rank';
import { useShopStore } from '@/store/shop';
import { useSoundStore } from '@/store/sound';

export const boot = async () => {
    // init shop
    const shopStore = useShopStore();
    shopStore.init();

    // init opponents pool
    const opponentStore = useOpponentStore();
    opponentStore.init();

    // init rank
    const rankStore = useRankStore();
    rankStore.init();

    // init sound assets
    const soundStore = useSoundStore();
    soundStore.init();

    console.log('boot success');
};
