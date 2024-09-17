<template>
    <v-hover>
        <template #default="{ isHovering, props }">
            <v-btn
                v-bind="props"
                :size="parentProps.size === 'small' ? 40 : 70"
                variant="plain"
                class="rounded-lg border-xl bg-green"
                :class="{ 'on-hover': isHovering }"
                style="opacity: 1"
                :block="parentProps.block"
                @click="executeFunction()"
            >
                <v-icon :size="parentProps.size === 'small' ? 20 : 30">
                    {{ parentProps.icon }}
                </v-icon>
            </v-btn>
        </template>
    </v-hover>
</template>

<script lang="ts" setup>
const parentProps = defineProps<{
    icon: string;
    func: Function;
    block?: boolean;
    size?: 'small' | 'default';
}>();

const executeFunction = () => {
    parentProps.func();
};
</script>

<style lang="scss" scoped>
.on-hover {
    transform: scale(0.95);
}
</style>
