<template>
  <div class="notfound-page container-fluid d-flex justify-content-center align-items-center">
    <div class="pt-5">
      <p class="h3 text-center">你迷路了！</p>
      <p class="h5 text-center">即將跳轉回首頁...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { StoreAction } from '@/store/storeActions';
import Util from '@/service/util';

const store = useStore();
const router = useRouter();
onMounted(async () => {
    store.dispatch(StoreAction.switch.switchSpinner, false);
    await Util.sleep(2000);
    router.push('/');
});
</script>

<style scoped lang="scss">
.notfound-page {
  flex-wrap: wrap;
}
</style>
