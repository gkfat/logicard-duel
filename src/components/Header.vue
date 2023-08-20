<template>
  <div id="header" class="w-100 container-fluid p-1 d-flex justify-content-center align-center">
    <h1 class="h6 m-0">LogiCard Duel</h1>
    <p class="version m-0">v0.2.0</p>
  </div>
</template>


<script setup name="Header" lang="ts">
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
