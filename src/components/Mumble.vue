<template>
  <!-- Player -->
  <template v-if="who === 'player' && playerMumbling && playerMumble.length > 0">
    <div class="message py-1 px-3 bg-light rounded shadow-sm d-flex align-center">
      <div v-if="showTriangle === 'up'" class="arrow arrow-up" />
      <div v-if="showTriangle === 'down'" class="arrow arrow-down" />
      <p class="m-0">{{ playerMumble }}</p>
    </div>
  </template>
  <!-- Enemy -->
  <template v-if="who === 'enemy' && enemyMumbling && enemyMumble.length > 0">
    <div class="message py-1 px-3 bg-light rounded shadow-sm d-flex align-center">
      <div v-if="showTriangle === 'up'" class="arrow arrow-up" />
      <div v-if="showTriangle === 'down'" class="arrow arrow-down" />
      <p class="m-0">{{ enemyMumble }}</p>
    </div>
  </template>
</template>

<script setup name="Mumble" lang="ts">
import { computed, toRefs } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const props = withDefaults(defineProps<{
    who: string,
    showTriangle: string,
}>(), {
    who: 'player',
    showTriangle: 'up',
});

const { who, showTriangle } = toRefs(props);

const playerMumble = computed(() => store.getters.playerMumble as string);
const playerMumbling = computed(() => store.getters.playerMumbling as boolean);
const enemyMumble = computed(() => store.getters.enemyMumble as string);
const enemyMumbling = computed(() => store.getters.enemyMumbling as boolean);

</script>

<style lang="scss" scoped>
.message {
  position: relative;
  font-size: 0.8rem;
  line-height: 1rem;
  max-width: 240px;
  width: 180px;
  word-break: break-all;
  z-index: 1;
  color: var(--darkblue);
}
.arrow {
  position: absolute;
  width: 0;
  height: 0;
  &-up {
    bottom: 100%;
    left: 15px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid var(--white);
  }
  &-down {
    top: 100%;
    left: 15px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid var(--white);
  }
}
</style>
