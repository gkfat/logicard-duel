<template>
    <div></div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

import { CardTemplateList } from '@/data/card-templates';
import { EquipTemplateList } from '@/data/equip-templates';
import { enumCard } from '@/enums/card';
import { enumEquip } from '@/enums/equip';

const props = defineProps<{
    equipType: enumEquip;
}>();

const findTemplate = computed(() =>
    EquipTemplateList.find((v) => v.type === props.equipType)
);
</script>
