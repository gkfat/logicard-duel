<template>
  <div id="header" class="w-100 container-fluid p-1 d-flex justify-content-center align-center">
    <h1 class="h6 m-0">LogiCard Duel v 0.2.0</h1>
  </div>
</template>


<script setup name="HeaderComponent" lang="ts">
import { StoreAction } from '@/store/storeActions';
import { enumGameState } from '@/types/general';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import router from '@/router';

const store = useStore();
</script>

<style lang="scss" scoped>
#header {
  position: relative;
  background-color: var(--darkblue);
  color: var(--white);
  letter-spacing: 1px;
}
.restart {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  padding: 5px 10px;
}
</style>
