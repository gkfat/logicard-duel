/* eslint-disable import/no-extraneous-dependencies */
import { computed } from 'vue';

import {
    createPinia,
    setActivePinia,
} from 'pinia';
import {
    describe,
    expect,
    it,
} from 'vitest';

import { CharacterDataList } from '../src/data';
import { usePlayerStore } from '../src/store';
import {
    Character,
    Player,
} from '../src/types';
import { enumCharacter } from '../src/types/enums';

describe('PlayerStore', () => {
    setActivePinia(createPinia());
    const store = usePlayerStore();
    const player = computed(() => store.player as Player);
    const selectedCharacter: Character = CharacterDataList.find((c) => c.ID === enumCharacter.Man);
    store.selectCharacter(selectedCharacter);

    it('Store 測試選擇角色', () => {
        expect(player.value.Character).not.toBeNull();
        expect(player.value.Character!.ID).toBe(selectedCharacter.ID);
    });

    it('Store 測試扣血', () => {
        store.deduction('player', 10);
        expect(player.value.CurrentHealth).toBe(selectedCharacter.Health - 10);
    });

    it('Store 測試補血', () => {
        store.heal('player', 10);
        expect(player.value.CurrentHealth).toBe(selectedCharacter.Health + 10);
    });
});
