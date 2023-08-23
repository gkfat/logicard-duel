<template>
  <div
    v-if="isCardBack"
    class="card card-back rounded"
    :class="[
      sm ? 'card-sm' : '',
      item.ItemType === enumItemType.LogiCard ? '' : 'card-tech',
    ]">
    <template v-if="item.ItemType === enumItemType.LogiCard">
      <Icon :url="IMAGES.icon.cardbackLogicard" />
    </template>
    <template v-else>
      <Icon :url="IMAGES.icon.cardbackTech" />
    </template>
  </div>
  <div
    v-if="!isCardBack"
    class="card card-face rounded"
    :style="{ transform: style }"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    :class="[
      sm ? 'card-sm' : '',
      item.ItemType === enumItemType.LogiCard ? '' : 'card-tech',
      klass ? klass : '',
    ]"
    :title="`【${item.Name}】${item.Description}`">
    <Icon :url="item.Icon" />
    <p class="h4 m-0 w-100 text-center">{{ item.Point }}</p>
  </div>
</template>

<script setup name="Card" lang="ts">
import { Tooltip } from 'bootstrap';
import { onMounted } from 'vue';
import { Item } from '@/types';
import { enumItemType } from '@/types/enums';
import { IMAGES } from '@/data';

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
    isCardBack: false,
});

onMounted(() => {
    new Tooltip(document.body, {
        selector: "[data-bs-toggle='tooltip']",
        delay: {
            show: 900,
            hide: 0,
        },
        trigger: 'focus',
    });
});
</script>

<style lang="scss" scoped>
.card-table {
  .card {
    margin: 0;
  }
}

.items-container {
  .card-back:nth-child(1) {
    margin-left: 0;
  }
}

.used-card-list {
  .card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}
.card {
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
  }
  &-back {
    background-color: var(--blue);
  }
  &-sm {
    width: 45px;
    height: 60px;
  }
  &-tech {
    background-color: var(--skin);
    color: var(--blue);
    &:after {
      border: 2px solid var(--blue);
    }
    &.card-back {
      background-color: var(--skin);
    }
  }
}

@media (any-pointer: fine) {
  .card:hover {
    filter: brightness(95%);
    box-shadow: 0 0 2px 2px rgba(94, 245, 215, 0.3);
  }
}

// Shop
.item {
  .card {
    margin-left: 0;
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
  .item, .card {
    margin: 0;
  }
}

</style>
