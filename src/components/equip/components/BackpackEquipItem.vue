<template>
    <v-card
        flat
        rounded="lg"
        :wdith="50"
        :height="50"
        :min-width="50"
        :max-width="50"
        :max-heiht="50"
        :min-height="50"
        :class="borderColor"
        class="bg-darkgrey border-md border-opacity-100 cursor-pointer"
    >
        <v-row class="ma-0 justify-center align-center fill-height">
            <v-col
                cols="auto"
                class="position-relative"
                @click="confirmBoxRef?.show()"
            >
                <Icon :size="24" :url="getTemplate.icon"></Icon>

                <div
                    class="position-absolute"
                    style="top: 0; right: 5px; bottom: 0; z-index: 1"
                >
                    +{{ equip.info.point }}
                </div>

                <div
                    v-if="equip.is_equiped"
                    class="position-absolute bg-bluegrey opacity-70 d-flex justify-center align-center"
                    style="top: 0; left: 0; right: 0; bottom: 0; z-index: 1"
                >
                    已裝備
                </div>
            </v-col>
        </v-row>
    </v-card>
    <div>
        <Rarity :rarity="equip.info.rarity"></Rarity>
    </div>

    <ConfirmBox
        ref="confirmBoxRef"
        :message="'是否更換裝備？'"
        :func="changeEquipment"
    ></ConfirmBox>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';

import Icon from '@/components/common/Icon.vue';
import Rarity from '@/components/common/Rarity.vue';
import ConfirmBox from '@/components/system/ConfirmBox.vue';
import { enumRarity } from '@/enums/rarity';
import { usePlayerStore } from '@/store/player';
import { Equip } from '@/types/core';

const props = defineProps<{
    equip: Equip;
}>();

const confirmBoxRef = ref<typeof ConfirmBox>();
const playerStore = usePlayerStore();

const getTemplate = computed(() => props.equip.template);

const borderColor = computed(() => {
    switch (props.equip.info.rarity) {
        case enumRarity.Normal:
            return 'border-white';
        case enumRarity.Rare:
            return 'border-secondary';
        case enumRarity.SR:
            return 'border-red';
        case enumRarity.SSR:
            return 'border-darkamber';
        default:
            return 'border-white';
    }
});

const changeEquipment = () => {
    playerStore.changeEquipment(props.equip);
};
</script>
