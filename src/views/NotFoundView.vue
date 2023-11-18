<template>
    <div class="notfound-page container-fluid d-flex justify-content-center align-items-center">
        <div class="pt-5">
            <p class="h3 text-center">
                {{ $t('not_found_page.title') }}
            </p>
            <p class="h5 text-center">
                {{ $t('not_found_page.description') }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import { useRouter } from 'vue-router';

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
