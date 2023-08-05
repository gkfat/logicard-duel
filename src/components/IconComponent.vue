<template>
  <div class="icon d-flex justify-content-center align-items-center">
    <img class="img-fluid" :src="require(`@/assets/${icon}.png`)">
  </div>
</template>

<script setup name="IconComponent" lang="ts">
import { Item, enumItemType } from '@/types/general';
import { Tooltip } from 'bootstrap';
import { onMounted } from 'vue';

withDefaults(defineProps<{
  icon: string,
}>(), {
  icon: 'images/default',
})

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
