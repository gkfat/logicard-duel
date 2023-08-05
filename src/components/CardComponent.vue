<template>
    <div v-if="isCardBack"
        class="item item-back rounded"
        :class="[
          sm ? 'item-sm' : '',
          item.ItemType === enumItemType.LogiCard ? '' : 'item-tech-card'
        ]">
    </div>
    <div v-if="!isCardBack"
        class="item item-face rounded"
        :style="{ transform: style }"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        :class="[
          sm ? 'item-sm' : '',
          item.ItemType === enumItemType.LogiCard ? '' : 'item-tech-card',
          klass ? klass : ''
        ]"
        :title="`【${item.Name}】${item.Description}`">
      <IconComponent :icon="`images/itemtype${item.ItemType}`"></IconComponent>
      <p class="h4 m-0 w-100 text-center">{{ item.Point }}</p>
    </div>
</template>


<script setup name="CardComponent" lang="ts">
import { Item, enumItemType } from '@/types/general';
import { Tooltip } from 'bootstrap';
import { onMounted } from 'vue';
import IconComponent from './IconComponent.vue';

withDefaults(defineProps<{
  style?: string,
  klass?: string,
  sm?: boolean,
  item: Item,
  isCardBack?: boolean
}>(), {
  style: '',
  klass: '',
  sm: false,
  isCardBack: false
})

onMounted(() => {
  new Tooltip(document.body, {
    selector: "[data-bs-toggle='tooltip']",
    delay: {
      show: 1000,
      hide: 0
    },
    trigger: 'focus'
  })
})
</script>

<style lang="scss" scoped>
.card-table {
  .item {
    margin: 0;
  }
}

.items-container {
  .item-back:nth-child(1) {
    margin-left: 0;
  }
}

.used-card-list {
  .item {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}
.item {
  position: relative;
  height: 80px;
  width: 60px;
  margin-left: -15px;
  background-color: var(--white);
  color: var(--blue);
  box-shadow: -3px 2px 8px rgba(0,0,0,0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 2px;
  transition: 0.3s;
  p {
    transform: translateY(-5px);
  }
  &-face {
    &:after {
      content: '';
      border: 2px solid var(--blue);
      border-radius: 5px;
      position: absolute;
      top: 4px;
      left: 4px;
      bottom: 4px;
      right: 4px;
    }
    &:hover {
      filter: brightness(95%);
      transform: rotate(5deg) translateY(-4px) scale(1.1);
    }
  }
  &-back {
    background-color: var(--blue);
  }
  &-sm {
    width: 45px;
    height: 60px;
  }
  &-tech-card {
    background-color: var(--skin);
    color: var(--blue);
    &:after {
      border: 2px solid var(--blue);
    }
    &.item-back {
      background-color: var(--skin);
    }
  }
}

// 丟掉牌動畫
.player-toss-card {
  animation-name: tossCard;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  transform: translateX(100px) translateY(-60px);
  opacity: 0;
}
.enemy-toss-card {
  animation-name:tossCard;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  transform: translateX(200px) translateY(-60px);
  opacity: 0;
}

@keyframes tossCard {
  0% {
    transform: none;
    opacity: 100;
  }
  50% {
    opacity: 80;
  }
  to {
    opacity: 0;
  }
}


#backpack, #shop {
  .item {
    margin: 0;
  }
}
.item-glow {
  .item {
    box-shadow: 0 0 2px 2px rgba(94, 245, 215, 0.3);
  }
  .item-tech-card {
    box-shadow: none;
  }
}

</style>
