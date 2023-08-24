<template>
  <div class="layout d-flex">
    <ul class="blocks">
      <li v-for="i in 10" :key="i" />
    </ul>
    <Header />
    <div class="layout-body">
      <router-view />
    </div>
  </div>

  <Rank />
  <Backpack />
  <Shop />
  <Spinner />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import StoreAction from './store/storeActions';
import { enumSheetName, enumOperation, enumItemType } from './types/enums';
import { CARDS } from './data';
import Util from './service/util';

const store = useStore();

// 初始化排行榜、商店、音樂
onMounted(async () => {
	await store.dispatch(StoreAction.general.fetchData, {
		sheetName: enumSheetName.Records,
		operation: enumOperation.Get,
	});
	const shopItems = [];
	const techCards = CARDS.filter((item) => item.ItemType !== enumItemType.LogiCard);
	while (shopItems.length < 6) {
		const i = Util.getRandomInt(0, techCards.length - 1);
		shopItems.push(techCards[i]);
	}
	store.dispatch(StoreAction.general.updateShop, shopItems);
});

</script>

<style lang="scss">
#app {
  font-size: 16px;
  line-height: 24px;
}
.layout {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex-direction: column;
  &-body {
    position: relative;
    height: 90%;
    padding: 10px 15px 0;
  }
}
.navbar-collapse .nav-item {
  text-align: center;
}

// 背景動畫
.blocks {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #f6a52c;
  z-index: -1;
  li {
    position: absolute;
    display: block;
    list-style: none;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.2);
    animation: animate 20s linear infinite;
    bottom: -150px;
    &:nth-child(1) {
      left: 25%;
      width: 80px;
      height: 80px;
      animation-delay: 0s;
    }
    &:nth-child(2){
      left: 10%;
      width: 20px;
      height: 20px;
      animation-delay: 2s;
      animation-duration: 10s;
    }
    &:nth-child(3){
      left: 70%;
      width: 20px;
      height: 20px;
      animation-delay: 4s;
    }
    &:nth-child(4){
      left: 40%;
      width: 60px;
      height: 60px;
      animation-delay: 0s;
      animation-duration: 15s;
    }
    &:nth-child(5) {
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
    }
    &:nth-child(6){
        left: 75%;
        width: 110px;
        height: 110px;
        animation-delay: 3s;
    }
    &:nth-child(7){
        left: 35%;
        width: 150px;
        height: 150px;
        animation-delay: 7s;
    }
    &:nth-child(8){
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 35s;
    }
    &:nth-child(9){
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 25s;
    }
    &:nth-child(10){
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
    }
  }
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }
  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
}
</style>
