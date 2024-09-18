<template>
    <v-card
        flat
        rounded="lg"
        :wdith="60"
        :height="60"
        :min-width="60"
        :max-width="60"
        :max-heiht="60"
        :min-height="60"
        class="bg-darkgrey border-white border-md border-opacity-25 cursor-pointer"
    >
        <v-row class="ma-0 justify-center align-center fill-height">
            <v-col cols="auto" @click="confirmBoxRef?.show()">
                <Icon
                    style="opacity: 0.2"
                    :size="30"
                    :url="getPositionPlaceholder"
                ></Icon>
            </v-col>
        </v-row>
    </v-card>
    <div class="text-center">
        <em>None</em>
    </div>

    <ConfirmBox
        ref="confirmBoxRef"
        :message="'是否脫掉裝備？'"
        :func="removeEquipment"
    ></ConfirmBox>
</template>
<script lang="ts" setup>
import {
    computed,
    ref,
} from 'vue';

import Icon from '@/components/common/Icon.vue';
import ConfirmBox from '@/components/system/ConfirmBox.vue';
import { ImageDataList } from '@/data/images';
import { enumEquipPosition } from '@/enums/equip';
import { usePlayerStore } from '@/store/player';

const confirmBoxRef = ref<typeof ConfirmBox>();
const playerStore = usePlayerStore();

const props = defineProps<{
    position: enumEquipPosition;
}>();

const getPositionPlaceholder = computed(() => {
    switch (props.position) {
        case enumEquipPosition.Head:
            return ImageDataList.icon.placeholderHead;
        case enumEquipPosition.PrimaryHand:
        case enumEquipPosition.SecondaryHand:
            return ImageDataList.icon.placeholderHand;
        case enumEquipPosition.Body:
            return ImageDataList.icon.placeholderBody;
        case enumEquipPosition.Pants:
            return ImageDataList.icon.placeholderPants;
        case enumEquipPosition.Shoes:
            return ImageDataList.icon.placeholderShoes;
    }
});

const removeEquipment = () => {
    playerStore.removeEquipment(props.position);
};
</script>
