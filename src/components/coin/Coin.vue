<template>
    <v-row class="ma-0 justify-center align-center">
        <v-col
            cols="12"
            class="pa-0"
        >
            <v-card
                flat
                rounded="md"
                class="bg-transparent mx-auto"
                :style="getStyles"
            >
                <v-row
                    class="ma-0 justify-center align-center justify-center fill-height ga-1 pa-1"
                >
                    <v-col
                        cols="12"
                        class="text-center pa-0"
                    >
                        <IconCoin />

                        <div
                            class="position-absolute"
                            style="top: 0; right: 5px; bottom: 0; z-index: 1"
                        >
                            +{{ point }}
                        </div>
                    </v-col>

                    <v-col
                        v-if="size !== 'x-small'"
                        cols="auto"
                        class="pa-0 text-caption"
                        :style="{
                            fontSize: '0.5rem !important',
                        }"
                    >
                        螺絲釘
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

import IconCoin from '@/components/icons/IconCoin.vue';

const {
    point, size = 'default', 
} = defineProps<{
    point: number;
    size?: 'x-small' | 'small' | 'default';
}>();

const getStyles = computed(() => {
    // default
    const styles: { [key: string]: string } = {
        width: '80px',
        'max-width': '80px',
        height: '120px',
        'max-height': '120px,',
    };

    if (size === 'x-small') {
        styles.width = '30px';
        styles['max-width'] = '30px';
        styles.height = '50px';
        styles['max-height'] = '50px';
    } else if (size === 'small') {
        styles.width = '50px';
        styles['max-width'] = '50px';
        styles.height = '80px';
        styles['max-height'] = '80px';
    }

    return styles;
});
</script>
