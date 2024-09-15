<template>
    <v-hover>
        <template #default="{ isHovering, props }">
            <v-btn
                v-bind="props"
                :size=" smAndUp ? 100 : 80"
                variant="plain"
                class="rounded-xl border-xl bg-green"
                :class="{ 'on-hover': isHovering }"
                style="opacity: 1;"
                @click="executeFunction()"
            >
                <v-icon :size=" smAndUp ? 60 : 40">
                    {{ parentProps.icon }}
                </v-icon>
            </v-btn>
        </template>
    </v-hover>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify';

const parentProps = defineProps<{
    icon: string;
    func: Function;
}>();

const { smAndUp } = useDisplay();
const executeFunction = () => {
    parentProps.func();
};
</script>

<style lang="scss" scoped>
.on-hover {
    transform: scale(0.95);
}
</style>
