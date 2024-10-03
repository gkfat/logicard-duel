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
        class="bg-darkgrey border-white border-md border-opacity-25 cursor-pointer"
    >
        <v-row class="ma-0 justify-center align-center fill-height">
            <v-col cols="auto" class="pa-0" @click="confirmBoxRef?.show()">
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
    let placeholder = ImageDataList.icon.placeholderHead;

    switch (props.position) {
        case enumEquipPosition.Head:
            placeholder = ImageDataList.icon.placeholderHead;
            break;
        case enumEquipPosition.PrimaryHand:
        case enumEquipPosition.SecondaryHand:
            placeholder = ImageDataList.icon.placeholderHand;
            break;
        case enumEquipPosition.Body:
            placeholder = ImageDataList.icon.placeholderBody;
            break;
        case enumEquipPosition.Pants:
            placeholder = ImageDataList.icon.placeholderPants;
            break;
        case enumEquipPosition.Shoes:
            placeholder = ImageDataList.icon.placeholderShoes;
            break;
    }

    return placeholder;
});

const removeEquipment = () => {
    playerStore.removeEquipment(props.position);
};
</script>
