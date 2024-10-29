<template>
    <div
        class="bg-bluegrey border-white border-md border-opacity-25 rounded-lg position-relative"
        :style="getStyles"
    >
        <v-row class="ma-0 fill-height justify-center align-center">
            <v-col cols="auto" class="pa-1">
                <slot name="item"/>
            </v-col>
            <v-col cols="auto" class="pa-1" v-if="$slots.price">
                <slot name="price"/>
            </v-col>
        </v-row>
    </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

const { size = 'default' } = defineProps<{
    size?: 'default' | 'small' | 'x-small';
}>();

const getStyles = computed(() => {
    // default
    const styles: { [key: string]: string } = {
        width: '100px',
        'max-width': '100px',
        'min-width': '100px',
        'min-height': '100px',
    };

    if (size === 'x-small') {
        styles.width = '60px';
        styles['max-width'] = '60px';
        styles['min-width'] = '60px';
        styles.height = '60px';
        styles['max-height'] = '60px';
        styles['min-height'] = '60px';
    } else if (size === 'small') {
        styles.width = '80px';
        styles['max-width'] = '80px';
        styles['min-width'] = '80px';
        styles.height = '80px';
        styles['max-height'] = '80px';
        styles['min-height'] = '80px';
    }

    return styles;
});
</script>
