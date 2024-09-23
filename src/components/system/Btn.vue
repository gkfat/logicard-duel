<template>
    <v-hover>
        <template #default="{ isHovering, props }">
            <v-btn
                v-bind="props"
                variant="plain"
                :class="{
                    'bg-green opacity-100': true,
                    hovering: isHovering,
                    'border-xl rounded-lg pa-7': size === 'default',
                    'border-md rounded-md pa-3': size === 'small',
                }"
                :disabled="disabled"
                block
                @click="func()"
            >
                <template v-if="icon">
                    <v-icon :icon="icon" :size="size === 'default' ? 40 : 24" />
                </template>

                <!-- 按鈕文字 -->
                <template v-if="text">
                    <p class="text-h5">
                        {{ text }}
                    </p>
                </template>
            </v-btn>
        </template>
    </v-hover>
</template>

<script lang="ts" setup>
const {
    text,
    func,
    icon,
    size = 'default',
    disabled = false,
} = defineProps<{
    text?: string;
    func: Function;
    icon?: string;
    size?: 'small' | 'default';
    disabled?: boolean;
}>();
</script>

<style lang="scss" scoped>
.hovering {
    transform: scale(95%);
}
</style>
