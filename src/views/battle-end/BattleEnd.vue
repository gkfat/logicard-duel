<template>
    <v-col cols="12" class="pa-0 align-self-stretch">
        <Dialog :dialogs="dialogs" />
    </v-col>

    <!-- 戰利品 -->
    <v-col cols="12" class="pa-0 align-self-stretch">
        <p class="text-h6 text-center">
            {{ t('battle_end.loot') }}
        </p>
        <p>
            {{ t('coin') }}：{{ player.Coin }}｜ {{ t('item') }}：{{
                player.ItemList.length + '／' + player.Character!.ItemLimit
            }}
        </p>
    </v-col>

    <v-col cols="12" class="pa-0 align-self-stretch">
        <v-row class="ma-0 ga-3">
            <v-col
                v-for="(item, i) in lootBox"
                :key="i"
                cols="auto"
                class="pa-0"
            >
                <Item :item="item" />
            </v-col>
        </v-row>
    </v-col>

    <!-- 沒有多餘空間 -->
    <BtnText v-if="noSpace" :text="t('button.tidy')" :func="openBackpack" />
    <BtnText v-else :text="t('button.rest')" :func="goRest" />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import { useI18n } from 'vue-i18n';

import Item from '@/components/Item.vue';
import BtnText from '@/components/system/BtnText.vue';
import Dialog from '@/components/system/Dialog.vue';
import { DialogDataList, ItemDataList } from '@/data';
import { enumDialog, enumGameState, enumItemType } from '@/enums/game';
import Util from '@/service/util';
import {
    useAppStore,
    usePlayerStore,
    useShopStore,
    useSwitchToggleStore,
} from '@/store';
import useSoundStore from '@/store/sound';
import { Game } from '@/types';

const { t } = useI18n();
const playerStore = usePlayerStore();
const shopStore = useShopStore();
const appStore = useAppStore();
const soundStore = useSoundStore();
const switchToggleStore = useSwitchToggleStore();

const player = computed<Game.Player>(() => playerStore.player);
const enemy = computed<Game.Player>(() => playerStore.enemy);
const lootBox = ref<Game.Item[]>([]);
const noSpace = computed(
    () => player.value.ItemList.length > player.value.Character!.ItemLimit
);
const dialogs = DialogDataList[enumDialog.BattleEnd];
const box80 = Util.makeLotteryBox(80);
const box50 = Util.makeLotteryBox(50);
const box30 = Util.makeLotteryBox(30);

// 產生戰利品
const makeLoot = (type: 'equipment' | 'coin' | 'techCard') => {
    const enemyCharacter = enemy.value.Character!;
    const min = enemyCharacter.RewardCoin![0];
    const max = enemyCharacter.RewardCoin![1];
    const coin = ItemDataList.find(
        (item) => item.ItemType === enumItemType.Coin
    )!;
    const rewardItemIndex = Util.getRandomInt(
        0,
        enemyCharacter.RewardItemList!.length - 1
    );
    const lootRewardItem = enemyCharacter.RewardItemList![rewardItemIndex];
    const remainTechCardList = enemy.value.CardDataList.filter(
        (c) => c.ItemType !== enumItemType.LogiCard
    );
    const techCardIndex = Util.getRandomInt(0, remainTechCardList.length - 1);
    const lootTechCard = remainTechCardList[techCardIndex];

    switch (type) {
        case 'coin':
            coin.Point = Util.getRandomInt(min, max);
            lootBox.value.push(coin);
            break;
        case 'equipment':
            lootBox.value.push(lootRewardItem);
            break;
        case 'techCard':
            if (remainTechCardList.length > 0) {
                lootBox.value.push(lootTechCard);
            }
            break;
        default:
            break;
    }
};

onMounted(() => {
    makeLoot('coin'); // 判斷獲得金幣

    if (Util.lottery(box80) && !noSpace.value) {
        // 80% 機率獲得一件戰利品
        makeLoot('equipment');
    }

    if (Util.lottery(box30) && !noSpace.value) {
        // 30% 機率獲得第二件戰利品
        makeLoot('equipment');
    }

    if (Util.lottery(box50)) {
        // 50% 機率獲得一張 Gkbot 剩餘的技術牌
        makeLoot('techCard');
    }

    const updatedPlayer = { ...player.value };
    lootBox.value.forEach((loot) => {
        switch (loot.ItemType) {
            case enumItemType.Coin:
                updatedPlayer.Coin += loot.Point;
                break;
            case enumItemType.Attack:
            case enumItemType.Defense:
            case enumItemType.Heal:
                updatedPlayer.CardDataList.push(loot);
                break;
            case enumItemType.Weapon:
            case enumItemType.Armor:
                updatedPlayer.ItemList.push(loot);
                break;
            default:
                break;
        }
    });

    // 更新玩家
    playerStore.updatePlayer('player', updatedPlayer);

    // 更新商店
    shopStore.refreshShop();
});

// 打開背包
const openBackpack = async () => {
    switchToggleStore.toggle('backpack');
};

const goRest = async () => {
    await soundStore.playSound(soundStore.sounds.effect.click);
    appStore.changeGameState(enumGameState.Rest);
};
</script>

<style lang="scss" scoped>
#battle-end {
    height: 100%;
    gap: 15px;
}
.items-container {
    overflow-y: scroll;
    gap: 10px;
}
</style>
