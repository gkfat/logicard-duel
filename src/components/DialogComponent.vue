<template>
  <div class="dialog-text">
    <p class="system-text">系統提示</p>
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
  margin: 15px 0;
  flex-grow: 1;
  font-size: 1.1rem;
  color: var(--darkblue);
}
#shop, #backpack, #rank {
  .dialog-text {
    margin-bottom: 0;
  }
}
</style>
