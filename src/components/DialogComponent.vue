<template>
  <div class="dialog-text">
    <p class="m-0" :class="{ 'mb-3' : i !== props.dialogs.length - 1 }"
        v-for="(dialog, i) in props.dialogs">
        {{ dialog }}
    </p>
  </div>
</template>

<script setup name="DialogComponent" lang="ts">

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
