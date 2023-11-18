<template>
    <div id="game">
        <!-- Game Init -->
        <template v-if="gameState === enumGameState.Init">
            <Dialog :dialogs="dialogs.opening" />
            <div class="social">
                <a
                    type="button"
                    class="system-btn social-item"
                    @click="openGithub()"
                >
                    <img
                        alt="github"
                        class="img-fluid"
                        :src="ImageDataList.icon.github"
                    >
                </a>
                <a
                    type="button"
                    class="system-btn social-item"
                    @click="openMail()"
                >
                    <img
                        alt="mail"
                        class="img-fluid"
                        :src="ImageDataList.icon.mail"
                    >
                </a>
                <div
                    type="button"
                    class="system-btn social-item"
                    @click="openRank()"
                >
                    <img
                        alt="rank"
                        class="img-fluid"
                        :src="ImageDataList.icon.rank"
                    >
                </div>
            </div>
            <button
                type="button"
                class="w-100 system-btn"
                @click="start()"
            >
                {{ $t('game_view.start') }}
            </button>
        </template>

        <ChooseCharacter v-if="gameState === enumGameState.ChooseCharacter" />
        <Rest v-if="gameState === enumGameState.Rest" />
        <BattleStart v-if="gameState === enumGameState.BattleStart" />
        <Battle v-if="gameState === enumGameState.Battle" />
        <BattleEnd v-if="gameState === enumGameState.BattleEnd" />

        <template v-if="gameState === enumGameState.GameEnd">
            <Dialog :dialogs="dialogs.gameEnd" />
            <table class="table flex-grow-1">
                <tr>
                    <td>{{ $t('game_view.game_end.name') }}</td>
                    <td class="text">
                        {{ player.Character!.Name }}
                    </td>
                </tr>
                <tr>
                    <td>{{ $t('game_view.game_end.total_damage') }}</td>
                    <td class="text">
                        {{ player.Record.TotalDamage }}
                    </td>
                </tr>
                <tr>
                    <td>{{ $t('game_view.game_end.total_heal') }}</td>
                    <td class="text">
                        {{ player.Record.TotalHeal }}
                    </td>
                </tr>
                <tr>
                    <td>{{ $t('game_view.game_end.defeat_bots') }}</td>
                    <td class="text">
                        {{ player.Record.DefeatBots }}
                    </td>
                </tr>
                <tr>
                    <td>{{ $t('game_view.game_end.survival_time') }}</td>
                    <td class="text">
                        {{ player.Record.SurvivalTime }} {{ $t('game_view.game_end.hour') }}
                    </td>
                </tr>
            </table>
            <input
                v-model="lastWords"
                type="text"
                class="form-control mb-3 "
                :placeholder="$t('game_view.game_end.leave_message')"
            >
            <button
                type="button"
                class="w-100 system-btn"
                @click="restart()"
            >
                {{ $t('game_view.game_end.restart') }}
            </button>
        </template>
    </div>
</template>

<script setup lang="ts">
import {
    computed,
    ref,
    watch,
} from 'vue';

import Battle from '@/components/Battle.vue';
import BattleEnd from '@/components/BattleEnd.vue';
import BattleStart from '@/components/BattleStart.vue';
import ChooseCharacter from '@/components/ChooseCharacter.vue';
import Dialog from '@/components/Dialog.vue';
import Rest from '@/components/Rest.vue';
import {
    DialogDataList,
    ImageDataList,
} from '@/data';
import Sound from '@/service/sounds';
import Util from '@/service/util';
import {
    useGameStateStore,
    usePlayerStore,
    useRankStore,
    useSwitchToggleStore,
} from '@/store';
import {
    enumDialog,
    enumGameState,
    enumOperation,
    enumSheetName,
} from '@/types/enums';

const gameStateStore = useGameStateStore();
const rankStore = useRankStore();
const switchToggleStore = useSwitchToggleStore();
const playerStore = usePlayerStore();

const gameState = computed(() => gameStateStore.gameState);
const player = computed(() => playerStore.player);

const dialogs = {
    opening: DialogDataList[enumDialog.Opening],
    gameEnd: DialogDataList[enumDialog.GameEnd],
};

const openGithub = async () => {
    await Sound.playSound(Sound.sounds.effect.click);
    window.open('https://github.com/gkfat/logicard-duel/', '_blank');
};

const openMail = async () => {
    await Sound.playSound(Sound.sounds.effect.click);
    window.open('mailto:gkgkdesign@gmail.com', '_blank');
};

// 打開排行榜
const openRank = async () => {
    switchToggleStore.toggle('rank');
};

const start = async () => {
    switchToggleStore.switchSpinner(true);
    await Sound.playSound(Sound.sounds.effect.click);
    gameStateStore.changeGameState(enumGameState.ChooseCharacter);
    switchToggleStore.switchSpinner(false);
};

/**
 * 玩家留下紀錄
 */
const lastWords = ref('');
watch(lastWords, () => {
    lastWords.value = lastWords.value.trim();
    if (lastWords.value.length > 20) {
        lastWords.value = lastWords.value.substring(0, 20);
    }
});

const restart = async () => {
    const finalLastWords = lastWords.value.length === 0 ? '走的太倉促，沒有留下遺言。' : lastWords.value;
    switchToggleStore.switchSpinner(true);
    const data = {
        EndTime: Util.getCurrentDate(),
        Character: player.value.Character!.Name,
        TotalDamage: player.value.Record.TotalDamage,
        TotalHeal: player.value.Record.TotalHeal,
        DefeatBots: player.value.Record.DefeatBots,
        SurvivalTime: `${player.value.Record.SurvivalTime} 小時`,
        LastWords: finalLastWords,
    };
    await rankStore.updateData(enumSheetName.Records, enumOperation.Update, data);
    Util.sleep(1000);
    switchToggleStore.switchSpinner(false);
    window.location.reload();
};

// 檢查頁面是否離開，音樂是否須暫停
const checkBGMshouldStop = async () => {
    const { hidden } = document;
    Sound.muteMode = hidden;
    if (hidden) {
        Sound.pauseAllSounds();
    } else {
        await Sound.resume(Sound.nowPlaying);
    }
};

// Play BGM
watch(gameState, async () => {
    // 註冊頁面可見性音樂監聽
    if (gameState.value > enumGameState.Init) {
        document.addEventListener('visibilitychange', checkBGMshouldStop);
    }

    switch (gameState.value) {
    case enumGameState.ChooseCharacter:
        await Sound.playBGM(Sound.sounds.bgm.prologue);
        break;
    case enumGameState.BattleStart:
        await Sound.playBGM(Sound.sounds.bgm.battle);
        break;
    case enumGameState.Rest:
        await Sound.playBGM(Sound.sounds.bgm.rest);
        break;
    case enumGameState.GameEnd:
        await Sound.playBGM(Sound.sounds.bgm.end);
        break;
    default:
        break;
    }
});
</script>

<style lang="scss" scoped>
#game {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  margin: 0 auto;
  gap: 10px;
  @media screen and (min-width: 768px) {
    width: 80%;
  }
}

.social {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  &-item {
    width: 60px;
    height: 60px;
  }
}
.table {
  .text {
    color: var(--darkblue);
  }
}
</style>
