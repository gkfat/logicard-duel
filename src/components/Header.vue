<template>
    <div
        id="header"
        class="w-100 container-fluid p-1 d-flex justify-content-center align-center"
    >
        <h1 class="h6 m-0">
            {{ title }}
        </h1>
        <p class="version m-0">
            v{{ version }}
        </p>
    </div>
</template>

<script setup name="Header" lang="ts">
const title = import.meta.env.VITE_APP_TITLE;
const version = import.meta.env.VITE_APP_VERSION;
</script>

<style lang="scss" scoped>
#header {
  position: relative;
  background-color: var(--darkblue);
  color: var(--green);
  letter-spacing: 1px;
}
.version {
  position: absolute;
  font-size: 0.9rem;
  color: var(--skin);
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
}
</style>
