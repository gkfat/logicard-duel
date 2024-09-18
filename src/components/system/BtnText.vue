<template>
    <v-hover>
        <template #default="{ isHovering, props }">
            <v-btn
                v-bind="props"
                variant="plain"
                class="rounded-lg border-xl bg-green pa-7"
                :class="{ 'hovering': isHovering }"
                style="opacity: 1"
                block
                @click="executeFunction()"
            >
                <template v-if="parentProps.prependIcon">
                    <v-icon :icon="parentProps.prependIcon" :size="30" />
                </template>
                <p class="text-h5">
                    {{ parentProps.text }}
                </p>
            </v-btn>
        </template>
    </v-hover>
</template>

<script lang="ts" setup>
const parentProps = defineProps<{
    text: string;
    func: Function;
    prependIcon?: string;
}>();

const executeFunction = () => {
    parentProps.func();
};
</script>

<style lang="scss" scoped>
.hovering {
    transform: scale(95%);
}
</style>
