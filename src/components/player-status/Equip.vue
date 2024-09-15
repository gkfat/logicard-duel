<template>
    <v-card
        :height="28"
        :width="28"
        color="lightgrey"
        class="rounded"
    >
        <v-card-text>
            <Icon
                v-if="item"
                :url="item.Icon"
            />

            <v-tooltip activator="parent">
                <span v-if="item">{{ item.Description }}</span>
                <span v-else>{{ t('equip_empty') }}</span>
            </v-tooltip>
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import {
    computed,
    toRefs,
} from 'vue';

import { useI18n } from 'vue-i18n';

import Icon from '@/components/Icon.vue';
import { Game } from '@/types';

const parentProps = defineProps<{
    type: 'weapon' | 'armor',
    player: Game.Player,
}>();

const { t } = useI18n();
const { type, player } = toRefs(parentProps);

const item = computed(() => {
    let result: Game.Item | null = null;

    // 武器
    if (type.value === 'weapon' && player.value.WeaponIndex) {
        result = player.value.ItemList[player.value.WeaponIndex];
    } else if (type.value === 'armor' && player.value.ArmorIndex) {
        // 護具
        result = player.value.ItemList[player.value.ArmorIndex];
    }

    return result;
});
</script>

<style lang="scss" scoped>

</style>
