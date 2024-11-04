import { useSoundStore } from '@/store/sound';

export const useSoundEffect = () => {
    const soundStore = useSoundStore();

    /** 點擊聲 */
    const soundClick = async () => {
        await soundStore.playSound(soundStore.sounds.effect.click);
    };

    /** 裝備聲 */
    const soundEquip = async () => {
        await soundStore.playSound(soundStore.sounds.effect.equip);
    };

    /** 波聲 */
    const soundPop = async () => {
        await soundStore.playSound(soundStore.sounds.effect.pop);
    };

    /** 治療聲 */
    const soundHeal = async () => {
        await soundStore.playSound(soundStore.sounds.effect.heal);
    };

    const soundBell = async () => {
        await soundStore.playSound(soundStore.sounds.effect.bell);
    };

    const soundPlayerHurt = async () => {
        await soundStore.playSound(soundStore.sounds.effect.playerHurt);
    };

    const soundOpponentHurt = async () => {
        await soundStore.playSound(soundStore.sounds.effect.opponentHurt);
    };

    const soundPlaceCard = async () => {
        await soundStore.playSound(soundStore.sounds.effect.placeCard);
    };

    const soundCountdown = async () => {
        await soundStore.playSound(soundStore.sounds.effect.countdown);
    };

    const soundWin = async () => {
        await soundStore.playSound(soundStore.sounds.effect.win);
    };

    const soundCoin = async () => {
        await soundStore.playSound(soundStore.sounds.effect.coin);
    };

    const bgmPrologue = async () => {
        await soundStore.playBGM(soundStore.sounds.bgm.prologue);
    };

    const bgmRest = async () => {
        await soundStore.playBGM(soundStore.sounds.bgm.rest);
    };

    const bgmEnd = async () => {
        await soundStore.playBGM(soundStore.sounds.bgm.end);
    };

    const bgmBattle = async () => {
        await soundStore.playBGM(soundStore.sounds.bgm.battle);
    };

    return {
        soundClick,
        soundEquip,
        soundPop,
        soundCountdown,
        soundPlaceCard,
        soundPlayerHurt,
        soundOpponentHurt,
        soundWin,
        soundCoin,
        soundHeal,
        soundBell,

        bgmPrologue,
        bgmBattle,
        bgmRest,
        bgmEnd,
    };
};
