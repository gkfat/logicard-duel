<template>
  <div class="dialog-text mb-3">
    <template v-for="(dialog, i) in props.dialogs">
      <p class="m-0" :class="{ 'mb-3' : i !== props.dialogs.length - 1 }">{{ dialog }}</p>
    </template>
  </div>
</template>

<script setup name="DialogComponent" lang="ts">

const props = defineProps<{ dialogs: string[] }>();
</script>

<style lang="scss" scoped>
.dialog-text {
  border: 5px solid var(--darkblue);
  background-color: rgba(255, 255, 255, 0.5);
  padding: 20px 10px;
  position: relative;
  border-radius: 10px;
  overflow-y: scroll;
  flex-grow: 1;
  color: var(--darkblue);
}
#shop, #backpack, #rank {
  .dialog-text {
    margin-bottom: 0;
  }
}
</style>
