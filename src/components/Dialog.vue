<template>
    <div class="dialog-text">
        <p
            v-for="(dialog, i) in props.dialogs"
            :key="i"
            class="m-0"
            :class="{ 'mb-3': i !== props.dialogs.length - 1 }"
        >
            {{ dialog }}
        </p>
    </div>
</template>

<script setup name="Dialog" lang="ts">
const props = defineProps<{ dialogs: string[] }>();
</script>

<style lang="scss" scoped>
.dialog-text {
  border: 5px solid var(--darkblue);
  background-color: rgba(255, 255, 255, 0.5);
  padding: 10px;
  min-height: 100px;
  position: relative;
  border-radius: 10px;
  overflow-y: scroll;
  flex-grow: 1;
  color: var(--darkblue);
}
</style>
