<template>
  <div class="notfound-page container-fluid d-flex justify-content-center align-items-center">
    <div class="pt-5">
      <p class="h3 text-center">你迷路了！</p>
      <p class="h5 text-center">即將跳轉回首頁...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import Util from '@/service/util';
import { useSwitchToggleStore } from '@/store';

const switchToggleStore = useSwitchToggleStore();
const router = useRouter();

onMounted(async () => {
	switchToggleStore.switchSpinner(false);
	await Util.sleep(2000);
	router.push('/');
});
</script>

<style scoped lang="scss">
.notfound-page {
  flex-wrap: wrap;
}
</style>
