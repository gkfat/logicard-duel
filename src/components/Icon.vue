<template>
  <div class="icon d-flex justify-content-center align-items-center">
    <img alt="icon" class="img-fluid" :src="url">
  </div>
</template>

<script setup name="Icon" lang="ts">

defineProps<{
  url: string,
}>();

</script>

<style lang="scss" scoped>
.icon {
  width: 20px;
  height: 20px;
  &-sm {
    width: 15px;
    height: 15px;
  }
}
</style>
