<template>
    <v-snackbar
        v-model="isShowMumble"
        color="white"
        position="absolute"
        location-strategy="connected"
        target="parent"
        :location="'top left'"
        :offset="[-40, 10]"
        :max-width="250"
        :min-width="100"
    >
        <p class="text-caption">
            {{ mumbleContent }}
        </p>
    </v-snackbar>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

const { mumbleContent } = defineProps<{
    mumbleContent: string;
}>();

const isShowMumble = computed(() => mumbleContent.length > 0);
</script>

<style lang="scss" scoped></style>
